import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector } from 'react-redux';
import { AddBlackListAction, AddDeleteFollowAction, AddInBookAction } from '../../store/action/action';

import { useCallback, useRef, useState } from "react";
import { WhiteMenuSvg } from "../../assets/svg/TabBarSvg";
import { t } from "../lang";
import { DelateModal } from "../DelateModel";
import { ShowSave } from "../post/showSave";
import { Styles } from "../../styles/Styles";
import { HeaderInfo } from "./HeaderInfo";
import { useNavigation } from "@react-navigation/native";

export const PostHeader = ({
  podcherknuti,
  avatar,
  name,
  created_at,
  userID,
  deletData,
  addToblack,
  activeImage,
  big,
  data,
  setShowInfo,
  setPostUserId,
  id,
  font_family,
  color,
  description,
  photo,
  auth_user_book,
}
) => {
  const [openModal, setOpenModal] = useState(false)
  const user = useSelector(st => st.userData);

  // const [follow, setFollow] = useState(data?.user.follow_status_sender.length)
  const staticdata = useSelector(st => st.static);
  const [saveType, setSaveType] = useState('Запись сохранена в закладках')
  const [showSave, setShowSave] = useState(false)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const navigation = useNavigation()


  const handlePresentModalPress = useCallback(() => { bottomSheetRef.current?.present(); }, []);
  const bottomSheetRef = useRef(null);

  const mainData = useSelector(st => st.mainData);
  const [book, setBook] = useState(auth_user_book?.length > 0)

  const addToBlackList = () => {
    addToblack(userID)
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ 'user_id': userID }, staticdata.token))
  }


  const addToBook = () => {
    setShowSave(true)
    bottomSheetRef.current?.close();
    dispatch(AddInBookAction({ 'post_id': id }, staticdata.token))
    setBook(!book)
  }


  return <View style={styles.hover}>
    <DelateModal
      Confirm={() => {
        deletData(id)
        setShow(false)
      }}
      confirmText={t(mainData.lang).Delete}
      title={"Удалить публикацию ?"}
      show={show}
      setModalVisible={(e) => setShow(e)}
    />



    <ShowSave showSave={showSave} setShowSave={(e) => setShowSave(e)} saveType={saveType} />
    <HeaderInfo
      avatar={avatar}
      name={name}
      created_at={created_at}
      userID={userID}
      user={user}
    />
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setOpenModal(!openModal)
        handlePresentModalPress()
      }}
      style={styles.menu}>
      <WhiteMenuSvg />
    </TouchableOpacity>
    {
      (user?.data.id == userID && openModal) &&

      <View style={styles.infoBlock}>
        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={() => {
            setOpenModal(false)
            navigation.navigate('EditPostScreen', {
              description: description,
              id: id,
              index: activeImage,
              data: {
                photo,
                color,
                font_family,
                podcherknuti
              },
              big
            });
          }}>
          <Text style={Styles.darkRegular14}>
            {t(mainData.lang).Edit}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={() => {
            setShow(true)
            setOpenModal(false)
          }}>
          <Text style={Styles.darkRegular14}>{t(mainData.lang).Deletepost} </Text>
        </TouchableOpacity>
      </View>
    }
    {
      (user?.data.id != userID && openModal) &&
      <View style={styles.infoBlock}>
        <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => {
          setOpenModal(false)
          addToBook()
          setSaveType(book ? "Запись удалена из закладок" : 'Запись сохранена в закладках')
        }}>
          <Text style={Styles.darkRegular14}>{book ? 'Удалить из закладок' : 'В закладки'}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            setOpenModal(false)
            setFollow(!follow)
            dispatch(AddDeleteFollowAction({ user_id: userID }, staticdata.token))
          }}
          style={{ marginBottom: 20 }} >
          <Text style={Styles.darkRegular14}>{!follow ? t(mainData.lang).subscribe : t(mainData.lang).Unsubscribe}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => {
          setOpenModal(false)
          addToBlackList()
        }}>
          <Text style={Styles.darkRegular14}>В чёрный список</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => {
          setOpenModal(false)
          setShowInfo(true)
          setPostUserId(userID)
        }}>
          <Text style={Styles.darkRegular14}>Пожаловаться</Text>
        </TouchableOpacity>

      </View>
    }
  </View >
}

const styles = StyleSheet.create({
  infoBlock: {
    position: 'absolute',
    right: 20,
    top: 50,
    elevation: 5,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  hover: {
    padding: 5,
    paddingLeft: 7,
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  menu: {
    width: 50,
    zIndex: 99999,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 10,
  }
});