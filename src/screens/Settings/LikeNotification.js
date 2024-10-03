import { Text, View } from "react-native"
import { SelectItem } from "../../components/SelectItems"
import { Styles } from "../../styles/Styles"
import { t } from '../../components/lang';
import { useSelector } from "react-redux";

export const LikeNotification = () => {
  const mainData = useSelector(st => st.mainData);

  return <View style={{ paddingHorizontal: 15, gap: 15, marginTop: 20 }}>
    <Text style={Styles.darkSemiBold16}>Отметки "Нравится"</Text>
    <SelectItem text={t(mainData.lang).Off} />
    <SelectItem text={t(mainData.lang).Standardnotification} />
    <SelectItem text={t(mainData.lang).Funnynotification} />
  </View>
}