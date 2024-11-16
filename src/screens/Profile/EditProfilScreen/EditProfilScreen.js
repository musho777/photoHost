import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { EmailSvg, Emojy, NetWorkSvg, PhoneSvg, WatchSvg, WorkLocation, WorkLocationSvg } from '../../../assets/svg/Svgs';
import { AppColors } from '../../../styles/AppColors';
import { Styles } from '../../../styles/Styles';
import React, { useEffect } from 'react';
import { HeaderWhiteTitle } from '../../../headers/HeaderWhiteTitle.';
import { UpdateIkInfoAction, UpdateUserInfo, chnageUserProfil, getUserInfoAction } from '../../../store/action/action';
import { ClearChangeProfile } from '../../../store/action/clearAction';
import { t } from '../../../components/lang';
import { DateComponent } from './components/date';
import { Fild } from './components/Fild';
import { Location } from './components/location';
import { ChnageGender } from './components/changeGender';
import { useFocusEffect } from '@react-navigation/native';
import { Profiesions } from './components/Profiesions';
import { Position_profession } from './components/position_profession';
import EmojiPicker from 'rn-emoji-keyboard';

export const EditProfilScreen = ({ navigation }) => {



  const fontFamily = [
    "Montserrat-Regular",
    "PlaywriteGBS-Regular",
    'RussoOne-Regular',
    'Agdasima-Regular',
    'Caveat-Regular',
    'Comfortaa-Regular',
    'CormorantGaramond-Regular',
    'Jost-Regular',
    'Lobster-Regular',
    'NotoSansHK-Regular',
    'Pacifico-Regular',
    'Tiny5-Regular',
    "AdventPro_Expanded-Regular",
    "Alice-Regular",
    "AmaticSC-Regular",
    "BadScript-Regular",
    "DelaGothicOne-Regular",
    "Geologica_Auto-Regular",
    "PlayfairDisplaySC-Regular",
    "RubikMonoOne-Regular",
    "Unbounded-Regular",
    "YanoneKaffeesatz-Regular",
    "AlegreyaSansSC-Regular",
    "BalsamiqSans-Regular",
    "CormorantInfant-Regular",
    "DaysOne-Regular",
    "MarckScript-Regular",
    "Pattaya-Regular",
    "ProstoOne-Regular",
    "RubikSprayPaint-Regular",
    "SofiaSansExtraCondensed-Regular"
  ]

  const color = [
    { title: '#000000', id: 1 },
    { title: '#808080', id: 3 },
    { title: '#FF5733', id: 4 },
    { title: '#1E90FF', id: 6 },
    { title: '#4682B4', id: 7 },
    { title: '#4CAF50', id: 8 },
    { title: '#FFD700', id: 9 },
    { title: '#FF69B4', id: 10 },
    { title: '#800080', id: 11 },
    { title: '#8B0000', id: 12 },

    { title: '#FFA500', id: 13 },
    { title: '#87CEEB', id: 14 },
    { title: '#FF4500', id: 16 },
    { title: '#32CD32', id: 17 },
    { title: '#DA70D6', id: 18 },
    { title: '#708090', id: 19 },
  ]

  const mountDate = [
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


  const [name, setName] = useState({ text: '', color: '', font: '' });
  const [discription, setDiscription] = useState('');
  const mainData = useSelector(st => st.mainData);
  const updateUserInfo = useSelector((st) => st.updateUserInfo)
  const [error, setError] = useState('');
  const user = useSelector(st => st.userData);
  const [otrasl, setOtrasl] = useState('')
  const staticdata = useSelector(st => st.static);
  const changeProfil = useSelector(st => st.changeUserProfil);
  const [loaction, setLocation] = useState({ name: '', id: '' })
  const [gender, setGender] = useState('')
  const [profation, setProfation] = useState('')
  const [workLocation, setWorkLocation] = useState('')
  const [email, setEmail] = useState('')
  const [phonNumber, setPhonNumber] = useState('')
  const dispatch = useDispatch();
  const [accauntType, setAccauntType] = useState(false)
  const [graf, setGraf] = useState('')
  const [web, setWeb] = useState('')
  const [year, setYear] = useState('')
  const [mount, setMount] = useState('')
  const [day, setDay] = useState('')
  const [date, setDate] = useState('')
  const [ooo, setOoo] = useState('')
  const [isOpen, setIsOpen] = useState(false)



  useEffect(() => {
    if (day || mount?.id || year) {
      const newDateFormat = `${year}-${mount?.id + 1}-${day}`;
      setDate(newDateFormat)
    }
  }, [day, mount, year])

  useFocusEffect(
    useCallback(() => {
      SetData()
    }, [user.data])
  );

  useEffect(() => {
    try {
      setName(JSON.parse(user.data.name));
    }
    catch {
      setName({ ...name, name: user.data.name });
    }
    setDiscription(user.description);
  }, [user.data])

  const SetData = () => {
    if (user?.allData?.data?.user_type != 'Legal_entity') {
      setAccauntType(true)
    }
    // setDiscription(user.description);
    let date = ''
    let year = ''
    let month = ''
    let day = ''
    if (user?.allData?.data?.date_of_birth) {
      date = new Date(user?.allData?.data?.date_of_birth);
      year = JSON.stringify(date.getFullYear());
      month = String(date.getMonth() + 1).padStart(2, '0');
      day = String(date.getDate()).padStart(2, '0');
    }
    if (month[0] == 0) {
      month = month[1] - 1
    }
    const temp = user?.allData?.data
    setYear(year)
    setMount(mountDate[month])
    setDay(day)
    setEmail(user?.allData?.data?.email)
    setLocation({ name: temp?.city?.name, id: '' })
    setGender(temp?.gender)
    setWorkLocation(temp?.work_type)
    setProfation(temp?.mgu)
    setOoo(temp.ooo)
    setPhonNumber(temp?.phone)
    setWeb(temp?.web)
    setGraf(temp?.work_grafik)
    setOtrasl(temp?.otrasl)
  }

  const chnageProfil = () => {
    if (name === '') {
      setError('Введите корректный  имя');
    }
    else if (day == '' && (mount != '' || year != '')) {
      setError('Введите корректный дата');
    }
    else if (mount == '' && (day != '' || year != '')) {
      setError('Введите корректный дата');
    }
    else if (year == '' && (day != '' || mount != '')) {
      setError('Введите корректный дата');
    }
    else {
      setError('');
    }
    dispatch(chnageUserProfil({
      name: JSON.stringify(name),
      nickname: '#',
      description: discription,
    }, staticdata.token
    ));
    dispatch(UpdateIkInfoAction({
      city_id: loaction.id,
      date_of_birth: date,
      gender: gender,
      mgu: profation,
      work_type: workLocation,
      phone: phonNumber,
      work_grafik: graf,
      web: web,
      otrasl: otrasl,
      ooo: ooo,
      user_type: user?.allData?.data.user_type,
    }, staticdata.token))
  };

  useEffect(() => {
    if (updateUserInfo.status) {
      dispatch(ClearChangeProfile());
      getUserInfoAction(staticdata.token)
      dispatch(UpdateUserInfo({
        city: loaction.name,
        date_of_birth: date,
        gender: gender,
        mgu: profation,
        work_type: workLocation,
        phone: phonNumber,
        work_grafik: graf,
        web: web,
        otrasl: otrasl,
        ooo: ooo,
      }))
      navigation.navigate('ProfileScreen')
    }
  }, [updateUserInfo.status, changeProfil.status])

  const handlePick = (e) => {
    let item = JSON.parse(discription)
    item.text = `${item.text}${e.emoji}`
    setDiscription(JSON.stringify(item))
  }

  if (accauntType) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 20 }}>
              <HeaderWhiteTitle
                loading={changeProfil.loading}
                onCheck={() => chnageProfil()}
                check
                onPress={() => { navigation.goBack() }}
                title={t(mainData.lang).Editprofile}
              />
            </View>
            <View style={[styles.textWrapper]}>
              <TextInput
                multiline
                value={name.name}
                maxLength={30}
                onChangeText={e => setName({ ...name, name: e })}
                style={[Styles.balihaiMedium14, { height: 'auto', width: '90%', color: name?.color?.title, fontFamily: name?.font }]}
              />
            </View>
            <Text style={[Styles.balihaiMedium10, { paddingHorizontal: 17, marginTop: 10 }]}>
              Выбрать шрифт и цвет для имени и фамилии или названия канала
            </Text>
            <View style={{ marginBottom: 10 }}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 17, alignItems: 'center', marginVertical: 10 }}>
                {fontFamily.map((elm, i) => {
                  return <Text onPress={() => {
                    setName({ ...name, font: elm })
                  }} key={i} style={{ fontSize: 10, fontFamily: elm }}>{elm}</Text>
                })}
              </ScrollView>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 17, alignItems: 'center', height: 20 }}>
                {color.map((elm, i) => {
                  return <TouchableOpacity onPress={() => {
                    // ChnageData(localValue, activeFont, elm)
                    // setActiveColor(elm)
                    setName({ ...name, color: elm })
                  }} key={i} style={{ width: 20, height: 20, backgroundColor: elm.title, borderRadius: 20, }} />
                })}
              </ScrollView>
            </View>

            <Fild setIsOpen={(e) => setIsOpen(e)} discription multiline={true} value={discription} hadnelChange={(e) => setDiscription(e)} placeholder={accauntType ? t(mainData.lang).Brieflyaboutyourself : "О нас"} />
            <View style={{ width: '100%', borderWidth: 1, marginTop: 10, borderColor: AppColors.Solitude_Color, }} />
            <Text style={[Styles.balihaiMedium10, { paddingHorizontal: 17, marginTop: 5, color: 'red' }]}>
              Чем больше заполните информацию о себе, тем точнее будет предлагаться контент. Помимо выбранных Вами рубрик будет предлагаться контент с Вашего города.
            </Text>
            <View>
              {accauntType && <DateComponent mount={mount} setMount={(e) => setMount(e)} day={day} setDay={(e) => setDay(e)} year={year} setYera={(e) => setYear(e)} />}
              {accauntType && <ChnageGender value={gender} setValue={(e) => setGender(e)} />}
              {!accauntType && <Fild value={email} hadnelChange={(e) => setEmail(e)} svg={<EmailSvg />} placeholder={t(mainData.lang).Mail} />}
              <Fild value={phonNumber} hadnelChange={(e) => setPhonNumber(e)} svg={<PhoneSvg />} placeholder={t(mainData.lang).Phonenumber} />
              <Location setLocation={(e) => setLocation(e)} loaction={loaction} />
              <Position_profession setLocation={(e) => setOtrasl(e)} loaction={otrasl} />
              {accauntType && <Fild bB={0} value={workLocation} hadnelChange={(e) => setWorkLocation(e)} svg={<WorkLocation />} placeholder={t(mainData.lang).Placeofwork} />}

              <Fild multiline={true} value={ooo} hadnelChange={(e) => setOoo(e)} svg={<WorkLocationSvg />} placeholder={!accauntType ? `Адрес компании` : 'Адрес предприятия'} />






              <Profiesions setLocation={(e) => setProfation(e)} loaction={profation} />
              {!accauntType && <Fild value={graf} hadnelChange={(e) => setGraf(e)} svg={<WatchSvg />} placeholder={'График работы'} />}
              {!accauntType && <Fild value={web} hadnelChange={(e) => setWeb(e)} svg={<NetWorkSvg />} placeholder={t(mainData.lang).Website} />}
              <View style={{ height: 55, width: '100%' }}></View>
            </View>
            {/* <Text
            style={[[Styles.tomatoMedium10, { textAlign: 'center', marginTop: 10 }]]}>
            {error || changeProfil.error}
          </Text> */}
          </ScrollView>
        </KeyboardAvoidingView>
        <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
      </SafeAreaView>
    );
  }
  else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 20 }}>
              <HeaderWhiteTitle
                loading={changeProfil.loading}
                onCheck={() => chnageProfil()}
                check
                onPress={() => {
                  navigation.goBack()
                }}
                title=
                {t(mainData.lang).Editprofile}
              />
            </View>
            <View style={styles.textWrapper}>
              <TextInput
                value={name}
                onChangeText={e => setName(e)}
                style={Styles.darkMedium14}
              />
              <View style={{ backgroundColor: 'red' }}>
              </View>

            </View>




            <Fild setIsOpen={(e) => setIsOpen(e)} multiline={true} value={discription} hadnelChange={(e) => setDiscription(e)} placeholder={accauntType ? t(mainData.lang).Brieflyaboutyourself : "О нас"} />
            <Text style={[Styles.balihaiMedium8, { paddingHorizontal: 17, marginTop: 5 }]}>
              (Чем больше заполните информацию о компании, тем более точный контент будет предлагаться)
              Помимо выбранных Вами рубрик, будет предлагаться контент от ваших конкурентов с вашего города)
            </Text>
            <View>
              <Location setLocation={(e) => setLocation(e)} loaction={loaction} />
              <Position_profession setLocation={(e) => setOtrasl(e)} loaction={otrasl} />
              <Fild multiline={true} value={ooo} hadnelChange={(e) => setOoo(e)} svg={<WorkLocationSvg />} placeholder={`Адрес компании`} />
              <Fild value={web} hadnelChange={(e) => setWeb(e)} svg={<NetWorkSvg />} placeholder={t(mainData.lang).Website} />
              <Fild value={graf} hadnelChange={(e) => setGraf(e)} svg={<WatchSvg />} placeholder={'График работы'} />
              <Fild value={phonNumber} hadnelChange={(e) => setPhonNumber(e)} svg={<PhoneSvg />} placeholder={t(mainData.lang).Phonenumber} />
              <Fild value={email} hadnelChange={(e) => setEmail(e)} svg={<EmailSvg />} placeholder={t(mainData.lang).Mail} />

              {/* <Profiesions setLocation={(e) => setProfation(e)} loaction={profation} /> */}
              <View style={{ height: 55, width: '100%' }}></View>
            </View>
            {/* <Text
            style={[[Styles.tomatoMedium10, { textAlign: 'center', marginTop: 10 }]]}>
            {error || changeProfil.error}
          </Text> */}
          </ScrollView>
        </KeyboardAvoidingView>
        <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 0,
    borderColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    // width: '100%'
  },
  emojy: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: 10,
    top: 0,
    bottom: 10
  }
});

