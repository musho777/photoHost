import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { Styles } from "../../../styles/Styles"
import { useDispatch, useSelector } from 'react-redux';
import { MenuSvg } from '../../../assets/svg/TabBarSvg';
import { AddBlackListAction, AddDeleteFollowAction, AddInBookAction } from '../../../store/action/action';
import { t } from '../../lang';
import { useCallback, useRef, useState } from "react";
import { ShowSave } from "../showSave";
import { HeaderInfo } from "./component/headerInfro";
import { Settings } from "./component/settings";

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

  const handlePresentModalPress = useCallback(() => { bottomSheetRef.current?.present(); }, []);
  const bottomSheetRef = useRef(null);

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

  return <View style={styles.hover}>
    <ShowSave showSave={showSave} setShowSave={(e) => setShowSave(e)} saveType={saveType} />
    <HeaderInfo
      data={data}
      user={user}
      userId={userId}
      id={id}
      star={star}
      userImg={userImg}
      userName={userName}
    />
    <TouchableOpacity
      onPress={() => {
        setOpenModal(!openModal)
        handlePresentModalPress()
      }}
      style={{ width: 10, zIndex: 99999 }}>
      <MenuSvg />
    </TouchableOpacity>
    {
      (user?.data.id == userId && openModal) &&
      <Settings
        description={description}
        id={id}
        isFollow={isFollow}
        my={true}
        deletData={deletData}
        setOpenModal={(e) => setOpenModal(e)}
      />
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
    padding: 5,
    paddingLeft: 7,
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});