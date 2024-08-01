import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../styles/Styles"
import { SelectSvg, SelectedSvg } from "../assets/svg/Svgs"

export const CatalogItem = ({ data, onSelect, selected }) => {
  return <TouchableOpacity
    onPress={() => onSelect(data)}
    style={[style.CatalogItem, style.shadowProp]}
    activeOpacity={1}
  >
    <View style={style.select}>
      {!selected ?
        <SelectSvg /> :
        <SelectedSvg />
      }
    </View>
    <View style={{ width: 140, height: 140 }}>
      <Image width={140} height={150}
        style={{ objectFit: 'contain' }}
        source={{ uri: `https://chambaonline.pro/uploads/${data.photo}` }}
      />
    </View>
    <Text style={[Styles.darkMedium14, { textAlign: 'center', marginTop: 5 }]}>{data.name}</Text>
  </TouchableOpacity>
}

const style = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  CatalogItem: {
    backgroundColor: 'white',
    // backgroundColor: 'rgb(245, 245, 245)',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderRadius: 10,
    gap: 7,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  select: {
    position: 'absolute',
    right: 10,
    top: 10
  }
})