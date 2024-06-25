import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../styles/Styles"
import { SelectSvg, SelectedSvg } from "../assets/svg/Svgs"

export const CatalogItem = ({ data, onSelect, selected }) => {
  return <TouchableOpacity onPress={() => onSelect(data)} style={style.CatalogItem}>
    <View style={style.select}>
      {!selected ?
        <SelectSvg /> :
        <SelectedSvg />
      }
    </View>
    <View >
      <Image width={35} height={35}
        source={{ uri: `https://chamba.digiluys.com/uploads/${data.photo}` }}
      />
    </View>
    <Text style={[Styles.darkMedium13, { textAlign: 'center' }]}>{data.name}</Text>
  </TouchableOpacity>
}

const style = StyleSheet.create({
  CatalogItem: {
    backgroundColor: 'rgb(245, 245, 245)',
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFD953'
  },
  select: {
    position: 'absolute',
    right: 10,
    top: 10
  }
})