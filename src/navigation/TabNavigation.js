import React, { useMemo, useRef } from 'react';
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
import { BootomModal } from '../components/BootomSheet';
import { AddPhotoSvg, NoteSvg } from '../assets/svg/Svgs';
import DeviceInfo from 'react-native-device-info';


const CustomTabBar = ({ state, descriptors, navigation }) => {
  const user = useSelector((st) => st.userData);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const currentRouteName = state.routes[state.index].name;
  const { show } = useSelector((st) => st.showTabNavigatior)
  const mainData = useSelector(st => st.mainData);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%'], [],);
  const { fullScreen } = useSelector((st) => st.fullScreenData)


  const AddPostShow = () => {
    bottomSheetRef.current?.present();
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
    if (currentRouteName != "AddImg" && show && !fullScreen) {
      return (
        <View style={styles.tabWrapper}>
          <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
            <View>
              <Text style={[Styles.darkSemiBold16, { borderBottomWidth: 1, marginHorizontal: 10, paddingBottom: 10, borderColor: '#ededed' }]}>Опубликовать</Text>
            </View>
            <View style={{ marginTop: 20, gap: 15, paddingHorizontal: 10, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <AddPhotoSvg />
                <TouchableOpacity style={{ width: '100%' }}>
                  <Text
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      navigation.navigate('AddPhoto')
                    }
                    }
                    style={[Styles.darkMedium16, { paddingBottom: 4 }]}>{t(mainData.lang).Addphoto}
                    <Text style={{ fontSize: 10 }}>  (не более 1-й минуты)</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <NoteSvg />
                <TouchableOpacity style={{ width: '100%' }}>
                  <Text
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      navigation.navigate('AddText')
                    }}
                    style={[Styles.darkMedium16, { paddingBottom: 4 }]}>{t(mainData.lang).Addtext}</Text>
                </TouchableOpacity>
              </View>

            </View>
          </BootomModal>
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
              if (!event.defaultPrevented) {
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
    const deviceId = await DeviceInfo.getUniqueId();
    dispatch(LogoutAction(staticdata.token, deviceId))
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
      tabBar={(props) => <CustomTabBar {...props} />}

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
    bottom: 20,
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
