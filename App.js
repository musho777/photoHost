import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store/configStore';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { StatusBar, View } from 'react-native';
import PushNotification from 'react-native-push-notification';

export default App = () => {

  const [initialRouteName, setInitialRouteName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('')
  const [id, setID] = useState('')


  PushNotification.createChannel(
    {
      channelId: "sms-channel", // Must be the same as the channelId in the notification
      channelName: "sms-channel",
      channelDescription: "A channel for custom sound notifications",
      soundName: "sms.mp3", // Custom sound in raw folder
      importance: 4, // High importance
    },
  );
  PushNotification.createChannel(
    {
      channelId: "sms1-channel", // Must be the same as the channelId in the notification
      channelName: "sms-channel",
      channelDescription: "A channel for custom sound notifications",
      soundName: "default", // Custom sound in raw folder
      importance: 4, // High importance
    },
  );

  PushNotification.createChannel(
    {
      channelId: "sms2-channel", // Must be the same as the channelId in the notification
      channelName: "sms-channel",
      channelDescription: "A channel for custom sound notifications",
      soundName: "bell.mp3", // Custom sound in raw folder
      importance: 4, // High importance
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


  const PushNot = async (remoteMessage) => {
    let body = remoteMessage.data.body
    try {
      JSON.parse(remoteMessage.data.body);
      body = JSON.parse(remoteMessage.data.body).name
    } catch (error) {
      body = remoteMessage.data.body
    }
    if (remoteMessage.data.title == 'Подписка') {
      body = body + " Подписан(а) на Вас"
    }
    else if (remoteMessage.data.title == 'Отметка нравитса') {
      body = body + " поставил(а) нравится вашей публикации"
    }
    else if (remoteMessage.data.title == 'Новый коментарий') {
      body = body + " Оставил комментарий к вашей публикации"
    }
    let notSound = await AsyncStorage.getItem("notification")
    if (notSound == "standart") {
      PushNotification.localNotification({
        channelId: "sms1-channel",
        title: remoteMessage.data.title,
        message: body,
        playSound: true,
        sound: "default",
        priority: "high",
      });
    }
    else if (notSound == 'bell') {
      PushNotification.localNotification({
        channelId: "sms2-channel",
        title: remoteMessage.data.title,
        message: body,
        playSound: true,
        sound: "bell.mp3",
        priority: "high",
      });
    }
    else if (notSound == 'funy') {
      PushNotification.localNotification({
        channelId: "sms-channel",
        title: remoteMessage.data.title,
        message: body,
        playSound: true,
        sound: "sms.mp3",
        priority: "high",
      });
    }
  }




  messaging().setBackgroundMessageHandler(async remoteMessage => {
    PushNot(remoteMessage)
  });

  useEffect(() => {
    getData()
    if (firebase.app()) {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        PushNot(remoteMessage)
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);







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


  if (!isLoading) {
    return (

      <Provider store={store}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation initialRouteName={initialRouteName} token={token} id={id} />
        </GestureHandlerRootView>
      </Provider>
    );
  }
};
