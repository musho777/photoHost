import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { BlackListScreen } from '../screens/Profile/BlackListScreen';
import { EditProfilScreen } from '../screens/Profile/EditProfilScreen/EditProfilScreen';
import { SavedPostScreen } from '../screens/Profile/SavedPostScreen';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../components/lang';
import { Catalog } from '../screens/catalog';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '../styles/Styles';
import { Api, ClearLoginAction, ClearUser, HidenTabNavigation, LogoutAction, ShowTabNavigation } from '../store/action/action';
import { CloseSvg } from '../assets/svg/Svgs';
import AccauntParametrNavigation from './AccauntParametrNavigation';
import MyPageNavigation from './MyPageNavigation';
import { ContactsPage } from '../screens/contacts';
import { SettingsNavigation } from './SettingsNavigation';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { DelateModal } from '../components/DelateModel';
import DeviceInfo from 'react-native-device-info';
import { SendMail } from '../components/SendMail';

function CustomDrawerContent(props) {
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const [showCommentModal, setShowCommentModal] = useState(false)


  const [show, setShow] = useState(false)
  const DelateAccaunt = async () => {
    setShow(false)
    let api = `${Api}/delete_account`
    var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${staticdata.token}`);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    await fetch(api, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen1', params: { screen: 'LoginScreen' } }],
          });
        }
      })
      .catch(error => {
      });
  }



  const LogOut = async () => {
    setShowModal(false)
    dispatch(ShowTabNavigation())
    const deviceId = await DeviceInfo.getUniqueId();
    dispatch(LogoutAction(staticdata.token, deviceId))
    dispatch(ClearLoginAction())
    dispatch(ClearUser())
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen1', params: { screen: 'LoginScreen' } }],
    });
  }

  const isDrawerOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    if (isDrawerOpen) {
      dispatch(HidenTabNavigation())
    }
    else {
      dispatch(ShowTabNavigation())
    }
  }, [isDrawerOpen])


  return (
    <View style={{ height: '100%', backgroundColor: 'white', }}>
      <DelateModal
        title={t(mainData.lang).Doyoureallywanttoexit}
        Confirm={() => LogOut()}
        confirmText={t(mainData.lang).logOut}
        show={showModal}
        setModalVisible={(e) => setShowModal(e)}
      />
      <DelateModal
        Confirm={() => {
          DelateAccaunt()
        }}
        confirmText={t(mainData.lang).Delete}
        title={"Удаление вашего аккаунта приведет к удалению всех данных, связанных с этим аккаунтом, включая [специфичные данные, если необходимо]. Это действие невозможно отменить. Вы уверены, что хотите продолжить?"}
        show={show}
        setModalVisible={(e) => setShow(e)}
      />
      <SendMail
        visible={showCommentModal}
        onClose={(e) => setShowCommentModal(false)}
      />
      <DrawerContentScrollView style={{ paddingTop: 40 }} {...props}>
        <TouchableOpacity style={{ paddingLeft: 15, width: 70, height: 30 }} onPress={() => props.navigation.closeDrawer()}>
          <CloseSvg />
        </TouchableOpacity>
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).Catalog}
          onPress={() => props.navigation.navigate('Catalog', { id: 'accaunt' })}
        />
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).Bookmarks}
          onPress={() => props.navigation.navigate('SavedPostScreen')}
        />
        {/* <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).Contacts}
          onPress={() => props.navigation.navigate('Contacts')}
        /> */}
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).Editprofile}
          onPress={() => props.navigation.navigate('EditProfilScreen')}
        />
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).Accountsettings}
          onPress={() => props.navigation.navigate('ParametrScreen')}
        />
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).Settings}
          onPress={() => props.navigation.navigate('SettingsNavigation')}
        />
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).Blacklist}
          onPress={() => props.navigation.navigate('BlackListScreen')}
        />
        <DrawerItem
          labelStyle={[Styles.darkRegular14]}
          label={"Помогите нам стать лучше"}
          onPress={() => setShowCommentModal(true)}
        />
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).logOut}
          onPress={() => setShowModal(true)}
        />
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={"Удалить аккаунт"}
          onPress={() => setShow(true)}
        />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AboutUsNavigation')}
        style={[{ marginBottom: 20, height: 40, paddingLeft: 10, justifyContent: 'center', borderColor: "#FFC24B", width: 90, marginLeft: 15, borderWidth: 1, }]}>
        <Text style={Styles.darkSemiBold16}>{t(mainData.lang).AboutProgram}</Text>
      </TouchableOpacity>
    </View>);
}

export const ProfileNavigation = () => {
  const Drawer = createDrawerNavigator();
  const mainData = useSelector(st => st.mainData);

  return (
    <Drawer.Navigator
      initialRouteName={'ProfileScreen'} screenOptions={{ drawerPosition: "right" }} drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="ProfileScreen"
        component={MyPageNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: false
        }}
      />
      <Drawer.Screen
        name="EditProfilScreen"
        component={EditProfilScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ParametrScreen"
        component={AccauntParametrNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="SettingsNavigation"
        component={SettingsNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="BlackListScreen"
        component={BlackListScreen}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => {
              navigation.goBack()
            }} title={t(mainData.lang).Blacklist} />
          }
        }}
      />
      <Drawer.Screen
        name="Contacts"
        component={ContactsPage}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => {
              navigation.goBack()
            }} title={'Синхронизация контактов'} />
          }
        }}
      />
      <Drawer.Screen
        name="SavedPostScreen"
        component={SavedPostScreen}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => {
              navigation.goBack()
            }} title={t(mainData.lang).Bookmarks} />
          }
        }}
      />
      <Drawer.Screen
        name="Catalog"
        component={Catalog}
        options={{
          header: ({ navigation }) => {
          }
        }}
      />
      {/* <Drawer.Screen
        name="AboutApplication"
        component={AboutApplication}
        options={{
          header: ({ navigation }) => {
          }
          // header: ({navigation}) => {
          //   return <HeaderWhiteTitle onPress={() => {
          //     navigation.goBack()
          //   }} title={t(mainData.lang).AboutProgram} />
          // }
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
})