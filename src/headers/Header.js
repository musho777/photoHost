import { SafeAreaView, TouchableOpacity } from 'react-native';
import { BackArrow } from '../assets/svg/Svgs';

export const Header = ({ onPress }) => {
    return <SafeAreaView>
        <TouchableOpacity onPress={onPress} style={{ height: 50, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20 }}>
            <BackArrow />
        </TouchableOpacity>
    </SafeAreaView>
}