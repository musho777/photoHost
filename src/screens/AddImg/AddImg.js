import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { CreatPostAction, GetCatalogAction } from '../../store/action/action';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { Button } from './components/button';
import { t } from '../../components/lang';
import { captureRef } from 'react-native-view-shot';
import { MultySelect } from '../../components/multySelect';
import { ScrollView } from 'react-native-gesture-handler';
import { ClearCreatPost } from '../../store/action/clearAction';
import { opacity } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;

export const AddImg = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [uri, setUri] = useState([]);
  const [description, setDescription] = useState('');
  const createPost = useSelector(st => st.createPost);
  const staticData = useSelector(st => st.static);
  const [vidio, setVidio] = useState('')
  const [musicFromVidio, setMusicFromVidio] = useState('')
  const [selectedCatalog, setSelectedCatalog] = useState('')
  const getCatalog = useSelector((st) => st.getCatalog)
  const videoRef = useRef(null);
  const videoRefCut = useRef(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const videoRef5 = useRef(null);
  const videoRef6 = useRef(null);
  const videoRef7 = useRef(null);
  const videoRef8 = useRef(null);
  const videoRef9 = useRef(null);
  const videoRef10 = useRef(null);

  const ref = [videoRef, videoRef1, videoRef2, videoRef3, videoRef4, videoRef5, videoRef6, videoRef7, videoRef8, videoRef9, videoRef10]
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
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (createPost.status) {
      dispatch(ClearCreatPost())
      setUri([])
      setDescription('')
      navigation.navigate('Home');
    }
  }, [createPost.status]);

  const creatPost = () => {
    setErrorCatalog(false)
    let form = new FormData();
    uri.length &&
      uri.forEach((el, i) => {
        let index = 0
        if (el.uri.includes('.mp4')) {
          index = index + 1
        }
        !el.uri.includes('.mp4') ?
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
    description && form.append('description', description);
    form.append('category_id', selectedCatalog)
    musicFromVidio && form.append('music_name', musicFromVidio)
    if (selectedCatalog != '') {
      dispatch(CreatPostAction(form, staticData.token));
    }
    else {
      setErrorCatalog(true)
    }
  };

  const addPhoto = () => {
    setError('')
    const options = {
      mediaType: 'mixed',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options, (response) => {
      let item = [...uri]
      if (response.didCancel) { }
      else if (response.error) {
      } else {
        const selectedVideo = response.assets[0];
        if (response.assets[0].type && response.assets[0].type.startsWith('video')) {
          setVidio(true)
          if (selectedVideo.duration <= 60) {
            const source = { uri: response.assets[0].uri };
            if (response.type && response.type.startsWith('video')) {
              item = item.concat(source)
            } else {
              item = item.concat(source);
            }
            setUri(item);
            setTimeout(() => {
              captureScreenshot(videoRefCut)
            }, 2000)
          }
          else {
            setError('видео должен быть меньше чем 60 с')
          }
        }
        else {
          const source = { uri: response.assets[0].uri };
          item = item.concat(source);
          setUri(item);
        }
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
    if (item) {
      setVidio(true)
    }
    else {
      setVidio(false)
    }
  }, [uri])

  return (
    <ScrollView>
      <HeaderWhiteTitle
        loading={createPost.loading}
        onCheck={() => creatPost()}
        check
        onPress={() => { navigation.navigate('Home') }}
        disabled={uri.length === 0}
        title={t(mainData.lang).Newpublication}
      />
      <View style={styles.textWrapper}>
        <TextInput
          value={description}
          onChangeText={e => setDescription(e)}
          style={Styles.darkMedium14}
          placeholder={t(mainData.lang).adddescription}
          placeholderTextColor={'#8C9CAB'}
        />
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <View style={styles.wrapper}>
          {uri?.length > 0 && uri?.map((elm, i) => {
            return (
              <View key={i} style={styles.imgWrapper}>
                {(!elm.uri.includes('.mov') && !elm.uri.includes('.mp4')) ?
                  <Image
                    ref={ref[i]}
                    style={styles.img}
                    source={{ uri: elm.uri }}
                  /> :
                  <View>
                    {/* <Video
                      source={{ uri: elm.uri }}
                      style={styles.img}
                      resizeMode="cover"
                      ref={videoRef}
                      paused={true}
                    /> */}
                    <Image
                      ref={ref[i]}
                      style={styles.img}
                      source={{ uri: elm.uri }}
                    />

                    <Video
                      source={{ uri: elm.uri }}
                      style={[styles.img, { opacity: 0 }]}
                      resizeMode="cover"
                      ref={videoRefCut}
                    />
                  </View>
                }
                <TouchableOpacity
                  onPress={() => delateFoto(i)}
                  style={styles.close}>
                  <Text style={{ color: '#cccccc', fontSize: 14, marginTop: -4 }}>x</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {error && <Text style={{ padding: 1, color: 'red' }}>{error}</Text>}
        <View style={{ marginVertical: 15, width: 233, flexDirection: 'row', alignItems: 'center' }}>
          {uri.length < 4 &&
            <Button onPress={() => addPhoto()} title={t(mainData.lang).Addphoto} />
          }
          <Text style={[Styles.balihaiMedium8, { paddingHorizontal: 4, marginTop: 3, textAlign: 'right' }]}>(не более 1-ой минуты)</Text>
        </View>
        {vidio && <View style={styles.textWrapper1}>
          <TextInput
            value={musicFromVidio}
            onChangeText={e => setMusicFromVidio(e)}
            style={Styles.balihaiMedium10}
            placeholder={t(mainData.lang).Musicfromthevideo}
            placeholderTextColor={'#8C9CAB'}
          />
        </View>}
        <View style={{ height: 60 }}>
          <MultySelect name={t(mainData.lang).Choosecatalog} selectedValue={(e) => setSelectedCatalog(e)} data={getCatalog.data} />
        </View>
        {errorCatalog &&
          <Text style={[{ marginBottom: 5 }, Styles.tomatoMedium10]}>{t(mainData.lang).Selectacategory}</Text>
        }
        <Text style={[{ width: 270 }, Styles.balihaiMedium8]}>{t(mainData.lang).Yourcontent}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {
    height: 150,
    width: '31%',
    position: 'relative',
    marginTop: 20,
  },
  img: {
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
  },
  textWrapper1: {
    paddingHorizontal: 15,
    borderColor: '#d1d3d3',
    borderWidth: 1,
    marginBottom: 10,
    width: 265,
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  addImgButton: {
    width: '22%',
    height: 85,
    borderWidth: 1
  }
});
