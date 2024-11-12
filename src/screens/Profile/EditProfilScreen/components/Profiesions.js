import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DownArrow, ProfetionsSvg } from "../../../../assets/svg/Svgs"
import { useState } from "react"
import { Styles } from "../../../../styles/Styles"
import { AppColors } from "../../../../styles/AppColors"
import { t } from '../../../../components/lang';
import { useSelector } from "react-redux"
import { ProfesionsModal } from "./ProfesionsModal"

export const Profiesions = ({ setLocation, loaction }) => {
  const [city, setCity] = useState(false)
  const mainData = useSelector(st => st.mainData);
  return <View>
    <TouchableOpacity activeOpacity={1} onPress={() => setCity(true)} style={[styles.textWrapper2]}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ width: 20, marginRight: 10 }}>
          <ProfetionsSvg />
        </View>
        <Text style={[Styles.balihaiRegular14]}>{loaction ? loaction : t(mainData.lang).ProfessionFieldofactivity}</Text>
      </View>
      <DownArrow />
    </TouchableOpacity>
    <View style={{ position: 'absolute' }}>
      {city && <ProfesionsModal onPress={(e) => setLocation(e)} close={() => setCity(false)} visible={city} />}
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
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: "space-between"
  },
});

