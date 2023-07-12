import {useState} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import {Styles} from '../../styles/Styles';
import { Button } from '../../ui/Button';
import {Input} from '../../ui/Input';

export const LoginScreen = ({navigation}) => {
    const [login,setLogin] = useState({error:'',value:''})
    const [password,setPasswod] = useState({error:'',value:''})
  return (
    <View style={[Styles.authScreen,{marginTop:80}]}>
      <Text style={[Styles.darkMedium22, {marginBottom: 30}]}>Вход</Text>
        <Input
          placeholder={'Введите пароль'}
          error={login.error}
          value={login.value}
        />
        <Input
          placeholder={'Введите пароль'}
          error={password.error}
          pass={true}
          value={password.value}
          setPass={(e) => setLogin({...password,pass:e})}
        />
      <View style={[Styles.flexSpaceBetween]}>
        <TouchableOpacity>
          <Text style={Styles.darkMedium12}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
         <Text style={Styles.darkMedium12}>Регистрация</Text>
        </TouchableOpacity>
      </View>
      <Button  onPress={()=>navigation.navigate('RegisterScreen')} marginV = {30} title={'Войти'} />
    </View>
  );
};
