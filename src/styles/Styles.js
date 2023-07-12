import { StyleSheet } from 'react-native';
import { AppColors } from './AppColors';

export const Styles = StyleSheet.create({
    authScreen:{
        flex:1,
        marginTop:20,
        alignItems:'center',
        paddingHorizontal:45
    },
    flexSpaceBetween:{
        justifyContent:"space-between",
        alignItems:'center',
        flexDirection:'row',
        width:'100%'
    },
    darkMedium22:{
        fontFamily:'Montserrat-Medium',
        fontSize:22,
        color:AppColors.Blcak_Color,
    },
    darkMedium12:{
        fontFamily:'Montserrat-Medium',
        fontSize:12,
        color:AppColors.Blcak_Color,
    },
    tomatoMedium10:{
        fontFamily:'Montserrat-Medium',
        fontSize:10,
        color:AppColors.Tomato_Color,
    },
    balihaiMedium13:{
        fontFamily:'Montserrat-Medium',
        fontSize:13,
        color:AppColors.BaliHai_Color, 
    },
})