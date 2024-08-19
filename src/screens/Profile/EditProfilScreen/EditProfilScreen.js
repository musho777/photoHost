import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { EmailSvg, NetWorkSvg, PhoneSvg, ProfetionsSvg, WatchSvg, WorkLocation } from '../../../assets/svg/Svgs';
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

export const EditProfilScreen = ({ navigation }) => {

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

  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const mainData = useSelector(st => st.mainData);
  const updateUserInfo = useSelector((st) => st.updateUserInfo)
  const [error, setError] = useState('');
  const user = useSelector(st => st.userData);

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

  const SetData = () => {
    if (user?.allData?.data?.user_type != 'Legal_entity') {
      setAccauntType(true)
    }
    setName(user.name);
    setDiscription(user.description);
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
    setPhonNumber(temp?.phone)
    setWeb(temp?.web)
    setGraf(temp?.work_grafik)
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
      name: name,
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
      }))
      navigation.navigate('ProfileScreen')
    }
  }, [updateUserInfo.status, changeProfil.status])


  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderWhiteTitle
          loading={changeProfil.loading}
          onCheck={() => chnageProfil()}
          check
          onPress={() => navigation.goBack()}
          title=
          {t(mainData.lang).Editprofile}
        />
        <View style={styles.textWrapper}>
          <TextInput
            value={name}
            onChangeText={e => setName(e)}
            style={Styles.darkMedium14}
          />
        </View>
        <Fild value={discription} hadnelChange={(e) => setDiscription(e)} placeholder={accauntType ? t(mainData.lang).Brieflyaboutyourself : "О нас"} />
        {!accauntType ? <Text style={[Styles.balihaiMedium8, { paddingHorizontal: 15, marginTop: 5 }]}>
          (чем больше заполните информацию о себе, тем более точный контент будет предлагаться.
          Помимо выбранных Вами рубрик, будет предлагаться контент с вашего города.)
        </Text> :
          <Text style={[Styles.balihaiMedium8, { paddingHorizontal: 15, marginTop: 5 }]}>
            (чем больше заполните информацию о компании, тем более точный контент будет предлагаться)
            Помимо выбранных Вами рубрик, будет предлагаться контент от ваших конкурентов с вашего города)
          </Text>
        }
        <View>
          {accauntType &&
            <DateComponent mount={mount} setMount={(e) => setMount(e)} day={day} setDay={(e) => setDay(e)} year={year} setYera={(e) => setYear(e)} />
          }
          <Location setLocation={(e) => setLocation(e)} loaction={loaction} />
          {accauntType && <ChnageGender value={gender} setValue={(e) => setGender(e)} />}
          {accauntType && <Fild value={workLocation} hadnelChange={(e) => setWorkLocation(e)} svg={<WorkLocation />} placeholder={t(mainData.lang).Placeofwork} />}
          <Fild value={profation} hadnelChange={(e) => setProfation(e)} svg={<ProfetionsSvg />} placeholder={accauntType ?
            t(mainData.lang).ProfessionFieldofactivity :
            'Сфера/Отрасль'
          } />
          {!accauntType && <Fild value={workLocation} hadnelChange={(e) => setWorkLocation(e)} svg={<WorkLocation />} placeholder={'Адрес компании'} />}
          {!accauntType && <Fild value={graf} hadnelChange={(e) => setGraf(e)} svg={<WatchSvg />} placeholder={'График работы'} />}
          {!accauntType && <Fild value={web} hadnelChange={(e) => setWeb(e)} svg={<NetWorkSvg />} placeholder={t(mainData.lang).Website} />}
          <Fild value={email} hadnelChange={(e) => setEmail(e)} svg={<EmailSvg />} placeholder={t(mainData.lang).Mail} />
          <Fild value={phonNumber} hadnelChange={(e) => setPhonNumber(e)} svg={<PhoneSvg />} placeholder={t(mainData.lang).Phonenumber} />
        </View>
        <Text
          style={[[Styles.tomatoMedium10, { textAlign: 'center', marginTop: 10 }]]}>
          {error || changeProfil.error}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
  },
});

