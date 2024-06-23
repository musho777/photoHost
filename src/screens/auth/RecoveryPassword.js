import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmCode } from '../../components/ConfirmCode';
import {
  ClearConfirmPasswordAction,
  ForgotPasswordAction,
  ValidationForogtPasswordAction,
} from '../../store/action/action';
import { ClearForGotPassword, ClearValidationForgotPassword } from '../../store/action/clearAction';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { t } from '../../components/lang';

export const RecoveryPassword = ({ navigation }) => {
  const [email, setEmail] = useState({ error: '', value: '' });
  const [send, setSend] = useState(false);
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const forgotPassword = useSelector(st => st.forgotPassword);
  const confirm = useSelector(st => st.confirmForgotPassword);
  const mainData = useSelector(st => st.mainData);
  const [code, setCode] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setSend(false);
      setDisable(true);
      dispatch(ClearForGotPassword());
      dispatch(ClearConfirmPasswordAction())
      dispatch(ClearValidationForgotPassword())
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (forgotPassword.status) {
      setSend(true);
    }
  }, [forgotPassword.status]);
  useEffect(() => {
    if (email.value) {
      setDisable(false);
    }
  }, [email]);
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
  const sendForgotPassword = () => {
    setEmail({ ...email, error: '' });
    if (ValidateEmail(email.value)) {
      dispatch(ForgotPasswordAction({ email: email.value }));
    } else {
      setEmail({ ...email, error: 'Введите корректный адрес эл. почты' });
    }
  };
  useEffect(() => {
    if (code.length === 5) {
      dispatch(ValidationForogtPasswordAction({ email: email.value, code: code }));
    }
  }, [code]);
  useEffect(() => {
    if (confirm.status) {
      navigation.navigate('NewPassword');
    }
  }, [confirm.status]);
  return (
    <View style={[Styles.authScreen, { marginTop: 30, paddingHorizontal: 35 }]}>
      <Text
        style={[
          Styles.darkSemiBold22,
          { marginBottom: 30, textAlign: 'center' },
        ]}>
        {t(mainData.lang).Passwordrecovery}
      </Text>
      <Input
        placeholder={t(mainData.lang).Enteremailmail}
        error={email.error || forgotPassword.error}
        value={email.value}
        width={'95%'}
        onChange={e => setEmail({ ...email, value: e })}
        disable={!send}
      />
      {!send && (
        <Button
          loading={forgotPassword.loading}
          disabled={disable}
          marginV={10}
          onPress={() => sendForgotPassword()}
          title={t(mainData.lang).Next}
        />
      )}
      {send && (
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={[Styles.balihaiMedium13, { textAlign: 'center' }]}>
            Мы отправили вам на почту комбинацию цифр, впишите её ниже.
          </Text>
          <ConfirmCode clear={confirm.error !== ''} code={e => setCode(e)} />
          <Text style={[[Styles.tomatoMedium10]]}>{confirm.error}</Text>
        </View>
      )}
    </View>
  );
};
