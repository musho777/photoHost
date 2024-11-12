import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../styles/Styles";
import { useNavigation } from "@react-navigation/native";

export const SharePost = ({ onLongPress, from, avatar, post, name, id, my, postData, openSelet }) => {
  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.balihaiMedium14, { color: JSON.parse(name)?.color?.title, fontFamily: JSON.parse(name)?.font }]}>{JSON.parse(name)?.name}</Text>

    } catch (error) {
      return <Text style={[Styles.balihaiMedium14]}> {getSinglePageChat.resiverUser.name}</Text >
    }
  }
  const fone = [
    require('../../assets/img/fon/1.jpg'),
    require('../../assets/img/fon/2.jpg'),
    require('../../assets/img/fon/3.jpg'),
    require('../../assets/img/fon/4.jpg'),
    require('../../assets/img/fon/5.jpg'),



    require('../../assets/img/fon/6.jpg'),
    require('../../assets/img/fon/10.jpg'),
    require('../../assets/img/fon/11.jpg'),
    require('../../assets/img/fon/12.jpg'),
    require('../../assets/img/fon/13.jpg'),
    require('../../assets/img/fon/14.jpg'),
    require('../../assets/img/fon/15.jpg'),
    require('../../assets/img/fon/20.jpg'),
    require('../../assets/img/fon/21.jpg'),
    require('../../assets/img/fon/23.webp'),
    require('../../assets/img/fon/24.webp'),
    require('../../assets/img/fon/26.webp'),
    require('../../assets/img/fon/27.webp'),
    require('../../assets/img/fon/30.webp'),
    require('../../assets/img/fon/35.jpeg'),
    require('../../assets/img/fon/36.jpeg'),
    require('../../assets/img/fon/37.jpeg'),
    require('../../assets/img/fon/38.jpeg'),
    require('../../assets/img/fon/39.jpeg'),
    require('../../assets/img/fon/40.jpeg'),
    require('../../assets/img/fon/41.jpeg'),
    require('../../assets/img/fon/42.jpeg'),
    require('../../assets/img/fon/43.jpeg'),
    require('../../assets/img/fon/44.jpeg'),
    require('../../assets/img/fon/45.jpeg'),
    require('../../assets/img/fon/46.jpeg'),
    require('../../assets/img/fon/47.jpeg'),
    require('../../assets/img/fon/48.jpeg'),
    require('../../assets/img/fon/49.jpeg'),
    require('../../assets/img/fon/50.jpeg'),
    require('../../assets/img/fon/51.jpeg'),
    require('../../assets/img/fon/52.jpeg'),
    require('../../assets/img/fon/53.jpeg'),
    require('../../assets/img/fon/54.jpeg'),
    require('../../assets/img/fon/55.jpeg'),
    require('../../assets/img/fon/56.jpeg'),
    require('../../assets/img/fon/57.jpeg'),
    require('../../assets/img/fon/58.jpeg'),
    require('../../assets/img/fon/59.jpeg'),
    require('../../assets/img/fon/60.jpeg'),
    require('../../assets/img/fon/61.jpeg'),
    require('../../assets/img/fon/62.jpeg'),
    require('../../assets/img/fon/63.jpeg'),
    require('../../assets/img/fon/64.jpeg'),
    require('../../assets/img/fon/65.jpeg'),
    require('../../assets/img/fon/66.jpeg'),
    require('../../assets/img/fon/67.jpeg'),
    require('../../assets/img/fon/68.jpeg'),
    require('../../assets/img/fon/69.jpeg'),
    require('../../assets/img/fon/70.jpeg'),
    require('../../assets/img/fon/71.jpeg'),
    require('../../assets/img/fon/72.jpeg'),
    require('../../assets/img/fon/73.jpeg'),
    require('../../assets/img/fon/74.jpeg'),
    require('../../assets/img/fon/75.jpeg'),
    require('../../assets/img/fon/76.jpeg'),
    require('../../assets/img/fon/77.jpeg'),
    require('../../assets/img/fon/78.jpeg'),
    require('../../assets/img/fon/80.jpeg'),
    require('../../assets/img/fon/81.jpeg'),
    require('../../assets/img/fon/82.jpeg'),
    require('../../assets/img/fon/83.jpeg'),
    require('../../assets/img/fon/84.jpeg'),
    require('../../assets/img/fon/86.jpeg'),
    require('../../assets/img/fon/87.jpeg'),
    require('../../assets/img/fon/88.jpeg'),
    require('../../assets/img/fon/89.jpeg'),
    require('../../assets/img/fon/90.jpeg'),
    require('../../assets/img/fon/91.jpeg'),
    require('../../assets/img/fon/92.jpeg'),
    require('../../assets/img/fon/93.jpeg'),
    require('../../assets/img/fon/94.jpeg'),
    require('../../assets/img/fon/95.jpeg'),
    require('../../assets/img/fon/96.jpeg'),
    require('../../assets/img/fon/97.jpeg'),
    require('../../assets/img/fon/98.jpeg'),
    require('../../assets/img/fon/99.jpeg'),
    require('../../assets/img/fon/100.jpeg'),



  ]

  const Navigate = () => {
    if (my) {
      navigation.navigate('ProfileNavigation')
    }
    else {
      navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: id } })
    }
  }


  const navigation = useNavigation()
  return <TouchableOpacity
    disabled={openSelet}
    onLongPress={onLongPress}
    activeOpacity={1}
    onPress={() => Navigate()

    }
    style={[styles.body, from ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }]}>
    <View style={styles.postHeader}>
      <Image style={styles.avatar} source={{ uri: `https://chambaonline.pro/uploads/${avatar}` }} />
      {canParseJSON(name)}
    </View>
    {postData?.background ?
      <View>
        <Image source={fone[postData?.background - 1]} style={styles.post} />
        <View style={styles.textWrapper}>
          <Text style={{ padding: 10, textAlign: 'center', color: postData?.color, fontFamily: postData?.font_family, fontSize: JSON.parse(postData?.font_size) }}>{JSON.parse(postData?.description)}</Text>
        </View>
      </View> :
      <Image style={styles.post} source={{ uri: `https://chambaonline.pro/uploads/${post}` }} />
    }
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
  },
  textWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 500,
  },
});