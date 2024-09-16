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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { CreatePostLocal, CreatPostAction, GetCatalogAction } from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { t } from '../../components/lang';
import { captureRef } from 'react-native-view-shot';
import { ScrollView } from 'react-native-gesture-handler';
import { ClearCreatPost } from '../../store/action/clearAction';
import { AddImage, CheckMarkSvg, CloseSvg1 } from '../../assets/svg/Svgs';
import { BootomModal } from '../../components/BootomSheet';

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
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], [],);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const [selectedImage, setSelectedImage] = useState()
  const [height, setHeight] = useState(500)

  const [activePhoto, setActivePhoto] = useState(0)
  const [screenshotUri, setScreenshotUri] = useState([]);
  const [errorCatalog, setErrorCatalog] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch();


  const captureScreenshot = async (ref) => {
    try {
      const uri = await captureRef(ref, {
        format: 'jpg',
        quality: 1,
      });
      let item = [...screenshotUri]
      item.push(uri)
      setScreenshotUri(item);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };


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
      Camera()
      setErrorCatalog(false)
      dispatch(ClearCreatPost())
      setSelectedCatalog('')
      addPhoto()
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
    setErrorCatalog(false)
    let form = new FormData();
    uri.length &&
      uri.forEach((el, i) => {
        let index = 0
        if (el.uri.includes('.mp4') || el.uri.includes('mov')) {
          index = index + 1
        }
        (!el.uri.includes('.mp4') && !el.uri.includes('mov')) ?
          form.append('photos[]', {
            uri: el.uri,
            type: 'image/jpg',
            name: 'photo.jpg',
          }) : (
            form.append(`video[${index}][video]`, {
              uri: el.uri,
              type: 'video/mp4',
              name: 'Seconds Countdown 🎵⚡.mp4',
            }),
            form.append(`video[${index}][photo]`, {
              uri: screenshotUri[i],
              type: 'image/jpeg',
              name: '1.06.24 577x325.jpg',
            })
          )
      });
    description && form.append('description', JSON.stringify(description));
    form.append('category_id', selectedCatalog)
    musicFromVidio && form.append('music_name', musicFromVidio)
    if (selectedCatalog != '' && error == '') {
      dispatch(CreatePostLocal(uri[0]))
      navigation.navigate('Home');
      dispatch(CreatPostAction(form, staticData.token));
    }
    else if (selectedCatalog == '') {
      setErrorCatalog(true)
    }
  };

  const addPhoto = () => {
    setError('')
    const options = {
      mediaType: 'mixed',
      quality: 1,
      maxWidth: 5000,
      maxHeight: 5000,
      selectionLimit: 10,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options, (response) => {
      let item = [...uri]
      if (!response.didCancel && !response.error) {
        response.assets?.map((elm, i) => {
          if (elm?.type.startsWith('video')) {
            if (elm.duration <= 60) {
              item.push({ uri: elm.uri })
              setTimeout(() => {
                captureScreenshot(videoRefCut)
              }, 2000)
            }
            else {
              setError('видео должен быть меньше чем 60 с')
            }
          }
          else {
            if (item.length <= 10)
              item.push({ uri: elm.uri });
          }
        })
        setUri(item);
      }
    });
  }


  const delateFoto = index => {
    let item = [...uri];
    item.splice(index, 1);
    setUri(item);
  }

  useEffect(() => {
    let item = false
    uri.map((elm, i) => {
      if (elm.uri.includes('.mov') || elm.uri.includes('.mp4')) {
        item = true
      }
    })
    if (item && uri.length != 1) {
      setError("пост должен содержать только один видео")
    }
    else {
      setError("")
    }
    if (uri.length > 0) {
      const imageUrl = uri[0].uri
      if (imageUrl.includes('jpg'))
        Image?.getSize(
          imageUrl,
          (width, height) => {
            let height2 = (windowWidth * height) / width
            setHeight(height2)
          },
          (error) => {
            console.error('Error getting image size:', error);
          }
        );
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
    Camera()
    setErrorCatalog(false)
    dispatch(ClearCreatPost())
    setSelectedCatalog('')
    setSelectedCatalogName('')
    setSelectedImage()
    setUri([])
    navigation.goBack()
  }




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
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
        <View style={styles.centeredView}>
          {selectedImage ? <View style={{ height: 'auto', width: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            {(!selectedImage.includes('mp4') && !selectedImage.includes('mov')) ? <Image
              onLoad={(event) => {
                const { width, height } = event.nativeEvent.source;
                let height2 = (windowWidth * height) / width
                setHeight(height2)
              }}
              style={[styles.img, { height: height }]}
              source={{ uri: selectedImage }}
            /> :
              <Video
                source={{ uri: selectedImage }}
                style={[styles.img, { height: height }]}
                resizeMode="cover"
                paused={false}
                volume={0}
              />
            }
          </View> :
            <TouchableOpacity onPress={() => addPhoto()}>
              <AddImage />
            </TouchableOpacity>
          }
          <TextInput
            placeholderTextColor="white"
            placeholder={t(mainData.lang).adddescription}
            style={styles.input}
            value={description[activePhoto]}
            multiline
            onChangeText={(e) => addDescription(e, activePhoto)}
          />
          <ScrollView horizontal={true} style={styles.list}>
            {uri.map((elm, i) => {
              return <TouchableOpacity o style={{ position: 'relative' }} activeOpacity={1} key={i} onPress={() => {
                setSelectedImage(elm.uri)
                setActivePhoto(i)
              }
              }>
                <TouchableOpacity
                  onPress={() => delateFoto(i)}
                  style={styles.close}>
                  <CloseSvg1 smole />
                </TouchableOpacity>
                {(elm.uri.includes('mp4') || elm.uri.includes('mov')) ?
                  <Video
                    source={{ uri: elm.uri }}
                    style={[styles.vidio, { opacity: 1 }]}
                    resizeMode="cover"
                    paused={false}
                    volume={0}
                    ref={videoRefCut}
                  /> :
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 10, marginLeft: i == 0 ? 0 : 10, }}
                    source={{ uri: screenshotUri[i] ? screenshotUri[i] : elm.uri }}
                  />
                }
              </TouchableOpacity>
            })}
          </ScrollView>
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  vidio: {
    height: 80,
    width: 80,
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
    marginTop: 30,
  },
  img: {
    height: 500,
    width: '100%',
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
  }
});
