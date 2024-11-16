import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "../../../../styles/Styles"
import { AppColors } from "../../../../styles/AppColors";
import { useEffect, useState } from "react";
import { Emojy } from "../../../../assets/svg/Svgs";

export const Fild = ({ bB = 1, placeholder, value, hadnelChange, svg, multiline, discription, setIsOpen }) => {
  const fontFamily = [
    "Montserrat-Regular",
    "PlaywriteGBS-Regular",
    'RussoOne-Regular',
    'Agdasima-Regular',
    'Caveat-Regular',
    'Comfortaa-Regular',
    'CormorantGaramond-Regular',
    'Jost-Regular',
    'Lobster-Regular',
    'NotoSansHK-Regular',
    'Pacifico-Regular',
    'Tiny5-Regular',
    "AdventPro_Expanded-Regular",
    "Alice-Regular",
    "AmaticSC-Regular",
    "BadScript-Regular",
    "DelaGothicOne-Regular",
    "Geologica_Auto-Regular",
    "PlayfairDisplaySC-Regular",
    "RubikMonoOne-Regular",
    "Unbounded-Regular",
    "YanoneKaffeesatz-Regular",
    "AlegreyaSansSC-Regular",
    "BalsamiqSans-Regular",
    "CormorantInfant-Regular",
    "DaysOne-Regular",
    "MarckScript-Regular",
    "Pattaya-Regular",
    "ProstoOne-Regular",
    "RubikSprayPaint-Regular",
    "SofiaSansExtraCondensed-Regular"
  ]
  const [activeFont, setActicveFont] = useState("Montserrat-Regular")
  const [activeColor, setActiveColor] = useState({ title: '#000000', id: 1 })
  const [localValue, setLocalValue] = useState(value)
  useEffect(() => {
    if (discription && value) {
      setLocalValue(JSON.parse(value).text)
      setActiveColor(JSON.parse(value)?.color)
      setActicveFont(JSON.parse(value)?.font)

    }
  }, [value])
  const color = [
    { title: '#000000', id: 1 },
    { title: '#808080', id: 3 },
    { title: '#FF5733', id: 4 },
    { title: '#1E90FF', id: 6 },
    { title: '#4682B4', id: 7 },
    { title: '#4CAF50', id: 8 },
    { title: '#FFD700', id: 9 },
    { title: '#FF69B4', id: 10 },
    { title: '#800080', id: 11 },
    { title: '#8B0000', id: 12 },

    { title: '#FFA500', id: 13 },
    { title: '#87CEEB', id: 14 },
    { title: '#FF4500', id: 16 },
    { title: '#32CD32', id: 17 },
    { title: '#DA70D6', id: 18 },
    { title: '#708090', id: 19 },
  ]


  const ChnageData = (e, font, color) => {
    if (discription) {
      setLocalValue(e)
      hadnelChange(JSON.stringify({ text: e, color: color, font: font }))
    }
    else {
      hadnelChange(e)
    }
  }

  if (discription) {
    return <View >
      <View style={[styles.textWrapper, { borderBottomWidth: 1, height: 'auto' }]}>
        {svg && <View style={{ width: 20, marginRight: 10 }}>
          {svg}
        </View>}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'#8C9CAB'}
          multiline={multiline}
          value={localValue}
          maxLength={100}
          onChangeText={e => ChnageData(e, activeFont, activeColor)}
          style={[Styles.balihaiMedium14, { height: 'auto', width: '90%', color: activeColor.title, fontFamily: activeFont }]}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={[Styles.balihaiMedium10, { paddingHorizontal: 17 }]}>Выбрать шрифт и цвет для описания о себе</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 17, alignItems: 'center', marginVertical: 10 }}>
          {fontFamily.map((elm, i) => {
            return <Text onPress={() => {
              ChnageData(localValue, elm, activeColor)
              setActicveFont(elm)
            }} key={i} style={{ fontSize: 10, fontFamily: elm }}>{elm}</Text>
          })}
        </ScrollView>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 17, alignItems: 'center', height: 20 }}>
          {color.map((elm, i) => {
            return <TouchableOpacity onPress={() => {
              ChnageData(localValue, activeFont, elm)
              setActiveColor(elm)
            }} key={i} style={{ width: 20, height: 20, backgroundColor: elm.title, borderRadius: 20, }} />
          })}
        </ScrollView>
      </View>

    </View>
  }

  return <View >
    <View style={[styles.textWrapper, { borderBottomWidth: bB }]}>
      {svg && <View style={{ width: 20, marginRight: 10 }}>
        {svg}
      </View>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#8C9CAB'}
        multiline={multiline}
        value={value}
        onChangeText={e => ChnageData(e, activeFont, activeColor)}
        style={[Styles.balihaiMedium14, { height: 'auto', width: '90%', fontFamily: activeFont, paddingHorizontal: 0 }]}
      />
    </View>
  </View>
}
const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
    borderColor: AppColors.Solitude_Color,
    // borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  emojy: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: 10,
    top: 0,
    bottom: 10
  }
});
