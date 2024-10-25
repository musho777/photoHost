import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetCatalogAction } from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';
import { ClearCreatPost } from '../../store/action/clearAction';
import { AddImage, RubbishSvg } from '../../assets/svg/Svgs';
import { Status } from './component/status';
import { AppColors } from '../../styles/AppColors';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import FastImage from 'react-native-fast-image';
import { Header } from './component/header';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;


export const AddImg = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [uri, setUri] = useState([]);
  const [description, setDescription] = useState([]);
  const createPost = useSelector(st => st.createPost);
  const staticData = useSelector(st => st.static);
  const [selectedCatalog, setSelectedCatalog] = useState('')
  const [active, setActive] = useState(0)
  const flatListRef = useRef(null);

  const [showError, setShowError] = useState(false)

  const [error, setError] = useState('')
  const [first, setFirst] = useState(false)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(GetCatalogAction(staticData.token))
  }, []);


  useFocusEffect(
    useCallback(() => {

      setError('')
      setShowError(false)
      dispatch(ClearCreatPost())
      setSelectedCatalog('')
      setUri([])
      addPhoto([], 0)
      setActive(0)
    }, [])
  );



  useEffect(() => {
    if (createPost.status) {
      dispatch(ClearCreatPost())
      setUri([])
      setDescription([])
    }
  }, [createPost.status]);

  const addPhoto = async (data, i) => {
    const options = {
      compressVideo: true,
      maxVideoDuration: 60,
      maxSelectedAssets: 10,
      doneTitle: "Добавлять",
      usedCameraButton: false,
      isPreview: false,
    }
    try {
      const response = await openPicker(options);
      let item = [...data]
      if (response.didCancel) {
        if (uri.length == 0) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'TabNavigation' }],
            })
          );
          setFirst(false)
        }
      }
      else if (!response.didCancel && !response.error) {
        if (response.length) {
          setFirst(true)
        }
        response?.map((elm, i) => {
          if (elm?.mime.startsWith('video')) {
            if (elm.duration <= 60883) {
              item.push({ uri: elm.path, mime: elm.mime })
            }
            else {
              setError('видео должен быть меньше чем 60 с')
              setShowError(true)
            }
          }
          else {
            if (item.length <= 10) {
              item.push({ uri: elm.path, mime: elm.mime });
            }
          }
        })
        setUri(item);
      }
    }
    catch (error) {
      Close()
      setFirst(false)
      navigation.navigate('TabNavigation')
    }

  }



  const delateFoto = index => {
    let item = [...uri];
    let temp = [...description]
    temp.splice(index, 1);
    item.splice(index, 1);
    let newIndex = 0
    if (index == uri.length - 1) {
      newIndex = index > 0 ? index - 1 : 0;
    }
    else if (index > 0) {
      newIndex = index - 1;
    }
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
    }
    setUri(item);
    setDescription(temp)
  }


  const addDescription = (e, i) => {
    let item = [...description]
    item[i] = e
    setDescription(item)
  }

  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
  };


  const Close = () => {
    setFirst(false)
    setUri([])
  }

  const renderItem = ({ item, index }) => {
    return <View behavior={Platform.OS === 'ios' ? 'padding' : "position"}>
      <ScrollView style={{ height: 570 }}>
        <FastImage
          style={[styles.img, { maxHeight: 600, }]}
          source={{ uri: item.uri }}
        />
        <TouchableOpacity onPress={() => delateFoto(index)} style={{ position: 'absolute', top: 10, right: 10 }}>
          <RubbishSvg />
        </TouchableOpacity>
      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholderTextColor="white"
          placeholder={t(mainData.lang).adddescription}
          style={styles.input}
          value={description[active]}
          multiline
          onChangeText={(e) => addDescription(e, active)}
        />
      </View>
    </View>
  }




  if (first)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <Status setShowError={(e) => setShowError(e)} showError={showError} error={error} />
        <Header
          uri={uri}
          selectedCatalog={selectedCatalog}
          description={description}
          setSelectedCatalog={(e) => setSelectedCatalog(e)}
          error={error}
          setFirst={(e) => setFirst(e)}
          Close={() => Close()}
        />
        <Text style={[Styles.whiteMedium9, { textAlign: 'center', marginTop: 10, zIndex: 99999 }]}>{t(mainData.lang).Yourcontent}</Text>
        <View style={styles.centeredView}>
          <View style={styles.selectImage}>
            <FlatList
              horizontal
              pagingEnabled
              ref={flatListRef}
              showsHorizontalScrollIndicator={true}
              decelerationRate="normal"
              data={uri}
              windowSize={5}
              onScroll={handleMomentumScrollEnd}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.paginationWrapper}>
            {uri?.length > 1 && uri?.map((elm, i) => (
              <View key={i} style={[styles.pagination, i === active && { backgroundColor: AppColors.GoldenTainoi_Color, borderRadius: 50 }]}></View>
            ))}
          </View>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <TouchableOpacity onPress={() => addPhoto(uri, 1)}>
            <AddImage />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  else {
    return
  }
};


const styles = StyleSheet.create({
  pagination: {
    width: 6,
    height: 6,
    backgroundColor: '#CCD6DF',
    marginHorizontal: 5,
    borderRadius: 50,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 2,
    zIndex: 9999,
  },
  paginationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    height: 20,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
  },
  img: {
    height: 570,
    width: windowWidth,
    borderRadius: 11,
  },
  input: {
    borderColor: 'red',
    width: '90%',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 12,
    color: 'white'
  },
  selectImage: {
    height: 'auto',
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  addPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 7,
    width: 220,
    height: 30,
    marginTop: 10,
    backgroundColor: '#FFD953',
  },
});
