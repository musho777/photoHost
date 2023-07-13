import {useState} from 'react';
import {View, Text} from 'react-native';
import {Styles} from '../../styles/Styles';
import {Button} from '../../ui/Button';
import {Input} from '../../ui/Input';

export const NewPassword = ({navigation}) => {
  const [password, setPassword] = useState({error: '', value: ''});
  const [confirmPassword, setConfirmPassword] = useState({error: '', value: ''});
  return (
      <View style={[Styles.authScreen,{marginTop:80}]}>
        <Text style={[ Styles.darkMedium22,{marginBottom: 30, textAlign: 'center'},]}>big_fish</Text>
        <Input
          placeholder={'Придумайте пароль'}
          error={password.error}
          value={password.value}
          onChange = {(e)=>setPassword({...password,value:e})}
          pass
        />
        <Input
          placeholder={'Повторите пароль'}
          error={confirmPassword.error}
          value={confirmPassword.value}
          onChange = {(e)=>setConfirmPassword({...confirmPassword,value:e})}
          pass
        />
        <Button disabled marginV={20} title={'Подтвердить'} />
      </View>
  );
};
