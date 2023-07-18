import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  AddSvg,
  ChatSvg,
  HomeSvg,
  SearchSvg,
  UserSvg,
} from '../assets/svg/TabBarSvg';
import {HomeHeader} from '../headers/HomeHeader';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {SearchScreen} from '../screens/Search/SearchScreen';
import { AppColors } from '../styles/AppColors';
import { ChatNavigation } from './ChatNavigation';
import { SearchNavigation } from './SearchNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { ProfileNavigation } from './ProfileNavigation';
import { SwipeTabProfileNavigation } from './SwipeTabProfileNavigation';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { ProflHeader } from '../headers/ProfileHeader';


export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      sceneContainerStyle ={{
        primary: '#fff',
        background:  '#fff',
        border:  '#fff',
      }}
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: (() => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ''

          if(routeName === 'ChatScreen'||routeName === 'FollowersScreen'||routeName === 'ParametrScreen'||routeName === 'EditProfilScreen'||routeName === 'ChangePasswordScreen'|| routeName === 'ChangeMailScreen'){
            return {
              display:'none'
            }
          }
          return {
            height: 80,
            backgroundColor: '#FFF',
            borderTopColor: '#FFF',
            borderTopWidth: 1,
          };
        })(route),
      })}>
      <Tab.Screen
        options={() => ({
          header: ({navigation}) => {
            return <HomeHeader />;
          },
          tabBarIcon: ({focused}) => <HomeSvg focused={focused} />,
        })}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={() => ({
          headerShown:false,
          tabBarIcon: ({focused}) => <SearchSvg focused={focused} />,
        })}
        name="SearchNavigation"
        component={SearchNavigation}
      />
      <Tab.Screen
        options={() => ({
          tabBarIcon: ({focused}) => <AddSvg focused={focused} />,
        })}
        name="Home2"
        component={HomeScreen}
      />
      <Tab.Screen
        options={() => ({
          headerShown:false,
          tabBarIcon: ({focused}) => <ChatSvg focused={focused} />,
        })}
        name="ChatNavigation"
        component={ChatNavigation}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
          tabBarIcon: ({focused}) => <UserSvg focused={focused} />,
        })}
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
    </Tab.Navigator>
  );
};
// ChatSvg
// UserSvg
