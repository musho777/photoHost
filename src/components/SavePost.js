import { StyleSheet, Text, View } from "react-native"
import { Shadow } from "react-native-shadow-2"
import { Image } from "react-native-svg"

export const SavePost = ({ setOpen }) => {
    return (
        <Shadow
            style={{ width: '100%', borderRadius: 20, backgroundColor: '#fff', position: 'relative' }}
            startColor={'#00000010'}>
            <View style={styles.blocks}>
                <View style={[styles.card, styles.shadowProp]}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', gap: 30 }}>
                        <Image source={require('../assets/img/icons8-save-30.png')} />
                        <Text style={styles.heading}>
                            Запись сохранена в закладках
                        </Text>
                    </View>
                </View>
            </View>
        </Shadow>
    )
}

const styles = StyleSheet.create({

    blocks: {
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        top: 10,
        width: '100%',
        height: 20,
    },
})