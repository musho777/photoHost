import {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Styles} from '../../styles/Styles';
import {Button} from '../../ui/Button';
import {Input} from '../../ui/Input';
import {useDispatch, useSelector} from 'react-redux';
import {ClearConfirmPasswordAction, ClearLoginAction, LoginAction} from '../../store/action/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({navigation}) => {
  const [login, setLogin] = useState({error: '', value: ''});
  const [password, setPasswod] = useState({error: '', value: ''});
  const [send, setSend] = useState(true);
  const dispatch = useDispatch();
  const loginData = useSelector(st => st.login);
  useEffect(() => {
    if (login.value && password.value) {
      setSend(false);
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(ClearLoginAction())
      dispatch(ClearConfirmPasswordAction())
      setLogin({error: '', value: ''})
      setPasswod({error: '', value: ''})
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    if(loginData.status){
      navigation.navigate('TabNavigation')
      setLogin({error: '', value: ''})
      setPasswod({error: '', value: ''})
      // setToken()
    }
  },[loginData.status])
  // async function setToken() {
  //   const data = await AsyncStorage.setItem('token',loginData.token)
  // }
  return (
    <View style={[Styles.authScreen, {marginTop: 80}]}>
      <Text style={[Styles.darkSemiBold22, {marginBottom: 30}]}>Вход</Text>
      <Input
        placeholder={'Введите логин'}
        error={login.error}
        value={login.value}
        onChange={e => setLogin({...login, value: e})}
      />
      <Input
        placeholder={'Введите пароль'}
        error={password.error}
        pass={true}
        value={password.value}
        onChange={e => setPasswod({...password, value: e})}
      />
      <View style={[[Styles.flexSpaceBetween, {paddingHorizontal: 10}]]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoveryPassword')}>
          <Text style={Styles.darkSemiBold12}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={Styles.darkSemiBold12}>Регистрация</Text>
        </TouchableOpacity>
      </View>
      <Text style={[[Styles.tomatoMedium10,{marginVertical:15}]]}>
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
