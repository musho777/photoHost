import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetCatalogAction } from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';
import { ClearCreatPost } from '../../store/action/clearAction';
import { AddImage, CloseSvg1, FontFemalySvg, SelectColor, TextSvg, TextSvg2 } from '../../assets/svg/Svgs';
import { Status } from './component/status';
import { AppColors } from '../../styles/AppColors';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Header } from './component/header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import RenderHtml from 'react-native-render-html';
import { HeaderInfo } from '../../components/post/postHeader/component/headerInfro';

const windowWidth = Dimensions.get('window').width;


export const AddImg = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [descriptionColor, setDescriptionColor] = useState("white")
  const [descriptionFontFamily, setDescriptionFontFamily] = useState()

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const ref = useRef()
  const [activeTab, setActiveTab] = useState(1)

  const fontFamily = [
    "Montserrat-Regular",
    "PlaywriteGBS-Regular",
    'RussoOne-Regular',
    'Agdasima-Regular',
    'Caveat-Regular',
    'Comfortaa-Regular',
    'CormorantGaramond-Regular',
    'Jost-Regular',
    'Lobster-Regular',
    'NotoSansHK-Regular',
    'Pacifico-Regular',
    'Tiny5-Regular',
    "AdventPro_Expanded-Regular",
    "Alice-Regular",
    "AmaticSC-Regular",
    "BadScript-Regular",
    "DelaGothicOne-Regular",
    "Geologica_Auto-Regular",
    "PlayfairDisplaySC-Regular",
    "RubikMonoOne-Regular",
    "Unbounded-Regular",
    "YanoneKaffeesatz-Regular",
    "AlegreyaSansSC-Regular",
    "BalsamiqSans-Regular",
    "CormorantInfant-Regular",
    "DaysOne-Regular",
    "MarckScript-Regular",
    "Pattaya-Regular",
    "ProstoOne-Regular",
    "RubikSprayPaint-Regular",
    "SofiaSansExtraCondensed-Regular",


    "RubikPuddles-Regular",
    "RubikPixels-Regular",
    "RubikMicrobe-Regular",
    "RubikMaze-Regular",
    "RubikMaps-Regular",
    "RubikLines-Regular",
    "RubikGemstones-Regular",
    "RubikDoodleTriangles-Regular",
    "RubikDistressed-Regular",
    "RubikBurned-Regular",
    "RubikBrokenFax-Regular",
    "RubikBeastly-Regular",
    "Oi-Regular",
    "AlumniSansCollegiateOne-Regular",
  ]

  const color = [
    { title: '#808080', id: 3 },
    { title: '#FF5733', id: 4 },
    { title: '#1E90FF', id: 6 },
    { title: '#4682B4', id: 7 },
    { title: '#4CAF50', id: 8 },
    { title: '#FFD700', id: 9 },
    { title: '#FF69B4', id: 10 },
    { title: '#800080', id: 11 },
    { title: '#8B0000', id: 12 },

    { title: '#FFA500', id: 13 },
    { title: '#87CEEB', id: 14 },
    { title: '#FF4500', id: 16 },
    { title: '#32CD32', id: 17 },
    { title: '#DA70D6', id: 18 },
    { title: '#708090', id: 19 },
  ]

  const color2 = [

    { title: '#8B0000', id: 12 },

    { title: '#FFA500', id: 13 },
    { title: '#DA70D6', id: 18 },
    { title: '#708090', id: 19 },
    { title: '#FF5733', id: 4 },
    { title: '#1E90FF', id: 6 },
    { title: '#32CD32', id: 17 },
    { title: '#808080', id: 3 },
    { title: '#FF4500', id: 16 },
    { title: '#4682B4', id: 7 },
    { title: '#4CAF50', id: 8 },
    { title: '#87CEEB', id: 14 },

    { title: '#FFD700', id: 9 },
    { title: '#FF69B4', id: 10 },
    { title: '#800080', id: 11 },
  ]

  const color3 = [
    { title: '#FFA500', id: 13 },
    { title: '#DA70D6', id: 18 },
    { title: '#4682B4', id: 7 },
    { title: '#4CAF50', id: 8 },
    { title: '#800080', id: 11 },
    { title: '#FFD700', id: 9 },
    { title: '#FF69B4', id: 10 },
    { title: '#87CEEB', id: 14 },

    { title: '#708090', id: 19 },
    { title: '#FF5733', id: 4 },
    { title: '#8B0000', id: 12 },
    { title: '#1E90FF', id: 6 },
    { title: '#32CD32', id: 17 },
    { title: '#808080', id: 3 },
    { title: '#FF4500', id: 16 },

  ]

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Cleanup listeners on unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const mainData = useSelector(st => st.mainData);
  const [uri, setUri] = useState([]);
  const user = useSelector((st) => st.userData)
  const [description, setDescription] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const createPost = useSelector(st => st.createPost);
  const staticData = useSelector(st => st.static);
  const [selectedCatalog, setSelectedCatalog] = useState([])
  const [active, setActive] = useState(0)
  const flatListRef = useRef(null);

  const [font, setFont] = useState(["", "", "", "", "", "", "", "", "", ""])
  const [activecolor, setActiveColor] = useState(["white", "white", "white", "white", "white", "white", "white", "white"])
  const [begraund, setBegraund] = useState(["", "", "", "", "", "", "", "", "", ""])
  const [fonColor, setFonColor] = useState(["rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)"])


  const [localheight, setLocalHeight] = useState([])

  const [showError, setShowError] = useState(false)

  const [error, setError] = useState('')
  const [first, setFirst] = useState(false)
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(GetCatalogAction(staticData.token))
  }, []);


  useFocusEffect(
    useCallback(() => {
      setFirst(true)
      setError('')
      setShowError(false)
      dispatch(ClearCreatPost())
      setSelectedCatalog([])
      // setUri([])
      // addPhoto([], 0)
      setActive(0)
    }, [])
  );


  useFocusEffect(
    useCallback(() => {
      StatusBar.setTranslucent = true
      StatusBar.setBarStyle('light-content');
      return () => {
        StatusBar.setBarStyle('dark-content');
      };
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
    setFirst(true)

    try {
      ImagePicker.openPicker({
        cropping: false,
        compressImageQuality: 1,
        multiple: true,
        mediaType: "photo",
        videoQuality: "low",
        durationLimit: 60,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      })
        .then((response) => {
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
          else {
            if (response.length) {
              setFirst(true)
            }
            response?.map((elm, i) => {
              if (item.length <= 10) {
                item.push({ uri: elm.path, mime: elm?.type });
              }
            })
            setUri(item);
          }
        })
        .catch((error) => {
        });
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
    if (item.length == 0) {
      addPhoto([], 0)
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

  const changeColor = (e, i) => {
    let item = [...activecolor]
    item[i] = e
    setActiveColor(item)
  }
  const changeFont = (e, i) => {
    let item = [...font]
    item[i] = e
    setFont(item)
  }
  const chnageBegraund = (e, i) => {
    let item = [...begraund]
    item[i] = e
    setBegraund(item)
  }
  const changeFontColor = (e, i) => {
    let item = [...fonColor]
    item[i] = e
    setFonColor(item)
  }

  const handleMomentumScrollEnd = (event) => {
    let index = 0
    if (event.nativeEvent.layoutMeasurement.width == 0) {
      index = 0
    }
    else {
      index = Math.floor(
        Math.floor(event.nativeEvent.contentOffset.x) /
        Math.floor(event.nativeEvent.layoutMeasurement.width)
      );
    }
    setActive(index);
  };

  const Close = () => {
    setFirst(false)
    setUri([])
  }
  const renderItem = ({ item, index }) => {
    function canParseJSON(jsonString) {
      try {
        JSON.parse(jsonString);
        return <Text style={[Styles.whiteSemiBold14, { color: JSON.parse(jsonString)?.color?.title ? JSON.parse(jsonString)?.color?.title : "black", fontFamily: JSON.parse(jsonString)?.font, marginTop: -2 }]}>{JSON.parse(jsonString).name}</Text>
      } catch (error) {
        return <Text style={[Styles.whiteSemiBold14, { marginTop: -2 }]}>{jsonString}</Text>
      }
    }
    return <View>
      <View keyboardShouldPersistTaps='handled' style={(localheight[index]?.height - localheight[index]?.width) / 3 - 140 > 0 ? { maxHeight: 545 } : { maxHeight: 310 }}>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.hover} >
            <TouchableOpacity
              activeOpacity={1}
              style={[Styles.flexAlignItems]}>
              <View>
                <Image style={styles.userImg}
                  source={{ uri: `https://chambaonline.pro/uploads/${user.avatar}` }} />
              </View>
              <View style={styles.nameBlock}>
                <View style={[Styles.flexAlignItems, { width: '100%', gap: 8 }]}>
                  {canParseJSON(user?.name)}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <FastImage
            style={[styles.img, (localheight[index]?.height - localheight[index]?.width) / 3 - 100 > 0 ? { maxHeight: 545 } : { maxHeight: 310 }]}
            source={{ uri: item.uri }}
            onLoad={(event) => {
              const { width, height } = event.nativeEvent;
              let item = [...localheight]
              item.push({ width: width, height: height })
              setLocalHeight(item)
            }}
          />
        </TouchableOpacity>
        {description[active]?.length > 0 &&
          <View
            style={{ position: 'absolute', top: 60, left: 10, paddingVertical: 5, backgroundColor: fonColor[active], borderRadius: 10, paddingHorizontal: 10, marginRight: 59 }}>
            <Text style={{ color: activecolor[active], fontFamily: font[active], backgroundColor: begraund[active] }}>
              {description[active]}
            </Text>
          </View>
        }
        <TouchableOpacity onPress={() => { delateFoto(index) }} style={{ position: 'absolute', top: 60, right: 10 }}>
          <CloseSvg1 />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', top: 100, right: 10 }} onPress={() => addPhoto(uri, 1)}>
          <AddImage />
        </TouchableOpacity>
      </View>
    </View >
  }


  if (first)
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: 'black' }}
      >
        <ScrollView style={[{ backgroundColor: 'black' }, insets.top ? { paddingTop: insets.top } : Styles.statusBar]}>
          <Status setShowError={(e) => setShowError(e)} showError={showError} error={error} />
          <Header
            uri={uri}
            selectedCatalog={selectedCatalog}
            description={description}
            color={JSON.stringify(activecolor)}
            background={JSON.stringify(begraund)}
            font_family={JSON.stringify(font)}
            setSelectedCatalog={(e) => setSelectedCatalog(e)}
            error={error}
            setFirst={(e) => setFirst(e)}
            Close={() => Close()}
            cveta={JSON.stringify(fonColor)}
          />
          <Text style={[Styles.whiteMedium9, { textAlign: 'center', marginTop: 10, zIndex: 99999, color: '#FFC24B', borderWidth: 1, borderColor: 'white', paddingHorizontal: 5 }]}>{t(mainData.lang).Yourcontent}</Text>
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
            {uri?.length > 1 && <View style={styles.paginationWrapper}>
              {uri?.length > 1 && uri?.map((elm, i) => (
                <View key={i} style={[styles.pagination, i === active && { backgroundColor: AppColors.GoldenTainoi_Color, borderRadius: 50 }]}></View>
              ))}
            </View>}
          </View>
        </ScrollView >
        <Text style={[Styles.whiteMedium9, { textAlign: 'center', marginTop: 10, zIndex: 99999, color: '#FFC24B' }]}>Подчеркни описание к публикации особенным шрифтом и цветом.</Text>
        <View style={{ width: '100%', marginBottom: 20 }}>
          {activeTab == 1 && <View style={{ height: 60, width: '100%' }}>
            <TextInput
              style={styles.input}
              placeholder={t(mainData.lang).adddescription}
              placeholderTextColor={"black"}
              value={description[active]}
              onChangeText={e => addDescription(e, active)}
            />
          </View>}
          {activeTab == 2 && <View >
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
              {fontFamily.map((elm, i) => {
                return <Text onPress={() => changeFont(elm, active)} key={i} style={[Styles.darkMedium12, { color: 'white', fontFamily: elm }]}>{elm}</Text>
              })}
            </ScrollView>
          </View>}
          {activeTab == 3 && <View >
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
              {color.map((elm, i) => {
                return <TouchableOpacity onPress={() => changeColor(elm.title, active)} key={i} style={{ width: 20, height: 20, borderRadius: 30, backgroundColor: elm.title }} />
              })}
            </ScrollView>
          </View>}
          {/* {activeTab == 4 && <View >
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
              {color2.map((elm, i) => {
                return <TouchableOpacity onPress={() => chnageBegraund(elm.title, active)} key={i} style={{ width: 20, height: 20, borderRadius: 30, backgroundColor: elm.title }} />
              })}
            </ScrollView>
          </View>} */}
          {activeTab == 5 && <View >
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => changeFontColor("rgba(0,0,0,0.5)", active)}>
                <Text style={{ color: 'white', fontSize: 16 }}>X</Text>
              </TouchableOpacity>
              {color3.map((elm, i) => {
                return <TouchableOpacity onPress={() => changeFontColor(elm.title, active)} key={i} style={{ width: 20, height: 20, borderRadius: 30, backgroundColor: elm.title }} />
              })}
            </ScrollView>
          </View>}

          <View horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, gap: 10, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setActiveTab(1)} style={[styles.editItem, activeTab == 1 && { backgroundColor: "#FFC24B" }]}>
                <TextSvg2 />
                <Text style={styles.textStyle}>Текст</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab(2)} style={[styles.editItem, activeTab == 2 && { backgroundColor: "#FFC24B" }]}>
                <View style={{ width: 30, alignItems: 'center' }}>
                  <FontFemalySvg />
                </View>
                <Text style={styles.textStyle}>Шрифт</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab(3)} style={[styles.editItem, activeTab == 3 && { backgroundColor: "#FFC24B" }]}>
                <SelectColor />
                <Text style={styles.textStyle}>Цвет</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setActiveTab(4)} style={[styles.editItem, activeTab == 4 && { backgroundColor: "#FFC24B" }]}>
                <SelectColor />
                <Text style={[styles.textStyle]}>Подч.</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => setActiveTab(5)} style={[styles.editItem, activeTab == 5 && { backgroundColor: "#FFC24B" }]}>
                <SelectColor />
                <Text style={styles.textStyle}>Фон</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView >
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
    position: 'absolute',
    bottom: 20,
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'black',
    // height: '100%',
    height: 550,
    borderColor: 'red'
  },
  editItem: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    borderRadius: 10,
  },
  img: {
    height: 550,
    width: windowWidth,
    borderRadius: 11,
  },
  Vidio: {
    height: 550,
    width: windowWidth,
    borderRadius: 11,
  },
  textStyle: {
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
    marginBottom: 3
  },
  input: {
    borderColor: 'red',
    width: '100%',
    height: 40,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    backgroundColor: 'rgba(225,225,225,1)',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 12,
    color: 'black'
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
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    fontSize: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hover: {
    padding: 5,
    paddingLeft: 7,
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.2)",
    position: 'absolute',
    zIndex: 999999,
    height: 50,
  },
  userImg: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
});
