import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../../styles/Styles";
import { CheckMarkUserSvg } from "../../assets/svg/Svgs";

export const HeaderInfo = ({ avatar, name, user, userID, data, created_at }) => {
  const navigation = useNavigation()
  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.whiteSemiBold14, { color: JSON.parse(jsonString)?.color?.title ? JSON.parse(jsonString)?.color?.title : "black", fontFamily: JSON.parse(jsonString)?.font, marginTop: -2 }]}>{JSON.parse(jsonString).name}</Text>
    } catch (error) {
      return <Text style={[Styles.whiteSemiBold14, { marginTop: -2 }]}>{jsonString}</Text>
    }
  }


  const formatDate = (dateString) => {
    const currentDate = new Date(dateString);
    const dayOfMonth = String(currentDate.getDate()).padStart(2, '0');
    const hour = String(currentDate.getHours()).padStart(2, '0');
    const minute = String(currentDate.getMinutes()).padStart(2, '0');
    const month = mounth[currentDate.getMonth()];
    return `${dayOfMonth} ${month} в ${hour}:${minute}`;
  };

  return <TouchableOpacity
    activeOpacity={1}
    onPress={() =>
      user?.data?.id != userID ? navigation.push('SearchProfil', { screen: "SearchProfils", params: { id: data?.user.id, post_id: data?.id } }) :
        navigation.navigate('TabNavigation', { screen: "ProfileNavigation" })
    } style={[Styles.flexAlignItems]}>
    <View>
      <Image style={styles.userImg}
        source={{ uri: `https://chambaonline.pro/uploads/${avatar}` }} />
    </View>
    <View style={styles.nameBlock}>
      <View style={[Styles.flexAlignItems, { width: '100%', gap: 8 }]}>
        {canParseJSON(name)}
        {/* {data?.user.star > 0 && <CheckMarkUserSvg />} */}
      </View>
      <Text style={[Styles.whiteMedium9]}>{formatDate(created_at)}</Text>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  userImg: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
  nameBlock: {
    // gap: 2,
    width: '75%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // height: 40
  },
  infoBlock: {
    position: 'absolute',
    right: 20,
    top: 50,
    elevation: 5,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 1
  },
});