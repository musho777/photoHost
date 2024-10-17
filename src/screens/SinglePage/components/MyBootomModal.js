import { View, TouchableOpacity, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { forwardRef, useEffect, useState } from "react";
import { Styles } from "../../../styles/Styles";
import { t } from '../../../components/lang';
import { DelatePostAction } from "../../../store/action/action";
import { ClearDelatePhost } from "../../../store/action/clearAction";
import { DelateModal } from "../../../components/DelateModel";


export const MyBootomModal = forwardRef(({ navigation, id, description, activeImage, data }, ref) => {
  const dispatch = useDispatch()
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const delatePhoto = useSelector((st) => st.delatePhoto)

  const [show, setShow] = useState(false)

  const DelatePhoto = () => {
    ref.current?.close();
    setTimeout(() => {
      dispatch(DelatePostAction({ post_id: id }, staticdata.token))
      navigation.replace('TabNavigation', { screen: "ProfileNavigation" })
    }, 10)
  }

  useEffect(() => {
    if (delatePhoto.status) {
      dispatch(ClearDelatePhost())
    }
  }, [delatePhoto.status])


  const EditImage = () => {
    ref.current?.close();
    navigation.navigate('EditPostScreen', { description: description, id: id, index: activeImage, data: data });
  }

  const Confirm = () => {
    DelatePhoto()
    setShow(false)
  }

  return <View style={{ paddingHorizontal: 20, gap: 20 }}>
    <DelateModal
      title={t(mainData.lang).Areyousureyouwanttodelete}
      Confirm={() => Confirm()}
      show={show}
      setModalVisible={(e) => setShow(e)}
      confirmText={t(mainData.lang).Delete}
    />
    <TouchableOpacity onPress={() => EditImage()}>
      <Text style={Styles.darkRegular14}>{t(mainData.lang).Editprofile}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setShow(true)}>
      <Text style={Styles.darkRegular14}>Удалить пост</Text>
    </TouchableOpacity>
  </View>
})
