import { TouchableOpacity,View,Text} from 'react-native';
import { BackArrow, CheckMarkSvg } from '../assets/svg/Svgs';
import { Styles } from '../styles/Styles';

export const HeaderWhiteTitle = ({onPress,title,transparent,check}) =>{
    return <View  style = {[Styles.flexAlignItems,{height:70,paddingHorizontal:10,backgroundColor:"#FFF"},transparent && { backgroundColor: 'transparent'}]  }>
        <TouchableOpacity onPress ={onPress}>
            <BackArrow /> 
        </TouchableOpacity>
        <Text style = {[Styles.darkSemiBold16,{marginHorizontal:15}]}>{title}</Text>
        {check && 
            <TouchableOpacity style = {{position:'absolute',right:10}}>
                <CheckMarkSvg />
            </TouchableOpacity>
        }
    </View>
}