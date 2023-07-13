import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  GestureHandlerRefContext,
} from '@react-navigation/stack';
import {Header} from '../headers/Header';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {NewPassword} from '../screens/auth/NewPassword';
import {RecoveryPassword} from '../screens/auth/RecoveryPassword';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {AppColors} from '../styles/AppColors';
import {TabNavigation} from './TabNavigation';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler'


export default Navigation = () => {
  const Stack = createStackNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: AppColors.White_Color,
      background: AppColors.White_Color,
      border: AppColors.White_Color,
    },
  };
  return (
      <BottomSheetModalProvider >
        <NavigationContainer theme={MyTheme}>
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
                header: ({navigation}) => (
                  <Header onPress={() => navigation.goBack()} />
                ),
              }}
            />
            <Stack.Screen
              name="RecoveryPassword"
              component={RecoveryPassword}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
  );
};
