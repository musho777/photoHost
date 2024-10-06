/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';


const HeadlessTask = async (message) => {
  console.log('Headless Task: ', message);
  // You can process the message similarly here
  PushNotification.localNotification({
    channelId: "sms-channel",
    title: message.data.title,
    message: message.data.body,
    playSound: true,
    sound: "sms.mp3",
    priority: "high",
  });
};


AppRegistry.registerComponent(appName, () => App);

// Register the headless task
AppRegistry.registerHeadlessTask('ReactNativeFirebaseMessagingHeadlessTask', () => HeadlessTask);