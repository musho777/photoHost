import { View, StyleSheet, StatusBar } from "react-native"
import { useSelector } from "react-redux"
import { t } from '../../components/lang';
import { FieldWithArrow } from "../../components/fieldWithArrow";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export const Settings = () => {
  const mainData = useSelector((st) => st.mainData)
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setTranslucent(false);
    }, [])
  );


  return <View>
    <FieldWithArrow onPress={() => navigation.navigate("Soundsandnotifications")} text={t(mainData.lang).Soundsandnotifications} />
    <FieldWithArrow onPress={() => navigation.navigate("ChangeBegraundStyle")} text={t(mainData.lang).ChangeBackgroundStyle} />
  </View>
}

const styles = StyleSheet.create({

})