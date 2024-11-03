import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowSvg } from '../../assets/svg/Svgs';
import { ClearEmailChange } from '../../store/action/clearAction';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChnageLanguage } from '../../store/action/action';
import { useFocusEffect } from '@react-navigation/native';

export const ParametrScreen = ({ navigation }) => {
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch()
  const mainData = useSelector(st => st.mainData);
  const [showModal, setShowModal] = useState(false)

  const changeLanguage = async (type) => {
    await AsyncStorage.setItem('lang', type)
    dispatch(ChnageLanguage(type))
  }


  return <View >
    <View onPress={() => setShowModal(false)} >
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          showModal(false);
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() => setShowModal(false)} style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => changeLanguage('ru')} style={styles.languageButton}>
              <Text>ru</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.languageButton}>
              <Text>en</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
    <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')} style={[Styles.flexSpaceBetween, { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: AppColors.Solitude_Color, paddingRight: 15 }]}>
      <Text style={[Styles.darkSemiBold14, { paddingHorizontal: 15 }]}>{t(mainData.lang).Changepassword}</Text>
      <ArrowSvg />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      dispatch(ClearEmailChange())
      navigation.navigate('ChangeMailFirtScreen')
    }} style={[Styles.flexSpaceBetween, { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: AppColors.Solitude_Color, paddingRight: 15 }]}>
      <View style={Styles.flexAlignItems}>
        <Text style={[Styles.darkSemiBold14, { paddingHorizontal: 15 }]}>{t(mainData.lang).Changemail}</Text>
        <Text style={[Styles.balihaiMedium13,]}>{user.email.length > 20 ? `${user.email.substring(0, 20)}...` : user.email}</Text>
      </View>
      <ArrowSvg />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setShowModal(true)} style={[Styles.flexSpaceBetween, { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: AppColors.Solitude_Color, paddingRight: 15 }]}>
      <Text style={[Styles.darkSemiBold14, { paddingHorizontal: 15 }]}>{t(mainData.lang).changelanguage}</Text>
      <ArrowSvg />
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    flexDirection: 'row',
    gap: 20,
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
    textAlign: 'center',
  },
});