import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CheckMarkUserSvg } from "../../../../assets/svg/Svgs"
import { Styles } from "../../../../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export const HeaderInfo = ({ user, data }) => {
  const navigation = useNavigation()
  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const [day, setDay] = useState('')

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.whiteSemiBold14]}>{JSON.parse(jsonString).name}</Text>

    } catch (error) {
      return <Text style={[Styles.whiteSemiBold14,]}>{jsonString}</Text>
    }
  }


  useEffect(() => {
    const currentDate = new Date(data?.created_at);
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
  }, [data?.created_at])

  return <TouchableOpacity
    activeOpacity={1}
    onPress={() =>
      user?.data?.id != data?.user.id ? navigation.push('SearchProfil', { screen: "SearchProfils", params: { id: data.user.id, post_id: data.id } }) :
        navigation.navigate('TabNavigation', { screen: "ProfileNavigation" })
    } style={Styles.flexAlignItems}>
    <View>
      <Image style={styles.userImg}
        source={{ uri: `https://chambaonline.pro/uploads/${data?.user.avatar}` }} />
    </View>
    <View style={{ gap: 2, width: '75%' }}>
      <View style={[Styles.flexAlignItems, { width: '100%', gap: 8 }]}>
        {canParseJSON(data?.user?.name)}
        {/* <Text style={[Styles.whiteSemiBold14, { color: JSON.parse(user?.name)?.color?.title ? JSON.parse(user?.name)?.color?.title : "black", fontFamily: JSON.parse(user?.name)?.font }]}>{JSON.parse(user?.name)?.name}</Text> */}
        {data?.user.star > 0 && <CheckMarkUserSvg />}
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