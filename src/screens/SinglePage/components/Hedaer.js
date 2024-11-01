import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Styles } from "../../../styles/Styles";
import { BackArrow, WhiteBackArrow } from "../../../assets/svg/Svgs";
import { MenuSvg, WhiteMenuSvg } from "../../../assets/svg/TabBarSvg";
import { ShowSave } from "../../../components/post/showSave";
import { MyBootomModal } from "./MyBootomModal";
import { BootomModalComponent } from "./BootomModal";
import { BootomModal } from "../../../components/BootomSheet";
import { useSelector } from "react-redux";


export const Header = ({ data, navigation, my, big = false, activeImage }) => {
  const user = useSelector(st => st.userData);
  const [showSave, setShowSave] = useState(false)
  const [saveType, setSaveType] = useState('Запись сохранена в закладках')
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['13%'], [],);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSave(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [showSave]);



  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return <View >
    <ShowSave showSave={showSave} saveType={saveType} setShowSave={(e) => setShowSave(e)} />
    <View style={[Styles.flexSpaceBetween, styles.header]}>
      <TouchableOpacity style={styles.goBack} onPress={() => { navigation.goBack() }}>
        {big ? <WhiteBackArrow /> : <BackArrow />}
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => handlePresentModalPress()} style={styles.MenuSvg}>
        {big ? <WhiteMenuSvg /> : <MenuSvg />}
      </TouchableOpacity> */}
    </View>
    <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={{ position: 'absolute' }}>
        {my ?
          <MyBootomModal
            ref={bottomSheetRef}
            navigation={navigation}
            id={data.id}
            description={data.description}
            activeImage={activeImage}
            data={data}
          />
          :
          <BootomModalComponent
            ref={bottomSheetRef}
            setSaveType={(e) => setSaveType(e)}
            id={data.id}
            setShowSave={() => setShowSave(true)}
            navigation={navigation}
            isBook={data?.auth_user_book?.findIndex((elm) => elm.user_id == user.data.id)}
            user={user}
            otherUserId={data.user.id}
            description={data.description}
          />
        }
      </View>
    </BootomModal>
  </View>
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    marginTop: 20,
    zIndex: 9999
  },
  MenuSvg: {
    marginTop: -7,
    paddingLeft: 15,
    height: 40,
  },
  goBack: {
    height: 45,
    width: 50,
  }
})