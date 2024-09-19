import { createStackNavigator } from '@react-navigation/stack';
import { SearchProfil } from '../screens/Search/SearchProfil';
import { FollowersScreen } from '../screens/Profile/FollowersScreen';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { SinglPageScreen } from '../screens/SinglePage/SinglPage';

export const OtherUserScreenNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'SearchProfils'}>
      <Stack.Screen
        name="SearchProfils"
        component={SearchProfil}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SinglPageScreen"
        component={SinglPageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <HeaderWhiteTitle
                onPress={() => navigation.goBack()}
                title={'Интересное'}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};