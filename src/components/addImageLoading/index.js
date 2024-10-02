import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Styles } from '../../styles/Styles'
import FastImage from 'react-native-fast-image'

export const AddImageLoading = ({ uri }) => {
  return <SafeAreaView style={styles.wrapper}>
    <View style={styles.loadingVidio}>
      <Image source={{ uri: uri }} style={styles.image} />
      <Text style={Styles.homeTitle}>Загрузка</Text>
      <FastImage source={require('../../assets/img/loading4.gif')} style={styles.loading} />
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  loadingVidio: {
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingRight: 0,
    height: 60,
    flexDirection: "row",
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  loading: {
    width: 66,
    height: 50,
    marginLeft: -25,
    marginBottom: -3
  },
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    zIndex: 999
  }
})
