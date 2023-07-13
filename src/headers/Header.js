import { TouchableOpacity} from 'react-native';
import { BackArrow } from '../assets/svg/Svgs';

export const Header = ({onPress}) =>{
    return <TouchableOpacity onPress ={onPress} style = {{height:50,justifyContent:'center',paddingHorizontal:20}}>
        <BackArrow /> 
    </TouchableOpacity>
}