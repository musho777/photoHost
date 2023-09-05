import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { ClearConfirmPasswordAction, ClearLoginAction, LoginAction } from '../../store/action/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState({ error: '', value: '' });
  const [password, setPasswod] = useState({ error: '', value: '' });
  const [send, setSend] = useState(true);
  const dispatch = useDispatch();
  const loginData = useSelector(st => st.login);
  const staticdata = useSelector(st => st.static);
  useEffect(() => {
    if (login.value && password.value) {
      setSend(false);
    }
    else {
      setSend(true);
    }
  }, [login, password]);

  const loginUser = () => {
    dispatch(
      LoginAction({
        email: login.value,
        password: password.value,
      }),
    );
  };
  const getLoginPassword = async () => {
    const login = await AsyncStorage.getItem('login')
    const password = await AsyncStorage.getItem('password')
    if (login) {
      setLogin({ error: '', value: login })
    }
    if (password) {
      setPasswod({ error: '', value: password })
    }

  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(ClearLoginAction())
      dispatch(ClearConfirmPasswordAction())
      getLoginPassword()
      // setLogin({ error: '', value: '' })
      // setPasswod({ error: '', value: '' })
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (loginData.status) {
      navigation.navigate('TabNavigation')
      setLogin({ error: '', value: '' })
      setPasswod({ error: '', value: '' })
      setLoginPassword()
    }
  }, [loginData.status])
  const setLoginPassword = async () => {
    await AsyncStorage.setItem('login', login.value)
    await AsyncStorage.setItem('password', password.value)
  }
  return (
    <View style={[Styles.authScreen, { marginTop: 80 }]}>
      <Text style={[Styles.darkSemiBold22, { marginBottom: 30 }]}>Вход</Text>
      <Input
        placeholder={'Введите Емайл'}
        error={login.error}
        value={login.value}
        onChange={e => setLogin({ ...login, value: e })}
      />
      <Input
        placeholder={'Введите Пароль'}
        error={password.error}
        pass={true}
        value={password.value}
        onChange={e => setPasswod({ ...password, value: e })}
      />
      <View style={[[Styles.flexSpaceBetween, { paddingHorizontal: 10 }]]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoveryPassword')}>
          <Text style={Styles.darkSemiBold12}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={Styles.darkSemiBold12}>Регистрация</Text>
        </TouchableOpacity>
      </View>
      <Text style={[[Styles.tomatoMedium10, { marginVertical: 15 }]]}>
        {loginData.error}
      </Text>
      <Button
        disabled={send}
        onPress={() => loginUser()}
        title={'Войти'}
        loading={loginData.loading}
      />
    </View>
  );
};
