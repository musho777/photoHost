import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { Slider } from './Slider';
import { ModalSliderImg } from './ModalSliderImg';
export const SliderModal = ({ modalVisible, photo, activePhoto, close }) => {
    return <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { }}>
            <View activeOpacity={1} style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => close()} style={{ position: 'absolute', zIndex: 2, right: 15, borderRadius: 50, width: 20, height: 20, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "red", fontSize: 15, marginTop: -3 }}>x</Text>
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
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalView: {
        borderRadius: 0,
        padding: 10,
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
});