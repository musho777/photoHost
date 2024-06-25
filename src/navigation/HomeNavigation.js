import { createStackNavigator } from '@react-navigation/stack';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { HomeHeader } from '../headers/HomeHeader';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { NotificationScreen } from '../screens/Home/NotificationScreen';
import { Catalog } from '../screens/catalog';

export const HomeNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'Catalog'}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: ({ navigation }) => {
            return <HomeHeader navigation={navigation} />;
          },
        }}
      />
      <Stack.Screen
        name="Catalog"
        component={Catalog}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <HeaderWhiteTitle
                transparent
                onPress={() => navigation.goBack()}
                title={'Уведомления'}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};
