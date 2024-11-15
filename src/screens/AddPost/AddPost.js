import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { Status } from './component/status';
import { Header } from './component/header';
import { Emojy, FontFemalySvg, SelectColor, TextSvg, TextSvg2 } from '../../assets/svg/Svgs';
import { ColorPicker } from 'react-native-color-picker';
import { Styles } from '../../styles/Styles';
import EmojiPicker from 'rn-emoji-keyboard';
import { GetCatalogAction } from '../../store/action/action';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { t } from '../../components/lang';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const windowWidth = Dimensions.get('window').width;


export const AddPost = () => {
  const insets = useSafeAreaInsets();
  const mainData = useSelector(st => st.mainData);
  const [uri, setUri] = useState([]);
  const [selectedCatalog, setSelectedCatalog] = useState([])
  const [text, setText] = useState('')
  const [showError, setShowError] = useState(false)
  const [fontSize, setFintSize] = useState(20)
  const [error, setError] = useState('')
  const fontSiezeType = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40]
  const [activefon, setActiveFon] = useState(require('../../assets/img/fon/1.jpg'))
  const [color, setColor] = useState('white')
  const [showType, setShowType] = useState(null)
  const fontFamily = [
    "Montserrat-Regular",
    "PlaywriteGBS-Regular",
    'RussoOne-Regular',
    'Agdasima-Regular',
    'Caveat-Regular',
    'Comfortaa-Regular',
    'CormorantGaramond-Regular',
    'Jost-Regular',
    'Lobster-Regular',
    'NotoSansHK-Regular',
    'Pacifico-Regular',
    'Tiny5-Regular',
    "AdventPro_Expanded-Regular",
    "Alice-Regular",
    "AmaticSC-Regular",
    "BadScript-Regular",
    "DelaGothicOne-Regular",
    "Geologica_Auto-Regular",
    "PlayfairDisplaySC-Regular",
    "RubikMonoOne-Regular",
    "Unbounded-Regular",
    "YanoneKaffeesatz-Regular",
    "AlegreyaSansSC-Regular",
    "BalsamiqSans-Regular",
    "CormorantInfant-Regular",
    "DaysOne-Regular",
    "MarckScript-Regular",
    "Pattaya-Regular",
    "ProstoOne-Regular",
    "RubikSprayPaint-Regular",
    "SofiaSansExtraCondensed-Regular"
  ]
  const [emojy, setEmojy] = useState(false)
  const [activeFont, setActiveFont] = useState("Montserrat-Regular")
  const staticData = useSelector(st => st.static);
  const dispatch = useDispatch()
  const fone = [
    require('../../assets/img/fon/1.jpg'),
    require('../../assets/img/fon/2.jpg'),
    require('../../assets/img/fon/3.jpg'),
    require('../../assets/img/fon/4.jpg'),
    require('../../assets/img/fon/5.jpg'),



    require('../../assets/img/fon/6.jpg'),
    require('../../assets/img/fon/10.jpg'),
    require('../../assets/img/fon/11.jpg'),
    require('../../assets/img/fon/12.jpg'),
    require('../../assets/img/fon/13.jpg'),
    require('../../assets/img/fon/14.jpg'),
    require('../../assets/img/fon/15.jpg'),
    require('../../assets/img/fon/20.jpg'),
    require('../../assets/img/fon/21.jpg'),
    require('../../assets/img/fon/23.webp'),
    require('../../assets/img/fon/24.webp'),
    require('../../assets/img/fon/26.webp'),
    require('../../assets/img/fon/27.webp'),
    require('../../assets/img/fon/30.webp'),
    require('../../assets/img/fon/35.jpeg'),
    require('../../assets/img/fon/36.jpeg'),
    require('../../assets/img/fon/37.jpeg'),
    require('../../assets/img/fon/38.jpeg'),
    require('../../assets/img/fon/39.jpeg'),
    require('../../assets/img/fon/40.jpeg'),
    require('../../assets/img/fon/41.jpeg'),
    require('../../assets/img/fon/42.jpeg'),
    require('../../assets/img/fon/43.jpeg'),
    require('../../assets/img/fon/44.jpeg'),
    require('../../assets/img/fon/45.jpeg'),
    require('../../assets/img/fon/46.jpeg'),
    require('../../assets/img/fon/47.jpeg'),
    require('../../assets/img/fon/48.jpeg'),
    require('../../assets/img/fon/49.jpeg'),
    require('../../assets/img/fon/50.jpeg'),
    require('../../assets/img/fon/51.jpeg'),
    require('../../assets/img/fon/52.jpeg'),
    require('../../assets/img/fon/53.jpeg'),
    require('../../assets/img/fon/54.jpeg'),
    require('../../assets/img/fon/55.jpeg'),
    require('../../assets/img/fon/56.jpeg'),
    require('../../assets/img/fon/57.jpeg'),
    require('../../assets/img/fon/58.jpeg'),
    require('../../assets/img/fon/59.jpeg'),
    require('../../assets/img/fon/60.jpeg'),
    require('../../assets/img/fon/61.jpeg'),
    require('../../assets/img/fon/62.jpeg'),
    require('../../assets/img/fon/63.jpeg'),
    require('../../assets/img/fon/64.jpeg'),
    require('../../assets/img/fon/65.jpeg'),
    require('../../assets/img/fon/66.jpeg'),
    require('../../assets/img/fon/67.jpeg'),
    require('../../assets/img/fon/68.jpeg'),
    require('../../assets/img/fon/69.jpeg'),
    require('../../assets/img/fon/70.jpeg'),
    require('../../assets/img/fon/71.jpeg'),
    require('../../assets/img/fon/72.jpeg'),
    require('../../assets/img/fon/73.jpeg'),
    require('../../assets/img/fon/74.jpeg'),
    require('../../assets/img/fon/75.jpeg'),
    require('../../assets/img/fon/76.jpeg'),
    require('../../assets/img/fon/77.jpeg'),
    require('../../assets/img/fon/78.jpeg'),
    require('../../assets/img/fon/80.jpeg'),
    require('../../assets/img/fon/81.jpeg'),
    require('../../assets/img/fon/82.jpeg'),
    require('../../assets/img/fon/83.jpeg'),
    require('../../assets/img/fon/84.jpeg'),
    require('../../assets/img/fon/86.jpeg'),
    require('../../assets/img/fon/87.jpeg'),
    require('../../assets/img/fon/88.jpeg'),
    require('../../assets/img/fon/89.jpeg'),
    require('../../assets/img/fon/90.jpeg'),
    require('../../assets/img/fon/91.jpeg'),
    require('../../assets/img/fon/92.jpeg'),
    require('../../assets/img/fon/93.jpeg'),
    require('../../assets/img/fon/94.jpeg'),
    require('../../assets/img/fon/95.jpeg'),
    require('../../assets/img/fon/96.jpeg'),
    require('../../assets/img/fon/97.jpeg'),
    require('../../assets/img/fon/98.jpeg'),
    require('../../assets/img/fon/99.jpeg'),
    require('../../assets/img/fon/100.jpeg'),



  ]

  const Close = () => {
    setUri([])

  }

  useEffect(() => {
    dispatch(GetCatalogAction(staticData.token))
  }, []);

  const handlePick = (e) => {
    setText(text + e.emoji)
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setTranslucent = true
      StatusBar.setBackgroundColor("black")
      StatusBar.setBarStyle('light-content');
      return () => {
        StatusBar.setBackgroundColor("white")
        StatusBar.setBarStyle('dark-content');
      };
    }, [])
  );


  return (
    <View style={[{ flex: 1, backgroundColor: 'black' }, insets.top ? { marginTop: insets.top } : Styles.statusBar]}>
      <Status setShowError={(e) => setShowError(e)} showError={showError} error={error} />
      <Header
        uri={uri}
        selectedCatalog={selectedCatalog}
        description={[text]}

        color={color}
        font_family={activeFont}
        background={fone.findIndex((elm) => elm == activefon) + 1}
        font_size={fontSize}
        setSelectedCatalog={(e) => setSelectedCatalog(e)}
        error={error}
        Close={() => Close()}
      />
      <Text style={[Styles.whiteMedium9, { textAlign: 'center', marginTop: 10, zIndex: 99999 }]}>{t(mainData.lang).Yourcontent}</Text>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} >
        <View style={styles.selectImage}>
          <Text style={{ fontFamily: activeFont, color: color, position: 'absolute', zIndex: 9999, fontSize: fontSize, textAlign: 'center' }}>{text}</Text>
          <Image style={{ height: 550, resizeMode: "cover" }} source={activefon} />
        </View>
      </ScrollView>
      {showType == 2 && <View style={{ width: 150, height: 150, position: 'absolute', bottom: 70, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <ColorPicker
          style={styles.colorPicker}
          onColorSelected={color => setColor(color)}
          hideSliders={true}
        />
      </View>}
      <View style={{ marginBottom: 10 }}>
        {showType == 3 && <View style={{ backgroundColor: 'white' }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
            {fontSiezeType.map((elm, i) => {
              return <Text onPress={() => setFintSize(elm)} key={i} style={[Styles.darkMedium16]}>{elm}</Text>
            })}
          </ScrollView>
        </View>}
        {showType == 4 && <View style={{ backgroundColor: 'white' }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
            {fontFamily.map((elm, i) => {
              return <Text onPress={() => setActiveFont(elm)} key={i} style={{ fontSize: 16, fontFamily: elm }}>{elm}</Text>
            })}
          </ScrollView>
        </View>}

        {showType == 1 && <View style={{ backgroundColor: 'white' }}>
          <FlatList
            data={fone}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={20}
            removeClippedSubviews={true}

            contentContainerStyle={{
              flexDirection: 'row',
              marginVertical: 5,
              gap: 10,
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setActiveFon(item)}>
                <Image style={{ width: 50, height: 50 }} source={item} />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>}
        {showType == 5 && <View style={{ width: '100%', alignItems: 'center', }}>
          <TextInput
            onChangeText={(e) => setText(e)}
            placeholder='Текст'
            multiline
            value={text}
            style={{ backgroundColor: 'white', width: '90%', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10, }}
          />
        </View>}
      </View>
      <View style={{ marginBottom: 10 }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={() => setShowType(1)} style={styles.editItem}>
            <Image source={activefon} style={{ width: 30, height: 30 }} />
            <Text style={styles.textStyle}>Фон</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowType(5)} style={styles.editItem}>
            <TextSvg2 source={activefon} style={{ width: 30, height: 30 }} />
            <Text style={styles.textStyle}>Текст</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowType(3)} style={styles.editItem}>
            <View style={{ height: 30, width: 30, alignItems: 'center' }}>
              <TextSvg />
            </View>
            <Text style={styles.textStyle}>Размер</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowType(4)} style={styles.editItem}>
            <FontFemalySvg />
            <Text style={styles.textStyle}>Шрифт</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowType(2)} style={styles.editItem}>
            <View style={{ height: 30, width: 30, }}>
              <SelectColor />
            </View>
            <Text style={styles.textStyle}>Цвет</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setEmojy(true)} style={styles.editItem}>
            <Emojy />
            <Text style={styles.textStyle}>Эмодзи</Text>
          </TouchableOpacity>
        </ScrollView>

        <EmojiPicker onEmojiSelected={handlePick} open={emojy} onClose={() => setEmojy(false)} />


      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  img: {
    height: 570,
    width: windowWidth,
    borderRadius: 11,
  },
  input: {
    borderColor: 'red',
    width: '90%',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 12,
    color: 'white'
  },
  colorPicker: {
    width: 150,
    height: 150,
  },
  selectImage: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: '100%',
  },
  editItem: {
    backgroundColor: '#D9D9D9',
    width: 60,
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
  textStyle: {
    backgroundColor: '#FFD953',
    width: '100%',
    textAlign: 'center',
    color: 'black'
  }
});
