import {useEffect, useState} from 'react';
import {View,FlatList,RefreshControl} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetFollowersAction } from '../store/action/action';
import { clearGetFollowersAction } from '../store/action/clearAction';
import {Input} from '../ui/Input';
import {FollowingsBlock} from './FollowingsBlock';
import {useNavigation} from '@react-navigation/native';


export const Followings = ({id}) => {
  const navigation = useNavigation()
  const [data, setData] = useState();
  const [followers, setFollowers] = useState([]);
  const getFollowers = useSelector((st)=>st.getFollowers)
  const staticdata = useSelector(st => st.static);
  const [page,setPage] = useState('')
  const dispatch = useDispatch()
  useEffect(()=>{
    setFollowers(getFollowers.data)
  },[getFollowers.data])
  useEffect(()=>{
      dispatch(clearGetFollowersAction());
      dispatch(GetFollowersAction({search:data,user_id:id},staticdata.token,page))
  },[data])

  const deletClick = (id) =>{
      let item = [...followers]
      item.map((elm,i)=>{
        if(elm.followers.id === id){
          item.splice(i,1); 
        }
      })
      setFollowers(item)
  }
  const renderItem = ({item}) => {
  
    return (
      <View style={{marginHorizontal: 15}}>
        <FollowingsBlock
          onPress = {()=>{
            navigation.navigate('SearchProfil',{id:item.id})
            setData('')
            close()
          }}
          key={item.followers.id}
          name={item.followers.name}
          username={item.followers.nickname}
          img={item.followers.avatar}
          type1={'Удалить'}
          type2 = {id?true:false}
          userId = {item.followers.id}
          deletClick = {()=>deletClick(item.followers.id)}
          // addClick = {()=>addDeletData(itemfollowers.id)}
        />
      </View>
    );
  };
  return (
    <View style={{paddingHorizontal: 15}}>
      <Input
        data={data}
        onChange={e => setData(e)}
        placeholder={'Поиск'}
        search
        marginTop={20}
      />
      <FlatList
          refreshControl={
            <RefreshControl
              refreshing={getFollowers.loading}
              onRefresh={() => {
                dispatch(clearGetFollowersAction());
                dispatch(GetFollowersAction({search:data,user_id:id},staticdata.token,page))
              }}
            />
          }
          data={followers}
          enableEmptySections={true}
          // ListEmptyComponent={() => {
          //   if () {
          //     return <Text>no data</Text>;
          //   }
          // }}
          renderItem={renderItem}
          onEndReached={() => {
            if (getFollowers.nextPage) {
              dispatch(GetFollowersAction({search:data,user_id:id},staticdata.token,page))
            }
          }}
        />
    </View>
  );
};
