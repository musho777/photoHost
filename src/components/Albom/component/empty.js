import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { Styles } from "../../../styles/Styles"
import { t } from "../../lang"


export const Empty = ({ seved }) => {
  const user = useSelector((st) => st.userData)
  const mainData = useSelector(st => st.mainData);

  return <View style={styles.block}>
    {user ?
      <Text style={Styles.darkMedium16}>{t(mainData.lang).noPublications}</Text> :
      <Text style={[Styles.darkMedium16, { textAlign: 'center' }]}>{seved ? t(mainData.lang).Bookmarklistisempty : t(mainData.lang).noPublications}</Text>
    }
  </View>
}
const styles = StyleSheet.create({
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
});