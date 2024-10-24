import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddSvg, ChatSvg, HomeSvg, SearchSvg, UserSvg } from '../assets/svg/TabBarSvg';
import { ChatNavigation } from './ChatNavigation';
import { SearchNavigation } from './SearchNavigation';
import { ProfileNavigation } from './ProfileNavigation';
import { HomeNavigation } from './HomeNavigation';
import { Keyboard, Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ClearLoginAction, ClearUser, LogoutAction } from '../store/action/action';
import { PostNavigation } from './postNavigation';
import { Styles } from '../styles/Styles';
import { t } from '../components/lang';


const CustomTabBar = ({ state, descriptors, navigation }) => {
  const user = useSelector((st) => st.userData);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const currentRouteName = state.routes[state.index].name;
  const { show } = useSelector((st) => st.showTabNavigatior)
  const mainData = useSelector(st => st.mainData);


  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  const AddPostShow = () => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
    else {
      setIsVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }


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
  if (!isKeyboardVisible) {
    if (currentRouteName != "AddImg" && show) {
      return (
        <SafeAreaView >
          <View style={styles.tabWrapper}>
            <View style={{ width: "100%", height: 50, position: 'absolute', bottom: 50, justifyContent: 'center', alignItems: 'center', left: 0, right: 0, margin: 'auto' }}>
              <Animated.View style={[styles.box, { opacity: fadeAnim, }]}>
                <View style={styles.triangle} />
                <View style={{ alignItems: 'center', marginTop: 3, gap: 5 }}>
                  <Text
                    onPress={() =>
                      navigation.navigate('AddImg', { screen: 'AddPhoto' })
                    }
                    style={Styles.darkMedium13}>{t(mainData.lang).Addphoto}</Text>
                  <Text
                    onPress={() => {
                      navigation.navigate('AddImg', { screen: 'AddText' })
                    }}
                    style={Styles.darkMedium13}>{t(mainData.lang).Addtext}</Text>
                </View>
              </Animated.View>
            </View>
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
                  <View>
                    <AddSvg focused={isFocused} />
                  </View>
                );
              } else if (label === 'ChatNavigation') {
                tabIcon = (
                  <View>
                    {user.msgCount > 0 && (
                      <View
                        style={styles.message}>
                        <Text style={{ color: '#FFF', fontSize: 10, fontWeight: '600' }}>{user.msgCount}</Text>
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
                console.log(route.name, 'route.name')
                if (!isFocused && !event.defaultPrevented) {
                  if (route.name == 'ProfileNavigation') {
                    navigation.navigate(route.name, {
                      screen: 'ProfileScreen'
                    });
                  }
                  else if (route.name == "AddImg") {
                    AddPostShow()
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
                <TouchableOpacity
                  key={index}
                  accessibilityRole="button"
                  style={{ width: '20%' }}
                  accessibilityState={isFocused ? { selected: true } : {}}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                >
                  <View style={styles.tabBar}>
                    {tabIcon}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </SafeAreaView >
      );
    }
  }
};

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation()
  const userData = useSelector((st) => st.userData)
  const staticdata = useSelector(st => st.static);
  const dispatch = useDispatch()
  const LogOut = async () => {
    dispatch(LogoutAction(staticdata.token))
    dispatch(ClearLoginAction())
    dispatch(ClearUser())
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen1', params: { screen: 'LoginScreen' } }],
    });
  }

  useEffect(() => {
    if (userData.error == 'no_token') {
      LogOut()
    }
  }, [userData.error])


  return (
    <Tab.Navigator
      tabBar={(props) => <View style={{ backgroundColor: 'transparent' }}>
        <CustomTabBar {...props} />
      </View>
      }

      screenOptions={({ route }) => ({
        // tabBarShowLabel: false,
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
          lazyLoad: true,
          style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            left: 50,
            right: 50,
            bottom: 20,
            height: 100
          }
        }
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
        component={PostNavigation}
        screenOptions={({ route }) => ({
        })}
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

const styles = StyleSheet.create({
  message: {
    position: 'absolute',
    right: -7,
    top: -10,
    backgroundColor: 'red',
    borderRadius: 20,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    zIndex: 99999,
  },
  tabWrapper: {
    flexDirection: 'row',
    bottom: 7,
    position: 'absolute',
    width: '80%',
    left: '10%',
    right: 0,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  tabBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImage: {
    width: 0,
    height: 0,
    position: "absolute",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 30,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
    width: 200,
    backgroundColor: 'blue',
    height: 50
  },
  box: {
    width: 200,
    height: 50,
    backgroundColor: "white",
    position: "relative",
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  triangle: {
    width: 10,
    height: 10,
    position: "absolute",
    bottom: -10,
    left: 90,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: '180deg' }],
  }
})
