import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AddSvg, ChatSvg, HomeSvg, SearchSvg, UserSvg } from '../assets/svg/TabBarSvg';
import { HomeHeader } from '../headers/HomeHeader';
import { HomeScreen } from '../screens/Home/HomeScreen';

export const TabNavigation = () =>{
    const Tab = createBottomTabNavigator();
    return <Tab.Navigator 
            screenOptions = {({route}) =>({
                tabBarShowLabel: false,
                tabBarStyle: ( () => { 
                    return  {height: 80,backgroundColor:'#FFF',borderTopColor:'#FFF' ,borderTopWidth:1}
                })(route),
            })}
            >
            <Tab.Screen 
                options={()=>({
                header:({navigation})=>{
                    return <HomeHeader />
                },
                tabBarIcon:({focused})=> <HomeSvg focused={focused} />}
                )}
                name="Home" 
                component={HomeScreen}
            />
            <Tab.Screen 
                options={()=>({tabBarIcon:({focused})=> <SearchSvg focused={focused} />})}
                name="Home1" 
                component={HomeScreen}
            />
            <Tab.Screen 
                options={()=>({tabBarIcon:({focused})=> <AddSvg focused={focused} />})}
                name="Home2" 
                component={HomeScreen}
            />
            <Tab.Screen 
                options={()=>({tabBarIcon:({focused})=> <ChatSvg focused={focused} />})}
                name="Home3" 
                component={HomeScreen}
            />
            <Tab.Screen 
                options={()=>({tabBarIcon:({focused})=> <UserSvg focused={focused} />})}
                name="Home4" 
                component={HomeScreen}
            />
         </Tab.Navigator>     
}
// ChatSvg
// UserSvg