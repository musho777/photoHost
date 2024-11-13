import { Animated, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Styles } from "../../styles/Styles"
import { useSelector } from "react-redux";
import { Button } from "../../ui/Button";
import { t } from '../../components/lang';
import { useRef, useState } from "react";
import { TypeBlock } from "./component/typeblock";
import { useNavigation } from "@react-navigation/native";
import { DownSvg, TopArrow } from "../../assets/svg/Svgs";

export const RegisterType = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));
  const [selected, setSelected] = useState(0)
  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()
  const [showAll, setShowAll] = useState(false)
  const heightAnim = useRef(new Animated.Value(0)).current;
  const GoNextPage = () => {
    navigation.navigate('RegisterScreen', { selected })
  }

  const startAnimation = () => {
    setShowAll(!showAll)
    if (showAll) {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    else {
      Animated.timing(heightAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };


  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  return <View style={styles.authScreen}>
    <Text style={[Styles.darkSemiBold16, { marginBottom: 30, textAlign: 'center' }]}>Вы регистрируетесь как:</Text>
    <View style={{ gap: 30 }}>
      <TypeBlock
        selected={selected}
        setSelected={(e) => setSelected(e)}
        title='Физическое лицо'
        type='Individual'
      />
      <TypeBlock
        selected={selected}
        setSelected={(e) => setSelected(e)}
        title='Юридическое лицо (Бизнес)'
        type='Legal_entity'
      />
    </View>
    <View >
      <View style={{ marginTop: 10, marginLeft: 10 }} >
        <TouchableOpacity activeOpacity={1} onPress={() => startAnimation()} style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={Styles.balihaiMedium10}>(В чём разница между регистрацией физического и юридического лица?)</Text>
          <View style={{ position: 'absolute', bottom: -1, left: 130 }}>
            {!showAll &&
              <DownSvg />
              // <TopArrow />
            }
          </View>
        </TouchableOpacity>
        <Animated.View style={[styles.animatedBox, { height: heightAnim }]} >
          <Text style={Styles.balihaiMedium10}>Chamba - это открытая платформа для всех.
            Обычные пользователи могут наслаждаться общением и находить единомышленников, создавая яркий контент, который отражает их индивидуальность.
            А для бизнеса мы предлагаем сладкое предложение: добавляйте свои товары и услуги, график работы и местоположение, чтобы Ваши клиенты всегда могли легко вас найти и быть в курсе ваших предложений. Присоединяйтесь к нам и позвольте своему бизнесу быть узнаваемым!
          </Text>
          <TouchableOpacity onPress={() => startAnimation()} style={{ position: 'absolute', bottom: -1, right: 0 }}>
            {showAll &&
              <TopArrow />
            }
          </TouchableOpacity>

        </Animated.View>
      </View>



    </View>
    <View style={styles.buttonBlock}>
      <Button
        disabled={selected == 0}
        onPress={() => GoNextPage()}
        title={t(mainData.lang).Next}
      />
    </View>
  </View >
}

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 40,
  },
  buttonBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  }
})