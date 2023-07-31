import {createStackNavigator} from '@react-navigation/stack';
import { ChatUsersScreen } from '../screens/chat/ChatUsersScreen';

export const ChatNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'ChatUsersScreen'}>
      <Stack.Screen
        name="ChatUsersScreen"
        component={ChatUsersScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};