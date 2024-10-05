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

const windowWidth = Dimensions.get('window').width;


export const AddImg = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [uri, setUri] = useState([]);
  const [description, setDescription] = useState([]);
  const createPost = useSelector(st => st.createPost);
  const staticData = useSelector(st => st.static);
  const [musicFromVidio, setMusicFromVidio] = useState('')
  const [selectedCatalog, setSelectedCatalog] = useState('')
  const [selectedCatalogName, setSelectedCatalogName] = useState('')
  const getCatalog = useSelector((st) => st.getCatalog)
  const videoRefCut = useRef(null);
  const videoRefCut1 = useRef(null);
  const videoRefCut2 = useRef(null);
  const videoRefCut3 = useRef(null);
  const videoRefCut4 = useRef(null);
  const videoRefCut5 = useRef(null);
  const videoRefCut6 = useRef(null);
  const videoRefCut7 = useRef(null);
  const videoRefCut8 = useRef(null);
  const videoRefCut9 = useRef(null);
  const videoRefCut10 = useRef(null);
  const [loading, setLoading] = useState(false)


  const [showError, setShowError] = useState(false)



  const ref = [videoRefCut, videoRefCut1, videoRefCut2, videoRefCut3, videoRefCut4, videoRefCut5, videoRefCut6, videoRefCut7, videoRefCut8, videoRefCut9, videoRefCut10]

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], [],);

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const [selectedImage, setSelectedImage] = useState()

  const [activePhoto, setActivePhoto] = useState(0)
  const [screenshotUri, setScreenshotUri] = useState([]);
  const [errorCatalog, setErrorCatalog] = useState(false)
  const [error, setError] = useState('')
  const [first, setFirst] = useState(false)
  const dispatch = useDispatch();


  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
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



  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      addPhoto()
    });

    return unsubscribe;
  }, [navigation]);

  const Camera = async () => {
    const cameraPermission = Platform.OS === 'android' && PERMISSIONS.ANDROID.CAMERA
    const photoLibraryPermission = Platform.OS === 'android' && PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    setUri([])
    setDescription('')
    const cameraPermissionStatus = await check(cameraPermission);
    const photoLibraryPermissionStatus = await check(photoLibraryPermission);
    if (cameraPermissionStatus !== RESULTS.GRANTED && photoLibraryPermissionStatus !== RESULTS.GRANTED) {
      request(cameraPermission);
      request(photoLibraryPermission);
    }
  }

  useEffect(() => {
    dispatch(GetCatalogAction(staticData.token))
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setError('')
      setShowError(false)
      Camera()
      setErrorCatalog(false)
      dispatch(ClearCreatPost())
      setSelectedCatalog('')
      setSelectedCatalogName('')
      setSelectedImage()
      setUri([])
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (createPost.status) {
      dispatch(ClearCreatPost())
      setUri([])
      setDescription('')
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
    musicFromVidio && form.append('music_name', musicFromVidio)
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


  const addPhoto = () => {
    setFirst(true)
    ImagePicker.openPicker({
      mediaType: "any",
      compressVideo: true,
      width: 720,
      height: 1280,
      multiple: true,
    }).then(response => {
      let item = [...uri]
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
              // setTimeout(() => {
              //   captureScreenshot(ref[i])
              // }, 2000)
            }
            else {
              setError('видео должен быть меньше чем 60 с')
              setShowError(true)
            }
          }
          else {
            if (item.length <= 10)
              item.push({ uri: elm.path });
          }
        })
        setUri(item);
      }
    });
  }

  console.log(uri, 'uri')


  const delateFoto = index => {
    let item = [...uri];
    let temp = [...description]
    temp.splice(index, 1);
    item.splice(index, 1);
    console.log(activePhoto == index, '222')
    if (activePhoto == index) {
      if (index != 0) {
        setActivePhoto(index - 1)
      }
      else if (index == 0 && item.length >= 1) {
        setActivePhoto(0)
      }
      else if (index == 0 && !item.length) {
        setActivePhoto(0)
      }
      else {
        setActivePhoto(0)
      }
    }
    else if (activePhoto >= index) {
      setActivePhoto(activePhoto - 1)
    }
    setUri(item);
    setDescription(temp)
  }

  useEffect(() => {
    let count = 0
    uri.map((elm, i) => {
      if (elm.uri.includes('.mov') || elm.uri.includes('.mp4')) {
        count = count + 1
      }
    })
    if (uri.length > 0) {
      setSelectedImage(uri[0].uri)
    }
    else if (uri.length == 0) {
      setSelectedImage()
    }

  }, [uri])

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
    setSelectedImage()
    setUri([])
    setFirst(false)
    navigation.goBack()
  }


  if (first)
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          <Status setShowError={(e) => setShowError(e)} showError={showError} error={error} />
          <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
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
              {selectedImage && <View style={styles.selectImage}>
                {/* {(!selectedImage.includes('mp4') && !selectedImage.includes('mov')) ?  */}
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
                  source={{ uri: selectedImage }}
                />
                {/* <Video
                    source={{ uri: selectedImage }}
                    style={[styles.img]}
                    resizeMode="cover"
                    volume={0}
                  /> */}
                {/* } */}
              </View>}
              <ScrollView showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled" horizontal={true} style={[styles.list, keyboardOpen && { marginBottom: 30 }]}>
                {uri.length < 10 && < TouchableOpacity style={[styles.itemImage]} onPress={() => addPhoto()}>
                  <AddImage />
                </TouchableOpacity>}
                {uri.map((elm, i) => {
                  return <TouchableOpacity o style={[{ position: 'relative' }, (i == uri.length - 1) && { marginRight: 40 }]} activeOpacity={1} key={i} onPress={() => {
                    setSelectedImage(elm.uri)
                    setActivePhoto(i)
                  }
                  }>
                    <TouchableOpacity
                      onPress={() => delateFoto(i)}
                      style={styles.close}>
                      <CloseSvg1 smole />
                    </TouchableOpacity>
                    {/* {(elm.uri.includes('mp4') || elm.uri.includes('mov')) ? */}
                    {/* <View>
                        <Video
                          source={{ uri: elm.uri }}
                          style={[styles.vidio, { marginLeft: i == 0 ? 0 : 10, }, activePhoto == i && { borderWidth: 3, borderColor: 'green' }]}
                          resizeMode="cover"
                          paused={false}
                          volume={0}
                        />
                      </View> : */}
                    <Image
                      style={[{ width: 80, height: 80, borderRadius: 10, marginLeft: i == 0 ? 0 : 10, }, activePhoto == i && { borderWidth: 3, borderColor: 'green' }]}
                      source={{ uri: elm.uri }}
                    />
                    {/* } */}
                  </TouchableOpacity>
                })}
              </ScrollView>

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                placeholderTextColor="white"
                placeholder={t(mainData.lang).adddescription}
                style={[styles.input, { marginBottom: (!keyboardOpen && Platform.OS == "android") ? 0 : 50, zIndex: 999 }]}
                value={description[activePhoto]}
                multiline
                onChangeText={(e) => addDescription(e, activePhoto)}
              />
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
          </TouchableOpacity>
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
  close: {
    position: 'absolute',
    top: 0,
    right: 2,
    zIndex: 9999,
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
    bottom: 90,
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
