import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store/configStore';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { NotificationLister, requestUserPermission } from './src/utils/pushnotification_helper';
import { StatusBar } from 'react-native';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';

export default App = () => {


  PushNotification.createChannel(
    {
      channelId: "sms-channel",
      channelName: "SmS",
      channelDescription: "A channel to categorise your notifications",
      soundName: "default",
      largeIcon: "ic_launcher",
      importance: 4,
      vibrate: true,
    },
  );

  const firebaseConfig = {
    apiKey: "AIzaSyDeqDpmN8h9Zr2EkzcMlyZr-ddq_HkRZAc",
    authDomain: "https://chamba-f5697-default-rtdb.firebaseio.com",
    projectId: "chamba-f5697",
    storageBucket: "chamba-f5697.appspot.com",
    messagingSenderId: "367713203754-hucu51o3k2ncalafcphonmn0oakjaqgh.apps.googleusercontent.com",
    appId: "1:367713203754:android:bafcbbdf09844800447553",
    databaseURL: "https://chamba-f5697-default-rtdb.firebaseio.com"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const CheckToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token', token);
  }


  // async function GetFCMToke() {
  //   let fcmtoken = await messaging().getToken()
  // }


  useEffect(() => {
    // GetFCMToke()
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
      }
    });
  }, []);


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
      GetFCMToke()
    }
  }




  useEffect(() => {
    CheckToken()
    NotificationLister()
    if (firebase.app()) {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        PushNotification.localNotification({
          smallIcon: null,
          largeIcon: null,
          channelId: "sms-channel",
          title: "349949",
          message: '100000',
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);






  const [initialRouteName, setInitialRouteName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('')
  const [id, setID] = useState('')
  async function getData() {
    const token = await AsyncStorage.getItem('token')
    const id = await AsyncStorage.getItem('id');
    setID(id)
    setToken(token)
    if (token) {
      setInitialRouteName('TabNavigation');
    }
    else {
      setInitialRouteName('LoginScreen')
    }
    setIsLoading(false)
  }



  useEffect(() => {
    getData()
  }, [])




  if (!isLoading) {
    return (

      <Provider store={store}>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={'dark-content'}
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation initialRouteName={initialRouteName} token={token} id={id} />
        </GestureHandlerRootView>
      </Provider>
    );
  }
};
