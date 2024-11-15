import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Styles } from '../../styles/Styles';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { useDispatch, useSelector } from 'react-redux';
import { DelatePhotoFromPost, DelatePhotofromPost, DeletLocalPhoto, EditLentPhot, EditPostAction } from '../../store/action/action';
import { ClearEditPost } from '../../store/action/clearAction';
import { t } from '../../components/lang';
import FastImage from 'react-native-fast-image';
import { CloseSvg1 } from '../../assets/svg/Svgs';


export const EditPostScreen = ({ route, navigation }) => {
  const [description, setDescription] = useState(route.params.description);
  // const index = route.params.index
  const [index, setIndex] = useState(route.params.index)
  const data = route.params.data
  const mainData = useSelector(st => st.mainData);
  const [activeDescription, setActiveDescription] = useState()
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const editPost = useSelector((st) => st.editPost)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    setPhotos(data.photo)
  }, [data.photo])

  useEffect(() => {
    if (route.params.index) {
      setIndex(route.params.index)
    }
  }, [route.params.index])




  const EditPost = () => {
    dispatch(EditPostAction({
      post_id: route.params.id,
      description: description
    },
      staticdata.token))
    dispatch(EditLentPhot({
      post_id: route.params.id,
      description: description
    }))
    dispatch(ClearEditPost())
    if (route.params.big) {
      navigation.navigate('SinglPageScreen', { id: route.params.id, description: description })
      // navigation.navigation()
    }
    else {
      navigation.goBack()
    }
  }




  // useEffect(() => {
  //   if (editPost.status) {
  //     dispatch(EditLentPhot({
  //       post_id: route.params.id,
  //       description: description
  //     }))

  //     dispatch(ClearEditPost())
  //   }
  // }, [editPost.status])



  const changeDescription = (e) => {
    let item = description
    if (description) {
      if (description[0] == '[') {
        item = JSON.parse(description)
        item[index] = e
        setDescription(JSON.stringify(item))
        setActiveDescription(e)
      }
      else {
        setDescription(e)
        setActiveDescription(e)
      }
    }
    else {
      let temp = []
      temp[index] = e
      setDescription(JSON.stringify(temp))
      setActiveDescription(e)
    }
  }

  useEffect(() => {
    if (description) {
      if (description[0] == '[') {
        let item = JSON.parse(description)
        setActiveDescription(item[index])
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

  return (
    <View>
      <HeaderWhiteTitle
        loading={editPost.loading}
        onCheck={() => EditPost()}
        check
        onPress={() => navigation.goBack()}
        title={t(mainData.lang).EditPost}
      />
      <TextInput
        autoFocus
        value={activeDescription}
        multiline

        onChangeText={e => changeDescription(e)}
        style={[Styles.darkMedium14, { paddingHorizontal: 10 }]}
        placeholder={t(mainData.lang).adddescription}
        placeholderTextColor={'#8C9CAB'}
      />
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