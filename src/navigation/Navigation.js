import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Header } from '../headers/Header';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
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
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options = {{
            header: ({navigation}) => (
              <Header  onPress={() => navigation.goBack()}  />
            ),

          }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};