import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { BackArrow } from "../../../assets/svg/Svgs"
import { Styles } from "../../../styles/Styles"
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MenuSvg } from "../../../assets/svg/TabBarSvg";
import { useCallback, useMemo, useRef, useState } from "react";
import { BootomModal } from "../../../components/BootomSheet";
import { AddBlackListAction, DelateChatAction } from "../../../store/action/action";

export const Header = ({ data, route }) => {
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const navigation = useNavigation()
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['18%'], []);
  const [isInblack, setIsInblack] = useState(false)
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);

  const addToBlackList = () => {
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ 'user_id': route.params.id }, staticdata.token))
    setIsInblack(!isInblack)
  }
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return <View
    style={[Styles.flexSpaceBetween, styles.header]}>
    <View style={Styles.flexAlignItems}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackArrow />
      </TouchableOpacity>
      <View style={[{ marginHorizontal: 20 }, Styles.flexAlignItems]}>
        <Image
          style={styles.img}
          source={{
            uri: `https://chamba.digiluys.com/uploads/${getSinglePageChat.resiverUser.avatar}`,
          }}
        />
        <View style={{ marginHorizontal: 20 }}>
          <Text style={Styles.darkMedium14}>
            {getSinglePageChat.resiverUser.name}
          </Text>
        </View>
      </View>
    </View>
    <TouchableOpacity style={styles.menuSvg} onPress={() => handlePresentModalPress()}>
      <MenuSvg />
    </TouchableOpacity>
    <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={{ paddingHorizontal: 20 }}>
        {data.length > 0 && <TouchableOpacity
          onPress={() => {
            dispatch(DelateChatAction({ receiver_id: route.params.id, }, staticdata.token))
            navigation.goBack()
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
