import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Styles } from '../../styles/Styles';



export const AboutApplication = ({ navigation }) => {
  return <View style={{ backgroundColor: 'rgb(12,59,78)', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
    <TouchableOpacity onPress={() => navigation.navigate("VideoSlider")} style={{ backgroundColor: 'white', width: 200, paddingVertical: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={Styles.darkMedium13}>Видео слайдер</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("PhotoSlider")} style={{ backgroundColor: 'white', width: 200, paddingVertical: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={Styles.darkMedium13}>Фото слайдер</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("TextSlider")} style={{ backgroundColor: 'white', width: 200, paddingVertical: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={Styles.darkMedium13}>Текстовая презентация</Text>
    </TouchableOpacity>
  </View>
};