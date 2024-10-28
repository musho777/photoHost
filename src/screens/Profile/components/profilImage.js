import { Image, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { t } from '../../../components/lang';
import { Styles } from '../../../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useRef, useState } from 'react';
import { chnageAvatarAction, UpdateBackroundPhoto } from '../../../store/action/action';
import ImageCropPicker from 'react-native-image-crop-picker';
import { SliderModal } from '../../../components/SliderModal';
import { CheckMarkUserSvg, EditSvg } from '../../../assets/svg/Svgs';
import { BootomModal } from '../../../components/BootomSheet';
import { FlatList, } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { Skeleton } from '../../../components/Skeleton';

const { width } = Dimensions.get('window');

export const ProfilImage = ({ user, changeAvatar, setChangeAvatar, }) => {

  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);
  const [openSlider, setOpenSlider] = useState(false)
  const bottomSheetRef = useRef(null);
  const bottomSheetRef1 = useRef(null);

  const [bg, setBg] = useState("")
  const snapPoints = useMemo(() => ['20%'], []);
  const snapPoints1 = useMemo(() => ['70%',], []);
  const [imageData, setImageData] = useState([])
  const [bgPhoto, setBgPhoto] = useState(user.data.backround_photo)
  const [loadBgImage, setLoadBgImage] = useState(true)

  const GetPhoto = () => {
    let item = [...imageData]
    if (user) {
      user.data.categories.map((elm, i) => {
        elm.photo_array.map((el) => {
          item.push(el)
        })
      })
    }
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




  const renderItem = ({ item, index }) => {
    return <TouchableOpacity activeOpacity={1} onPress={() => {
      bottomSheetRef.current?.close()
      setBgPhoto(item.photo)
      setBg("")
      dispatch(UpdateBackroundPhoto("", staticdata.token, item.photo));
      bottomSheetRef1.current?.close()
    }} style={{ width: '100%', paddingHorizontal: 15 }}>
      <View style={{ marginBottom: 15 }}>
        <Image
          style={styles.bgImage}
          source={{ uri: `https://chambaonline.pro/uploads/${item.photo}`, }}
        />
        <View style={styles.avatarWrapper} activeOpacity={1}>
          <View style={[styles.shadow, styles.avatar]}>
            <Image
              style={styles.img}
              source={{ uri: imgUrl ? imgUrl : `https://chambaonline.pro/uploads/${user.avatar}`, }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>

  }

  return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={() => bottomSheetRef.current?.present()}
        style={styles.editIcon}>
        <EditSvg />
      </TouchableOpacity>
      {loadBgImage &&
        <Skeleton
          width={width - 83}
          height={150}
          style={{ position: "absolute", borderRadius: 10 }}
        />
      }
      <FastImage
        onLoad={() => {
          setLoadBgImage(false)
        }}
        style={[styles.bgImage, loadBgImage && { opacity: 0 }]}
        source={{ uri: bg ? bg : `https://chambaonline.pro/uploads/${bgPhoto}`, }}
      />
      <TouchableOpacity style={styles.avatarWrapper} activeOpacity={1} onPress={() => setChangeAvatar(!changeAvatar)}>
        <View style={[styles.shadow, styles.avatar]}>
          <Image
            style={styles.img}
            source={{ uri: imgUrl ? imgUrl : `https://chambaonline.pro/uploads/${user.avatar}`, }}
          />
        </View>
      </TouchableOpacity>
    </View>





    {changeAvatar &&
      <View style={{ top: 0, position: "absolute", zIndex: 9999 }}>
        <Shadow style={styles.block} startColor={'#00000010'}>
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
        </Shadow>
      </View>
    }
    <View style={{ width: '100%', }}>
      <View style={styles.userData}>
        <View style={[{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }]}>
          <Text style={[Styles.darkMedium16, { textAlign: 'center', marginRight: 7, }]}>{user?.name}
          </Text>
          {
            user.data.star > 0 && <View style={{ marginTop: 3 }}>
              <CheckMarkUserSvg />
            </View>
          }
        </View>
      </View>
      {user.data.description && (
        <Text style={[Styles.darkRegular14, { textAlign: 'center', width: '100%' }]}>{user.description}</Text>
      )}
    </View>
    <SliderModal
      modalVisible={openSlider} photo={[{ photo: user.avatar }]} close={() => setOpenSlider(false)} />



    <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => {
          GetPhoto()
          bottomSheetRef.current?.close()
          setTimeout(() => {
            bottomSheetRef1.current?.present(); // Open the second sheet with a slight delay to ensure proper timing
          }, 300);
        }} style={{ marginBottom: 20, marginTop: 20 }} >
          <Text style={Styles.darkRegular14}>добавить фото</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          changeBg()
          bottomSheetRef.current?.close()
        }} style={{ marginBottom: 20 }}>
          <Text style={Styles.darkRegular14}>добавить фото из телефона</Text>
        </TouchableOpacity>
      </View>
    </BootomModal>

    <BootomModal ref={bottomSheetRef1} snapPoints={snapPoints1}>
      <FlatList
        initialNumToRender={5}
        keyExtractor={(item) => item.id.toString()}
        data={imageData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />

    </BootomModal>

  </View>
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
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
    height: 23
  },
  text: {
    color: "black",
    fontSize: 14,
    fontWeight: '500'
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
  bgImage: {
    objectFit: 'cover',
    width: width - 83,
    height: 150,
    borderRadius: 10,
  },
  avatar: {
    width: 110,
    height: 110,
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
  editIcon: {
    position: 'absolute',
    bottom: 10,
    zIndex: 9999,
    left: 10,
  }
});
