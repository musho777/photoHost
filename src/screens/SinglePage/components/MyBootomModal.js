import { View, TouchableOpacity, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { forwardRef, useEffect } from "react";
import { Styles } from "../../../styles/Styles";
import { t } from '../../../components/lang';
import { DelatePostAction } from "../../../store/action/action";
import { ClearDelatePhost } from "../../../store/action/clearAction";


export const MyBootomModal = forwardRef(({ navigation, id, description }, ref) => {
  const dispatch = useDispatch()
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const delatePhoto = useSelector((st) => st.delatePhoto)

  const DelatePhoto = () => {
    ref.current?.close();
    setTimeout(() => {
      dispatch(DelatePostAction({ post_id: id }, staticdata.token))
      navigation.replace('TabNavigation', { screen: "ProfileNavigation" })
    }, 10)
  }

  useEffect(() => {
    console.log(delatePhoto.status)
    if (delatePhoto.status) {
      dispatch(ClearDelatePhost())
    }
  }, [delatePhoto.status])


  const EditImage = () => {
    ref.current?.close();
    navigation.navigate('EditPostScreen', { description: description, id: id, });
  }

  return <View style={{ paddingHorizontal: 20, gap: 20 }}>
    <TouchableOpacity onPress={() => EditImage()}>
      <Text style={Styles.darkRegular14}>{t(mainData.lang).Editprofile}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => DelatePhoto()}>
      <Text style={Styles.darkRegular14}>Удалить пост</Text>
    </TouchableOpacity>
  </View>
})
