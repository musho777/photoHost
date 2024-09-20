import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { BlackListScreen } from '../screens/Profile/BlackListScreen';
import { EditProfilScreen } from '../screens/Profile/EditProfilScreen/EditProfilScreen';
import { SavedPostScreen } from '../screens/Profile/SavedPostScreen';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../components/lang';
import { Catalog } from '../screens/catalog';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '../styles/Styles';
import { ClearLoginAction, ClearUser, LogoutAction } from '../store/action/action';
import { CloseSvg } from '../assets/svg/Svgs';
import AccauntParametrNavigation from './AccauntParametrNavigation';
import MyPageNavigation from './MyPageNavigation';
import { ContactsPage } from '../screens/contacts';
import { AboutApplication } from '../screens/Profile/AboutApplication';

function CustomDrawerContent(props) {
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const dispatch = useDispatch()

  const LogOut = async () => {
    dispatch(LogoutAction(staticdata.token))
    dispatch(ClearLoginAction())
    dispatch(ClearUser())
    props.navigation.navigate('LoginScreen1', { screen: 'LoginScreen' })
  }
  return (
    <View style={{ height: '100%', backgroundColor: 'white', }}>
      <DrawerContentScrollView style={{ paddingTop: 40 }} {...props}>
        <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => props.navigation.closeDrawer()}>
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
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).Contacts}
          onPress={() => props.navigation.navigate('Contacts')}
        />
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
          label={t(mainData.lang).Blacklist}
          onPress={() => props.navigation.navigate('BlackListScreen')}
        />
        <DrawerItem
          labelStyle={[Styles.darkRegular16]}
          label={t(mainData.lang).logOut}
          onPress={() => LogOut()}
        />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AboutApplication')}
        style={[{ marginBottom: 70, height: 20, paddingLeft: 15 }]}>
        <Text style={Styles.darkRegular16}>{t(mainData.lang).AboutProgram}</Text>
      </TouchableOpacity>
      {/* <View style={{ borderWidth: 1, height: 50, marginBottom: 100 }}>
        <DrawerItem
          labelStyle={[Styles.darkRegular16, { marginBottom: -100, borderWidth: 1, }]}
          label={t(mainData.lang).AboutProgram}
          onPress={() => props.navigation.navigate('BlackListScreen')}
        />
      </View> */}
    </View>);
}

export const ProfileNavigation = () => {
  const Drawer = createDrawerNavigator();
  const mainData = useSelector(st => st.mainData);

  return (
    <Drawer.Navigator
      initialRouteName={'ProfileScreen'} drawerContent={props => <CustomDrawerContent {...props} />}>
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
        name="BlackListScreen"
        component={BlackListScreen}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => {
              navigation.goBack()
              navigation.openDrawer()
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
              navigation.openDrawer()
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
              navigation.openDrawer()
            }} title={t(mainData.lang).Bookmarks} />
          }
        }}
      />
      <Drawer.Screen
        name="Catalog"
        component={Catalog}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => {
              navigation.goBack()
              navigation.openDrawer()
            }} title={t(mainData.lang).Catalog} />
          }
        }}
      />
      <Drawer.Screen
        name="AboutApplication"
        component={AboutApplication}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => {
              navigation.goBack()
              navigation.openDrawer()
            }} title={t(mainData.lang).AboutProgram} />
          }
        }}
      />
    </Drawer.Navigator>
  );
};