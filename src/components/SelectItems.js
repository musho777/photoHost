import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { SelectSvg } from "../assets/svg/Svgs"
import { Styles } from "../styles/Styles"

export const SelectItem = ({ text }) => {
  return <TouchableOpacity style={styles.wrapper}>
    <Text style={Styles.darkSemiBold14}>{text}</Text>
    <SelectSvg />
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})