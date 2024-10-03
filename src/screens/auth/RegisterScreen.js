import { useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConfirmCode } from '../../components/ConfirmCode';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useDispatch, useSelector } from 'react-redux'
import { ClearConfirmPasswordAction, ClearRegisterAction, ConfirmRegisterCode, RegisterAction } from '../../store/action/action';
import { t } from '../../components/lang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppColors } from '../../styles/AppColors';

export const RegisterScreen = ({ navigation, route }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [ooo, setOoo] = useState({ value: '', error: '' })
  const [sendMail, setSnedMail] = useState(false);
  const [disableButton, setDisableButton] = useState(true)
  const [code, setCode] = useState('')
  const dispatch = useDispatch()
  const register = useSelector(st => st.register)
  const mainData = useSelector(st => st.mainData);
  const confirm = useSelector(st => st.confirmRegister)
  const [show, setShow] = useState(false)
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
    if (route.params.selected == 'Legal_entity') {
      if (ooo.value == "") {
        setOoo({ ...ooo, error: 'Введите корректный ooo' })
        item = false
      }
      else {
        setOoo({ ...ooo, error: '' })
      }
    }
    if (item) {
      dispatch(RegisterAction({
        name: name.value,
        email: email.value,
        password: password.value,
        user_type: route.params.selected,
        ooo: ooo.value
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
    if (confirm.status && route.params.selected == 'Legal_entity') {
      setShow(true)
    }
    else if (confirm.status) {
      Confirm()
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



  const Confirm = () => {
    setShow(false)
    dispatch(ClearConfirmPasswordAction())
    dispatch(ClearRegisterAction())
    navigation.navigate('Catalog');
    ShowDesctiption()
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {show &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            setModalVisible(!show);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>В данный момент проводится модерация аккаунта, после проверки всех данных мы направим информацию на Вашу почту, указанную при регистрации.</Text>
              <TouchableOpacity onPress={() => Confirm()} style={{ width: 200, backgroundColor: AppColors.Mustard_Color, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 10 }}>
                <Text style={{ color: 'white' }}>Понятно</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
      <View style={Styles.authScreen}>
        <Text style={[Styles.darkSemiBold22, { marginBottom: 30 }]}>{t(mainData.lang).Registration}</Text>
        <Input
          placeholder={route.params.selected == 'Individual' ?
            t(mainData.lang).FirstnameLastnameorchannelname :
            t(mainData.lang).Companyname
          }
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
        {route.params.selected == 'Legal_entity' && <Input
          placeholder={"ООО"}
          error={ooo.error}
          value={ooo.value}
          onChange={(e) => setOoo({ ...ooo, value: e })}
        />
        }
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    color: 'black'
  },
});