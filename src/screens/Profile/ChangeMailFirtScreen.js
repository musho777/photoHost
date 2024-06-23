import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEmailFirstAction } from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { t } from '../../components/lang';

export const ChangeMailFirtScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState({ value: '', error: '' });
  const staticdata = useSelector(st => st.static);
  const [disabled, setDisabled] = useState(true);
  const changeEmail = useSelector(st => st.changeEmail);
  const dispatch = useDispatch();
  const mainData = useSelector(st => st.mainData);

  useEffect(() => {
    if (newPassword.value !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newPassword]);

  useEffect(() => {
    if (changeEmail.password) {
      navigation.navigate('ChangeMailScreen');
    }
  }, [changeEmail.password]);

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
    if (item) {
      dispatch(
        ChangeEmailFirstAction({
          password: newPassword.value,
        }, staticdata.token),
      );
    }
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 30 }}>
      <Input
        placeholder={t(mainData.lang).password}
        pass
        error={newPassword.error || changeEmail.passwordError?.email}
        value={newPassword.value}
        onChange={e => setNewPassword({ ...newPassword, value: e })}
        width={'80%'}
      />
      <Button
        onPress={() => sendData()}
        loading={changeEmail.passwordLoading}
        disabled={disabled}
        title={t(mainData.lang).Confirm}
      />

      <Text style={[[Styles.tomatoMedium10]]}>
        {changeEmail.passwordError?.server}
      </Text>
    </View>
  );
};
