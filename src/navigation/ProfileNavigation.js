import {createStackNavigator} from '@react-navigation/stack';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { FollowersScreen } from '../screens/Profile/FollowersScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { UserProfileScreen } from '../screens/Profile/userProfileScreen';

export const ProfileNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'ProfileScreen'}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{
          header:({navigation})=>{
              return <HeaderWhiteTitle onPress={()=>navigation.goBack()} title={'Интересное'}/> 
          }
      }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          header:({navigation})=>{
              return <HeaderWhiteTitle transparent onPress={()=>navigation.goBack()} title={'Публикации'}/> 
          }
      }}
      />
    </Stack.Navigator>
  );
};