import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CakeSvg, DownArrow, EditAvaterSvg, EmailSvg, GenderSvg, LocationSvg, NetWorkSvg, PhoneSvg, ProfetionsSvg, WorkLocation } from '../../assets/svg/Svgs';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import React, { useEffect } from 'react';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { UpdateIkInfoAction, chnageAvatarAction, chnageUserProfil } from '../../store/action/action';
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
  console.log(staticdata)
  const [data, setDate] = useState([
    { type: 'button', value: '', svg: <LocationSvg />, placeholder: 'Город', disabled: true, id: '' },
    { type: 'button', value: '', svg: <CakeSvg />, placeholder: 'Дата рождения', disabled: true },
    { type: 'button', value: '', svg: <GenderSvg />, placeholder: 'Пол', disabled: true },
    { type: 'input', value: '', svg: <ProfetionsSvg />, placeholder: 'Профессия/Сфера деятельности', disabled: true },
    { type: 'input', value: '', svg: <WorkLocation />, placeholder: 'Место работы', disabled: true },
    { type: 'input', value: '', svg: <NetWorkSvg />, placeholder: 'Сайт', disabled: true },
    { type: 'input', value: '', svg: <EmailSvg />, placeholder: 'Почта', disabled: false },
    { type: 'input', value: '', svg: <PhoneSvg />, placeholder: 'Телефон', disabled: true },
  ])

  const SetData = () => {
    let item = [...data]
    item[0].value = user?.allData?.data?.city_id ? user?.allData?.data?.city_id : ''
    item[1].value = user?.allData?.data?.date_of_birth ? user?.allData?.data?.date_of_birth?.substring(0, 11) : ''
    item[2].value = user?.allData?.data?.gender ? user?.allData?.data?.gender : ''
    item[3].value = user?.allData?.data?.mgu ? user?.allData?.data?.mgu : ''
    item[4].value = user?.allData?.data?.work_type ? user?.allData?.data?.work_type : ''
    item[5].value = user?.allData?.data?.web ? user?.allData?.data.web : ''
    item[6].value = user?.allData?.data?.email ? user?.allData?.data.email : ''
    item[7].value = user?.allData?.data?.phone ? user?.allData?.data.phone : ''
    setDate(item)
  }

  useEffect(() => {
    if (!name) {
      setUsername(user.username);
      setName(user.name);
      setDiscription(user.description);
    }
    SetData()
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
  const hadnelChange = (i, value, type) => {
    let item = [...data]
    if (type == 'city') {
      item[i].value = value.name
      item[0].id = value.id

    } else {

      item[i].value = value
    }
    setDate(item)
  }
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
    dispatch(UpdateIkInfoAction({
      city_id: data[0].id,
      date_of_birth: data[1].value,
      gender: data[2].value,
      mgu: data[3].value,
      work_type: data[4].value,
      web: data[5].value,
      phone: data[6].value,
    }, staticdata.token))
    navigation.navigate('ProfileScreen');
    dispatch(ClearChangeProfile());
    dispatch(ClearChangeAvatar())
  };
  // useEffect(() => {
  //   if (changeProfil.status || changeAvatar.status) {
  //     navigation.navigate('ProfileScreen');
  //     dispatch(ClearChangeProfile());
  //     dispatch(ClearChangeAvatar())
  //   }
  // }, [changeProfil.status, changeAvatar.status]);
  const handleConfirm = (date) => {
    hadnelChange(1, JSON.stringify(date).substring(1, 11))
    setCalendar(false)
  };
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
                editable={elm.disabled}
                placeholder={elm.placeholder}
                placeholderTextColor={'#8C9CAB'}
                value={elm.value}
                onChangeText={e => hadnelChange(i, e)}
                style={[Styles.balihaiMedium14, { width: '90%' }]}
              />
            </View>
          }
          else {
            return <TouchableOpacity onPress={() => handelPress(elm.placeholder)} key={i} style={[styles.textWrapper2, { paddingVertical: 25, justifyContent: "space-between" }]}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {elm.svg}
                <Text style={[Styles.balihaiRegular14, { marginHorizontal: 10 }]}>{elm.value ? elm.value : elm.placeholder}</Text>
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
        onConfirm={handleConfirm}
        onCancel={() => { }}
      />
      <View style={{ position: 'absolute' }}>
        <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => {
              hadnelChange(2, 'Мужской')
              bottomSheetRef.current?.close()
            }} style={{ marginBottom: 20, marginTop: 20 }} >
              <Text style={Styles.darkRegular14}>Мужской</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              hadnelChange(2, 'Женский')
              bottomSheetRef.current?.close()

            }} style={{ marginBottom: 20 }}>
              <Text style={Styles.darkRegular14}>Женский</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              hadnelChange(2, 'Не указывать')
              bottomSheetRef.current?.close()
            }} style={{ marginBottom: 20 }}>
              <Text style={Styles.darkRegular14}>Не указывать</Text>
            </TouchableOpacity>
          </View>
        </BootomModal>
      </View>
      {city && <CityModal onPress={(e) => hadnelChange(0, e, type = 'city')} close={() => setCity(false)} visible={city} />}
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
