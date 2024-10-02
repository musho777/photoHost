import { View } from "react-native"
import { FieldWithArrow } from "../../components/fieldWithArrow"
import { t } from '../../components/lang';
import { useSelector } from "react-redux";


export const Soundsandnotifications = () => {
  const mainData = useSelector(st => st.mainData);

  return <View>
    <FieldWithArrow text={t(mainData.lang).Subscribed} />
    <FieldWithArrow text={t(mainData.lang).Like} />
    <FieldWithArrow text={t(mainData.lang).comments} />
    <FieldWithArrow text={t(mainData.lang).Messages} />
  </View>
}