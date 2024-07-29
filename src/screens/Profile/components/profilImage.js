import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { t } from '../../../components/lang';
import { Styles } from '../../../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { chnageAvatarAction } from '../../../store/action/action';
import ImageCropPicker from 'react-native-image-crop-picker';
import { SliderModal } from '../../../components/SliderModal';

export const ProfilImage = ({ user, changeAvatar, setChangeAvatar }) => {

  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);
  const [openSlider, setOpenSlider] = useState(false)

  const [imgUrl, setImgUrl] = useState('');
  const dispatch = useDispatch()
  const changeImg = () => {
    ImageCropPicker.openPicker({
      width: 450,
      height: 450,
      cropping: false,
    }).then(image => {
      setImgUrl(image.path);
      if (image.path) {
        setChangeAvatar(false)
        dispatch(chnageAvatarAction(image.path, staticdata.token));
      }
    });
  };

  const DelatePhoto = () => {
    setChangeAvatar(false)
    setImgUrl('')
    dispatch(chnageAvatarAction('', staticdata.token));
  }


  return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity activeOpacity={1} onPress={() => setChangeAvatar(!changeAvatar)}>
      <Image
        style={styles.img}
        source={{
          uri: imgUrl
            ? imgUrl
            : `https://chambaonline.pro/uploads/${user.avatar}`,
        }}
      />
    </TouchableOpacity>
    {changeAvatar && <View style={{ top: 100, position: "absolute" }}>
      <Shadow
        style={styles.block}
        startColor={'#00000010'}
      >
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
    </View>}
    <View style={styles.userData}>
      <View style={Styles.flexAlignItems}>
        <Text style={[Styles.darkMedium16, { marginRight: 5 }]}>{user?.name}</Text>
        {user.data.star > 0 && <CheckMarkUserSvg />}
      </View>
    </View>
    {user.data.description && (
      <Text style={Styles.darkRegular14}>{user.description}</Text>
    )}
    <SliderModal
      modalVisible={openSlider} photo={[{ photo: user.avatar }]} close={() => setOpenSlider(false)} />
  </View>
}

const styles = StyleSheet.create({
  img: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  block: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 999,
    gap: 13
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
    width: 150
  },
  userData: {
    marginTop: 7,
    marginBottom: 15,
    alignItems: 'center',
    marginLeft: 10
  }
});
