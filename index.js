/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HeadlessTask = async (message) => {
  console.log('Headless Task: ', message);
  let notSound = await AsyncStorage.getItem("notification")
  console.log(notSound, 'notSound')
  if (notSound == 'standart') {
    PushNotification.localNotification({
      channelId: "sms-channel",
      title: message.data.title,
      message: message.data.body,
      playSound: true,
      sound: "default",
      priority: "high",
    });
  }
  else if (notSound == 'bell') {
    PushNotification.localNotification({
      channelId: "sms2-channel",
      title: message.data.title,
      message: message.data.body,
      playSound: true,
      sound: "bell.mp3",
      priority: "high",
    });
  }
  else if (notSound == 'funy') {
    PushNotification.localNotification({
      channelId: "sms-channel",
      title: message.data.title,
      message: message.data.body,
      playSound: true,
      sound: "sms.mp3",
      priority: "high",
    });
    console.log('else')
  }

  // You can process the message similarly here

};


AppRegistry.registerComponent(appName, () => App);

// Register the headless task
AppRegistry.registerHeadlessTask('ReactNativeFirebaseMessagingHeadlessTask', () => HeadlessTask);