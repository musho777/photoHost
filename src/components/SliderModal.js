import { Modal, StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { ModalSliderImg } from './ModalSliderImg';
import { CloseSvg1 } from '../assets/svg/Svgs';
export const SliderModal = ({ modalVisible, photo, activePhoto, close }) => {

    return <View >
        <StatusBar
            translucent
            backgroundColor="black"
            barStyle={'dark-content'}
        />
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => close()}
        >
            <TouchableOpacity activeOpacity={1} onPress={() => close()} style={styles.centeredView}>
                <TouchableOpacity activeOpacity={1} onPress={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }
                } style={styles.modalView}>
                    <ModalSliderImg photo={photo} activePhoto={activePhoto} />
                </TouchableOpacity>
            </TouchableOpacity>
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
        position: 'absolute',
        zIndex: 9999,
        top: 10,
        right: 10,
    },
    modalView: {
        borderRadius: 0,
        width: '100%',
        height: 'auto',
    },
});