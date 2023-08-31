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


export const TabNavigation = () => {
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
          tabBarIcon: ({ focused }) => <ChatSvg focused={focused} />,
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
