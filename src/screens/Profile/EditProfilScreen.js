import {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {EditAvaterSvg} from '../../assets/svg/Svgs';
import {AppColors} from '../../styles/AppColors';
import {Styles} from '../../styles/Styles';
import React, {useEffect} from 'react';
import {HeaderWhiteTitle} from '../../headers/HeaderWhiteTitle.';
import {chnageAvatarAction, chnageUserProfil} from '../../store/action/action';
import {ClearChangeAvatar, ClearChangeProfile} from '../../store/action/clearAction';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

export const EditProfilScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const [error, setError] = useState('');
  const user = useSelector(st => st.userData);
  const staticdata = useSelector(st => st.static);
  const changeProfil = useSelector(st => st.changeUserProfil);
  const changeAvatar =useSelector(st => st.changeAvatar);
  const [imgUrl, setImgUrl] = useState('');
  const [imgFile, setImgFile] = useState();
  useEffect(() => {
    if (!name) {
      setUsername(user.username);
      setName(user.name);
      setDiscription(user.description);
    }
  }, [user]);
  const changeImg = () => {
    ImagePicker.openPicker({
      width: 80,
      height: 80,
      cropping: true,
    }).then(image => {
      setImgUrl(image.path);
      setImgFile(image);
    });
  };
  const dispatch = useDispatch();
  const chnageProfil = () => {
    let send = true
    if (username === user.data.nickname &&name === user.data.name &&imgUrl === '') {
      navigation.goBack();
    }
    if(username === user.data.nickname &&name === user.data.name){
      send = false
    }
    if (username === '') {
      setError('Введите корректный  ФИО/Название канала');
    } else if (name === '') {
      setError('Введите корректный  имя');
    } else {
      setError('');
    }
    if (error === '' && send) {
      dispatch(
        chnageUserProfil(
          {
            name: name,
            nickname: username,
            description: discription,
          },
          staticdata.token,
        ),
      );
    }
    if (imgUrl) {
      dispatch(chnageAvatarAction(imgUrl, staticdata.token));
    }
  };
  useEffect(() => {
    if (changeProfil.status||changeAvatar.status) {
      navigation.navigate('ProfileScreen');
      dispatch(ClearChangeProfile());
      dispatch(ClearChangeAvatar())
    }
  }, [changeProfil.status,changeAvatar.status]);
  return (
    <View>
      <HeaderWhiteTitle
        loading={changeProfil.loading||changeAvatar.loading}
        onCheck={() => chnageProfil()}
        check
        onPress={() => navigation.goBack()}
        title={'Редактировать профиль'}
      />
      <View style={{alignItems: 'center', marginVertical: 40}}>
        <View style>
          <Image
            style={styles.img}
            source={{
              uri: imgUrl
                ? imgUrl
                : `https://chamba.justcode.am/uploads/${user.data.avatar}`,
            }}
          />

          <TouchableOpacity onPress={() => changeImg()} style={styles.edit}>
            <EditAvaterSvg />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textWrapper}>
        <TextInput
          value={username}
          onChangeText={e => setUsername(e)}
          style={Styles.darkMedium14}
        />
      </View>
      <View style={styles.textWrapper}>
        <TextInput
          value={name}
          onChangeText={e => setName(e)}
          style={Styles.darkMedium14}
        />
      </View>
      <View style={styles.textWrapper}>
        <TextInput
          placeholder="Описание"
          placeholderTextColor={'#8C9CAB'}
          value={discription}
          onChangeText={e => setDiscription(e)}
          style={Styles.balihaiMedium14}
        />
      </View>
      {/* <View style = {styles.textWrapper}>
          <TextInput  placeholder='Описание' placeholderTextColor={'#8C9CAB'} value={contact.value} onChange = {(e)=>setContact({...contact,value:e})} style = {Styles.balihaiMedium14}></TextInput>
        </View> */}
      <Text
        style={[[Styles.tomatoMedium10, {textAlign: 'center', marginTop: 10}]]}>
        {error||changeProfil.error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  imgWrapper: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  edit: {
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
  },
});
