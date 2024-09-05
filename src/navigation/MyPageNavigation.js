
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { FollowersScreen } from '../screens/Profile/FollowersScreen';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';


export default MyPageNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'ProfileScreens'}>
      <Stack.Screen
        name="ProfileScreens"
        component={ProfileScreen}
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