import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { t } from './lang';
import { useSelector } from "react-redux";
import { Styles } from "../styles/Styles";

export const DelateModal = ({ show, Confirm, setModalVisible, title, confirmText }) => {
  const mainData = useSelector(st => st.mainData);

  return <Modal
    animationType="slide"
    transparent={true}
    visible={show}
    onRequestClose={() => setModalVisible(!show)}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{title}</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => Confirm()} >
            <Text style={[Styles.darkSemiBold14, { color: 'red' }]}>Да</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={[Styles.darkSemiBold14]}>Нет</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    color: 'black',
    textAlign: 'center'
  },
  buttonWrapper: {
    gap: 30,
    alignItems: 'center',
    flexDirection: 'row'
  }
});