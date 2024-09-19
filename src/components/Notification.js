import messaging from '@react-native-firebase/messaging';

// Request permission for notifications (optional, but recommended)
async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
  } else {
  }
}

// Get the device registration token for FCM
async function getFCMToken() {
  const token = await messaging().getToken();
}

// Handle incoming messages (notifications and data messages)
messaging().onMessage(async remoteMessage => {
});

// Handle background notifications (optional)
messaging().setBackgroundMessageHandler(async remoteMessage => {
});

// Handle FCM token refresh
messaging().onTokenRefresh(token => {
});

// Request notification permission and get the FCM token
requestNotificationPermission();
getFCMToken();
