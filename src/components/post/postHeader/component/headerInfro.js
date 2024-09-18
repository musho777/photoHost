import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CheckMarkUserSvg } from "../../../../assets/svg/Svgs"
import { Styles } from "../../../../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export const HeaderInfo = ({ star, userName, userImg, userId, id, user, data }) => {
  const navigation = useNavigation()
  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const [day, setDay] = useState('')

  useEffect(() => {
    const currentDate = new Date(data);
    let dayOfMonth = currentDate.getDate();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    const Mounth = currentDate.getMonth()
    if (minute <= 9) {
      minute = `0${minute}`
    }
    if (hour <= 9) {
      hour = `0${hour}`
    }
    if (dayOfMonth <= 9) {
      dayOfMonth = `0${dayOfMonth}`
    }
    setDay(`${dayOfMonth} ${mounth[Mounth]} в ${hour}:${minute}`)
  }, [data])

  return <TouchableOpacity onPress={() =>
    user?.data.id != userId ? navigation.push('SearchProfil', { screen: "SearchProfils", params: { id: userId, post_id: id } }) :
      navigation.replace('TabNavigation', { screen: "ProfileNavigation" })
  } style={Styles.flexAlignItems}>
    <View>
      <Image style={styles.userImg}
        source={{ uri: `https://chambaonline.pro/uploads/${userImg}` }} />
    </View>
    <View style={{ gap: 2 }}>
      <View style={[Styles.flexAlignItems, { width: 'auto' }]}>
        <Text Text style={[Styles.whiteSemiBold14,]}>{userName}</Text>
        {star > 0 && <CheckMarkUserSvg />}
      </View>
      <Text style={[Styles.whiteMedium9]}>{day} </Text>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  userImg: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 50,
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