import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { StartSvg } from "../../assets/svg/Svgs"
import { useNavigation } from "@react-navigation/native"

const windowWidth = Dimensions.get('window').width;

export const ImageComponent = ({ video, photo, my, data }) => {

  const navigation = useNavigation()
  return <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('SinglPageScreen', { data: data, my: my })}>
    {video &&
      <View style={styles.playerIcone}>
        <StartSvg />
      </View>
    }
    <Image
      style={styles.img}
      source={{ uri: `https://chambaonline.pro/uploads/${photo}`, }}
    />
  </TouchableOpacity>
}
const styles = StyleSheet.create({
  img: {
    width: windowWidth / 2 - 25,
    height: windowWidth / 2 - 25,
    borderRadius: 15,
  },
  playerIcone: {
    position: 'absolute',
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
});

