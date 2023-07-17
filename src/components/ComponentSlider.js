import {useState} from 'react'
import {
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions
  } from 'react-native';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';

const windowWidth = Dimensions.get('window').width;
export const ComponentSlider = ({data}) =>{
    const [active,setActive] = useState(0)
    return <View>
        <View style = {[Styles.flexSpaceBetween,styles.header]}>
            {data.map((elm,i)=>(
                <TouchableOpacity key={i} style = { [active === i && {borderBottomColor:AppColors.Charcoal_Color,borderBottomWidth:2,paddingBottom:10},{width:windowWidth/data.length-15,alignItems:'center'}] }>
                    <Text>{elm.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
}

const styles = StyleSheet.create({
    header:{
        borderBottomWidth:2,
        borderColor:AppColors.Solitude_Color,
    }
})