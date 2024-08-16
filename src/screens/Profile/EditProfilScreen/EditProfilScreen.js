import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CakeSvg, DownArrow, EmailSvg, GenderSvg, LocationSvg, NetWorkSvg, PhoneSvg, ProfetionsSvg, WorkLocation } from '../../../assets/svg/Svgs';
import { AppColors } from '../../../styles/AppColors';
import { Styles } from '../../../styles/Styles';
import React, { useEffect } from 'react';
import { HeaderWhiteTitle } from '../../../headers/HeaderWhiteTitle.';
import { UpdateIkInfoAction, UpdateUserInfo, chnageUserProfil, getUserInfoAction } from '../../../store/action/action';
import { ClearChangeProfile } from '../../../store/action/clearAction';
import { BootomModal } from '../../../components/BootomSheet';
import { CityModal } from '../../../components/CityModal';
import { t } from '../../../components/lang';
import { Date } from './components/date';

export const EditProfilScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const [city, setCity] = useState(false)
  const mainData = useSelector(st => st.mainData);

  const updateUserInfo = useSelector((st) => st.updateUserInfo)

  const [height, setHeight] = useState();
  const data1 = [
    { name: 'Январь', id: 0 },
    { name: 'Февраль', id: 1 },
    { name: 'Март', id: 2 },
    { name: 'Апрель', id: 3 },
    { name: 'Май', id: 4 },
    { name: 'Июнь', id: 5 },
    { name: 'Июль', id: 6 },
    { name: 'Август', id: 7 },
    { name: 'Сентябрь', id: 8 },
    { name: 'Октябрь', id: 9 },
    { name: 'Ноябрь', id: 10 },
    { name: 'Декабрь', id: 11 },
  ]

  const handlePresentModalPress = useCallback(() => { bottomSheetRef.current?.present(); }, []);

  const handelPress = (type) => {
    if (type == 'Пол') {
      handlePresentModalPress()
    }
    else if (type === 'Город') {
      setCity(true)
    }
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (staticdata.token) {
        SetData()
      }
    });
    return unsubscribe;
  }, [navigation]);

  const [error, setError] = useState('');
  const user = useSelector(st => st.userData);
  const staticdata = useSelector(st => st.static);
  const changeProfil = useSelector(st => st.changeUserProfil);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['16%'], []);
  const [day, setDay] = useState()
  const [mount, setMount] = useState()
  const [year, setYera] = useState()
  const [data, setDate] = useState([
    { type: 'button', value: '', svg: <LocationSvg />, placeholder: t(mainData.lang).City, disabled: true, id: '' },
    { type: 'calendar', value: '', svg: <CakeSvg />, placeholder: t(mainData).DateofBirth, disabled: true, value2: '' },
    { type: 'button', value: '', svg: <GenderSvg />, placeholder: t(mainData.lang).gender, disabled: true },
    { type: 'input', value: '', svg: <ProfetionsSvg />, placeholder: t(mainData.lang).ProfessionFieldofactivity, disabled: true },
    { type: 'input', value: '', svg: <WorkLocation />, placeholder: t(mainData.lang).Placeofwork, disabled: true },
    { type: 'input', value: '', svg: <NetWorkSvg />, placeholder: t(mainData.lang).Website, disabled: true },
    { type: 'input', value: '', svg: <EmailSvg />, placeholder: t(mainData.lang).Mail, disabled: false },
    { type: 'input', value: '', svg: <PhoneSvg />, placeholder: t(mainData.lang).Phonenumber, disabled: true },
  ])

  useEffect(() => {
    if (day || mount?.id || year) {
      const newDateFormat = `${year}.${mount?.id + 1}.${day}`;
      hadnelChange(1, newDateFormat, 'typ2', newDateFormat)
    }
  }, [day, mount, year])

  const SetData = () => {
    let d = ''
    if (user?.allData?.data?.date_of_birth) {
      setYera(user?.allData?.data?.date_of_birth?.split('-')[0])
      d = user?.allData?.data?.date_of_birth?.split('-')[2].slice(0, 2)
    }
    if (d?.length > 0 && d[0] == 0) {
      setDay(d[1])
    }
    else {
      setDay(d)
    }

    let m = user?.allData?.data?.date_of_birth?.split('-')[1] - 1
    if (m?.length > 0 && m[0] == 0 && m.length == 2) {
      m = +m[1]
    }



    setMount(data1[m])
    const dateComponents = JSON.stringify(user?.allData?.data?.date_of_birth)?.substring(0, 11)?.split('-')
    const year = dateComponents && dateComponents[0]?.replace(`"`, '')
    const day = dateComponents && dateComponents[2]
    const month = dateComponents && dateComponents[1]
    let newDateFormat = `${day}-${month}-${year}`;

    let item = [...data]
    if (user?.allData?.data?.city?.name) {
      item[0].value = user?.allData?.data?.city?.name

    }
    else if (user?.allData?.data?.city?.value) {
      item[0].value = user?.allData?.data?.city?.value
    }
    else {
      item[0].value = ''

    }

    if (user?.allData?.data?.date_of_birth1) {
      let dateComponents = ''
      if (user?.allData?.data?.date_of_birth1.includes('.')) {
        dateComponents = user?.allData?.data.date_of_birth1.split('.')
      }
      else {
        dateComponents = user?.allData?.data.date_of_birth1.split('-')
      }
      newDateFormat = `${dateComponents[1]}-${dateComponents[2]}-${dateComponents[0]}`;
      setDay(dateComponents[2])
      setYera(dateComponents[0])
      if (dateComponents[1]) {
        let index = +dateComponents[1] - 1
        setMount(data1[index])
      }
    }
    item[1].value2 = newDateFormat ? newDateFormat : ''
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
      setName(user.name);
      setDiscription(user.description);
    }
    if (!name) {
      SetData()
    }
  }, [user]);
  const dispatch = useDispatch();

  const hadnelChange = (i, value, type, value2) => {
    let item = [...data]
    if (type == 'city') {
      item[i].value = value.name
      item[0].id = value.id

    } else if (i == 1) {
      item[i].value = value
      item[i].value2 = value2
    }
    else {
      item[i].value = value
    }
    setDate(item)
  }
  const chnageProfil = () => {
    if (name === '') {
      setError('Введите корректный  имя');
    } else {
      setError('');
    }
    dispatch(chnageUserProfil({
      name: name,
      nickname: "#",
      description: discription
    }, staticdata.token
    ));
    dispatch(UpdateIkInfoAction({
      city_id: data[0].id,
      date_of_birth: data[1].value,
      gender: data[2].value,
      mgu: data[3].value,
      work_type: data[4].value,
      web: data[5].value,
      phone: data[7].value,
    }, staticdata.token))
  };

  useEffect(() => {
    if (updateUserInfo.status) {
      dispatch(ClearChangeProfile());
      getUserInfoAction(staticdata.token)
      dispatch(UpdateUserInfo(data))
      navigation.navigate('ProfileScreen')
    }
  }, [updateUserInfo.status])


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeaderWhiteTitle
        loading={changeProfil.loading}
        onCheck={() => chnageProfil()}
        check
        onPress={() => navigation.goBack()}
        title=
        {t(mainData.lang).Editprofile}
      />

      <View style={{ alignItems: 'center', marginVertical: 40 }}>
        <Image
          style={styles.img}
          source={{
            uri: `https://chambaonline.pro/uploads/${user.data.avatar}`,
          }}
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
          placeholder={t(mainData.lang).Brieflyaboutyourself}
          placeholderTextColor={'#8C9CAB'}
          multiline={true}
          value={discription}
          onContentSizeChange={event => {
            setHeight(event.nativeEvent.contentSize.height);
          }}
          style={[Styles.balihaiMedium14, { height: height }]}
          onChangeText={e => setDiscription(e)}
        />
      </View>
      <Text style={[Styles.balihaiMedium8, { paddingHorizontal: 15, marginTop: 5 }]}>
        (чем больше заполните информацию о себе, тем более точный контент будет предлагаться.
        Помимо выбранных Вами рубрик, будет предлагаться контент с вашего города.)
      </Text>
      <View>
        {/* <Text style={[Styles.darkRegular16, { paddingHorizontal: 15, marginTop: 30 }]}>{t(mainData.lang).Addinformation}</Text> */}
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
          else if (elm.type == 'calendar') {
            return <Date
              day={day}
              year={year}
              mount={mount}
              key={i}
              setDay={(e) => setDay(e)}
              setYera={(e) => setYera(e)}
              setMount={(e) => setMount(e)}
            />
          }
          else {
            return <TouchableOpacity onPress={() => handelPress(elm.placeholder)} key={i} style={[styles.textWrapper2, { paddingVertical: 25, justifyContent: "space-between" }]}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {elm.svg}
                {i == 1 ?
                  <Text style={[Styles.balihaiRegular14, { marginHorizontal: 10 }]}>{elm.value2 ? elm.value2 : elm.placeholder}</Text> :
                  <Text style={[Styles.balihaiRegular14, { marginHorizontal: 10 }]}>{elm.value ? elm.value : elm.placeholder}</Text>}
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
      <View style={{ position: 'absolute' }}>
        <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => {
              hadnelChange(2, 'Мужской')
              bottomSheetRef.current?.close()
            }} style={{ marginBottom: 20, marginTop: 20 }} >
              <Text style={Styles.darkRegular14}>{t(mainData.lang).Male}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              hadnelChange(2, 'Женский')
              bottomSheetRef.current?.close()

            }} style={{ marginBottom: 20 }}>
              <Text style={Styles.darkRegular14}>{t(mainData.lang).Female}</Text>
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
  },
});

