import { createStackNavigator } from '@react-navigation/stack';
import { Settings } from '../screens/Settings/SettingsScreen';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { t } from '../components/lang';
import { useSelector } from 'react-redux';
import { Soundsandnotifications } from '../screens/Settings/Soundsandnotifications';
import { LikeNotification } from '../screens/Settings/LikeNotification';
import { ChangeBegraundStyle } from '../screens/Settings/ChangeBegraundStyle';

export const SettingsNavigation = () => {
  const Stack = createStackNavigator();
  const mainData = useSelector(st => st.mainData);

  return (
    <Stack.Navigator initialRouteName={'Settings'}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: ({ navigation }) => (
            <HeaderWhiteTitle title={t(mainData.data).Settings} onPress={() => navigation.goBack()} />
          ),
        }}
      />
      <Stack.Screen
        name="Soundsandnotifications"
        component={Soundsandnotifications}
        options={{
          header: ({ navigation }) => (
            <HeaderWhiteTitle title={t(mainData.data).Soundsandnotifications} onPress={() => navigation.goBack()} />
          ),
        }}
      />

      <Stack.Screen
        name="LikeNotification"
        component={LikeNotification}
        options={{
          header: ({ navigation }) => (
            <HeaderWhiteTitle title={t(mainData.data).Like} onPress={() => navigation.goBack()} />
          ),
        }}
      />

      <Stack.Screen
        name="ChangeBegraundStyle"
        component={ChangeBegraundStyle}
        options={{
          header: ({ navigation }) => (
            <HeaderWhiteTitle title={t(mainData.data).ChangeBackgroundStyle} onPress={() => navigation.goBack()} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};