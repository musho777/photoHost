import { TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Styles } from '../../styles/Styles';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { useDispatch, useSelector } from 'react-redux';
import { EditPostAction } from '../../store/action/action';
import { ClearEditPost } from '../../store/action/clearAction';
import { t } from '../../components/lang';


export const EditPostScreen = ({ route, navigation }) => {
  const [description, setDescription] = useState(route.params.description);
  const mainData = useSelector(st => st.mainData);

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
      navigation.navigate('ProfileNavigation')
      dispatch(ClearEditPost())
    }
  }, [editPost.status])
  return (
    <View>
      <HeaderWhiteTitle
        loading={editPost.loading}
        onCheck={() => EditPost()}
        check
        onPress={() => navigation.goBack()}
        // disabled={uri.length === 0}
        title={t(mainData.lang).Editprofile}
      />
      <TextInput
        autoFocus
        value={description}
        onChangeText={e => setDescription(e)}
        style={[Styles.darkMedium14, { paddingHorizontal: 15 }]}
        placeholder={t(mainData.lang).adddescription}
        placeholderTextColor={'#8C9CAB'}
      />
    </View>
  );
};
