import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { Albom } from '../../components/Albom';
import { CheckMarkUserSvg, MenuSvg2 } from '../../assets/svg/Svgs';
import { Menu } from '../../components/Menu';
import { Button } from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostsAction, getUserInfoAction } from '../../store/action/action';

export const ProfileScreen = ({ navigation, profile }) => {

  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getPosts);
  const [page, setPage] = useState(1)
  const user = useSelector(st => st.userData);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(getUserInfoAction(staticdata.token))
      dispatch(GetPostsAction({ user_id: user.data.id }, staticdata.token, 1));
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!Object.keys(user.data).length && staticdata.token) {
      dispatch(GetPostsAction({ user_id: user.data.id }, staticdata.token, 1));
      dispatch(getUserInfoAction(staticdata.token))
    }
  }, [staticdata.token, Object.keys(user.data).length])

  useEffect(() => {
    if (user.data.id) {
      dispatch(GetPostsAction({ user_id: user.data.id }, staticdata.token, 1));
    }
  }, [user.data.id]);

  const [openMenu, setOpenMenu] = useState(false)
  const login = useSelector((st) => st.login)



  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  if (user.loading) {
    return (
      <View style={Styles.loading}>
        <ActivityIndicator size="large" color="#FFC24B" />
      </View>
    );
  }
  else {
    return (
      <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 15 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (getPosts.nextPage) {
                let pages = page + 1
                dispatch(GetPostsAction({ user_id: user.data.id }, staticdata.token, pages));
                setPage(pages)
              }
              // enableSomeButton();
            }
          }}
        >
          <TouchableOpacity
            onPress={() => setOpenMenu(true)}
            style={{ marginVertical: 25 }}>
            <MenuSvg2 />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.img}
              source={{ uri: `https://chamba.justcode.am/uploads/${user.avatar}` }}
            />
            <View style={{ marginTop: 7, marginBottom: 15, alignItems: 'center', marginLeft: 10 }}>
              <View style={Styles.flexAlignItems}>
                <Text style={[Styles.darkMedium16, { marginRight: 5 }]}>{user.name}</Text>
                {user.data.star > 0 &&
                  <CheckMarkUserSvg />
                }
              </View>
              <Text style={[Styles.balihaiRegular12, { marginLeft: -17 }]}>@{user.username}</Text>
            </View>
            {user.data.description && (
              <Text style={Styles.darkRegular14}>{user.description}</Text>
            )}
          </View>
          <View
            style={[
              { marginVertical: 20, paddingHorizontal: 15 },
              Styles.flexSpaceBetween,
            ]}>
            <View style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{user.postCount}</Text>
              <Text style={Styles.balihaiRegular12}>Публикаций</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('FollowersScreen', { index: 0 })}
              style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{user.followersCount}</Text>
              <Text style={Styles.balihaiRegular12}>Подписчиков</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('FollowersScreen', { index: 1 })}
              style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{user.followerCount}</Text>
              <Text style={Styles.balihaiRegular12}>Подписок</Text>
            </TouchableOpacity>
          </View>
          {profile && (
            <View
              style={[
                Styles.flexSpaceBetween,
                { paddingHorizontal: 15, marginVertical: 10 },
              ]}>
              <Button paddingV={10} title={'Подписаться'} width="48%" />
              <Button bg paddingV={10} title={'Сообщение'} width="48%" />
            </View>
          )}
          <Albom loading={getPosts.loading} data={getPosts.data} />
        </ScrollView>
        <Menu close={() => setOpenMenu(false)} visible={openMenu} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
