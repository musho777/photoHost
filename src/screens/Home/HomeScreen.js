import { useState } from "react"
import { View } from "react-native"
import { Post } from "../../components/Post"

export const HomeScreen = () =>{
    const [post,setPost] = useState([
        {
            userImg:require('../../assets/img/MaskGroup.png')
        }
    ])
    return <View style = {{paddingHorizontal:10}}>
        <Post userImg = {post[0].userImg}/>
    </View>
}