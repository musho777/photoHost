import { useState } from "react"
import { View } from "react-native"
import { FollowingsBlock } from "../../components/FollowingsBlock"

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
    </View>
}