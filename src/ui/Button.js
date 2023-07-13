import { StyleSheet, Text, TouchableOpacity} from "react-native"
import { AppColors } from "../styles/AppColors"
import { Styles } from "../styles/Styles"

export const Button = ({title,marginV,disabled,onPress}) =>{
    return <TouchableOpacity onPress={onPress} disabled = {disabled} style = {[styles.button,{marginVertical:marginV},disabled && {backgroundColor:AppColors.PattenseBlue_Color}]}>
        <Text style = {[Styles.darkMedium12,disabled && {color:AppColors.White_Color} ]}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    button:{
        width:220,
        paddingVertical:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:AppColors.Mustard_Color,
        borderRadius:50
    }
})