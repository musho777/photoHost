import {View,Dimensions,Image,StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const windowWidth = Dimensions.get('window').width;

export const Albom = () =>{
    const data = [
        {img:require('../assets/img/3.png')},
        {img:require('../assets/img/4.png')},
        {img:require('../assets/img/3.png')},
        {img:require('../assets/img/4.png')},
        {img:require('../assets/img/3.png')},

    ]

    return <ScrollView showsVerticalScrollIndicator = {false} style = {{marginTop:20,flex:1}}>
        <View style = {[{flexWrap:'wrap',flexDirection:'row',justifyContent:'space-between'}]}>
        {data.map((elm,i)=>(
            <Image style = {styles.img} source={elm.img} key = {i}/>
        ))}
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    img:{
        width:windowWidth/2-17,
        height:windowWidth/2-17,
        marginBottom:4,
        borderRadius:15
    }
})