import {createStackNavigator} from '@react-navigation/stack';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { BlackListScreen } from '../screens/Profile/BlackListScreen';
import { ChangeMailScreen } from '../screens/Profile/ChangeMailScreen';
import { ChangePasswordScreen } from '../screens/Profile/ChangePasswordScreen';
import { EditProfilScreen } from '../screens/Profile/EditProfilScreen';
import { FollowersScreen } from '../screens/Profile/FollowersScreen';
import { ParametrScreen } from '../screens/Profile/ParametrScreen';
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
      <Stack.Screen
        name="EditProfilScreen"
        component={EditProfilScreen}
        options={{
          headerShown:false,
          // header:({navigation})=>{
          //     return <HeaderWhiteTitle check onPress={()=>navigation.goBack()} title={'Редактировать профиль'}/> 
          // }
      }}
      />
      <Stack.Screen
        name="ParametrScreen"
        component={ParametrScreen}
        options={{
          header:({navigation})=>{
              return <HeaderWhiteTitle onPress={()=>navigation.goBack()} title={'Параметры аккаунта'}/> 
          }
      }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          header:({navigation})=>{
              return <HeaderWhiteTitle onPress={()=>navigation.goBack()} title={'Изменить пароль'}/> 
          }
      }}
      />
      <Stack.Screen
        name="ChangeMailScreen"
        component={ChangeMailScreen}
        options={{
          header:({navigation})=>{
              return <HeaderWhiteTitle onPress={()=>navigation.goBack()} title={'Изменить почту'}/> 
          }
      }}
      />
      <Stack.Screen
        name="BlackListScreen"
        component={BlackListScreen}
        options={{
          header:({navigation})=>{
              return <HeaderWhiteTitle onPress={()=>navigation.goBack()} title={'Черный список'}/> 
          }
      }}
      />
    </Stack.Navigator>
  );
};