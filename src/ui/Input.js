import { useState } from 'react';
import { StyleSheet,View,TextInput,TouchableOpacity,Text } from 'react-native';
import { Eye } from '../assets/svg/Svgs';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';

export const Input = ({marginBottom,marginTop,marginV,marginH,width = '100%',placeholder,error,data,pass = false}) =>{
    console.log(pass)
    const [currentData,setCurrentData] = useState(data)
    const [securyty,setSecuryty] = useState(pass)
    return <View style = {{
                width:width,
                marginBottom:marginBottom,
                marginTop:marginTop,
                marginVertical:marginV,
                marginHorizontal:marginH,
            }}>
        <TextInput 
            style = {[
                styles.Input,{paddingRight:pass && 45}
            ]}
            placeholder = {placeholder}
            placeholderTextColor={AppColors.BaliHai_Color}
            secureTextEntry = { pass && securyty}
        />
        {pass && <TouchableOpacity style = {styles.eye} onPress = {()=>setSecuryty(!securyty)}>
            <Eye />
        </TouchableOpacity>}
        <Text style = {[[Styles.tomatoMedium10,{marginBottom:5}]]}>{error}</Text>
    </View>
}

const styles = StyleSheet.create({
    Input:{
        backgroundColor:AppColors.AliceBlue_Color,
        borderRadius:50,
        padding:10,
        paddingHorizontal:20,
        color:AppColors.Blcak_Color,
        position:'relative',
    },
    eye:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        right:20,
        height:'70%'
    }
})