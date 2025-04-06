import { Modal, StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { ModalSliderImg } from './ModalSliderImg';
import { CloseSvg1 } from '../assets/svg/Svgs';
export const SliderModal = ({ modalVisible, photo, activePhoto, close }) => {
    return <View >
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
            onRequestClose={() => close()}
        >
            <View onPress={() => close()} style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => close()} style={{ position: 'absolute', zIndex: 9999, right: 10, top: 10 }}>
                        <CloseSvg1 />
                    </TouchableOpacity>
                    <ModalSliderImg photo={photo} activePhoto={activePhoto} />
                </View>
            </View>
        </Modal >
    </View >
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,

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