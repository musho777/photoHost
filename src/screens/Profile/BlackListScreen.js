import { useState } from "react"
import { View,Text } from "react-native"
import { FollowingsBlock } from "../../components/FollowingsBlock"
import { Styles } from "../../styles/Styles"

export const BlackListScreen = () =>{
    const [data,setData] = useState([
        // {name:'Аня Краснова',username:'@anya_1990',img:require('../../assets/img/user.png')},
        // {name:'Аня Краснова',username:'@anya_1990',img:require('../../assets/img/user.png')},
        // {name:'Аня Краснова',username:'@anya_1990',img:require('../../assets/img/user.png')},
    ])
    return <View style = {{marginTop:30,alignItems:'center',paddingHorizontal:15}}>
        {data.map((elm,i)=>(
            <FollowingsBlock key={i} name={elm.name} img = {elm.img} username = {elm.username} type = "Помиловать" /> 
        ))}
        <Text style = {Styles.darkMedium16}>Черный список пуст</Text>
    </View>
}