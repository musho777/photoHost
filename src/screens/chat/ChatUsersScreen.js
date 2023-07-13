import {useState} from 'react'
import {ScrollView,SafeAreaView} from 'react-native'
import { ChatUser } from '../../components/ChatUser'
import { Input } from '../../ui/Input'
export const ChatUsersScreen = () =>{
    const [data,setData] = useState([
        {msg:3,seen:false,sendWhiteMe:false,online:true},
        {msg:0,seen:true,sendWhiteMe:false,online:false},
        {msg:0,seen:false,sendWhiteMe:true,online:false},
        {msg:0,seen:true,sendWhiteMe:false,online:true},
        {msg:7,seen:false,sendWhiteMe:false,online:true},
        {msg:0,seen:false,sendWhiteMe:true,online:false},
        {msg:2,seen:false,sendWhiteMe:false,online:true},
        {msg:0,seen:false,sendWhiteMe:false,online:false},
        {msg:0,seen:false,sendWhiteMe:false,online:true},
        {msg:0,seen:false,sendWhiteMe:false,online:false},
        {msg:0,seen:false,sendWhiteMe:false,online:false},
        {msg:0,seen:false,sendWhiteMe:false,online:true},
        {msg:0,seen:false,sendWhiteMe:false,online:false},
        {msg:4,seen:false,sendWhiteMe:false,online:false},
    ])
    const [search,setSearch] = useState('')
    return <SafeAreaView style = {{padding:10,marginTop:10}}>
        <Input search data={search} onChange = {(e)=>setSearch(e)}/>
        <ScrollView style = {{marginBottom:50}} showsVerticalScrollIndicator = {false}>
            {data.map((elm,i)=>(
                <ChatUser sendWhiteMe = {elm.sendWhiteMe} seen={elm.seen} online = {elm.online} msg = {elm.msg} key={i} />
            ))}
        </ScrollView>
    </SafeAreaView>
}