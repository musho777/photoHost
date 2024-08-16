import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SelectedSvg } from "../../../assets/svg/Svgs"
import { Styles } from "../../../styles/Styles"

export const TypeBlock = ({ selected, setSelected, title, type }) => {
  return <TouchableOpacity onPress={() => { setSelected(type) }} style={[styles.shadowProp, styles.CatalogItem]}>
    <Text style={Styles.darkMedium12}>{title}</Text>
    <View style={styles.select}>
      {selected == type && <SelectedSvg />}
    </View>
  </TouchableOpacity>
}
// legal
// Individual
const styles = StyleSheet.create({
  CatalogItem: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingLeft: 30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  select: {
    position: 'absolute',
    left: 10,
  }
})