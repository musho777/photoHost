import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { CreatPostAction, GetCatalogAction } from '../../store/action/action';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { Button } from '../../ui/Button';
import { t } from '../../components/lang';
import { captureRef } from 'react-native-view-shot';
import { MultySelect } from '../../components/multySelect';


export const AddImg = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [uri, setUri] = useState([]);
  const [description, setDescription] = useState('');
  const createPost = useSelector(st => st.createPost);
  const staticData = useSelector(st => st.static);


  const [selectedCatalog, setSelectedCatalog] = useState('')
  const getCatalog = useSelector((st) => st.getCatalog)
  const videoRef = useRef(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const videoRef5 = useRef(null);
  const ref = [videoRef, videoRef1, videoRef2, videoRef3, videoRef4, videoRef5]
  const [screenshotUri, setScreenshotUri] = useState([]);
  const [errorCatalog, setErrorCatalog] = useState(false)

  const captureScreenshot = async (ref) => {
    try {
      const uri = await captureRef(ref, {
        format: 'jpg',
        quality: 0.8,
      });
      let item = [...screenshotUri]
      item.push(uri)
      setScreenshotUri(item);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };


  const [error, setError] = useState('')

  const dispatch = useDispatch();


  const onEnd = () => {
    if (videoRef.current) {
      videoRef.current.seek(0);
      videoRef.current.play();
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
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (createPost.status) {
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
    console.log(selectedCatalog)
    if (selectedCatalog != '') {
      setErrorCatalog(true)
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
      // durationLimit: 5,
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
          if (selectedVideo.duration <= 20) {
            const source = { uri: response.assets[0].uri };
            if (response.type && response.type.startsWith('video')) {
              item = item.concat(source)
            } else {
              item = item.concat(source);
            }
            setUri(item);
            setTimeout(() => {
              captureScreenshot(ref[uri.length])
            }, 2000)
          }
          else {
            setError('видео должен быть меньше чем 20 с')
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
  };


  return (
    <View>
      <HeaderWhiteTitle
        loading={createPost.loading}
        onCheck={() => creatPost()}
        check
        onPress={() => {
          navigation.navigate('Home')
        }}
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
      <View style={styles.wrapper}>
        {uri?.length > 0 && uri?.map((elm, i) => {
          return (
            <View key={i} style={styles.imgWrapper}>
              {!elm.uri.includes('.mov') ?

                <Image
                  ref={ref[i]}
                  style={styles.img}
                  source={{ uri: elm.uri }}
                /> :
                <Video
                  source={{ uri: elm.uri }}
                  style={styles.img}
                  controls={true}
                  resizeMode="cover"
                  onEnd={onEnd}
                  ref={videoRef}
                />
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
      {screenshotUri.map((elm, i) => {
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: elm }}
            style={{ width: 200, height: 150, marginTop: 20 }}
          />
        </View>
      })}


      <Text style={{ padding: 1, color: 'red' }}>{error}</Text>

      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        {uri.length < 6 &&
          <Button onPress={() => addPhoto()} title={t(mainData.lang).Addphoto} />
        }
      </View>
      <View style={{ height: 60, marginHorizontal: 10 }}>
        <MultySelect name={t(mainData.lang).Choosecatalog} selectedValue={(e) => setSelectedCatalog(e)} data={getCatalog.data} />
      </View>
      {errorCatalog &&
        <Text style={[{ marginHorizontal: 10, marginBottom: 5 }, Styles.tomatoMedium10]}>{t(mainData.Data).selectacategory}</Text>
      }
      <Text style={[{ marginHorizontal: 10 }, Styles.balihaiMedium10]}>{t(mainData.Data).Yourcontent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {
    height: 150,
    width: '31%',
    margin: '1%',
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
    marginHorizontal: 8,
  },
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
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
