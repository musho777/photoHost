import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { SelectedSvg1, SelectSvg } from "../assets/svg/Svgs"
import { Styles } from "../styles/Styles"

export const SelectItem = ({ text, active, onPress }) => {
  return <TouchableOpacity activeOpacity={1} onPress={() => onPress()} style={styles.wrapper}>
    <Text style={Styles.darkSemiBold14}>{text}</Text>
    <View style={{ width: 10 }}>
      {active ?
        <SelectedSvg1 /> :
        <SelectSvg />
      }
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})