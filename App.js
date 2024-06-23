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
import { BackHandler, StatusBar } from 'react-native';
export default App = () => {


  const [hardwareBackPress, setHardwareBackPress] = useState(false)


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

  useEffect(() => {
    requestUserPermission()
    NotificationLister()
    if (firebase.app()) {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
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
  }, [hardwareBackPress])




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
