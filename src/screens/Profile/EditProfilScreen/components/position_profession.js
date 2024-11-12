import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DownArrow, Otrastel } from "../../../../assets/svg/Svgs"
import { useState } from "react"
import { Styles } from "../../../../styles/Styles"
import { AppColors } from "../../../../styles/AppColors"
import { Position_professionModal } from "./position_professionModal"

export const Position_profession = ({ setLocation, loaction }) => {
  const [city, setCity] = useState(false)
  return <View>
    <TouchableOpacity activeOpacity={1} onPress={() => setCity(true)} style={[styles.textWrapper2, { paddingVertical: 15, justifyContent: "space-between" }]}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ width: 20, marginRight: 10 }}>
          <Otrastel />
        </View>
        <Text style={[Styles.balihaiRegular14]}>{loaction ? loaction : 'Сфера/отрасль'}</Text>
      </View>
      <DownArrow />
    </TouchableOpacity>
    <View style={{ position: 'absolute' }}>
      {city && <Position_professionModal onPress={(e) => setLocation(e)} close={() => setCity(false)} visible={city} />}
    </View>
  </View>
}
const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  edit: {
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
  textWrapper2: {
    paddingHorizontal: 15,
    borderBottomColor: AppColors.Solitude_Color,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
});

