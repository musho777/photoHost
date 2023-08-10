import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Api, getUserInfoAction, LogoutAction} from './src/store/action/action';

export const CheckBlack = ({token}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(st => st.userData);

  useEffect(() => {
    const interval = setInterval(() => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
      fetch(`${Api}/auth_user_info`, {
        method: 'GET',
        headers: myHeaders,
      })
      .then(response => response.json())
        .then(r => {
          console.log(r);
          if (r.data.black_list_status ||!r.status) {
            dispatch(LogoutAction(token));
            navigation.navigate('LoginScreen');
          }
        })
    }, 180000);

    return () => clearInterval(interval);
  }, []);
  return <View></View>;
};
