import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { Styles } from "../../../styles/Styles"
import { useDispatch, useSelector } from 'react-redux';
import { WhiteMenuSvg } from '../../../assets/svg/TabBarSvg';
import { AddBlackListAction, AddDeleteFollowAction, AddInBookAction } from '../../../store/action/action';
import { t } from '../../lang';
import { useCallback, useRef, useState } from "react";
import { ShowSave } from "../showSave";
import { HeaderInfo } from "./component/headerInfro";
import { Settings } from "./component/settings";
import { DelateModal } from "../../DelateModel";

export const PostHeader = ({
  user,
  openModal,
  setOpenModal,
  deletData,
  addToblack,
  activeImage,
  big,
  data,
  setShowInfo,
  setPostUserId
}
) => {
  const [follow, setFollow] = useState(data?.user.follow_status_sender.length)
  const staticdata = useSelector(st => st.static);
  const [saveType, setSaveType] = useState('Запись сохранена в закладках')
  const [showSave, setShowSave] = useState(false)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)


  const handlePresentModalPress = useCallback(() => { bottomSheetRef.current?.present(); }, []);
  const bottomSheetRef = useRef(null);

  const mainData = useSelector(st => st.mainData);
  const [book, setBook] = useState(data?.auth_user_book.length > 0)

  const addToBlackList = () => {
    addToblack(data?.user.id)
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ 'user_id': data?.user.id }, staticdata.token))
  }


  const addToBook = () => {
    setShowSave(true)
    bottomSheetRef.current?.close();
    dispatch(AddInBookAction({ 'post_id': data?.id }, staticdata.token))
    setBook(!book)
  }

  return <View style={styles.hover}>
    <DelateModal
      Confirm={() => {
        deletData(data?.id)
        setShow(false)
      }}
      confirmText={t(mainData.lang).Delete}
      title={"Удалить публикацию ?"}
      show={show}
      setModalVisible={(e) => setShow(e)}
    />



    <ShowSave showSave={showSave} setShowSave={(e) => setShowSave(e)} saveType={saveType} />
    <HeaderInfo data={data} user={user} />
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
      (user?.data.id == data?.user.id && openModal) &&
      <Settings
        description={data?.description}
        id={data?.id}
        isFollow={data?.user.follow_status_sender.length}
        my={true}
        data={data}
        setShow={(e) => setShow(e)}
        setOpenModal={(e) => setOpenModal(e)}
        activeImage={activeImage}
        big={big}
      />
    }
    {
      (user?.data.id != data?.user.id && openModal) &&
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
            dispatch(AddDeleteFollowAction({ user_id: data?.user.id }, staticdata.token))
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
        <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => {
          setOpenModal(false)
          setShowInfo(true)
          setPostUserId(data?.user.id)
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