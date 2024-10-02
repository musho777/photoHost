import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { ArrowSvg } from "../../assets/svg/Svgs"
import { Styles } from "../../styles/Styles"
import { AppColors } from "../../styles/AppColors";


export const FieldWithArrow = ({ onPress, text }) => {

  return <TouchableOpacity onPress={() => onPress()} style={styles.wrapeer}>
    <Text style={Styles.darkSemiBold14}>{text}</Text>
    <ArrowSvg />
  </TouchableOpacity>
}
const styles = StyleSheet.create({
  wrapeer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.Solitude_Color,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  }
})