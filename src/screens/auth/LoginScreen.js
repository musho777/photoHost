import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { ClearConfirmPasswordAction, ClearLoginAction, LoginAction, DeleteTokenSorage, DeviceIdAction } from '../../store/action/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChecboxUNchekedSvg, CheckedChexbox } from '../../assets/svg/Svgs';
import { t } from '../../components/lang';
import { CommonActions } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';


export const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState({ error: '', value: '' });
  const [password, setPasswod] = useState({ error: '', value: '' });
  const [send, setSend] = useState(true);
  const dispatch = useDispatch();
  const loginData = useSelector(st => st.login);
  const [checked, setChecked] = useState(false)
  const mainData = useSelector(st => st.mainData);

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
      DeleteTokenSorage()
      dispatch(ClearConfirmPasswordAction())
      getLoginPassword()
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (loginData.status) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'TabNavigation' }],
        })
      );
      setLogin({ error: '', value: '' })
      setPasswod({ error: '', value: '' })
      setLoginPassword()
    }
  }, [loginData.status])
  const setLoginPassword = async () => {
    if (checked) {
      await AsyncStorage.setItem('login', login.value)
      await AsyncStorage.setItem('password', password.value)
    }
    else {
      await AsyncStorage.removeItem('login')
      await AsyncStorage.removeItem('password')
    }
  }

  return (
    <View style={[Styles.authScreen, { marginTop: 80 }]}>
      <Text style={[Styles.darkSemiBold22, { marginBottom: 30 }]}>{t(mainData.lang).Login}</Text>
      <Input
        placeholder={t(mainData.lang).Enteryouremail}
        error={login.error}
        value={login.value}
        onChange={e => setLogin({ ...login, value: e })}
        clear
        clearText={(e) => setLogin({ ...login, value: '' })}
      />
      <Input
        placeholder={t(mainData.lang).enterpassword}
        error={password.error}
        pass={true}
        value={password.value}
        clear
        clearText={(e) => setPasswod({ ...password, value: '' })}
        onChange={e => setPasswod({ ...password, value: e })}
      />
      <View style={[[Styles.flexSpaceBetween, { paddingHorizontal: 10 }]]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoveryPassword')}>
          <Text style={Styles.darkSemiBold12}>{t(mainData.lang).Forgotpassword}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterType')}>
          <Text style={Styles.darkSemiBold12}>{t(mainData.lang).Registration}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={1} onPress={() => setChecked(!checked)} style={{ flexDirection: 'row', alignItems: "center", gap: 10, marginTop: 30 }}>
        {!checked ?
          <ChecboxUNchekedSvg /> :
          <CheckedChexbox />
        }
        <Text style={{ color: "black" }}>{t(mainData.lang).Savepassword}</Text>
      </TouchableOpacity>
      <Text style={[[Styles.tomatoMedium10, { marginVertical: 5 }]]}>
        {loginData.error}
      </Text>
      <Button
        disabled={send}
        onPress={() => loginUser()}
        title={t(mainData.lang).Login}
        loading={loginData.loading}
      />
    </View>
  );
};