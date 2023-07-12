import { StyleSheet, Text, TouchableOpacity} from "react-native"
import { AppColors } from "../styles/AppColors"
import { Styles } from "../styles/Styles"

export const Button = ({title,marginV}) =>{
    return <TouchableOpacity style = {[styles.button,{marginVertical:marginV}]}>
        <Text style = {Styles.darkMedium12}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    button:{
        width:230,
        paddingVertical:13,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:AppColors.Mustard_Color,
        borderRadius:50
    }
})