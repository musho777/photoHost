import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { CreatePostLocal, CreatPostAction, GetCatalogAction } from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';
import { ScrollView } from 'react-native-gesture-handler';
import { ClearCreatPost } from '../../store/action/clearAction';
import { AddImage, CheckMarkSvg, CloseSvg1 } from '../../assets/svg/Svgs';
import { BootomModal } from '../../components/BootomSheet';
import { Status } from './component/status';
import { AppColors } from '../../styles/AppColors';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;


export const AddImg = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [uri, setUri] = useState([]);
  const [description, setDescription] = useState([]);
  const createPost = useSelector(st => st.createPost);
  const staticData = useSelector(st => st.static);
  const [selectedCatalog, setSelectedCatalog] = useState('')
  const [selectedCatalogName, setSelectedCatalogName] = useState('')
  const getCatalog = useSelector((st) => st.getCatalog)
  const [active, setActive] = useState(0)
  const [scrollTo, setScrollTo] = useState(0)
  const flatListRef = useRef(null);
  const [enableScrollTo, setEnableScrollTo] = useState(true)

  const [showError, setShowError] = useState(false)

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], [],);

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const [errorCatalog, setErrorCatalog] = useState(false)
  const [error, setError] = useState('')
  const [first, setFirst] = useState(false)
  const dispatch = useDispatch();


  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    dispatch(GetCatalogAction(staticData.token))
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  useFocusEffect(
    useCallback(() => {
      setError('')
      setShowError(false)
      Camera()
      setErrorCatalog(false)
      dispatch(ClearCreatPost())
      setSelectedCatalog('')
      setSelectedCatalogName('')
      setUri([])
      addPhoto([], 0)
      setActive(0)
      setEnableScrollTo(true)
    }, [])
  );


  const Camera = async () => {
    const cameraPermission = Platform.OS === 'android' && PERMISSIONS.ANDROID.CAMERA
    const photoLibraryPermission = Platform.OS === 'android' && PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    setUri([])
    setDescription([])
    const cameraPermissionStatus = await check(cameraPermission);
    const photoLibraryPermissionStatus = await check(photoLibraryPermission);
    if (cameraPermissionStatus !== RESULTS.GRANTED && photoLibraryPermissionStatus !== RESULTS.GRANTED) {
      request(cameraPermission);
      request(photoLibraryPermission);
    }
  }


  useEffect(() => {
    if (createPost.status) {
      dispatch(ClearCreatPost())
      setUri([])
      setDescription([])
    }
  }, [createPost.status]);

  const creatPost = () => {
    if (error) {
      setShowError(true)
    }
    setErrorCatalog(false)
    let form = new FormData();
    uri.length &&
      uri.forEach((el, i) => {
        (!el.uri.includes('.mp4') && !el.uri.includes('mov')) ?
          form.append('photos[]', {
            uri: el.uri,
            type: 'image/jpg',
            name: 'photo.jpg',
          }) :
          form.append(`video[][video]`, {
            uri: el.uri,
            type: 'video/mp4',
            name: 'video.mp4',
          })
      });

    description && form.append('description', JSON.stringify(description));
    form.append('category_id', selectedCatalog)
    if (selectedCatalog != '' && error == '') {
      dispatch(CreatePostLocal(uri[0]))
      navigation.navigate('TabNavigation', {
        screen: 'Home',
        params: { param: 'add_image' },
      });
      setFirst(false)
      dispatch(CreatPostAction(form, staticData.token));
    }
    else if (selectedCatalog == '') {
      setErrorCatalog(true)
    }
  };


  const addPhoto = (data, i) => {
    setEnableScrollTo(true)
    setFirst(true)
    ImagePicker.openPicker({
      mediaType: "any",
      compressVideo: true,
      width: 720,
      height: 1280,
      multiple: true,
    }).then(response => {
      console.log(uri.length, 'uri.length')
      console.log(data, 'data.length')
      let item = [...data]
      if (response.didCancel) {
        if (uri.length == 0) {
          navigation.goBack()
          setFirst(false)
        }
      }
      else if (!response.didCancel && !response.error) {

        response?.map((elm, i) => {
          if (elm?.mime.startsWith('video')) {
            if (elm.duration <= 60883) {
              item.push({ uri: elm.path })
            }
            else {
              setError('видео должен быть меньше чем 60 с')
              setShowError(true)
            }
          }
          else {
            if (item.length <= 10) {
              item.push({ uri: elm.path });
            }
          }
        })
        if (i != 0) {
          setScrollTo(uri.length)
        }
        setUri(item);
      }
    });
  }



  const delateFoto = index => {
    setEnableScrollTo(false)
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


  const CloseScreen = () => {
    setError('')
    setShowError(false)
    Camera()
    setErrorCatalog(false)
    dispatch(ClearCreatPost())
    setSelectedCatalog('')
    setSelectedCatalogName('')
    setUri([])
    setFirst(false)
    navigation.goBack()
  }

  const renderItem = ({ item, index }) => {
    return <View>
      <Image
        onLoad={(event) => {
          let { width, height } = event.nativeEvent.source;
          if (height < 700) {
            height = 380
          }
          else {
            height = 570
          }
        }}
        style={[styles.img, { height: 570 }]}
        source={{ uri: item.uri }}
      />
      <TouchableOpacity onPress={() => delateFoto(index)} style={{ position: 'absolute', top: 10, right: 10 }}>
        <CloseSvg1 />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholderTextColor="white"
          placeholder={t(mainData.lang).adddescription}
          style={[styles.input, { marginBottom: (!keyboardOpen && Platform.OS == "android") ? 0 : 155, zIndex: 999 }]}
          value={description[index]}
          multiline
          onChangeText={(e) => addDescription(e, index)}
        />
      </View>
    </View>
  }

  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
  };


  if (first)
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          <Status setShowError={(e) => setShowError(e)} showError={showError} error={error} />
          <View activeOpacity={1} onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8, marginTop: 10 }}>
              <TouchableOpacity onPress={() => CloseScreen()}>
                <CloseSvg1 />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePresentModalPress()} style={{ borderWidth: 1, borderColor: errorCatalog ? 'red' : 'white', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, borderRadius: 7, }}>
                <Text style={[Styles.whiteMedium12, { color: errorCatalog ? 'red' : 'white' }]}>
                  {selectedCatalog ?
                    selectedCatalogName :
                    t(mainData.lang).Choosecatalog
                  }
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => creatPost()} disabled={createPost.loading || uri.length === 0} >
                <CheckMarkSvg />
              </TouchableOpacity>
            </View>
            <Text style={[Styles.whiteMedium9, { textAlign: 'center', marginTop: 10, zIndex: 99999 }]}>{t(mainData.lang).Yourcontent}</Text>
            <View style={styles.centeredView}>
              <View style={styles.selectImage}>
                <FlatList
                  horizontal
                  pagingEnabled
                  ref={flatListRef}
                  showsHorizontalScrollIndicator={true}
                  decelerationRate="normal"
                  keyExtractor={(item) => item.uri.toString()}
                  data={uri}
                  windowSize={5}
                  onScroll={handleMomentumScrollEnd}
                  initialNumToRender={5}
                  maxToRenderPerBatch={10}
                  renderItem={renderItem}
                  onContentSizeChange={() => {
                    if (enableScrollTo) {
                      flatListRef.current.scrollToIndex({ index: scrollTo, animated: true })
                    }
                  }
                  }
                />
              </View>
              <View style={styles.paginationWrapper}>
                {uri?.length > 1 && uri?.map((elm, i) => (
                  <View key={i} style={[styles.pagination, i === active && { backgroundColor: AppColors.GoldenTainoi_Color, borderRadius: 50 }]}></View>
                ))}
              </View>
              <TouchableOpacity onPress={() => addPhoto(uri, 1)}>
                <AddImage />
              </TouchableOpacity>
            </View>
            <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 30 }}>

                  {getCatalog.data.map((elm, i) => {
                    return <TouchableOpacity onPress={() => {
                      setSelectedCatalog(elm.id)
                      setSelectedCatalogName(elm.name)
                      handlePresentModalClose()
                      setErrorCatalog('')
                    }} key={i}>
                      <Text style={[{ padding: 10, paddingHorizontal: 15 }, Styles.darkMedium13]}>{elm.name}</Text>
                    </TouchableOpacity>
                  })}
                </View>
              </ScrollView>
            </BootomModal>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView >
    );
  else {
    return
  }
};


const styles = StyleSheet.create({
  vidio: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
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
    // backgroundColor: 'red',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    marginTop: 20,
  },
  img: {
    height: 500,
    width: windowWidth,
    borderRadius: 11,
  },
  list: {
    position: 'absolute',
    zIndex: 999,
    bottom: 130,
  },
  input: {
    borderColor: 'red',
    width: '90%',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    bottom: 10,
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
    marginTop: 25
  },
  itemImage: {
    borderWidth: 1,
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    marginRight: 10,
  }
});
