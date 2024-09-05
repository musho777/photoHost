import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../styles/Styles";
import { useNavigation } from "@react-navigation/native";

export const SharePost = ({ from, avatar, post, name, id, my }) => {
  const navigation = useNavigation()
  return <TouchableOpacity activeOpacity={1} onPress={() => my ?
    navigation.navigate('ProfileNavigation') :
    navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: id } })
  }
    style={[styles.body, from ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }]}>
    <View style={styles.postHeader}>
      <Image style={styles.avatar} source={{ uri: `https://chambaonline.pro/uploads/${avatar}` }} />
      <Text style={[Styles.balihaiMedium14, { color: 'white' }]}>{name}</Text>
    </View>
    <Image style={styles.post} source={{ uri: `https://chambaonline.pro/uploads/${post}` }} />
  </TouchableOpacity>
}
const styles = StyleSheet.create({
  body: {
    margin: 10,
    width: 300,
    position: 'relative',
    marginBottom: 20,
  },
  post: {
    width: 300,
    height: 500,
    justifyContent: 'center',
    borderRadius: 20
  },
  avatar: {
    borderRadius: 50,
    width: 40,
    height: 40
  },
  postHeader: {
    flexDirection: 'row',
    paddingBottom: 10,
    gap: 15,
    alignItems: 'center',
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 999,
  }
});