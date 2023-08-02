import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  SafeAreaView,
} from 'react-native';
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BackArrow} from '../assets/svg/Svgs';
import { LogoutAction } from '../store/action/action';
import {Styles} from '../styles/Styles';

export const Menu = ({visible, close}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const login = useSelector(st=>st.login)
  useEffect(()=>{
    if(login.logoutStatus){
      navigation.navigate('LoginScreen')
      close()
    }
  },[login.logoutStatus])
  return (
    <SafeAreaView>
      <Modal animationType="slide" visible={visible} transparent={true}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => close()}
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => close()}
              style={{marginTop: 20}}>
              <BackArrow />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('EditProfilScreen');
              }}>
              <Text style={[Styles.darkRegular16, {marginTop: 25}]}>
                Редактировать профиль
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('ParametrScreen');
              }}>
              <Text style={[Styles.darkRegular16, {marginTop: 30}]}>
                Параметры аккаунта
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('BlackListScreen');
              }}>
              <Text style={[Styles.darkRegular16, {marginTop: 30}]}>
                Черный список
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>dispatch(LogoutAction(staticdata.token))}>
              <Text style={[Styles.darkRegular16, {marginTop: 30}]}>Выйти</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  menu: {
    height: '100%',
    width: '73%',
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: '#FFF',
    padding: 20,
  },
  goPremium: {
    position: 'absolute',
    bottom: 110,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
});
