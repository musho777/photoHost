import { View, StyleSheet, StatusBar } from "react-native"
import { useSelector } from "react-redux"
import { t } from '../../components/lang';
import { FieldWithArrow } from "../../components/fieldWithArrow";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export const Settings = () => {
  const mainData = useSelector((st) => st.mainData)
  const navigation = useNavigation()



  return <View>
    <FieldWithArrow onPress={() => navigation.navigate("Soundsandnotifications")} text={t(mainData.lang).Soundsandnotifications} />
  </View>
}

const styles = StyleSheet.create({

})