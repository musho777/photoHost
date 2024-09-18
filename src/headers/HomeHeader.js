import { Text, SafeAreaView, TouchableOpacity, StyleSheet, View, Platform } from 'react-native'
import { useSelector } from 'react-redux';
import { Notification } from "../assets/svg/TabBarSvg"
import { Styles } from '../styles/Styles'
import { Icon } from '../assets/svg/Svgs';
import { useNavigation } from '@react-navigation/native';
import { forwardRef } from 'react';

export const HomeHeader = forwardRef(({ onPress }, ref) => {
    const navigation = useNavigation()
    const user = useSelector(st => st.userData);
    return <SafeAreaView>
        <View style={[Styles.flexSpaceBetween, { paddingHorizontal: 10, paddingBottom: 10 }, Platform.OS == 'android' && { paddingTop: 10 }]}>
            <TouchableOpacity activeOpacity={1} onPress={() => onPress()}>
                <Icon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                <Notification />
                {user.allData.notification_count > 0 &&
                    <View style={styles.countView}>
                        <Text style={styles.count}>{user.allData.notification_count}</Text>
                    </View>}
            </TouchableOpacity>
        </View>
    </SafeAreaView>
})
const styles = StyleSheet.create({
    countView: {
        backgroundColor: '#FF5656',
        borderRadius: 50,
        width: 15,
        height: 15,
        position: 'absolute',
        right: -7,
        top: -5,
    },
    count: {
        textAlign: 'center',
        fontSize: 10,
        color: 'white',
    }
})