import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Styles} from '../../styles/Styles';
import {Albom} from '../../components/Albom';
import {AppColors} from '../../styles/AppColors';
import {MenuSvg2} from '../../assets/svg/Svgs';

export const ProfileScreen = ({navigation}) => {
  const renderScene = SceneMap({
    first: Albom,
    second: Albom,
    third: Albom,
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Альбом'},
    {key: 'second', title: 'Закладки'},
    {key: 'third', title: 'Контакты'},
  ]);
  const layout = useWindowDimensions();
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
  return (
    <View style={{flex:1, marginTop: 10,paddingHorizontal:15}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TouchableOpacity style={{marginVertical: 25}}>
          <MenuSvg2 />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={styles.img}
            source={require('../../assets/img/user.png')}
          />
          <View style={{marginVertical: 15, alignItems: 'center'}}>
            <Text style={Styles.darkMedium16}>Иван Смит</Text>
            <Text style={Styles.balihaiRegular12}>@ivan_smith</Text>
          </View>
          <Text style={Styles.darkRegular14}>Student from Guinea 🇬🇳</Text>
        </View>
        <View style={[{marginVertical: 20,paddingHorizontal:15}, Styles.flexSpaceBetween]}>
          <View style={{alignItems: 'center'}}>
            <Text style={Styles.darkSemiBold16}>24</Text>
            <Text style={Styles.balihaiRegular12}>Публикаций</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('FollowersScreen',{index:0})} style={{alignItems: 'center'}}>
            <Text style={Styles.darkSemiBold16}>230</Text>
            <Text style={Styles.balihaiRegular12}>Подписчиков</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('FollowersScreen',{index:1})} style={{alignItems: 'center'}}>
            <Text style={Styles.darkSemiBold16}>348</Text>
            <Text style={Styles.balihaiRegular12}>Подписок</Text>
          </TouchableOpacity>
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
