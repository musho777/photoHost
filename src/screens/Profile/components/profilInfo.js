import { StyleSheet, View } from "react-native"
import { Styles } from "../../../styles/Styles"
import { useNavigation } from "@react-navigation/native"
import { t } from '../../../components/lang';
import { useSelector } from "react-redux";
import { Subscribe } from "./subscribe";


export const ProfilInfo = ({ user }) => {
  const getPosts = useSelector(st => st.getPosts);

  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()
  const data = [
    {
      title: t(mainData.lang).Publications,
      count: getPosts.data.length,
      tochable: false
    },
    {
      title: t(mainData.lang).Subscribers,
      count: user.followersCount,
      tochable: true,
      func: () => navigation.navigate('FollowersScreen', { index: 0 })
    },
    {
      title: t(mainData.lang).Subscriptions,
      count: user.followerCount,
      tochable: true,
      func: () => navigation.navigate('FollowersScreen', { index: 1 })
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
    marginVertical: 20,
    paddingHorizontal: 15
  }
});
