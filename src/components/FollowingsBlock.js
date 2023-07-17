import { useNavigation } from '@react-navigation/native'
import {View,Image,StyleSheet,Text,TouchableOpacity} from 'react-native'
import { AppColors } from '../styles/AppColors'
import { Styles } from '../styles/Styles'
export const FollowingsBlock = ({name,username,img,type}) =>{
    const navigation = useNavigation()
    return <TouchableOpacity onPress={()=>navigation.navigate('UserProfileScreen')}  style = {[{marginBottom:20},Styles.flexSpaceBetween]}>
        <View style = {Styles.flexAlignItems}>
            <Image style = {styles.img} source={img}></Image>
            <View>
                <Text style = {Styles.darkMedium14}>{name}</Text>
                <Text style = {Styles.balihaiRegular12}>{username}</Text>
            </View>
        </View>
        <TouchableOpacity style = {styles.button}>
            <Text style = {Styles.darkMedium10}>{type}</Text>
        </TouchableOpacity>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    img:{
        width:45,
        height:45,
        marginRight:15,
    },
    button:{
        backgroundColor:AppColors.PattensBlue_Color,
        paddingHorizontal:20,
        padding:10,
        borderRadius:50
    }
})