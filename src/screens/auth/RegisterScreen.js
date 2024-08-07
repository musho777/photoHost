import { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ConfirmCode } from '../../components/ConfirmCode';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useDispatch, useSelector } from 'react-redux'
import { ClearConfirmPasswordAction, ClearRegisterAction, ConfirmRegisterCode, RegisterAction } from '../../store/action/action';
import { t } from '../../components/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RegisterScreen = ({ navigation }) => {
  const [userName, setUsername] = useState({ value: '', error: '' });
  const [name, setName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [sendMail, setSnedMail] = useState(false);
  const [disableButton, setDisableButton] = useState(true)
  const [code, setCode] = useState('')
  const dispatch = useDispatch()
  const register = useSelector(st => st.register)
  const mainData = useSelector(st => st.mainData);
  const confirm = useSelector(st => st.confirmRegister)
  useEffect(() => {
    if (name.value && password.value && email.value) {
      setDisableButton(false)
    }
    else {
      setDisableButton(true)
    }
  }, [name, password, email])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(ClearRegisterAction())
      setSnedMail(false)
    });
    return unsubscribe;
  }, [navigation]);

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
  const Validation = () => {
    let item = true
    if (password.value.length < 1) {
      item = false
      setPassword({ ...password, error: 'Пароль должен содержать не менее 1-ми символов.' })
    }
    else {
      setPassword({ ...password, error: '' })
    }
    if (!ValidateEmail(email.value)) {
      setEmail({ ...email, error: 'Введите корректный адрес эл. почты' })
      item = false

    }
    else {
      setEmail({ ...email, error: '' })
    }
    if (item) {
      dispatch(RegisterAction({
        name: name.value,
        email: email.value,
        password: password.value,
      }))
    }
  }

  useEffect(() => {
    if (register.status) {
      setSnedMail(true)
    }
  }, [register.status])


  const ShowDesctiption = async () => {
    await AsyncStorage.setItem('showDescription', 'yes')

  }


  useEffect(() => {
    if (confirm.status) {
      dispatch(ClearConfirmPasswordAction())
      dispatch(ClearRegisterAction())
      navigation.navigate('Catalog');
      ShowDesctiption()
    }
  }, [confirm.status])

  useEffect(() => {
    if (code.length === 5) {
      dispatch(ConfirmRegisterCode({
        email: email.value,
        code: code
      }))
    }
  }, [code])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.authScreen}>
        <Text style={[Styles.darkSemiBold22, { marginBottom: 30 }]}>{t(mainData.lang).Registration}</Text>
        {/* <Input
          placeholder={t(mainData.lang).FirstnameLastnameorchannelname}
          error={userName.error || register.error?.username}
          value={userName.value}
          onChange={(e) => setUsername({ ...userName, value: e })}
        /> */}
        <Input
          placeholder={t(mainData.lang).FirstnameLastnameorchannelname}
          error={name.error}
          value={name.value}
          onChange={(e) => setName({ ...name, value: e })}
        />
        <Input
          placeholder={t(mainData.lang).Enteryouremail}
          error={email.error || register.error?.email}
          value={email.value}
          onChange={(e) => setEmail({ ...email, value: e })}
        />
        <Input
          placeholder={t(mainData.lang).Createapassword}
          error={password.error}
          value={password.value}
          onChange={(e) => setPassword({ ...password, value: e })}
          pass
        />

        {sendMail && (
          <View style={{ alignItems: 'center' }}>
            <Text style={[Styles.balihaiMedium13, { textAlign: 'center' }]}>
              Мы отправили вам на почту комбинацию цифр, впишите её ниже.
            </Text>
            <ConfirmCode clear={confirm.error !== ''} code={(e) => setCode(e)} />
          </View>
        )}
        <Text style={[[Styles.tomatoMedium10]]}>
          {register.error?.server || confirm.error}
        </Text>
        {!sendMail && <Button loading={register.loading} onPress={() => Validation()} disabled={disableButton} marginV={30} title={t(mainData.lang).Confirm} />}
      </View>
    </ScrollView>
  );
};
