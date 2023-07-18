import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { ConfirmCode } from '../../components/ConfirmCode';
import {Styles} from '../../styles/Styles';
import {Button} from '../../ui/Button';
import {Input} from '../../ui/Input';

export const RecoveryPassword = ({navigation}) => {
  const [email, setEmail] = useState({error: '', value: ''});
  return (
      <View style={[Styles.authScreen,{marginTop:80,paddingHorizontal:35}]}>
        <Text style={[ Styles.darkSemiBold22,{marginBottom: 30, textAlign: 'center'},]}>Восстановление пароля</Text>
        <Input
          placeholder={'Введите эл. почту'}
          error={email.error}
          value={email.value}
          width = {'95%'}
          onChange = {(e)=>setEmail({...email,value:e})}
        />
        <View style = {{alignItems:'center'}}>
            <Text style={[Styles.balihaiMedium13, {textAlign: 'center'}]}>
              Мы отправили вам на почту комбинацию цифр, впишите её ниже.
            </Text>
            <ConfirmCode />
          </View>
        <Button marginV={20} onPress = {()=>navigation.navigate('NewPassword')} title={'Далее'} />
      </View>
  );
};
