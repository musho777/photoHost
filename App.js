import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store/configStore';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DeviceInfo from 'react-native-device-info';

// import messaging from '@react-native-firebase/messaging';

// Request permission for notifications (optional, but recommended)
// async function requestNotificationPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Notification permission granted');
//   } else {
//     console.log('Notification permission denied');
//   }
// }

// // Get the device registration token for FCM
// async function getFCMToken() {
//   const token = await messaging().getToken();
//   console.log('FCM Token:', token);
// }

// // Handle incoming messages (notifications and data messages)
// messaging().onMessage(async remoteMessage => {
//   console.log('Received FCM message:', remoteMessage);
// });

// // Handle background notifications (optional)
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Received background FCM message:', remoteMessage);
// });

// // Handle FCM token refresh
// messaging().onTokenRefresh(token => {
//   console.log('Refreshed FCM Token:', token);
// });

// // Request notification permission and get the FCM token
// requestNotificationPermission();
// getFCMToken();


export default App = () => {





// console.log(DeviceInfo)
















  const [initialRouteName, setInitialRouteName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const  [token,setToken] = useState('')
  async function getData() {
    const token = await AsyncStorage.getItem('token')
    setToken(token)
    if (token) {
      setInitialRouteName('TabNavigation');
    } 
    else {
      setInitialRouteName('LoginScreen')
    }
    setIsLoading(false)
  }
 useEffect(()=>{
    getData()
 },[])
 if(!isLoading){
   return (
     <Provider store={store}>
       <GestureHandlerRootView style={{flex: 1}}>
         <Navigation initialRouteName = {initialRouteName} token = {token}/>
       </GestureHandlerRootView>
     </Provider>
   );
 }
};
