import {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Styles} from '../../styles/Styles';
import {Button} from '../../ui/Button';
import {Input} from '../../ui/Input';

export const ChangePasswordScreen = () => {
  const [oldPassword, setOldPasswrd] = useState({value: '', error: ''});
  const [newPassword, setNewPassword] = useState({value: '', error: ''});
  const [disabled,setDisabled] = useState(true)
  useEffect(()=>{
    if(oldPassword.value!=='' && newPassword.value !=='   '){
        setDisabled(false)
    }
    else {
        setDisabled(true)
    }
  },[])
  return (
    <View style={{alignItems: 'center', marginTop: 30}}>
      <Input
        placeholder={'Старый пароль'}
        pass
        error={oldPassword.error}
        value={oldPassword.value}
        onChange={e => setOldPasswrd(e)}
        width={'80%'}
      />
      <Input
        placeholder={'Новый пароль'}
        pass
        error={newPassword.error}
        value={newPassword.value}
        onChange={e => setNewPassword(e)}
        width={'80%'}
        marginBottom={20}
      />
      <Button disabled = {disabled} title={'Подтвердить'} />
      <TouchableOpacity>
        <Text style={[Styles.darkMedium12, {marginVertical: 15}]}>
          Забыли пароль?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
