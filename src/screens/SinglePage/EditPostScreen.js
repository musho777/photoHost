import { TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Styles } from '../../styles/Styles';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { useDispatch, useSelector } from 'react-redux';
import { EditLentPhot, EditPostAction } from '../../store/action/action';
import { ClearEditPost } from '../../store/action/clearAction';
import { t } from '../../components/lang';


export const EditPostScreen = ({ route, navigation }) => {
  const [description, setDescription] = useState(route.params.description);
  const index = route.params.index
  const mainData = useSelector(st => st.mainData);
  const [activeDescription, setActiveDescription] = useState()
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const editPost = useSelector((st) => st.editPost)
  const EditPost = () => {
    if (route.params.description != description) {
      dispatch(EditPostAction({
        post_id: route.params.id,
        description: description
      },
        staticdata.token))
    }
  }
  useEffect(() => {
    if (editPost.status) {
      dispatch(EditLentPhot({
        post_id: route.params.id,
        description: description
      },
        staticdata.token))
      navigation.goBack()
      // navigation.replace('TabNavigation', { screen: "ProfileNavigation" })
      dispatch(ClearEditPost())
    }
  }, [editPost.status])



  const changeDescription = (e) => {
    let item = description
    if (description[0] = '[') {
      item = JSON.parse(description)
      console.log(item[index])
      item[index] = e
      setDescription(JSON.stringify(item))
      // setActiveDescription(item[index])
    }
    else {
      setDescription(e)
    }
  }

  useEffect(() => {
    if (description[0] = '[') {
      let item = JSON.parse(description)
      console.log('----')
      console.log(item[index])
      setActiveDescription(item[index])
    }
    else {
      setActiveDescription(item)
    }
  }, [description])
  console.log(description[0], 'dees')

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
        style={[Styles.darkMedium14, { paddingHorizontal: 15 }]}
        placeholder={t(mainData.lang).adddescription}
        placeholderTextColor={'#8C9CAB'}
      />
    </View>
  );
};
