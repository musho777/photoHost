import {useState} from 'react';
import {View, Text} from 'react-native';
import { ConfirmCode } from '../../components/ConfirmCode';
import {Styles} from '../../styles/Styles';
import { Button } from '../../ui/Button';
import {Input} from '../../ui/Input';

export const ChangeMailScreen = () => {
  const [email, setEmail] = useState({value: '', error: ''});
  return (
    <View style={{alignItems: 'center', marginTop: 30}}>
      <Input
        data={email}
        onChange={e => setEmail({...email, value: e})}
        placeholder="Новая почта"
        width="80%"
      />
      <Text
        style={[
          Styles.balihaiRegular14,
          {
            textAlign: 'center',
            marginHorizontal: 40,
          },
        ]}>
        Мы отправили вам на почту комбинацию цифр, впишите её ниже.
      </Text>
      <ConfirmCode />
      <Button title={'Готово'} marginV = {20} />
    </View>
  );
};
