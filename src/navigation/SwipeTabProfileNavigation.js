import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Albom } from '../components/Albom';

import { Text, View } from 'react-native';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { Styles } from '../styles/Styles';
export const SwipeTabProfileNavigation = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
      <Tab.Navigator 
      tabBarOptions ={{
        pressColor:'white',
      }}
       screenOptions = {({route}) =>({
        tabBarStyle: { backgroundColor: 'red',marginHorizontal:10},
        tabBarLabel:({tintColor, focused, item}) =>{
            return focused? (
                <View style = {{justifyContent:'center',alignItems:'center'}}>
                    <Text style = {Styles.darkRegular14}>{route.name}</Text>
                </View>
            )
            : (
                <View style = {{justifyContent:'center',alignItems:'center'}}>
                    <Text style = {Styles.heatherRegular14}>{route.name}</Text>
                </View>
            )
        }
      })}
      >
           <Tab.Screen name="Альбом" component={Albom} />
           <Tab.Screen name="Закладки" component={Albom}/>
           <Tab.Screen name="Контакты" component={Albom}/>
      </Tab.Navigator>
  );
};