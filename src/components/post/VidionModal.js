import { Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import { HorizontalVidio } from './horizontalVidio';
import { VidioComponent } from './VidioComponent';
export const VidioModal = ({ modalVisible, close, music, item }) => {
  return <View >
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => close()}
    >
      <View style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} style={styles.centeredView2} onPress={() => close()} />
        <View onClick={(e) => { e.stopPropagation(); }} style={styles.modalView}>
          <VidioComponent setResizeVidio={() => close()} big music={music} item={item} />
        </View>
      </View>
    </Modal >
  </View >
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0)',
    height: '100%',
  },
  centeredView2: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  modalView: {
    borderRadius: 0,
    width: '100%',
    height: 570,
  },
});