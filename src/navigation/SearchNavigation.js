import { createStackNavigator } from '@react-navigation/stack';
import { SearchBlock } from '../screens/Search/SearchBlock';

export const SearchNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'SearchScreen'}>
      <Stack.Screen
        name="SearchScreen"
        component={SearchBlock}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="SearchProfil"
        component={SearchProfil}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};