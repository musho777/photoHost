import { Image, StyleSheet, TouchableOpacity, View, Text, Dimensions, BackHandler } from 'react-native'
import { t } from '../../../components/lang';
import { Styles } from '../../../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Api, chnageAvatarAction, UpdateBackroundPhoto } from '../../../store/action/action';
import ImageCropPicker from 'react-native-image-crop-picker';
import { SliderModal } from '../../../components/SliderModal';
import { BootomModal } from '../../../components/BootomSheet';
import { FlatList, } from 'react-native-gesture-handler';
import { BigBgImage } from './bigBgImage';
import { BackArrow } from '../../../assets/svg/Svgs';

const { width } = Dimensions.get('window');

export const ProfilImage = ({ user, changeAvatar, setChangeAvatar, }) => {

  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);
  const [openSlider, setOpenSlider] = useState(false)
  const [openBg, setOpenBg] = useState(false)
  const bottomSheetRef = useRef(null);
  const bottomSheetRef1 = useRef(null);
  const bottomSheetRef2 = useRef(null);
  const bottomSheetRef3 = useRef(null);

  const [showAllPhoto, setShowAllPhoto] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const [seletedName, setSelectedName] = useState('')



  const [bg, setBg] = useState("")
  const snapPoints = useMemo(() => ['20%'], []);
  const snapPoints1 = useMemo(() => ['70%',], []);
  const [imageData, setImageData] = useState([])
  const [mainImageData, setMainImageData] = useState([])
  const [bgPhoto, setBgPhoto] = useState(user.data.backround_photo)

  useEffect(() => {
    const backAction = () => {
      console.log(showPhoto, 'show')
      if (showAllPhoto) {
        bottomSheetRef3.current?.close()

        setTimeout(() => {
          setShowPhoto(true)
          bottomSheetRef1.current?.present();
        }, 300);

        // bottomSheetRef1.current?.present()
        setShowAllPhoto(false)
        return () => backHandler.remove();
      }
      else if (showPhoto) {
        bottomSheetRef3.current?.close()
        bottomSheetRef1.current?.close()
        return () => backHandler.remove();
      }
      else {
        bottomSheetRef.current?.close()
        bottomSheetRef1.current?.close()
        bottomSheetRef2.current?.close()
        bottomSheetRef3.current?.close()
      }



    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [showAllPhoto, showPhoto]);

  const GetPhoto = async () => {
    let item = []
    let itemData = []
    let api = `${Api}/category`
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${staticdata.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    await fetch(api, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          itemData = r.data
          setMainImageData(r.data)

          // console.log(r.data[1])
          // data = r.data
          // r.data.map((elm, i) => {
          //   console.log(elm)
          //   elm.photo_array.map((el, i) => {
          //     console.log(el)
          //     itemData.data.push(el)
          //   })
          // })
        }

      })
      .catch(error => {
      });

    // data?.map((elm, i) => {
    //   elm.photo_array.map((el) => {
    //     item.push(el)
    //   })
    // })
    // itemData.map((elm, i) => {
    //   elm.photo_array.map((el, i) => {
    //     item.push(el)
    //   })
    // })
    // console.log(itemData, 'itemData')
    // setMainImageData(imageData)
    setImageData(item)
  }


  const [imgUrl, setImgUrl] = useState('');
  const dispatch = useDispatch()
  const changeImg = () => {
    ImageCropPicker.openPicker({
      width: 5000,
      height: 5000,
      cropping: false,
      multiple: false
    }).then(image => {
      setImgUrl(image.path);
      if (image.path) {
        setChangeAvatar(false)
        dispatch(chnageAvatarAction(image.path, staticdata.token));
      }
    });
  };

  const changeBg = () => {
    ImageCropPicker.openPicker({
      width: 5000,
      height: 5000,
      cropping: false,
      multiple: false
    }).then(image => {
      bottomSheetRef.current?.close()
      if (image.path) {
        setBg(image.path);
        dispatch(UpdateBackroundPhoto(image.path, staticdata.token));
      }
    })
      .catch((error) => {
        bottomSheetRef.current?.close()
      })
  }

  const DelatePhoto = () => {
    setChangeAvatar(false)
    setImgUrl('')
    dispatch(chnageAvatarAction('', staticdata.token));
  }




  const renderItem = ({ item }) => {
    return <TouchableOpacity activeOpacity={1} onPress={() => {
      bottomSheetRef.current?.close()
      setTimeout(() => {
        bottomSheetRef1.current?.present();
      }, 300);

      setBgPhoto(item.photo)
      setBg("")
      dispatch(UpdateBackroundPhoto("", staticdata.token, item.photo));
      bottomSheetRef1.current?.close()
    }} style={{ width: '100%', paddingHorizontal: 0 }}>
      <View style={{ marginBottom: 15, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={styles.bgImage1}
          source={{ uri: `https://chambaonline.pro/uploads/${item.photo}`, }}
        />
      </View>
    </TouchableOpacity>

  }


  const renderItem1 = ({ item }) => {
    return <TouchableOpacity activeOpacity={1} onPress={() => {
      bottomSheetRef.current?.close()
      setTimeout(() => {
        setShowAllPhoto(true)
        bottomSheetRef3.current?.present()
      }, 300);
      console.log(item)
      setImageData(item.photo_array)
      // setSelectedName(item.)
      // setBgPhoto(item.photo)
      // setBg("")
      // dispatch(UpdateBackroundPhoto("", staticdata.token, item.photo));
      // bottomSheetRef1.current?.close()
      setSelectedName(item.name)
    }} style={{ width: '100%', paddingHorizontal: 0 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[Styles.darkSemiBold14, { marginTop: 5, marginBottom: 2 }]}>{item.name}</Text>
        <Image
          style={styles.bgImage1}
          source={{ uri: `https://chambaonline.pro/uploads/${item.photo_array[0].photo}`, }}
        />
      </View>
    </TouchableOpacity>

  }


  return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <BigBgImage
      setOpenBg={(e) => setOpenBg(!openBg)}
      ref={bottomSheetRef}
      changeAvatar={changeAvatar}
      setChangeAvatar={(e) => bottomSheetRef2?.current?.present()}
      imgUrl={imgUrl}
      bg={bg}
      bgPhoto={bgPhoto}
      user={user}
      openBg={openBg}
    />
    {openSlider &&
      <SliderModal
        modalVisible={openSlider} photo={[{ photo: user.avatar }]} close={() => setOpenSlider(false)} />
    }

    {openBg &&
      <SliderModal
        modalVisible={openBg} photo={[{ photo: bgPhoto }]} close={() => setOpenBg(false)} />
    }



    <BootomModal close={() => setShowAllPhoto(false)} ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => {
          GetPhoto()
          bottomSheetRef.current?.close()
          setTimeout(() => {
            setShowPhoto(true)
            bottomSheetRef1.current?.present();
          }, 300);
        }} style={{ marginBottom: 20, marginTop: 20 }} >
          <Text style={Styles.darkRegular14}>Добавить фото</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          changeBg()
          bottomSheetRef.current?.close()
        }} style={{ marginBottom: 20 }}>
          <Text style={Styles.darkRegular14}>Добавить фото из телефона</Text>
        </TouchableOpacity>
      </View>
    </BootomModal>

    <BootomModal close={() => setShowPhoto(false)} ref={bottomSheetRef1} snapPoints={snapPoints1}>
      <FlatList
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        keyExtractor={(item) => item.id.toString()}
        data={mainImageData}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem1}
      />

    </BootomModal>
    <BootomModal ref={bottomSheetRef3} snapPoints={snapPoints1}>
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef3.current?.close()
          setTimeout(() => {
            setShowPhoto(true)
            bottomSheetRef1.current?.present();
          }, 300);
          setShowAllPhoto(false)
        }}
        style={{ flexDirection: 'row', paddingHorizontal: 15, marginBottom: 20, gap: 10, alignItems: 'center' }}>
        <BackArrow />
        <Text style={Styles.darkSemiBold14}>{seletedName}</Text>
      </TouchableOpacity>
      <FlatList
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        keyExtractor={(item) => item.id.toString()}
        data={imageData}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </BootomModal>
    <BootomModal ref={bottomSheetRef2} snapPoints={snapPoints}>
      <View style={{ gap: 20, paddingHorizontal: 10, }}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => {
          setChangeAvatar(false)
          setOpenSlider(true)
        }}>
          <Image style={styles.icon} source={require('../../../assets/img/user1.png')} />
          <Text style={styles.text}>Открыть фото</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <Image style={styles.icon} source={require('../../../assets/img/edit.png')} />
          <Text style={styles.text} onPress={() => changeImg()}>{t(mainData.lang).ChangePhoto}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => DelatePhoto()}>
          <Image style={styles.icon} source={require('../../../assets/img/delete.png')} />
          <Text style={styles.text}>Удалить фото</Text>
        </TouchableOpacity>
      </View>
    </BootomModal>

  </View >
}

const styles = StyleSheet.create({
  img: {
    width: 110,
    height: 110,
    borderRadius: 50,
  },
  block: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 99999999,
    gap: 13,
  },
  icon: {
    width: 23,
    height: 23,
  },
  text: {
    color: "black",
    fontSize: 14,
    fontWeight: '500',
  },
  iconWrapper: {
    flexDirection: 'row',
    gap: 10,
    width: 150,
    zIndex: 99999,
  },
  userData: {
    marginTop: 10,
    marginBottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  shadow: {
    alignItems: 'center',
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
  },
  bgImage1: {
    objectFit: 'cover',
    width: width - 30,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#c7c7c7'
  },

  avatar: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarWrapper: {
    position: "absolute",
    right: 1,
    top: 0,
    bottom: 0,
    margin: 'auto',
    justifyContent: 'center',
  },
});
