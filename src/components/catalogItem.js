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
    <View style={{ width: 60, height: 50, }}>
      <Image width={60} height={50}
        style={{ objectFit: 'contain' }}
        source={{ uri: `https://chambaonline.pro/uploads/${data.photo}` }}
      />
    </View>
    <View style={{ height: 43 }}>
      <Text style={[Styles.darkMedium11, { textAlign: 'center', }]}>{data.name}</Text>
    </View>
  </TouchableOpacity>
}

const style = StyleSheet.create({
  CatalogItem: {
    backgroundColor: 'rgb(245, 245, 245)',
    width: '48%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 130,
    borderRadius: 10,
    gap: 7,
    paddingHorizontal: 5,
  },
  select: {
    position: 'absolute',
    right: 10,
    top: 10
  }
})