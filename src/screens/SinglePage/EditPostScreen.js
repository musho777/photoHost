import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Styles } from '../../styles/Styles';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { useDispatch, useSelector } from 'react-redux';
import { DelatePhotoFromPost, DelatePhotofromPost, DeletLocalPhoto, EditLentPhot, EditPostAction } from '../../store/action/action';
import { ClearEditPost } from '../../store/action/clearAction';
import { t } from '../../components/lang';
import FastImage from 'react-native-fast-image';
import { CloseSvg1 } from '../../assets/svg/Svgs';
import { useNavigation } from '@react-navigation/native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';


export const EditPostScreen = ({ route }) => {
  const navigation = useNavigation()
  const [description, setDescription] = useState(route.params.description);
  // const index = route.params.index
  const [index, setIndex] = useState(route.params.index)
  const data = route.params.data
  const mainData = useSelector(st => st.mainData);
  const [activeDescription, setActiveDescription] = useState(["", "", "", "", "", "", "", "", "", ""])
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const editPost = useSelector((st) => st.editPost)
  const [photos, setPhotos] = useState([])

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
    let newDescripit
    if (description[0] == '[') {
      item = JSON.parse(description)
      newDescripit = JSON.stringify(item)
    }
    dispatch(EditPostAction({
      post_id: route.params.id,
      description: description,
      color: activecolor,
      font_family: activeFont
    },
      staticdata.token))
    dispatch(EditLentPhot({
      post_id: route.params.id,
      description: description,
      color: activecolor,
      font_family: activeFont
    }))
    dispatch(ClearEditPost())
    if (route.params.big) {
      navigation.navigate('SinglPageScreen', { id: route.params.id, description: newDescripit })
    }
    else {
      navigation.goBack()
    }
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

  const _editor = React.createRef();



  const changeDescription = (e, index) => {
    let item = description
    let temp = [...activeDescription]
    temp[index] = e
    setActiveDescription(temp)
    if (description) {
      if (description[0] == '[') {
        item = JSON.parse(description)
        item[index] = e
        setDescription(JSON.stringify(item))
      }
      else {
        setDescription(e)
      }
    }
    else {
      let temp = []
      temp[index] = e
      setDescription(JSON.stringify(temp))
    }
  }
  console.log(description)
  useEffect(() => {
    if (description) {
      if (description[0] == '[') {
        let item = JSON.parse(description)
        setActiveDescription(item)
      }
      else {
        setActiveDescription(description)
      }
    }
  }, [index])

  const delateFoto = (i, id) => {
    let item = [...photos]
    item.splice(i, 1)
    let desitem = JSON.parse(description)
    if (desitem) {
      desitem?.splice(i, 1)
      setDescription(JSON.stringify(desitem))
      setActiveDescription(desitem[index])
    }
    setPhotos(item)
    setIndex(0)
    if (item.length == 0) {
      dispatch(DeletLocalPhoto({ post_id: data.id }))
    }
    dispatch(DelatePhotoFromPost(route.params.id, id, staticdata.token))
    dispatch(DelatePhotofromPost(route.params.id, id))
  }
  console.log(activeDescription[0], 'activeDescription[0]')
  return (
    <View>
      <HeaderWhiteTitle
        loading={editPost.loading}
        onCheck={() => EditPost()}
        check
        onPress={() => navigation.goBack()}
        title={t(mainData.lang).EditPost}
      />
      {/* <TextInput
        autoFocus
        value={activeDescription}
        multiline
        onChangeText={e => changeDescription(e)}
        style={[Styles.darkMedium14, { padding: 10, color: activecolor, fontFamily: activeFont }]}
        placeholder={t(mainData.lang).adddescription}
        placeholderTextColor={'#8C9CAB'}
      /> */}

      {activeDescription[0] && index == 0 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 0)}
            initialHtml={activeDescription[0]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[1] && index == 1 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 1)}
            initialHtml={activeDescription[1]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[2] && index == 2 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 2)}
            initialHtml={activeDescription[2]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[3] && index == 3 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 3)}
            initialHtml={activeDescription[3]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[4] && index == 4 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 4)}
            initialHtml={activeDescription[4]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[5] && index == 5 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 5)}
            initialHtml={activeDescription[5]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[6] && index == 6 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 6)}
            initialHtml={activeDescription[6]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[7] && index == 7 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 7)}
            initialHtml={activeDescription[7]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[8] && index == 8 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 8)}
            initialHtml={activeDescription[8]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}
      {activeDescription[9] && index == 9 && < View style={{ width: '100%', height: 120, marginBottom: 20 }}>
        <View style={{ height: 60, width: '100%' }}>
          <QuillEditor
            style={[styles.input]}
            ref={_editor}
            onHtmlChange={({ html }) => changeDescription(html, 9)}
            initialHtml={activeDescription[9]}
          />
        </View>
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
        />
      </View>}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        horizontal={true}
      >
        <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 10 }}>
          {photos?.map((elm, i) => {
            return <TouchableOpacity activeOpacity={1} onPress={() => setIndex(i)} key={i} style={{ width: 80, height: 80 }}>
              <TouchableOpacity
                onPress={() => delateFoto(i, elm.id)}
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
  }
});