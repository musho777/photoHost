import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppColors } from '../styles/AppColors';
import { TabNavigation } from './TabNavigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { Comments } from '../components/comment/Comment';
import messaging from '@react-native-firebase/messaging';
import {
  AddBlackListPusherAction,
  AddMessageCount,
  AddMsgAction,
  ChnageLanguage,
  DelateMessageLocal,
  DeleteChatPusherAction,
  DeviceIdAction,
  getUserInfoAction,
  MsgCountAction,
  NewMsgAction,
  setToken,
} from '../store/action/action';
import {
  Pusher,
} from '@pusher/pusher-websocket-react-native';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { SinglPageScreen } from '../screens/SinglePage/SinglPage';
import { EditPostScreen } from '../screens/SinglePage/EditPostScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBlack } from '../../CheckBlack';
import { LoginNavigation } from './LoginNavigation';
import { Catalog } from '../screens/catalog';
import { OtherUserScreenNavigation } from './OtherUserScreenNavigation';
import { PermissionsAndroid, Platform } from 'react-native';
import { AddImg } from '../screens/AddImg/AddImg';
import { AddPost } from '../screens/AddPost/AddPost';

export default Navigation = ({ token, initialRouteName, id }) => {
  const dispatch = useDispatch();



  async function requestNotificationPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          let not = await AsyncStorage.getItem("notification")
          if (!not) {
            await AsyncStorage.setItem("notification", "standart")
          }
        } else {
          await AsyncStorage.setItem("notification", "off")
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  const changeLanguage = async () => {
    let lang = await AsyncStorage.getItem('lang')
    dispatch(ChnageLanguage(lang))
  }


  function getData() {
    dispatch(getUserInfoAction(token));
    dispatch(setToken(token));
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
        const today = new Date()
        if (JSON.parse(event.data).message.type == 'new_message') {
          if (JSON.parse(event.data).message.latest_sender != id && JSON.parse(event.data).message.receiver_id == id) {
            dispatch(MsgCountAction(JSON.parse(event.data)?.message.all_message_count))
          }
          if (JSON.parse(event.data).message.receiver_id == id || JSON.parse(event.data).message.sender_id == id) {
            dispatch(
              NewMsgAction({
                data: JSON.parse(event.data)?.message,
              }),
            );
          }
          if (JSON.parse(event.data)?.message?.receiver_id == id) {
            dispatch(
              AddMsgAction({
                message: JSON.parse(event.data)?.message?.message,
                sender_id: id,
                receiver_id: JSON.parse(event.data)?.message?.sender_id,
                created_at: today,
                id: JSON.parse(event.data)?.message.id
              }),
            );
          }
          else {
            if (JSON.parse(event.data).message.receiver_user.id == id) {
              dispatch(AddMessageCount())
            }
            dispatch(
              AddMsgAction({
                message: JSON.parse(event.data)?.message?.message,
                receiver_id: JSON.parse(event.data)?.message?.sender_id,
                sender_id: JSON.parse(event.data)?.message?.receiver_id,
                created_at: today
              }),
            );
          }
        }
        else if (JSON.parse(event.data).message.type == 'delete_chat') {
          dispatch(
            DeleteChatPusherAction({
              reseiver_id: JSON.parse(event.data)?.message?.receiver_id,
              sender_id: JSON.parse(event.data)?.message?.sender_id
            })
          )
        }
        else if (JSON.parse(event.data).message.type == 'black_list_add') {
          dispatch(
            AddBlackListPusherAction({
              reseiver_id: JSON.parse(event.data)?.message?.receiver_id,
              sender_id: JSON.parse(event.data)?.message?.sender_id
            })
          )
        }
        else if (JSON.parse(event.data).message.type == 'black_list_delete') {
          dispatch(
            AddBlackListPusherAction({
              reseiver_id: 'black_list_delete',
              sender_id: 'black_list_delete'
            })
          )
        }
        else if (JSON.parse(event.data).message.type == 'delete_message') {
          dispatch(DelateMessageLocal(JSON.parse(event.data)?.message?.message_id))
        }
      },
    });
  };
  useEffect(() => {
    changeLanguage()
    Pushers();
    getData();
    requestUserPermission()
    getNotificationToken()

  }, [token]);

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  const getNotificationToken = async () => {
    const fcmtoken = await messaging().getToken()
    const deviceId = await DeviceInfo.getUniqueId();
    dispatch(DeviceIdAction({
      device_id: fcmtoken,
      phone_code: deviceId,
    }, token))
  };


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getNotificationToken()
    }
  }






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
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="LoginScreen1"
            component={LoginNavigation}
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
            component={OtherUserScreenNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="coment"
            component={Comments}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Catalog"
            component={Catalog}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AddPhoto"
            component={AddImg}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddText"
            component={AddPost}
            options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
};