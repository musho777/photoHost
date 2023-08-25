import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../headers/Header';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { NewPassword } from '../screens/auth/NewPassword';
import { RecoveryPassword } from '../screens/auth/RecoveryPassword';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { AppColors } from '../styles/AppColors';
import { TabNavigation } from './TabNavigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import {
  AddMsgAction,
  DeviceIdAction,
  getUserInfoAction,
  LogoutAction,
  NewMsgAction,
  setToken,
} from '../store/action/action';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { FollowersScreen } from '../screens/Profile/FollowersScreen';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { SinglPageScreen } from '../screens/SinglePage/SinglPage';
import { EditPostScreen } from '../screens/SinglePage/EditPostScreen';
import { SearchProfil } from '../screens/Search/SearchProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBlack } from '../../CheckBlack';

export default Navigation = ({ token, initialRouteName, id }) => {
  const dispatch = useDispatch();
  const [i, setI] = useState(initialRouteName);

  function getData() {
    dispatch(getUserInfoAction(token));
    dispatch(setToken(token));
  }
  const Pushers = async () => {
    const today = new Date()

    const pusher = Pusher.getInstance();
    await pusher.init({
      apiKey: 'e0a82fc848e8facbc238',
      cluster: 'ap2',
    });
    await pusher.connect();
    await pusher.subscribe({
      channelName: 'NewMessage',
      onEvent: event => {
        if (event.channelName == 'NewMessage') {
          dispatch(
            NewMsgAction({
              data: JSON.parse(event.data)?.message,
            }),
          );
          if (JSON.parse(event.data)?.message?.receiver_id == id) {
            dispatch(
              AddMsgAction({
                message: JSON.parse(event.data)?.message?.message,
                sender_id: JSON.parse(event.data)?.message?.receiver_id,
                created_at: today
              }),
            );
          }
          else {
            dispatch(
              AddMsgAction({
                message: JSON.parse(event.data)?.message?.message,
                receiver_id: JSON.parse(event.data)?.message?.sender_id,
                created_at: today
              }),
            );
          }
        }
      },
    });
  };
  useEffect(() => {
    Pushers();
    getData();
  }, [token]);


  const getNotificationToken = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken')
    const deviceId = await DeviceInfo.getUniqueId();
    dispatch(DeviceIdAction({
      device_id: fcmtoken,
      phone_code: deviceId,
    }, token))
  };


  useEffect(() => {
    const interval = setInterval(() => {
      getNotificationToken()
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
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
        {<CheckBlack token={token} />}
        <Stack.Navigator initialRouteName={i}>
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
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
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
          <Stack.Screen
            name="SinglPageScreen"
            component={SinglPageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditPostScreen"
            component={EditPostScreen}
            options={{
              headerShown: false,
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
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
};

// SinglPageScreen
// EditProfil
