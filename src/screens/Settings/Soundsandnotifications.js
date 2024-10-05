import { StyleSheet, View } from "react-native"
import { t } from '../../components/lang';
import { useSelector } from "react-redux";
import { SelectItem } from "../../components/SelectItems";


export const Soundsandnotifications = () => {
  const mainData = useSelector(st => st.mainData);
  return <View style={styles.wrapper}>
    <SelectItem text={t(mainData.lang).Off} />
    <SelectItem text={t(mainData.lang).Standardnotification} />
    <SelectItem text={t(mainData.lang).Funnynotification} />
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    gap: 15,
    marginTop: 20
  }
})