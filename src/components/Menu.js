import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackArrow } from '../assets/svg/Svgs';
import { ClearLoginAction, LogoutAction } from '../store/action/action';
import { Styles } from '../styles/Styles';
import { t } from './lang';
import { useEffect } from 'react';



export const Menu = ({ visible, close }) => {
  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);

  return (
    <SafeAreaView>
      <Modal animationType="slide" visible={visible} transparent={true}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => close()}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => close()}
              style={{ marginTop: 20 }}>
              <BackArrow />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('EditProfilScreen');
              }}>
              <Text style={[Styles.darkRegular16, { marginTop: 25 }]}>
                {t(mainData.lang).Editprofile}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('Catalog', { id: 'accaunt' });
              }}>
              <Text style={[Styles.darkRegular16, { marginTop: 25 }]}>
                {t(mainData.lang).Catalog}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('ParametrScreen');
              }}>
              <Text style={[Styles.darkRegular16, { marginTop: 30 }]}>
                {t(mainData.lang).Accountsettings}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('BlackListScreen');
              }}>
              <Text style={[Styles.darkRegular16, { marginTop: 30 }]}>
                {t(mainData.lang).Blacklist}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('SavedPostScreen');
              }}>
              <Text style={[Styles.darkRegular16, { marginTop: 30 }]}>
                {t(mainData.lang).Bookmarks}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              dispatch(LogoutAction(staticdata.token))
              dispatch(ClearLoginAction())
              navigation.navigate('LoginScreen1', { screen: 'LoginScreen' })
              close()
            }}>
              <Text style={[Styles.darkRegular16, { marginTop: 30 }]}>{t(mainData.lang).logOut}</Text>
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
