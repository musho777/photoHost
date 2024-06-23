import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { HomeNavigation } from './HomeNavigation';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 50, // Adjust the height as needed
                backgroundColor: 'white', // Set your desired background color
                elevation: 0, // Remove top border shadow
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                // Your tab button styling here

                return (
                    <Tab.Screen
                        options={() => ({
                            headerShown: false,
                            tabBarIcon: ({ focused }) => <HomeSvg focused={focused} />,
                        })}
                        name="Home"
                        component={HomeNavigation}
                    />
                );
            })}
        </View>
    );
};

const App = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            {/* Your individual tabs go here */}
            <Tab.Screen name="Screen1" component={Screen1} />
            <Tab.Screen name="Screen2" component={Screen2} />
            {/* Add more screens as needed */}
        </Tab.Navigator>
    );
};

export default App;
