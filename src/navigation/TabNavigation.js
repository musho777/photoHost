import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddSvg, ChatSvg, HomeSvg, SearchSvg, UserSvg } from '../assets/svg/TabBarSvg';
import { ChatNavigation } from './ChatNavigation';
import { SearchNavigation } from './SearchNavigation';
import { ProfileNavigation } from './ProfileNavigation';
import { AddImg } from '../screens/AddImg/AddImg';
import { HomeNavigation } from './HomeNavigation';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const user = useSelector((st) => st.userData);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [msgCount, setMsgCount] = useState('');
  const { full } = useSelector((st) => st.fullScreen)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setMsgCount(user.msgCount);
  }, [user.msgCount]);

  if (!isKeyboardVisible) {
    if (!full) {
      return (
        <View style={{
          flexDirection: 'row',
          height: 32,
          backgroundColor: '#FFF',
          borderTopColor: '#FFF',
        }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            let tabIcon = null;

            if (label === 'Home') {
              tabIcon = <HomeSvg focused={isFocused} />;
            } else if (label === 'SearchNavigation') {
              tabIcon = <SearchSvg focused={isFocused} />;
            } else if (label === 'AddImg') {
              tabIcon = (
                <View style={{ marginLeft: -2 }}>
                  <AddSvg focused={isFocused} />
                </View>
              );
            } else if (label === 'ChatNavigation') {
              tabIcon = (
                <View>
                  {msgCount > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        right: -7,
                        top: -10,
                        backgroundColor: 'red',
                        borderRadius: 20,
                        height: 15,
                        width: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <Text style={{ color: '#FFF', fontSize: 10 }}>{msgCount}</Text>
                    </View>
                  )}
                  <ChatSvg focused={isFocused} />
                </View>
              );
            } else if (label === 'ProfileNavigation') {
              tabIcon = <UserSvg focused={isFocused} />;
            }

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                if (route.name == 'ProfileNavigation') {
                  navigation.navigate(route.name, {
                    screen: 'ProfileScreen'
                  });
                }
                else {

                  navigation.navigate(route.name);
                }
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableWithoutFeedback
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  {tabIcon}
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      );
    }
  }
};

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const user = useSelector((st) => st.userData);
  const [msgCount, setMsgCount] = useState('');

  useEffect(() => {
    setMsgCount(user.msgCount);
  }, [user.msgCount]);

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        options={() => ({
          headerShown: false,
        })}
        name="Home"
        component={HomeNavigation}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
        })}
        name="SearchNavigation"
        component={SearchNavigation}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
        })}
        name="AddImg"
        component={AddImg}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
        })}
        name="ChatNavigation"
        component={ChatNavigation}
      />
      <Tab.Screen
        options={() => ({
          headerShown: false,
        })}
        name="ProfileNavigation"
        component={ProfileNavigation}
      />

    </Tab.Navigator>
  );
};

