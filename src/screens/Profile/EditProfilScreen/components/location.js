import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DownArrow, LocationSvg } from "../../../../assets/svg/Svgs"
import { useState } from "react"
import { CityModal } from "./CityModal"
import { Styles } from "../../../../styles/Styles"
import { AppColors } from "../../../../styles/AppColors"
import { t } from '../../../../components/lang';
import { useSelector } from "react-redux"

export const Location = ({ setLocation, loaction }) => {
  const [city, setCity] = useState(false)
  const mainData = useSelector(st => st.mainData);

  return <View>
    <TouchableOpacity onPress={() => setCity(true)} style={[styles.textWrapper2, { paddingVertical: 25, justifyContent: "space-between" }]}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <LocationSvg />
        <Text style={[Styles.balihaiRegular14, { marginHorizontal: 10 }]}>{loaction.name ? loaction.name : t(mainData.lang).City}</Text>
      </View>
      <DownArrow />
    </TouchableOpacity>
    {city && <CityModal onPress={(e) => setLocation({ name: e.name, id: e.id })} close={() => setCity(false)} visible={city} />}
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
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
  },
  textWrapper2: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
