import {View,Image,StyleSheet,Text} from 'react-native'
import { ChatSeenSvg, OnlineSvg } from '../assets/svg/Svgs'
import { AppColors } from '../styles/AppColors'
import { Styles } from '../styles/Styles'
export const ChatUser = ({seen,online,msg,sendWhiteMe}) =>{
    return <View style = {[Styles.flexSpaceBetween,{marginVertical:20}]}>
        <View style = {Styles.flexAlignItems}>
            <View>
                <Image style = {styles.img} source={require('../assets/img/MaskGroup.png')}/>
                {online && <View style = {{position:'absolute',bottom:0,right:0}}>
                    <OnlineSvg />
                </View>}
            </View>
            <View style = {{marginHorizontal:10}}>
                <Text style = {Styles.darkMedium14}>Настя</Text>
                <Text style = {Styles.balihaiMedium13}>Текст последнего сообщения</Text>
            </View>
        </View>
        {!sendWhiteMe && <View>
            {msg ?
            <View style = {styles.msg}>
                <Text style = {[Styles.whiteSemiBold10,]}>{msg}</Text>
            </View>:
            <ChatSeenSvg seen={seen} />
            }
        </View>}
    </View>
}

const styles = StyleSheet.create({
    img:{
        width:43,
        height:43
    },
    msg:{
        width:16,
        height:16,
        backgroundColor:AppColors.GoldenTainoi_Color,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
    }
})