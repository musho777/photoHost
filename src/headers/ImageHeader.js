import { TouchableOpacity,View,Text} from 'react-native';
import { BackArrow, CheckMarkSvg, CloseSvg, ImgArrow } from '../assets/svg/Svgs';
import { Styles } from '../styles/Styles';

export const ImageHeader = ({onPress,title,transparent}) =>{
    return <View  style = {[Styles.flexAlignItems,{height:70,paddingHorizontal:10,backgroundColor:"#FFF"},transparent && { backgroundColor: 'transparent'}]  }>
        <TouchableOpacity onPress ={onPress}>
            <CloseSvg /> 
        </TouchableOpacity>
        <Text style = {[Styles.darkSemiBold16,{marginHorizontal:15}]}>{title}</Text>
            <TouchableOpacity style = {{position:'absolute',right:10}}>
                <ImgArrow />
            </TouchableOpacity>
    </View>
}