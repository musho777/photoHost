import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AddSvg,
  ChatSvg,
  HomeSvg,
  SearchSvg,
  UserSvg,
} from '../assets/svg/TabBarSvg';

import { ChatNavigation } from './ChatNavigation';
import { SearchNavigation } from './SearchNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { ProfileNavigation } from './ProfileNavigation';
import { AddImg } from '../screens/AddImg/AddImg';
import { HomeNavigation } from './HomeNavigation';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';


export const TabNavigation = () => {
  const user = useSelector((st) => st.userData)
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        primary: '#fff',
        background: '#fff',
        border: '#fff',
      }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: (() => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ''

          if (routeName === 'ChatScreen' || routeName === 'FollowersScreen' || routeName === 'ChangeMailFirtScreen' || routeName === 'ParametrScreen' || routeName === 'EditProfilScreen' || routeName === 'ChangePasswordScreen' || routeName === 'ChangeMailScreen' || routeName === 'BlackListScreen') {
            return {
              display: 'none'
            }
          }
          return {
            height: 60,
            backgroundColor: '#FFF',
            borderTopColor: '#FFF',
            borderTopWidth: 1,
          };
        })(route),
      })}>
      <Tab.Screen
        options={() => ({
          headerShown: false,

          tabBarIcon: ({ focused }) => <HomeSvg focused={focused} />,
        })}
        name="Home"
        component={HomeNavigation}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => <SearchSvg focused={focused} />,
        })}
        name="SearchNavigation"
        component={SearchNavigation}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => <AddSvg focused={focused} />,
        })}
        name="AddImg"
        component={AddImg}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            <View>
              {/* <View style={{ position: 'absolute', right: -7, top: -10, backgroundColor: 'red', borderRadius: 20, height: 15, width: 15, justifyContent: "center", alignItems: 'center', textAlign: 'center' }}>
                <Text style={{ color: '#FFF', fontSize: 10 }}>2</Text>
              </View> */}
              <ChatSvg focused={focused} />
            </View>
          ,
        })}
        name="ChatNavigation"
        component={ChatNavigation}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => <UserSvg focused={focused} />,
        })}
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
    </Tab.Navigator>
  );
};
// ChatSvg
// UserSvg
