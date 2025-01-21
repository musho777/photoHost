import { Image, ScrollView, View } from "react-native"

export const ChangeBegraundStyle = () => {
  return <View style={{ gap: 40 }}>
    <ScrollView contentContainerStyle={{ gap: 30 }}>
      <Image resizeMode="contain" style={{ width: '100%', height: 525 }} source={require('../../assets/img/bg1.png')} />
      <Image resizeMode="contain" style={{ width: '100%', height: 525 }} source={require('../../assets/img/bg2.png')} />
    </ScrollView >
  </View>
}
