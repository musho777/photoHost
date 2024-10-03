import { View } from "react-native"
import { FieldWithArrow } from "../../components/fieldWithArrow"
import { t } from '../../components/lang';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


export const Soundsandnotifications = () => {
  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()
  return <View>
    <FieldWithArrow text={t(mainData.lang).Subscribed} />
    <FieldWithArrow onPress={() => navigation.navigate("LikeNotification")} text={t(mainData.lang).Like} />
    <FieldWithArrow text={t(mainData.lang).comments} />
    <FieldWithArrow text={t(mainData.lang).Messages} />
  </View>
}