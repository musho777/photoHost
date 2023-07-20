import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ConfirmCode} from '../../components/ConfirmCode';
import {ChangeEmailAction, sednEmailChangeCodeAction} from '../../store/action/action';
import {Styles} from '../../styles/Styles';
import {Button} from '../../ui/Button';
import {Input} from '../../ui/Input';

export const ChangeMailScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const changeEmail = useSelector(st => st.changeEmail);
  const [code,setCode] = useState('')
  function ValidateEmail(mail) {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
      return (false)
  }
  const sendData = () => {
    if(!ValidateEmail(email.value)){
      setEmail({...email,error:'Введите корректный адрес эл. почты'})
    }
    else {
      setEmail({...email,error:''})
      dispatch(ChangeEmailAction({email: email.value}, staticdata.token));
    }
  };
  useEffect(()=>{
    if(changeEmail.codeStatus){
      navigation.navigate('ProfileScreen')
    }
  },[changeEmail.codeStatus])
  useEffect(()=>{
    if(code.length === 5){
      dispatch(sednEmailChangeCodeAction({code:code},staticdata.token))
    }
  },[code])
  return (
    <View style={{alignItems: 'center', marginTop: 30}}>
      <Input
        data={email.value}
        error = {email.error||changeEmail.error.email}
        onChange={e => setEmail({...email, value: e})}
        placeholder="Новая почта"
        width="80%"
      />
      <Button
        onPress={() => sendData()}
        title={'Готово'}
        marginV={10}
        disabled={!email.value}
        loading = {changeEmail.loading}
      />
      {changeEmail.status && (
        <View style = {{alignItems:'center'}}>
          <Text
            style={[
              Styles.balihaiRegular14,
              {
                textAlign: 'center',
                marginHorizontal: 40,
                marginTop: 15,
              },
            ]}>
            Мы отправили вам на почту комбинацию цифр, впишите её ниже.
          </Text>
          <ConfirmCode clear = {changeEmail.codeError?.server !==''} code = {(e)=>setCode(e)}/>
        </View>
      )}
      <Text style={[[Styles.tomatoMedium10]]}>
          {changeEmail.codeError?.server}
        </Text>
    </View>
  );
};
