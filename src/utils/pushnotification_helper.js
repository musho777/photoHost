import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    GetFCMToke()
  }
}



async function GetFCMToke() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken')
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken()
      if (fcmtoken) {
        AsyncStorage.setItem('fcmtoken', fcmtoken)
      } else {

      }
    } catch (error) {
      console.log(error, "error in fcmtoken")
    }

  }
}
export const NotificationLister = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on froground state ...........', remoteMessage);
  })

}