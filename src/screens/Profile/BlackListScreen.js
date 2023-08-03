import { useState,useEffect } from "react"
import { View,Text, RefreshControl, FlatList} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { BlackListBlock } from "../../components/blackListBlock"
import { AddBlackListAction, GetBlackListAction } from "../../store/action/action"
import { Styles } from "../../styles/Styles"

export const BlackListScreen = () =>{
    const dispatch = useDispatch()
    const staticdata = useSelector(st => st.static);
    const blackList = useSelector((st)=>st.blackList)
    const [data,setData] = useState([])
    const [page,setPage] = useState(1)
    useEffect(()=>{
        dispatch(GetBlackListAction(staticdata.token,1))
    },[])
    useEffect(()=>{
        setData(blackList.data)
    },[blackList.data])

    const RemoveFromBlackList = (id,index) =>{
        console.log(id)
        dispatch(AddBlackListAction({user_id:id},staticdata.token))
        let item = [...data]
        item.splice(index,1)
        setData(item)
    }

    const renderItem = ({item,index}) =>{
        console.log(item)
        return <BlackListBlock onPress1 = {()=>RemoveFromBlackList(item.receiver.id,index)} key={index} name={item.receiver.name} img = {item.receiver.avatar} username = {item.receiver.nickname} type = "Помиловать" /> 
    }
    return <View style = {{marginTop:30,alignItems:'center',paddingHorizontal:15}}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={blackList?.loading}
              onRefresh={() => {
                dispatch(GetBlackListAction(staticdata.token,1))
              }}
            />
          }
          data={data}
          enableEmptySections={true}
          ListEmptyComponent = {()=>(
            !blackList?.loading && <Text style = {[Styles.darkMedium16,{marginTop:40,textAlign:'center'}]}>Черный список пуст</Text>
          )}
          renderItem={renderItem}
          onEndReached={() => {
            if (blackList?.nextPage) {
                let p = page+1
                dispatch(GetBlackListAction(staticdata.token,p))
                setPage(p)
            }
          }}
        />
    </View>
}