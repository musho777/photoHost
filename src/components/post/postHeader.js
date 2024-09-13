import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native"
import { Styles } from "../../styles/Styles"
import { useDispatch, useSelector } from 'react-redux';
import { CheckMarkUserSvg } from '../../assets/svg/Svgs';
import { MenuSvg } from '../../assets/svg/TabBarSvg';
import { AddBlackListAction, AddDeleteFollowAction, AddInBookAction } from '../../store/action/action';
import { useNavigation } from '@react-navigation/native';
import { t } from '../lang';
import { useCallback, useEffect, useRef, useState } from "react";
import { ShowSave } from "./showSave";

export const PostHeader = ({
  userImg,
  userName,
  description,
  star,
  user,
  userId,
  data,
  isFollow,
  openModal,
  setOpenModal,
  id,
  deletData,
  isBook,
  addToblack,
}
) => {
  const [follow, setFollow] = useState(isFollow)
  const staticdata = useSelector(st => st.static);
  const [saveType, setSaveType] = useState('Запись сохранена в закладках')
  const [showSave, setShowSave] = useState(false)


  const dispatch = useDispatch()
  useEffect(() => {
    const currentDate = new Date(data);
    let dayOfMonth = currentDate.getDate();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    const Mounth = currentDate.getMonth()
    if (minute <= 9) {
      minute = `0${minute}`
    }
    if (hour <= 9) {
      hour = `0${hour}`
    }
    if (dayOfMonth <= 9) {
      dayOfMonth = `0${dayOfMonth}`
    }
    setDay(`${dayOfMonth} ${mounth[Mounth]} в ${hour}:${minute}`)
  }, [data])

  const handlePresentModalPress = useCallback(() => { bottomSheetRef.current?.present(); }, []);
  const bottomSheetRef = useRef(null);

  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const navigation = useNavigation()
  const [day, setDay] = useState('')
  const mainData = useSelector(st => st.mainData);
  const [book, setBook] = useState(isBook)

  const addToBlackList = () => {
    addToblack(userId)
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ 'user_id': userId }, staticdata.token))
  }


  const addToBook = () => {
    setShowSave(true)
    bottomSheetRef.current?.close();
    dispatch(AddInBookAction({ 'post_id': id }, staticdata.token))
    setBook(!book)
  }

  return <View style={[{ padding: 10, position: 'relative', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }]}>
    <ShowSave showSave={showSave} setShowSave={(e) => setShowSave(e)} saveType={saveType} />
    <TouchableOpacity onPress={() =>
      user?.data.id != userId ? navigation.push('SearchProfil', { screen: "SearchProfils", params: { id: userId, post_id: id } }) :
        navigation.navigate('ProfileNavigation')
    } style={Styles.flexAlignItems}>
      <View>
        <Image style={styles.userImg}
          source={{ uri: `https://chambaonline.pro/uploads/${userImg}` }} />
      </View>


      <View style={{ gap: 5 }}>
        <View style={[Styles.flexAlignItems, styles.hover, { width: 'auto', gap: 10 }]}>
          <Text Text style={[Styles.whiteSemiBold14,]}>{userName}</Text>
          {star > 0 && <CheckMarkUserSvg />}
        </View>
        <Text style={[Styles.whiteMedium9, styles.hover]}>{day} </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        setOpenModal(!openModal)
        handlePresentModalPress()
      }}
      style={{ width: 10 }}>
      <MenuSvg />
    </TouchableOpacity>
    {
      (user?.data.id == userId && openModal) &&
      <View style={styles.infoBlock}>
        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={() => {
            setOpenModal(false)
            navigation.navigate('EditPostScreen', {
              description: description,
              id: id,
            });
          }}>
          <Text style={Styles.darkRegular14}>
            {t(mainData.lang).Edit}

          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={() => {
            setOpenModal(false)
            deletData(id)
          }}>
          <Text style={Styles.darkRegular14}>{t(mainData.lang).Deletepost} </Text>
        </TouchableOpacity>
      </View>
    }

    {
      (user?.data.id != userId && openModal) &&
      <View style={styles.infoBlock}>
        <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => {
          setOpenModal(false)
          addToBook()
          setSaveType(book ? "Запись удалена из закладок" : 'Запись сохранена в закладках')
        }}>
          <Text style={Styles.darkRegular14}>{book ? 'Удалить из закладок' : 'В закладки'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpenModal(false)
            setFollow(!follow)
            dispatch(AddDeleteFollowAction({ user_id: userId }, staticdata.token))
          }}
          style={{ marginBottom: 20 }} >
          <Text style={Styles.darkRegular14}>{!follow ? t(mainData.lang).subscribe : t(mainData.lang).Unsubscribe}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => {
          setOpenModal(false)
          addToBlackList()
        }}>
          <Text style={Styles.darkRegular14}>В чёрный список</Text>
        </TouchableOpacity>
      </View>
    }
  </View >
}

const styles = StyleSheet.create({
  userImg: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 50,
  },
  infoBlock: {
    position: 'absolute',
    right: 20,
    top: 50,
    elevation: 5,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 1
  },
  hover: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 10,
    borderRadius: 15,
    width: 'auto'
  }
});