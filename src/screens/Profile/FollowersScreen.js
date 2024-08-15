import { useEffect, useState } from 'react'
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { Followings } from '../../components/Followings';
import { Followers } from '../../components/Followers';

export const FollowersScreen = ({ route }) => {
  const renderScene = SceneMap({
    first: () => <Followings id={route.params.id} />,
    second: () => <Followers id={route.params.id} />,
  });
  const [index, setIndex] = useState(route.params.index);
  useEffect(() => {
    setIndex(route.params.index)
  }, [route.params.index])
  const routes = [
    { key: 'first', title: 'Подписчики' },
    { key: 'second', title: 'Подписки' }
  ]
  const layout = useWindowDimensions();
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: AppColors.Charcoal_Color,
          height: 2,
          borderRadius: 10
        }}
        style={{
          backgroundColor: '#FFF',
          elevation: 0,
          borderBottomWidth: 1,
          borderColor: AppColors.Solitude_Color,
          borderRadius: 10,
          marginHorizontal: 15
        }}
        renderLabel={a => (
          <Text
            style={[
              a.focused ? Styles.darkRegular14 : Styles.heatherRegular14,
            ]}
          >
            {a.route.title}
          </Text>
        )}
        labelStyle={Styles.blueSemiBold14}
        pressOpacity={0}
        pressColor="white"
      />
    );
  };
  return <View style={{ flex: 1 }}>
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  </View>
};
