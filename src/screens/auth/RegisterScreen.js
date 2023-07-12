import {useState,useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ConfirmCode} from '../../components/ConfirmCode';
import {Styles} from '../../styles/Styles';
import {Button} from '../../ui/Button';
import {Input} from '../../ui/Input';

export const RegisterScreen = () => {
  const [userName, setUsername] = useState({value: '', error: ''});
  const [name, setName] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [sendMail, setSnedMail] = useState(false);
  const [disableButton,setDisableButton] = useState(true)
  useEffect(()=>{
    if(userName.value && name.value  && password.value && email.value){
      setDisableButton(false)
    }
    else {
      setDisableButton(true)
    }
  },[userName,name,password,email])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.authScreen}>
        <Text style={[Styles.darkMedium22, {marginBottom: 30}]}>Регистрация</Text>
        <Input
          placeholder={'Введите username'}
          error={userName.error}
          value={userName.value}
          onChange = {(e)=>setUsername({...userName,value:e})}
        />
        <Input
          placeholder={'Укажите ваше имя'}
          error={name.error}
          value={name.value}
          onChange = {(e)=>setName({...name,value:e})}
        />
        <Input
          placeholder={'Придумайте пароль'}
          error={password.error}
          value={password.value}
          onChange = {(e)=>setPassword({...password,value:e})}
        />
        <Input
          placeholder={'Укажите почту'}
          error={email.error}
          value={email.value}
          onChange = {(e)=>setEmail({...email,value:e})}
        />
        {sendMail && (
          <View style = {{alignItems:'center'}}>
            <Text style={[Styles.balihaiMedium13, {textAlign: 'center'}]}>
              Мы отправили вам на почту комбинацию цифр, впишите её ниже.
            </Text>
            <ConfirmCode />
          </View>
        )}
        {!sendMail && <Button onPress={()=>setSnedMail(true)} disabled={disableButton} marginV={30} title={'Подтвердить'} />}
      </View>
    </ScrollView>
  );
};
