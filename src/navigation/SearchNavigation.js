import {createStackNavigator} from '@react-navigation/stack';
import {HeaderWhiteTitle} from '../headers/HeaderWhiteTitle.';
import {InterestingScreen} from '../screens/Search/InterestingScreen';
import {SearchScreen} from '../screens/Search/SearchScreen';

export const SearchNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'SearchScreen'}>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InterestingScreen"
        component={InterestingScreen}
        options={{
            header:({navigation})=>{
                return <HeaderWhiteTitle onPress={()=>navigation.goBack()} title={'Интересное'}/> 
            }
        }}
      />
    </Stack.Navigator>
  );
};
