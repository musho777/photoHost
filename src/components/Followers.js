import {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl,Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetFollowerAction, GetFollowersAction} from '../store/action/action';
import {clearGetFollowersAction} from '../store/action/clearAction';
import {Input} from '../ui/Input';
import {FollowingsBlock} from './FollowingsBlock';
import {useNavigation} from '@react-navigation/native';
import { Styles } from '../styles/Styles';

export const Followers = ({id}) => {
  const navigation = useNavigation();
  const [data, setData] = useState('');
  const [followers, setFollowers] = useState([]);
  const getFollowers = useSelector(st => st.getFollower);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    let item = getFollowers?.data
    item.map((elm,i)=>{
      elm.type = true
    })
    setFollowers(item);
  }, [getFollowers?.data]);
  useEffect(() => {
    if(data){
      dispatch(GetFollowerAction({search: data, user_id: id}, staticdata.token, page));
      dispatch(clearGetFollowersAction());
    }
  }, [data]);

  const addClick = id => {
    let item = [...followers];
    item.map((elm, i) => {
      if (elm.follower.id === id) {
        elm.type = !elm.type
      }
    });
    setFollowers(item);
  };
  const renderItem = ({item}) => {
    return (
      <View style={{marginHorizontal: 15}}>
        <FollowingsBlock
          onPress={() => {
            navigation.navigate('SearchProfil', {id: item.followers.id});
            setData('');
          }}
          key={item.follower?.id}
          name={item.follower?.name}
          username={item.follower?.nickname}
          img={item.follower?.avatar}
          type = {item.type}
          userId={item.follower?.id}
          addClick={() => addClick(item.follower?.id)}
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
            refreshing={getFollowers?.loading}
            onRefresh={() => {
              dispatch(clearGetFollowersAction());
              dispatch(
                GetFollowerAction(
                  {search: data, user_id: id},
                  staticdata.token,
                  page,
                ),
              );
            }}
          />
        }
        ListEmptyComponent = {()=>
           <Text style = {[Styles.darkMedium16,{marginTop:40,textAlign:'center'}]}>{data?'Не найдено':'У Вас нет подписок'}</Text>
        }
        data={followers}
        enableEmptySections={true}
        renderItem={renderItem}
        onEndReached={() => {
          if (getFollowers?.nextPage) {
            dispatch(
              GetFollowerAction(
                {search: data, user_id: id},
                staticdata.token,
                page,
              ),
            );
          }
        }}
      />
    </View>
  );
};
