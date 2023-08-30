import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CakeSvg, DownArrow, EditAvaterSvg, EmailSvg, GenderSvg, LocationSvg, NetWorkSvg, PhoneSvg, ProfetionsSvg, WorkLocation } from '../../assets/svg/Svgs';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import React, { useEffect } from 'react';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { GetCitysAction, chnageAvatarAction, chnageUserProfil } from '../../store/action/action';
import { ClearChangeAvatar, ClearChangeProfile } from '../../store/action/clearAction';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { BootomModal } from '../../components/BootomSheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CityModal } from '../../components/CityModal';

export const EditProfilScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const [calendar, setCalendar] = useState(false)
  const [location, setLocation] = useState('')
  const [city, setCity] = useState(false)
  const handlePresentModalPress = useCallback(() => { bottomSheetRef.current?.present(); }, []);

  const handelPress = (type) => {
    if (type == 'Пол') {
      handlePresentModalPress()
    }
    else if (type == 'Дата рождения') {
      setCalendar(true)
    }
    else if (type === 'Город') {
      setCity(true)
    }
  }

  const [error, setError] = useState('');
  const user = useSelector(st => st.userData);
  const staticdata = useSelector(st => st.static);
  const changeProfil = useSelector(st => st.changeUserProfil);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['20%'], []);
  const changeAvatar = useSelector(st => st.changeAvatar);
  const [imgUrl, setImgUrl] = useState('');
  const [imgFile, setImgFile] = useState();

  const [data, setDate] = useState([
    { type: 'button', value: '', svg: <LocationSvg />, placeholder: 'Город' },
    { type: 'button', value: '', svg: <CakeSvg />, placeholder: 'Дата рождения' },
    {
      type: 'button', value: '', svg: <GenderSvg />, placeholder: 'Пол', onpress: () => {
        handlePresentModalPress()
      }
    },

    { type: 'input', value: '', svg: <LocationSvg />, placeholder: 'Пол' },
    { type: 'input', value: '', svg: <ProfetionsSvg />, placeholder: 'Профессия/Сфера деятельности' },
    { type: 'input', value: '', svg: <WorkLocation />, placeholder: 'Место работы' },
    { type: 'input', value: '', svg: <NetWorkSvg />, placeholder: 'Сайт' },
    { type: 'input', value: '', svg: <EmailSvg />, placeholder: 'Почта' },
    { type: 'input', value: '', svg: <PhoneSvg />, placeholder: 'Телефон' },
  ])


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
    if (username === user.data.nickname && name === user.data.name && imgUrl === '') {
      navigation.goBack();
    }
    if (username === user.data.nickname && name === user.data.name) {
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
    if (changeProfil.status || changeAvatar.status) {
      navigation.navigate('ProfileScreen');
      dispatch(ClearChangeProfile());
      dispatch(ClearChangeAvatar())
    }
  }, [changeProfil.status, changeAvatar.status]);


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeaderWhiteTitle
        loading={changeProfil.loading || changeAvatar.loading}
        onCheck={() => chnageProfil()}
        check
        onPress={() => navigation.goBack()}
        title={'Редактировать профиль'}
      />
      <View style={{ alignItems: 'center', marginVertical: 40 }}>
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
          placeholder="Текст под фото"
          placeholderTextColor={'#8C9CAB'}
          value={discription}
          onChangeText={e => setDiscription(e)}
          style={Styles.balihaiMedium14}
        />
      </View>

      <View>
        <Text style={[Styles.darkRegular16, { paddingHorizontal: 15, marginTop: 30 }]}>Доп. информация</Text>
        {data.map((elm, i) => {
          if (elm.type == 'input') {
            return <View key={i} style={styles.textWrapper2}>
              {elm.svg}
              <TextInput
                placeholder={elm.placeholder}
                placeholderTextColor={'#8C9CAB'}
                value={location}
                onChangeText={e => setLocation(e)}
                style={[Styles.balihaiMedium14, { width: '90%' }]}
              />
            </View>
          }
          else {
            return <TouchableOpacity onPress={() => handelPress(elm.placeholder)} key={i} style={[styles.textWrapper2, { paddingVertical: 25, justifyContent: "space-between" }]}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {elm.svg}
                <Text style={[Styles.balihaiRegular14, { marginHorizontal: 10 }]}>{elm.placeholder}</Text>
              </View>
              <DownArrow />
            </TouchableOpacity>
          }
        })}
      </View>
      <Text
        style={[[Styles.tomatoMedium10, { textAlign: 'center', marginTop: 10 }]]}>
        {error || changeProfil.error}
      </Text>
      <DateTimePickerModal
        isVisible={calendar}
        mode="date"
        onConfirm={() => { }}
        onCancel={() => { }}
      />
      <View style={{ position: 'absolute' }}>
        <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity style={{ marginBottom: 20, marginTop: 20 }} onPress={() => addToBook()}>
              <Text style={Styles.darkRegular14}>Мужской</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => addToBook()}>
              <Text style={Styles.darkRegular14}>Женский</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => addToBook()}>
              <Text style={Styles.darkRegular14}>Не указывать</Text>
            </TouchableOpacity>
          </View>
        </BootomModal>
      </View>
      {city && <CityModal close={() => setCity(false)} visible={city} />}
    </ScrollView>
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
  textWrapper2: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
