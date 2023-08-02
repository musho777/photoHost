import messaging from '@react-native-firebase/messaging';

// Request permission for notifications (optional, but recommended)
async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted');
  } else {
    console.log('Notification permission denied');
  }
}

// Get the device registration token for FCM
async function getFCMToken() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
}

// Handle incoming messages (notifications and data messages)
messaging().onMessage(async remoteMessage => {
  console.log('Received FCM message:', remoteMessage);
});

// Handle background notifications (optional)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Received background FCM message:', remoteMessage);
});

// Handle FCM token refresh
messaging().onTokenRefresh(token => {
  console.log('Refreshed FCM Token:', token);
});

// Request notification permission and get the FCM token
requestNotificationPermission();
getFCMToken();
