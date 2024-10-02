import { View, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { t } from '../../components/lang';
import { FieldWithArrow } from "../../components/fieldWithArrow";
import { useNavigation } from "@react-navigation/native";

export const Settings = () => {
  const mainData = useSelector((st) => st.mainData)
  const navigation = useNavigation()
  return <View>
    <FieldWithArrow onPress={() => navigation.navigate("Soundsandnotifications")} text={t(mainData.lang).Soundsandnotifications} />
  </View>
}

const styles = StyleSheet.create({

})