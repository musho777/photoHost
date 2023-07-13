import { TouchableOpacity,View,Text} from 'react-native';
import { BackArrow } from '../assets/svg/Svgs';
import { Styles } from '../styles/Styles';

export const HeaderWhiteTitle = ({onPress,title}) =>{
    return <View  style = {[Styles.flexAlignItems,{height:70,paddingHorizontal:10,backgroundColor:"#FFF"}]  }>
        <TouchableOpacity onPress ={onPress}>
            <BackArrow /> 
        </TouchableOpacity>
        <Text style = {[Styles.darkMedium16,{marginHorizontal:10}]}>{title}</Text>
    </View>
}