import {createStackNavigator} from '@react-navigation/stack';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { BlackListScreen } from '../screens/Profile/BlackListScreen';
import { ChangeMailFirtScreen } from '../screens/Profile/ChangeMailFirtScreen';
import { ChangeMailScreen } from '../screens/Profile/ChangeMailScreen';
import { ChangePasswordScreen } from '../screens/Profile/ChangePasswordScreen';
import { EditProfilScreen } from '../screens/Profile/EditProfilScreen';
import { ParametrScreen } from '../screens/Profile/ParametrScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { SavedPostScreen } from '../screens/Profile/SavedPostScreen';
import { UserProfileScreen } from '../screens/Profile/userProfileScreen';
import { SearchProfil } from '../screens/Search/SearchProfil';

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
        name="ChangeMailFirtScreen"
        component={ChangeMailFirtScreen}
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
      <Stack.Screen
        name="SavedPostScreen"
        component={SavedPostScreen}
        options={{
          header:({navigation})=>{
              return <HeaderWhiteTitle onPress={()=>navigation.goBack()} title={'Закладки'}/> 
          }
      }}
      />
      <Stack.Screen
        name="SearchProfil"
        component={SearchProfil}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
// SavedPostScreen