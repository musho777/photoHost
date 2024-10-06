import { StyleSheet, Text, View } from "react-native"
import { t } from '../../components/lang';
import { useSelector } from "react-redux";
import { SelectItem } from "../../components/SelectItems";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sound from "react-native-sound";
import { Styles } from "../../styles/Styles";


export const Soundsandnotifications = () => {
  const mainData = useSelector(st => st.mainData);
  const [active, setActive] = useState()


  const music = new Sound('sms.mp3', Sound.MAIN_BUNDLE, (error) => { });
  const bell = new Sound('bell.mp3', Sound.MAIN_BUNDLE, (error) => { });



  const getActive = async () => {
    let not = await AsyncStorage.getItem("notification")
    setActive(not)
  }
  const setActiveNot = async (value) => {
    await AsyncStorage.setItem("notification", value)
    if (value == 'funy') {
      music.play()
      setTimeout(() => {
        music.stop()
      }, 2000);
    }
    if (value == 'bell') {
      bell.play()
      setTimeout(() => {
        bell.stop()
      }, 2000);
    }
    setActive(value)
  }
  useEffect(() => {
    getActive()
  }, [])



  return <View style={styles.wrapper}>
    {/* <Text></Text> */}
    <Text onPress={() => setActiveNot("off")} style={[Styles.darkMedium16, active == 'off' && { color: '#FFD953' }]}>{t(mainData.lang).Off}</Text>
    <Text onPress={() => setActiveNot("standart")} style={[Styles.darkMedium16, active == 'standart' && { color: '#FFD953' }]}>{t(mainData.lang).Standardnotification}</Text>
    <Text onPress={() => setActiveNot("funy")} style={[Styles.darkMedium16, active == 'funy' && { color: '#FFD953' }]}>{t(mainData.lang).Funnynotification}</Text>
    <Text onPress={() => setActiveNot("bell")} style={[Styles.darkMedium16, active == 'bell' && { color: '#FFD953' }]}>{t(mainData.lang).bell}</Text>
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    gap: 15,
    marginTop: 20
  }
})