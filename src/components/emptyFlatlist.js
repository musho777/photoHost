import { Image, StyleSheet, Text, View } from 'react-native'
import { Styles } from '../styles/Styles'

export const EmptyFlatlist = ({ text, loading }) => {
  if (!loading) {
    return <View style={styles.wrapper}>
      <Image source={require('../assets/img/camera.png')} />
      <Text style={Styles.darkMedium16}>{text}</Text>
    </View>
  }
  return
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
})