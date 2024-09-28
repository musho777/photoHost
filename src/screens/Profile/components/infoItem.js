import { Text, View } from "react-native"
import { Styles } from "../../../styles/Styles"

export const InfoItem = ({ value, svg }) => {
  return <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>
    <View style={{ width: 20 }}>
      {svg}
    </View>
    <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
      {value}
    </Text>
  </View>
}