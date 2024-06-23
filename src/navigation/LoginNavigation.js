import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { RecoveryPassword } from '../screens/auth/RecoveryPassword';
import { NewPassword } from '../screens/auth/NewPassword';

export const LoginNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'LoginScreen'}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          header: ({ navigation }) => (
            <Header onPress={() => navigation.goBack()} />
          ),
        }}
      />
      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPassword}
        options={{
          header: ({ navigation }) => (
            <Header onPress={() => navigation.goBack()} />
          ),
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};
