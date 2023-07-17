import {createStackNavigator} from '@react-navigation/stack';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

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
    </Stack.Navigator>
  );
};