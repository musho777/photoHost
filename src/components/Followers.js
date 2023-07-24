import {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetFollowerAction, GetFollowersAction} from '../store/action/action';
import {clearGetFollowersAction} from '../store/action/clearAction';
import {Input} from '../ui/Input';
import {FollowingsBlock} from './FollowingsBlock';
import {useNavigation} from '@react-navigation/native';

export const Followers = ({id}) => {
  const navigation = useNavigation();
  const [data, setData] = useState();
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
    dispatch(clearGetFollowersAction());
    dispatch(GetFollowerAction({search: data, user_id: id}, staticdata.token, page));
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
            navigation.navigate('SearchProfil', {id: item.id});
            setData('');
            // close();ss
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
        data={followers}
        enableEmptySections={true}
        // ListEmptyComponent={() => {
        //   if () {
        //     return <Text>no data</Text>;
        //   }
        // }}
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
