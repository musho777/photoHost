import {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Styles} from '../../styles/Styles';
import {Albom} from '../../components/Albom';
import {AppColors} from '../../styles/AppColors';
import {MenuSvg2} from '../../assets/svg/Svgs';
import {Menu} from '../../components/Menu';
import {Button} from '../../ui/Button';
import { useDispatch, useSelector} from 'react-redux';
import { getUserInfoAction } from '../../store/action/action';

export const ProfileScreen = ({navigation, profile}) => {
  const renderScene = SceneMap({
    first: Albom,
    second: Albom,
    third: Albom,
  });
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(getUserInfoAction(staticdata.token))
    });
    return unsubscribe;
  }, [navigation]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Альбом'},
    {key: 'second', title: 'Закладки'},
  ]);
  const layout = useWindowDimensions();
  const [openMenu,setOpenMenu] = useState(false)
  const user = useSelector(st => st.userData);
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: AppColors.Charcoal_Color,
          height: 2,
          borderRadius: 10,
        }}
        style={{
          backgroundColor: '#FFF',
          elevation: 0,
          borderBottomWidth: 1,
          borderColor: AppColors.Solitude_Color,
          borderRadius: 10,
        }}
        renderLabel={a => (
          <Text
            style={[
              a.focused ? Styles.darkRegular14 : Styles.heatherRegular14,
            ]}>
            {a.route.title}
          </Text>
        )}
        labelStyle={Styles.blueSemiBold14}
        pressOpacity={0}
        pressColor="white"
      />
    );
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
      <View style={{flex: 1, marginTop: 10, paddingHorizontal: 15}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <TouchableOpacity
            onPress={() => setOpenMenu(true)}
            style={{marginVertical: 25}}>
            <MenuSvg2 />
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.img}
              source={{uri: `https://chamba.justcode.am/uploads/${user.avatar}`}}
            />
            <View style={{marginTop: 7, marginBottom: 15, alignItems: 'center'}}>
              <Text style={Styles.darkMedium16}>{user.name}</Text>
              <Text style={Styles.balihaiRegular12}>@{user.username}</Text>
            </View>
            {user.data.description && (
              <Text style={Styles.darkRegular14}>{user.description}</Text>
            )}
          </View>
          <View
            style={[
              {marginVertical: 20, paddingHorizontal: 15},
              Styles.flexSpaceBetween,
            ]}>
            <View style={{alignItems: 'center'}}>
              <Text style={Styles.darkSemiBold16}>{user.postCount}</Text>
              <Text style={Styles.balihaiRegular12}>Публикаций</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('FollowersScreen', {index: 0})}
              style={{alignItems: 'center'}}>
              <Text style={Styles.darkSemiBold16}>{user.followersCount}</Text>
              <Text style={Styles.balihaiRegular12}>Подписчиков</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('FollowersScreen', {index: 1})}
              style={{alignItems: 'center'}}>
              <Text style={Styles.darkSemiBold16}>{user.followerCount}</Text>
              <Text style={Styles.balihaiRegular12}>Подписок</Text>
            </TouchableOpacity>
          </View>
          {profile && (
            <View
              style={[
                Styles.flexSpaceBetween,
                {paddingHorizontal: 15, marginVertical: 10},
              ]}>
              <Button paddingV={10} title={'Подписаться'} width="48%" />
              <Button bg paddingV={10} title={'Сообщение'} width="48%" />
            </View>
          )}
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
          />
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
