import { BackHandler, Text, View } from "react-native"
import { useCallback, useEffect, useRef, useState } from "react";
import SwiperFlatList from "react-native-swiper-flatlist"
import { HomeScreen } from "./HomeScreen";
import { ReqScreen } from "./ReqScreen";
import { Styles } from "../../styles/Styles";
import { t } from '../../components/lang';
import { styles } from "../SinglePage/SinglPage";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { GetLentsAction, GetLentsActionRec } from '../../store/action/action';
import AsyncStorage from "@react-native-async-storage/async-storage";



const { width } = Dimensions.get('window');
export const Conteiner = ({ navigation }) => {
  const staticdata = useSelector(st => st.static);
  const [data, setData] = useState(['albom', ''])

  const swiperRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0)
  const mainData = useSelector(st => st.mainData);
  const dispatch = useDispatch()

  const handelChange = () => {
    setActiveCard(1);
    swiperRef.current.goToLastIndex();
  };
  const handelChangeFirst = () => {
    setActiveCard(0);
    swiperRef.current.goToFirstIndex();
  };


  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (!navigation.canGoBack()) {
          BackHandler.exitApp()
        }
        return true
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );


  useEffect(() => {
    if (staticdata.token) {
      dispatch(GetLentsActionRec(staticdata.token));
    }
  }, [staticdata.token]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let token = await AsyncStorage.getItem('token')
      if (token) {
        dispatch(GetLentsActionRec(token));
      }
    });
    return unsubscribe;
  }, [navigation]);


  return <View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingHorizontal: 50 }}>
      <Text onPress={() => handelChangeFirst()} style={[
        Styles.balihaiSemiBold14,
        styles.textWrapper,
        activeCard == 0 && { borderColor: '#000', color: '#000' }
      ]}>{t(mainData.lang).Subscriptions}</Text>
      <Text onPress={() => handelChange()} style={[Styles.balihaiSemiBold14,
      styles.textWrapper,
      activeCard == 1 && { borderColor: '#000', color: '#000' }

      ]}>{t(mainData.lang).Recommendations}</Text>
    </View>
    <SwiperFlatList
      index={0}
      ref={swiperRef}
      onChangeIndex={(index) => { setActiveCard(index.index) }}
    >
      {data.map((elm, i) => {
        return <View key={i} style={{ width }}>
          {elm === 'albom' ?
            <HomeScreen navigation={navigation} /> :
            <ReqScreen navigation={navigation} />
          }
        </View>
      })}
    </SwiperFlatList>
  </View>
}