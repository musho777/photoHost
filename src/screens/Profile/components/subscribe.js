import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../../styles/Styles"

export const Subscribe = ({ user }) => {

  return <TouchableOpacity
    activeOpacity={1}
    style={styles.alignItemsCenter}
    onPress={() => user.tochable && user?.func()}
  >
    <Text style={Styles.darkSemiBold16}>{user.count}</Text>
    <Text style={Styles.balihaiRegular12}>{user.title}</Text>
  </TouchableOpacity>
}
const styles = StyleSheet.create({
  alignItemsCenter: {
    alignItems: 'center'
  },
  wrapper: {
    marginVertical: 20,
    paddingHorizontal: 15
  }
});
