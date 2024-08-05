import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword } from '../../store/action/action';
import { clearChangePassword } from '../../store/action/clearAction';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';
import { t } from '../../components/lang';
import { Input } from '../../ui/Input';

export const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPasswrd] = useState({ value: '', error: '' });
  const [newPassword, setNewPassword] = useState({ value: '', error: '' });
  const mainData = useSelector(st => st.mainData);
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const changePassword = useSelector(st => st.changePassword);
  const staticdata = useSelector(st => st.static);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      oldPassword.value !== '' &&
      newPassword.value !== '' &&
      confirmPassword.value
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [oldPassword, newPassword, confirmPassword]);
  const sendData = () => {
    let item = true;
    if (newPassword.value.length < 8) {
      item = false;
      setNewPassword({
        ...newPassword,
        error: 'Пароль должен содержать не менее 8-ми символов.',
      });
    } else {
      setNewPassword({ ...newPassword, error: '' });
    }
    if (confirmPassword.value !== newPassword.value) {
      setConfirmPassword({ ...confirmPassword, error: 'Пароли не совпадают' });
      item = false;
    } else {
      setConfirmPassword({ ...confirmPassword, error: '' });
    }
    if (item) {
      dispatch(
        changeUserPassword(
          {
            old_password: oldPassword.value,
            password: newPassword.value,
            password_confirmation: confirmPassword.value,
          },
          staticdata.token,
        ),
      );
    }
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(clearChangePassword())
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (changePassword.status) {
      navigation.navigate('ProfileScreen')
      dispatch(clearChangePassword())
    }
  }, [changePassword.status])
  return (
    <View style={{ alignItems: 'center', marginTop: 30 }}>
      <Input
        placeholder={t(mainData.lang).OldPassword}
        pass
        error={oldPassword.error || changePassword.error.email}
        value={oldPassword.value}
        onChange={e => setOldPasswrd({ ...oldPassword, value: e })}
        width={'80%'}
      />
      <Input
        placeholder={t(mainData.lang).NewPassword}
        pass
        error={newPassword.error}
        value={newPassword.value}
        onChange={e => setNewPassword({ ...newPassword, value: e })}
        width={'80%'}
      />
      <Input
        placeholder={t(mainData.lang).repeatnewpassword}
        pass
        error={confirmPassword.error}
        value={confirmPassword.value}
        onChange={e => setConfirmPassword({ ...confirmPassword, value: e })}
        width={'80%'}
        marginBottom={20}
      />
      <Button
        onPress={() => sendData()}
        loading={changePassword.loading}
        disabled={disabled}
        title={t(mainData.lang).Confirm}
      />
      <TouchableOpacity>
        {/* <Text style={[Styles.darkMedium12, {marginVertical: 15}]}>
          Забыли пароль?
        </Text> */}
      </TouchableOpacity>
      <Text style={[[Styles.tomatoMedium10]]}>
        {changePassword.error?.server}
      </Text>
    </View>
  );
};