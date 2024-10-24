
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { ParametrScreen } from '../screens/Profile/ParametrScreen';
import { t } from '../components/lang';
import { useSelector } from 'react-redux';
import { ChangePasswordScreen } from '../screens/Profile/ChangePasswordScreen';
import { ChangeMailScreen } from '../screens/Profile/ChangeMailScreen';
import { ChangeMailFirtScreen } from '../screens/Profile/ChangeMailFirtScreen';


export default AccauntParametrNavigation = () => {
  const mainData = useSelector(st => st.mainData);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'ParametrScreens'}>

      <Stack.Screen
        name="ParametrScreens"
        component={ParametrScreen}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => {
              navigation.goBack()
            }} title={t(mainData.lang).Accountsettings} />
          }
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => navigation.goBack()} title={t(mainData.lang).Changepassword} />
          }
        }}
      />
      <Stack.Screen
        name="ChangeMailScreen"
        component={ChangeMailScreen}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => navigation.goBack()} title={t(mainData.lang).Changemail} />
          }
        }}
      />
      <Stack.Screen
        name="ChangeMailFirtScreen"
        component={ChangeMailFirtScreen}
        options={{
          header: ({ navigation }) => {
            return <HeaderWhiteTitle onPress={() => navigation.goBack()} title={t(mainData.lang).Changemail} />
          }
        }}
      />

    </Stack.Navigator>
  );
};