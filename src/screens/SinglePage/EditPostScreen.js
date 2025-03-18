import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Styles } from '../../styles/Styles';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { useDispatch, useSelector } from 'react-redux';
import { DelatePhotoFromPost, DelatePhotofromPost, DeletLocalPhoto, EditLentPhot, EditPostAction } from '../../store/action/action';
import { ClearEditPost } from '../../store/action/clearAction';
import { t } from '../../components/lang';
import FastImage from 'react-native-fast-image';
import { CloseSvg1, FontFemalySvg, SelectColor, TextSvg2 } from '../../assets/svg/Svgs';
import { useNavigation } from '@react-navigation/native';


export const EditPostScreen = ({ route }) => {
  const navigation = useNavigation()
  const [description, setDescription] = useState(route.params.description);
  const [index, setIndex] = useState(route.params.index)
  const data = route.params.data

  const [colors, setColors] = useState(route.params.data.color)
  const [fonts, setFonts] = useState(route.params.data.font_family)
  const [begraund, setBegraund] = useState(route.params.data.podcherknuti)
  const [fonColor, setFonColor] = useState(route.params.data.cveta)
  const mainData = useSelector(st => st.mainData);
  const [activeDescription, setActiveDescription] = useState("")
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const editPost = useSelector((st) => st.editPost)
  const [photos, setPhotos] = useState([])
  const [activeTab, setActiveTab] = useState(1)

  const [activecolor, setActiveColor] = useState("black")
  const [activeFont, setActiveFont] = useState("Montserrat-Medium")

  useEffect(() => {
    setPhotos(data.photo)
    setActiveColor(data.color)
    setActiveFont(data.font_family)
  }, [data.photo])

  useEffect(() => {
    if (route.params.index) {
      setIndex(route.params.index)
    }
  }, [route.params.index])


  const EditPost = () => {
    // let newDescripit
    // if (description[0] == '[') {
    //   item = JSON.parse(description)
    //   newDescripit = JSON.stringify(item)
    // }
    dispatch(EditPostAction({
      post_id: route.params.id,
      description: JSON.stringify(description),
      color: colors,
      font_family: fonts,
      podcherknuti: begraund,
      cveta: fonColor,
    },
      staticdata.token))
    dispatch(EditLentPhot({
      post_id: route.params.id,
      description: JSON.stringify(description),
      color: colors,
      font_family: fonts,
      podcherknuti: begraund,
      cveta: fonColor,

    }))
    dispatch(ClearEditPost())
    if (route.params.big) {
      navigation.navigate('SinglPageScreen', { id: route.params.id, description: newDescripit })
    }
    else {
      navigation.goBack()
    }
  }

  const GetColor = (color) => {
    if (!color) {
      return "white"
    }
    else if (color[0] == '[') {
      let newColor = JSON.parse(color)
      return newColor[index]
    }
    return color
  }

  const GetFont = (font) => {
    if (!font) {
      return ""
    }
    else if (font[0] == '[') {
      let newFont = JSON.parse(font)
      return newFont[index]
    }
    return font
  }

  const GetBegraund = (bg) => {
    if (!bg) {
      return "transparent"
    }
    else if (bg[0] == '[') {
      let newColor = JSON.parse(bg)
      return newColor[index]
    }
    return bg
  }
  const GetCveta = (bg) => {
    if (!bg) {
      return "rgba(0,0,0,0.5)"
    }
    else if (bg[0] == '[') {
      let newCvet = JSON.parse(fonColor)
      return newCvet[index]
    }
    return "rgba(0,0,0,0.5)"
  }




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
    "SofiaSansExtraCondensed-Regular",


    "RubikPuddles-Regular",
    "RubikPixels-Regular",
    "RubikMicrobe-Regular",
    "RubikMaze-Regular",
    "RubikMaps-Regular",
    "RubikLines-Regular",
    "RubikGemstones-Regular",
    "RubikDoodleTriangles-Regular",
    "RubikDistressed-Regular",
    "RubikBurned-Regular",
    "RubikBrokenFax-Regular",
    "RubikBeastly-Regular",
    "Oi-Regular",
    "AlumniSansCollegiateOne-Regular",
  ]


  const color = [
    { title: '#000000', id: 1 },
    { title: '#808080', id: 3 },
    { title: '#FF5733', id: 4 },
    { title: '#1E90FF', id: 6 },
    { title: '#4682B4', id: 7 },
    { title: '#4CAF50', id: 8 },
    { title: '#FFD700', id: 9 },
    { title: '#FF69B4', id: 10 },
    { title: '#800080', id: 11 },
    { title: '#8B0000', id: 12 },

    { title: '#FFA500', id: 13 },
    { title: '#87CEEB', id: 14 },
    { title: '#FF4500', id: 16 },
    { title: '#32CD32', id: 17 },
    { title: '#DA70D6', id: 18 },
    { title: '#708090', id: 19 },
  ]

  const color2 = [

    { title: '#8B0000', id: 12 },

    { title: '#FFA500', id: 13 },
    { title: '#DA70D6', id: 18 },
    { title: '#708090', id: 19 },
    { title: '#FF5733', id: 4 },
    { title: '#1E90FF', id: 6 },
    { title: '#32CD32', id: 17 },
    { title: '#808080', id: 3 },
    { title: '#FF4500', id: 16 },
    { title: '#4682B4', id: 7 },
    { title: '#4CAF50', id: 8 },
    { title: '#87CEEB', id: 14 },

    { title: '#FFD700', id: 9 },
    { title: '#FF69B4', id: 10 },
    { title: '#800080', id: 11 },
  ]


  const color3 = [
    { title: '#FFA500', id: 13 },
    { title: '#DA70D6', id: 18 },
    { title: '#4682B4', id: 7 },
    { title: '#4CAF50', id: 8 },
    { title: '#800080', id: 11 },
    { title: '#FFD700', id: 9 },
    { title: '#FF69B4', id: 10 },
    { title: '#87CEEB', id: 14 },

    { title: '#708090', id: 19 },
    { title: '#FF5733', id: 4 },
    { title: '#8B0000', id: 12 },
    { title: '#1E90FF', id: 6 },
    { title: '#32CD32', id: 17 },
    { title: '#808080', id: 3 },
    { title: '#FF4500', id: 16 },

  ]

  const changeColor = (e, i) => {
    if (colors && colors[0] == "[") {
      let item = JSON.parse(colors)
      item[i] = e
      setColors(JSON.stringify(item))
    } else {
      setColors(e)
    }
  }
  const changeFont = (e, i) => {
    if (fonts && fonts[0] == "[") {
      let item = JSON.parse(fonts)
      item[i] = e
      setFonts(JSON.stringify(item))
    } else {
      setFonts(e)
    }
  }
  const chnageBegraund = (e, i) => {
    if (begraund && begraund[0] == "[") {
      let item = JSON.parse(begraund)
      item[i] = e
      setBegraund(JSON.stringify(item))
    } else {
      setBegraund(e)
    }
  }

  const changeFonColor = (e, i) => {
    if (fonColor && fonColor[0] == "[") {
      let item = JSON.parse(fonColor)
      item[i] = e
      setFonColor(JSON.stringify(item))
    } else {
      setFonColor(e)
    }
  }


  const changeDescription = (e) => {
    setActiveDescription(e)
    if (description) {
      let item = [...description]
      item[index] = e
      setDescription(item)
    }
    else {
      let temp = []
      temp[index] = e
      setDescription(temp)
    }
  }
  useEffect(() => {
    if (description) {
      setActiveDescription(description[index])
    }
  }, [index])


  const delateFoto = (i, id, post_id) => {
    let item = [...photos]
    item.splice(i, 1)
    let desitem = [...description]
    if (desitem[i]) {
      desitem?.splice(i, 1)
      setDescription(desitem)
      setActiveDescription(desitem[index])
    }
    setPhotos(item)
    setIndex(0)
    if (item.length == 0) {
      dispatch(DeletLocalPhoto({ post_id: post_id }))
    }
    dispatch(DelatePhotoFromPost(route.params.id, id, staticdata.token))
    dispatch(DelatePhotofromPost(route.params.id, id))
  }


  return (
    <View>
      <HeaderWhiteTitle
        loading={editPost.loading}
        onCheck={() => EditPost()}
        check
        onPress={() => navigation.goBack()}
        title={t(mainData.lang).EditPost}
      />

      <View style={{ flexDirection: 'row' }}>
        {activeDescription &&
          <View style={{ marginVertical: 10, backgroundColor: GetCveta(fonColor), borderRadius: 5, marginHorizontal: 5, paddingBottom: 3 }}>
            <View style={[{ paddingHorizontal: 10, }]}>
              <Text style={[Styles.darkMedium13, { color: GetColor(colors), fontFamily: GetFont(fonts), backgroundColor: GetBegraund(begraund), marginTop: 3 }]}>
                {activeDescription}
              </Text>
            </View>
          </View>}
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        horizontal={true}
      >
        <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 10 }}>
          {photos?.map((elm, i) => {
            return <TouchableOpacity activeOpacity={1} onPress={() => setIndex(i)} key={i} style={{ width: 80, height: 80 }}>
              <TouchableOpacity
                onPress={() => delateFoto(i, elm.id, elm.post_id)}
                style={styles.close}>
                <CloseSvg1 smole />
              </TouchableOpacity>
              <FastImage
                style={[{ height: 80, borderRadius: 10 }, i == index && styles.activePhot]}
                source={{
                  uri: `https://chambaonline.pro/uploads/${elm.photo}`,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable
                }}
                fallback={false}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          })}
        </View>
      </ScrollView >
      <View style={{ width: '100%', marginBottom: 20, marginTop: 30 }}>
        <View style={{ height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            autoFocus
            value={activeDescription}
            multiline
            onChangeText={e => changeDescription(e)}
            style={[Styles.darkMedium14, styles.input, { padding: 10 }]}
            placeholder={t(mainData.lang).adddescription}
            placeholderTextColor={'#8C9CAB'}
          />
        </View>
        {activeTab == 2 && <View >
          <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
            {fontFamily.map((elm, i) => {
              return <Text onPress={() => changeFont(elm, index)} key={i} style={[Styles.darkMedium12, { color: 'black', fontFamily: elm }]}>{elm}</Text>
            })}
          </ScrollView>
        </View>}
        {activeTab == 3 && <View >
          <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
            {color.map((elm, i) => {
              return <TouchableOpacity onPress={() => changeColor(elm.title, index)} key={i} style={{ width: 20, height: 20, borderRadius: 30, backgroundColor: elm.title }} />
            })}
          </ScrollView>
        </View>}
        {/* {activeTab == 4 && <View >
          <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
            {color2.map((elm, i) => {
              return <TouchableOpacity onPress={() => chnageBegraund(elm.title, index)} key={i} style={{ width: 20, height: 20, borderRadius: 30, backgroundColor: elm.title }} />
            })}
          </ScrollView>
        </View>} */}
        {activeTab == 5 && <View >
          <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 10, height: 50, alignItems: 'center' }}>
            {color3.map((elm, i) => {
              <TouchableOpacity onPress={() => changeFonColor("rgba(0,0,0,0.5)", index)}>
                <Text style={{ color: 'white', fontSize: 16 }}>X</Text>
              </TouchableOpacity>
              return <TouchableOpacity onPress={() => changeFonColor(elm.title, index)} key={i} style={{ width: 20, height: 20, borderRadius: 30, backgroundColor: elm.title }} />
            })}
          </ScrollView>
        </View>}

        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, gap: 10, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setActiveTab(1)} style={[styles.editItem, activeTab == 1 && { backgroundColor: "#FFC24B" }]}>
              <TextSvg2 style={{ width: 30, height: 30 }} />
              <Text style={styles.textStyle}>Текст</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab(2)} style={[styles.editItem, activeTab == 2 && { backgroundColor: "#FFC24B" }]}>
              <View style={{ width: 30, alignItems: 'center' }}>
                <FontFemalySvg />
              </View>
              <Text style={styles.textStyle}>Шрифт</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab(3)} style={[styles.editItem, activeTab == 3 && { backgroundColor: "#FFC24B" }]}>
              <SelectColor />
              <Text style={styles.textStyle}>Цвет</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => setActiveTab(4)} style={[styles.editItem, activeTab == 4 && { backgroundColor: "#FFC24B" }]}>
              <SelectColor />
              <Text style={styles.textStyle}>Подч.</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => setActiveTab(5)} style={[styles.editItem, activeTab == 5 && { backgroundColor: "#FFC24B" }]}>
              <SelectColor />
              <Text style={styles.textStyle}>Фон</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>


      {/* <View style={{ marginVertical: 20 }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 17, alignItems: 'center', marginVertical: 10 }}>
          {fontFamily.map((elm, i) => {
            return <Text onPress={() => {
              // setName({ ...name, font: elm })
              setActiveFont(elm)
            }} key={i} style={{ fontSize: 10, fontFamily: elm }}>{elm}</Text>
          })}
        </ScrollView>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 10, paddingHorizontal: 17, alignItems: 'center', height: 20 }}>
          {color.map((elm, i) => {
            return <TouchableOpacity onPress={() => {
              setActiveColor(elm.title)
            }} key={i} style={{ width: 20, height: 20, backgroundColor: elm.title, borderRadius: 20, }} />
          })}
        </ScrollView>
      </View> */}
    </View >
  );
};


const styles = StyleSheet.create({
  block: {
    borderRadius: 10,
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 9999,
  },
  activePhot: {
    borderWidth: 3,
    borderColor: 'green'
  },
  editItem: {
    borderWidth: 1,
    borderColor: '#ebebeb',
    width: 60,
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  input: {
    borderColor: 'red',
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ebebeb',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 12,
    color: 'black',
  },
});