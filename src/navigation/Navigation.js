import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { AppColors } from '../styles/AppColors';

export default Navigation = () => {
  const Stack = createStackNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: AppColors.White_Color,
      background:  AppColors.White_Color,
      border:  AppColors.White_Color,
    },
  };
  return (
    <NavigationContainer theme={MyTheme} >
      <Stack.Navigator initialRouteName={'LoginScreen'} >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options = {{
            headerShown:false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};