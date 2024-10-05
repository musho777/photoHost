import { StyleSheet, View } from "react-native"
import { t } from '../../components/lang';
import { useSelector } from "react-redux";
import { SelectItem } from "../../components/SelectItems";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Soundsandnotifications = () => {
  const mainData = useSelector(st => st.mainData);
  const [active, setActive] = useState("standart")
  const getActive = async () => {
    let not = await AsyncStorage.getItem("notification")
    if (!not) {
      not = 'standart'
    }
    setActive(not)
  }
  const setActiveNot = async (value) => {
    await AsyncStorage.setItem("notification", value)
    setActive(value)

  }
  useEffect(() => {
    getActive()
  }, [])
  return <View style={styles.wrapper}>
    <SelectItem onPress={() => setActiveNot("off")} active={active == "off"} text={t(mainData.lang).Off} />
    <SelectItem onPress={() => setActiveNot("standart")} active={active == "standart"} text={t(mainData.lang).Standardnotification} />
    <SelectItem onPress={() => setActiveNot("funy")} active={active == "funy"} text={t(mainData.lang).Funnynotification} />
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    gap: 15,
    marginTop: 20
  }
})