import {useEffect} from 'react'
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
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddMsgAction, getUserInfoAction, setToken } from '../store/action/action';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

export default Navigation = () => {
  const dispatch = useDispatch();
  async function getData() {
    const token = await AsyncStorage.getItem('token');
    dispatch(getUserInfoAction(token));
    dispatch(setToken(token))
  }


  const Pushers = async () => {
    const pusher = Pusher.getInstance();
    await pusher.init({
      apiKey: 'e0a82fc848e8facbc238',
      cluster: 'ap2',
    });
    await pusher.connect();
    await pusher.subscribe({
      channelName: 'NewMessage',
      onEvent: event => {
        dispatch(AddMsgAction({
          message: JSON.parse(event.data)?.message?.message,
          receiver_id:  JSON.parse(event.data)?.message?.receiver_id,
        }))
      },
    });
  };
  useEffect(() => {
    Pushers();
    getData();
  }, []);

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
    <BottomSheetModalProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName={'TabNavigation'}>
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
