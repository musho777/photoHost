import React, { useState } from 'react';
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
} from 'react-native';
import { useSelector } from 'react-redux';
import { Status } from './component/status';
import { Header } from './component/header';
import { FontFemalySvg, SelectColor, TextSvg, TextSvg2 } from '../../assets/svg/Svgs';
import { ColorPicker } from 'react-native-color-picker';
import { Styles } from '../../styles/Styles';

const windowWidth = Dimensions.get('window').width;


export const AddPost = () => {
  const mainData = useSelector(st => st.mainData);
  const [uri, setUri] = useState([]);
  const [description, setDescription] = useState([]);
  const [selectedCatalog, setSelectedCatalog] = useState('')
  const [text, setText] = useState('')
  const [showError, setShowError] = useState(false)
  const [fontSize, setFintSize] = useState(20)
  const [error, setError] = useState('')
  const fontSiezeType = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40]
  const [activefon, setActiveFon] = useState(require('../../assets/img/fon1.png'))
  const [color, setColor] = useState('white')
  const [showType, setShowType] = useState(null)
  const fontFamily = ["Montserrat-Regular", "PlaywriteGBS-Regular", 'RussoOne-Regular', 'Agdasima-Regular']

  const [activeFont, setActiveFont] = useState("Montserrat-Regular")

  const fone = [
    require('../../assets/img/fon1.png'),
    require('../../assets/img/fon2.jpg'),
    require('../../assets/img/fon3.jpg'),
    require('../../assets/img/fon4.jpg'),
    require('../../assets/img/fon5.jpg'),
  ]

  const Close = () => {
    setUri([])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Status setShowError={(e) => setShowError(e)} showError={showError} error={error} />
      <Header
        uri={uri}
        selectedCatalog={selectedCatalog}
        description={description}
        setSelectedCatalog={(e) => setSelectedCatalog(e)}
        error={error}
        Close={() => Close()}
      />
      <ScrollView contentContainerStyle={{ marginTop: 30, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} >
        <View style={styles.selectImage}>
          <Text style={{ fontFamily: activeFont, color: color, position: 'absolute', zIndex: 9999, fontSize: fontSize, textAlign: 'center' }}>{text}</Text>
          <Image style={{ height: 500 }} source={activefon} />
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
          <View style={{ flexDirection: 'row', marginVertical: 5, gap: 10, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
            {fone.map((elm, i) => {
              return <TouchableOpacity key={i} onPress={() => setActiveFon(elm)}>
                <Image style={{ width: 50, height: 50 }} key={i} source={elm} />
              </TouchableOpacity>
            })}
          </View>
        </View>}
        {showType == 5 && <View style={{ width: '100%', alignItems: 'center', }}>
          <TextInput
            onChangeText={(e) => setText(e)}
            placeholder='Text'
            multiline
            style={{ backgroundColor: 'white', width: '90%', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10, }}
          />
        </View>}
      </View>
      <View >
        <View style={{ gap: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => setShowType(5)} style={styles.editItem}>
            <TextSvg2 source={activefon} style={{ width: 30, height: 30 }} />
            <Text style={styles.textStyle}>Текст</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowType(1)} style={styles.editItem}>
            <Image source={activefon} style={{ width: 30, height: 30 }} />
            <Text style={styles.textStyle}>Фон</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowType(3)} style={styles.editItem}>
            <View style={{ height: 30, width: 30, alignItems: 'center' }}>
              <TextSvg />
            </View>
            <Text style={styles.textStyle}>Размер</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowType(2)} style={styles.editItem}>
            <View style={{ height: 30, width: 30, }}>
              <SelectColor />
            </View>
            <Text style={styles.textStyle}>Цвет</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowType(4)} style={styles.editItem}>
            <FontFemalySvg />
            <Text style={styles.textStyle}>Шрифт</Text>
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView>
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
