import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store/configStore';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default App = () => {
  const [initialRouteName, setInitialRouteName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  async function getData() {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      setInitialRouteName('TabNavigation');
    } 
    else {
      setInitialRouteName('RegisterScreen')
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
         <Navigation initialRouteName = {initialRouteName}/>
       </GestureHandlerRootView>
     </Provider>
   );
 }
};
