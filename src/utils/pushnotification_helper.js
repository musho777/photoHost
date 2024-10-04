import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const NotificationLister = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
      }
    });

  messaging().onMessage(async remoteMessage => {
  })

}