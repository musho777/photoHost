import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Api, LogoutAction } from './src/store/action/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CheckBlack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //   useEffect(() => {

  //     const interval = setInterval(async () => {
  //       const token = await AsyncStorage.getItem('token')
  //       var myHeaders = new Headers();
  //       myHeaders.append('Content-Type', 'application/json');
  //       myHeaders.append('Authorization', `Bearer ${token}`);
  //       fetch(`${Api}/auth_user_info`, {
  //         method: 'GET',
  //         headers: myHeaders,
  //       })
  //         .then(response => response.json())
  //         .then(r => {
  //           if (r.data?.black_list_status || !r.status) {
  //             dispatch(LogoutAction(token));
  //             navigation.navigate('LoginScreen');
  //           }
  //         })
  //     }, 360000);

  //   return () => clearInterval(interval);
  // }, []);
  return <View></View>;
};
