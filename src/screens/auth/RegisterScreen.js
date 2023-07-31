import {useState,useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ConfirmCode} from '../../components/ConfirmCode';
import {Styles} from '../../styles/Styles';
import {Button} from '../../ui/Button';
import {Input} from '../../ui/Input';
import { useDispatch,useSelector } from 'react-redux'
import { ClearConfirmPasswordAction, ClearRegisterAction, ConfirmRegisterCode, RegisterAction } from '../../store/action/action';

export const RegisterScreen = ({navigation}) => {
  const [userName, setUsername] = useState({value: '', error: ''});
  const [name, setName] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [sendMail, setSnedMail] = useState(false);
  const [disableButton,setDisableButton] = useState(true)
  const [code,setCode] = useState('')
  const dispatch = useDispatch()
  const register = useSelector(st=>st.register)
  const confirm = useSelector(st=>st.confirmRegister)
  useEffect(()=>{
    if(userName.value && name.value  && password.value && email.value){
      setDisableButton(false)
    }
    else {
      setDisableButton(true)
    }
  },[userName,name,password,email])
  function ValidateEmail(mail) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
      return (false)
  }
  const Validation = () =>{
    let item = true
    if(password.value.length<8){
      item = false
      setPassword({...password,error:'Пароль должен содержать не менее 8-ми символов.'})
    }
    else {
      setPassword({...password,error:''})
    }
    if(confirmPassword.value !== password.value){
      setConfirmPassword({...confirmPassword,error:'Пароли не совпадают'})
      item = false

    }
    else {
      setConfirmPassword({...confirmPassword,error:''})
    }
    if(!ValidateEmail(email.value)){
      setEmail({...email,error:'Введите корректный адрес эл. почты'})
      item = false

    }
    else {
      setEmail({...email,error:''})
    }
    if(item){
      dispatch(RegisterAction({
        name:name.value,
        email:email.value,
        nickname:userName.value,
        password:password.value,
        password_confirmation:confirmPassword.value
      }))
    }
  }

  useEffect(()=>{
    if(register.status){
      setSnedMail(true)
    }
  },[register.status])
  useEffect(()=>{
    if(confirm.status){
      dispatch(ClearConfirmPasswordAction())
      dispatch(ClearRegisterAction())
      navigation.navigate('LoginScreen')
    }
  },[confirm.status])

  useEffect(()=>{
    if(code.length === 5){
      dispatch(ConfirmRegisterCode({
        email:email.value,
        code:code
      }))
    }
  },[code])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.authScreen}>
        <Text style={[Styles.darkSemiBold22, {marginBottom: 30}]}>Регистрация</Text>
        <Input
          placeholder={'ФИО/Название канала'}
          error={userName.error ||register.error?.username}
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
          pass
        />
        <Input
          placeholder={'Повтарйте пароль'}
          error={confirmPassword.error}
          value={confirmPassword.value}
          onChange = {(e)=>setConfirmPassword({...confirmPassword,value:e})}
          pass
        />
        <Input
          placeholder={'Укажите почту'}
          error={email.error||register.error?.email}
          value={email.value}
          onChange = {(e)=>setEmail({...email,value:e})}
        />
        {sendMail && (
          <View style = {{alignItems:'center'}}>
            <Text style={[Styles.balihaiMedium13, {textAlign: 'center'}]}>
              Мы отправили вам на почту комбинацию цифр, впишите её ниже.
            </Text>
            <ConfirmCode clear = {confirm.error !==''} code = {(e)=>setCode(e)} />
          </View>
        )}
        <Text style={[[Styles.tomatoMedium10]]}>
          {register.error?.server||confirm.error}
        </Text>
        {!sendMail && <Button loading={register.loading} onPress={()=>Validation()} disabled={disableButton} marginV={30} title={'Подтвердить'} />}
      </View>
    </ScrollView>
  );
};
