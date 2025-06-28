import { Modal, StyleSheet, View } from 'react-native';
import { ModalSliderImg } from './ModalSliderImg';
import { BlurView } from '@react-native-community/blur';

export const SliderModal = ({ modalVisible, photo, activePhoto, close,avatar }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={close}
            statusBarTranslucent={true}
        >
            <BlurView
                style={styles.centeredView}
                blurType="dark"
                blurAmount={40}
                reducedTransparencyFallbackColor="black"
            >
                <View style = {styles.wrapper}>
                <View style={styles.modalView}>
                    <ModalSliderImg avatar = {avatar} close = {close} photo={photo} activePhoto={activePhoto} />
                </View>
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        height:"100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper:{
        width:'100%',
        height:"100%",
        backgroundColor:'transparent'
    }
});
