import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { Notification } from "../assets/svg/TabBarSvg"
import { Styles } from '../styles/Styles'

export const HomeHeader = ({ navigation }) => {

    const user = useSelector(st => st.userData);
    return <SafeAreaView style={[Styles.flexSpaceBetween, { paddingHorizontal: 10, paddingVertical: 20 }]}>
        <Text style={Styles.homeTitle}>Chamba</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
            <Notification />
            {user.allData.notification_count > 0 && <Text style={styles.count}>{user.allData.notification_count}</Text>}
        </TouchableOpacity>
    </SafeAreaView>
}
const styles = StyleSheet.create({
    count: {
        backgroundColor: '#FF5656',
        borderRadius: 40,
        textAlign: 'center',
        width: 15,
        height: 15,
        fontSize: 10,
        position: 'absolute',
        right: 0,
        top: -5,
        color: 'white'
    }
})