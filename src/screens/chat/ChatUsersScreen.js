import {useState} from 'react'
import {ScrollView,SafeAreaView} from 'react-native'
import { ChatUser } from '../../components/ChatUser'
import { Input } from '../../ui/Input'
export const ChatUsersScreen = () =>{
    const [data,setData] = useState([
        {msg:3,seen:false,sendWhiteMe:false,online:true,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:true,sendWhiteMe:false,online:false,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:false,sendWhiteMe:true,online:false,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:true,sendWhiteMe:false,online:true,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:7,seen:false,sendWhiteMe:false,online:true,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:2,seen:false,sendWhiteMe:false,online:true,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:false,sendWhiteMe:false,online:false,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:false,sendWhiteMe:false,online:true,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:false,sendWhiteMe:false,online:false,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:false,sendWhiteMe:false,online:false,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:false,sendWhiteMe:false,online:true,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:0,seen:false,sendWhiteMe:false,online:false,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
        {msg:4,seen:false,sendWhiteMe:false,online:false,img:require('../../assets/img/MaskGroup.png'),username:'@alexsei_ivanov',name:'Леха'},
    ])
    const [search,setSearch] = useState('')
    return <SafeAreaView style = {{padding:10,marginTop:10}}>
        <Input placeholder={'Поиск   '} search data={search} onChange = {(e)=>setSearch(e)}/>
        <ScrollView style = {{marginBottom:50}} showsVerticalScrollIndicator = {false}>
            {data.map((elm,i)=>(
                <ChatUser username = {elm.username} name = {elm.name} img = {elm.img} sendWhiteMe = {elm.sendWhiteMe} seen={elm.seen} online = {elm.online} msg = {elm.msg} key={i} />
            ))}
        </ScrollView>
    </SafeAreaView>
}