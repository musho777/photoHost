import { Modal, StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useState } from "react";

export const MountWrapper = ({ visible, close, onPress }) => {
    const [data, setData] = useState([
        { name: 'Январь', id: 0 },
        { name: 'Февраль', id: 1 },
        { name: 'Март', id: 2 },
        { name: 'Апрель', id: 3 },
        { name: 'Май', id: 4 },
        { name: 'Июнь', id: 5 },
        { name: 'Июль', id: 6 },
        { name: 'Август', id: 7 },
        { name: 'Сентябрь', id: 8 },
        { name: 'Октябрь', id: 9 },
        { name: 'Ноябрь', id: 10 },
        { name: 'Декабрь', id: 11 },
    ])

    return <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => close()}
                style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {data.map((elm, i) => (
                            <TouchableOpacity key={i} onPress={() => {
                                onPress({ name: elm.name, id: elm.id })
                                close()
                            }}>

                                <Text key={i} style={styles.modalText}>{elm.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </TouchableOpacity>

        </Modal>
    </View>
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        height: 300
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'black'
    },
});
