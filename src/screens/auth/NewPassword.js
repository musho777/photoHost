import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { NewPasswordAction } from '../../store/action/action';
import { CleanNewPassword } from '../../store/action/clearAction';
import { t } from '../../components/lang';

export const NewPassword = ({ navigation }) => {
  const [password, setPassword] = useState({ error: '', value: '' });
  const [confirmPassword, setConfirmPassword] = useState({ error: '', value: '' });
  const [disabled, setDisabled] = useState(true)
  const confirm = useSelector(st => st.confirmForgotPassword);
  const newPassword = useSelector(st => st.newPassword);
  const dispatch = useDispatch()
  const mainData = useSelector(st => st.mainData);
  useEffect(() => {
    if (password.value && confirmPassword.value) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [password, confirmPassword])
  const snedNewPassword = () => {
    let send = true
    if (password.value.length < 8) {
      setPassword({ ...password, error: 'Пароль должен содержать не менее 8-ми символов.' })
      send = false
    }
    else {
      setPassword({ ...password, error: '' })
    }
    if (confirmPassword.value !== password.value) {
      setConfirmPassword({ ...confirmPassword, error: 'Пароли не совпадают' })
      send = false
    }
    else {
      setConfirmPassword({ ...confirmPassword, error: '' })
    }
    if (send) {
      dispatch(NewPasswordAction({
        email: confirm.email,
        code: confirm.code,
        password: password.value,
        password_confirmation: confirmPassword.value
      }))
    }
  }
  useEffect(() => {
    if (newPassword.status) {
      navigation.navigate('LoginScreen')
    }
  }, [newPassword.status])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(CleanNewPassword())
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={[Styles.authScreen, { marginTop: 80 }]}>
      <Text style={[Styles.darkSemiBold22, { marginBottom: 30, textAlign: 'center' },]}>{confirm.username}</Text>
      <Input
        placeholder={t(mainData.lang).Createapassword}
        error={password.error}
        value={password.value}
        onChange={(e) => setPassword({ ...password, value: e })}
        pass
      />
      <Input
        placeholder={t(mainData.lang).Confirmpassword}
        error={confirmPassword.error}
        value={confirmPassword.value}
        onChange={(e) => setConfirmPassword({ ...confirmPassword, value: e })}
        pass
      />
      <Button loading={newPassword.loading} onPress={() => snedNewPassword()} disabled={disabled} marginV={20} title={t(mainData.lang).Confirm} />
    </View>
  );
};
