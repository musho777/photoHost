import { useState,useEffect } from "react"
import { View,Text, RefreshControl, FlatList} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { NotificationBlock } from "../../components/NotificationBlock"
import { GetNotificationAction } from "../../store/action/action"
import { Styles } from "../../styles/Styles"

export const NotificationScreen = () =>{
    const dispatch = useDispatch()
    const staticdata = useSelector(st => st.static);
    const notification = useSelector((st)=>st.notification)
    const [data,setData] = useState([])
    const [page,setPage] = useState(1)
    useEffect(()=>{
        dispatch(GetNotificationAction(staticdata.token,1))
    },[])
    useEffect(()=>{
        setData(notification.data)
    },[notification.data])



    const renderItem = ({item,index}) =>{
        return <NotificationBlock 
            description = {item.description} 
            id = {item.id}
            itemId = {item.parent_id}
            avatar = {item.sender.avatar}
            name = {item.sender.name}
            photo = {item.photo[0].photo}
            />
    }
    return <View style = {{marginTop:30,paddingHorizontal:15}}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={notification?.loading}
              onRefresh={() => {
                dispatch(GetNotificationAction(staticdata.token,1))
              }}
            />
          }
          data={data}
          enableEmptySections={true}
          ListEmptyComponent = {()=>(
            !notification?.loading && <Text style = {[Styles.darkMedium16,{marginTop:10,textAlign:'center'}]}>список пуст</Text>
          )}
          renderItem={renderItem}
          onEndReached={() => {
            if (notification?.nextPage) {
                let p = page+1
                dispatch(GetNotificationAction(staticdata.token,p))
                setPage(p)
            }
          }}
        />
    </View>
}