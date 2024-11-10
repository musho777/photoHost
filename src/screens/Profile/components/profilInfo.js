import { StyleSheet, View } from "react-native"
import { Styles } from "../../../styles/Styles"
import { useNavigation } from "@react-navigation/native"
import { t } from '../../../components/lang';
import { useSelector } from "react-redux";
import { Subscribe } from "./subscribe";


export const ProfilInfo = ({ id, user, postCount, loading }) => {

  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()
  const data = [
    {
      title: t(mainData.lang).Publications,
      count: !loading && postCount,
      tochable: false
    },
    {
      title: t(mainData.lang).Subscribers,
      count: !loading && user.followersCount,
      tochable: true,
      func: () => navigation.navigate('FollowersScreen', { index: 0, id })
    },
    {
      title: t(mainData.lang).Subscriptions,
      count: !loading && user.followerCount,
      tochable: true,
      func: () => navigation.navigate('FollowersScreen', { index: 1, id })
    },

  ]
  return <View style={[styles.wrapper, Styles.flexSpaceBetween]}>{
    data.map((elm, i) => {
      return <Subscribe key={i} user={elm} />
    })}
  </View>
}
const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    paddingHorizontal: 15,
  }
});
