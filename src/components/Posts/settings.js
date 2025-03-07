import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { t } from '../../../lang';
import { Styles } from "../../../../styles/Styles";
import { useSelector } from "react-redux";

export const Settings = ({
  my,
  setOpenModal,
  description,
  id,
  activeImage,
  setShow,
  data,
  big
}) => {

  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()
  if (my) {
    return <View style={styles.infoBlock}>
      <TouchableOpacity
        style={{ marginVertical: 10 }}
        onPress={() => {
          setOpenModal(false)
          navigation.navigate('EditPostScreen', {
            description: description,
            id: id,
            index: activeImage,
            data: data,
            big
          });
        }}>
        <Text style={Styles.darkRegular14}>
          {t(mainData.lang).Edit}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginVertical: 10 }}
        onPress={() => {
          setShow(true)
          setOpenModal(false)
        }}>
        <Text style={Styles.darkRegular14}>{t(mainData.lang).Deletepost} </Text>
      </TouchableOpacity>
    </View>
  }
}
const styles = StyleSheet.create({
  infoBlock: {
    position: 'absolute',
    right: 10,
    top: 50,
    elevation: 5,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 999999999,
  },
});