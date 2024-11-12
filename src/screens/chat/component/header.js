import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { BackArrow } from "../../../assets/svg/Svgs"
import { Styles } from "../../../styles/Styles"
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MenuSvg } from "../../../assets/svg/TabBarSvg";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BootomModal } from "../../../components/BootomSheet";
import { AddBlackListAction, DelateChatAction } from "../../../store/action/action";
import { ClearDeletChat } from "../../../store/action/clearAction";
import { DelateModal } from "../../../components/DelateModel";
import { t } from '../../../components/lang';



export const Header = ({ data, route, user, askdelateModal }) => {
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const navigation = useNavigation()
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['18%'], []);
  const [isInblack, setIsInblack] = useState(false)
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const addBlackPusher = useSelector(st => st.addBlackPusher)
  const deletChat = useSelector((st) => st.deletChatPusher)
  const mainData = useSelector(st => st.mainData);
  const [clicked, setCliked] = useState(false)
  const [show, setShow] = useState(false)

  const addToBlackList = () => {
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ 'user_id': route.params.id }, staticdata.token))
    setIsInblack(!isInblack)
  }
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);


  useEffect(() => {
    if (askdelateModal) {
      Confirm()
    }
  }, [askdelateModal])

  useEffect(() => {
    let a = addBlackPusher.addBlackListPusher?.reseiver_id == user.data.id && addBlackPusher.addBlackListPusher?.sender_id == route.params.id
    let b = addBlackPusher.addBlackListPusher?.reseiver_id == route.params.id && addBlackPusher.addBlackListPusher?.sender_id == user.data.id
    if (getSinglePageChat.blackList == 'You Blocked This User' || getSinglePageChat.blackList == 'This User Blocked You' || a || b) {
      setIsInblack(true)
    }
    if (addBlackPusher.addBlackListPusher?.reseiver_id === 'black_list_delete' && addBlackPusher.addBlackListPusher?.sender_id === 'black_list_delete') {
      setIsInblack(false)
    }
  }, [getSinglePageChat.resiverUser, addBlackPusher]);


  useEffect(() => {
    if (Object.keys(deletChat.deletChatPusher).length) {
      if (deletChat.deletChatPusher.reseiver_id == user.data.id && deletChat.deletChatPusher.sender_id == route.params.id) {
        navigation.goBack()
        dispatch(ClearDeletChat())
      }
    }
  }, [deletChat.deletChatPusher])


  const NavigateUserPage = () => {
    setCliked(true)
    navigation.push('SearchProfil', { screen: "SearchProfils", params: { id: getSinglePageChat.resiverUser.id } });
  }

  const Confirm = () => {
    setShow(false)
    dispatch(DelateChatAction({ receiver_id: route.params.id, }, staticdata.token))
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      setCliked(false)
    }, [])
  );

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.darkSemiBold14, { textAlign: 'center', color: JSON.parse(getSinglePageChat.resiverUser?.name)?.color?.title ? JSON.parse(getSinglePageChat.resiverUser?.name)?.color?.title : "black", fontFamily: JSON.parse(getSinglePageChat.resiverUser?.name)?.font }]}>{JSON.parse(getSinglePageChat.resiverUser.name)?.name}</Text>

    } catch (error) {
      return <Text style={[Styles.darkSemiBold14, { textAlign: 'center', }]}> {getSinglePageChat.resiverUser.name}</Text >
    }
  }





  return <View style={[Styles.flexSpaceBetween, styles.header]}>
    <DelateModal
      Confirm={() => Confirm()}
      confirmText={t(mainData.lang).Delete}
      title={t(mainData.lang).Areyousureyouwanttodelete}

      show={show}
      setModalVisible={(e) => setShow(e)}
    />
    <View style={Styles.flexAlignItems}>
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
        <BackArrow />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        disabled={clicked}
        onPress={() => NavigateUserPage()}
        style={[{ marginHorizontal: 20 }, Styles.flexAlignItems]}>
        <Image
          style={styles.img}
          source={{
            uri: `https://chambaonline.pro/uploads/${getSinglePageChat.resiverUser.avatar}`,
          }}
        />
        <View style={{ marginHorizontal: 5 }}>
          {canParseJSON(getSinglePageChat.resiverUser.name)}
        </View>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.menuSvg} onPress={() => handlePresentModalPress()}>
      <MenuSvg />
    </TouchableOpacity>
    <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={{ paddingHorizontal: 20 }}>
        {data.length > 0 && <TouchableOpacity
          onPress={() => {
            setShow(true)
          }}
          style={{ marginBottom: 20, marginTop: 20 }}>
          <Text style={Styles.darkRegular14}>Удалить переписку</Text>
        </TouchableOpacity>}
        <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => addToBlackList()}>
          <Text style={Styles.darkRegular14}>{isInblack ? 'Удалить из черного списка' : 'В черный список'}</Text>
        </TouchableOpacity>
      </View>
    </BootomModal>
  </View>
}
const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
    paddingHorizontal: 15,
    zIndex: 999,
    backgroundColor: 'white'
  },
  img: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  menuSvg: {
    width: 30,
    height: 30,
    alignItems: 'flex-end'
  }
});
