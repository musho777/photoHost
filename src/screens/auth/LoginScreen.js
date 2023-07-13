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
          placeholder={'Введите логин'}
          error={login.error}
          value={login.value}
          onChange = {(e)=>setLogin({...login,value:e})}
        />
        <Input
          placeholder={'Введите пароль'}
          error={password.error}
          pass={true}
          value={password.value}
          onChange = {(e)=>setPasswod({...password,value:e})}
        />
      <View style={[[Styles.flexSpaceBetween,{paddingHorizontal:10}]]}>
        <TouchableOpacity onPress={()=>navigation.navigate('RecoveryPassword')}>
          <Text style={Styles.darkMedium12}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigation.navigate('RegisterScreen')} >
         <Text style={Styles.darkMedium12}>Регистрация</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={()=>navigation.navigate('TabNavigation')} marginV = {30} title={'Войти'} />
    </View>
  );
};
