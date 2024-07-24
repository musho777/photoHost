import { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeletFollowAction, GetFollowerAction, GetFollowersAction } from '../store/action/action';
import { clearGetFollowersAction } from '../store/action/clearAction';
import { Input } from '../ui/Input';
import { FollowingsBlock } from './FollowingsBlock';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../styles/Styles';
import { t } from '../components/lang';

export const Followers = ({ id }) => {
  const navigation = useNavigation();
  const [data, setData] = useState('');
  let getFollowers = useSelector(st => st.getFollower);
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(GetFollowerAction({ search: data, user_id: id }, staticdata.token, page));
  }, [data]);

  const addClick = id => {
    let remove = false
    getFollowers.data.map((elm, i) => {
      if (elm.follower.id === id) {
        elm.type = !elm.type
        remove = !elm.type
      }
    });
    if (!remove) {
      dispatch(AddDeletFollowAction('remove'))
    }
    else {
      dispatch(AddDeletFollowAction('add'))
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <FollowingsBlock
          onPress={() => {
            navigation.navigate('SearchProfil', { id: item.follower.id });
            setData('');
          }}
          key={item.follower?.id}
          name={item.follower?.name}
          username={item.follower?.nickname}
          img={item.follower?.avatar}
          type={!item.type}
          userId={item.follower?.id}
          type2={id ? true : false}
          addClick={() => addClick(item.follower?.id)}
        />
      </View>
    );
  };
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Input
        data={data}
        onChange={e => setData(e)}
        placeholder={t(mainData.lang).search}
        search
        marginTop={20}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            // refreshing={getFollowers?.loading}
            onRefresh={() => {
              // dispatch(clearGetFollowersAction());
              dispatch(
                GetFollowerAction(
                  { search: data, user_id: id },
                  staticdata.token,
                  page,
                ),
              );
            }}
          />
        }
        ListEmptyComponent={() => {
          (!getFollowers?.loading && getFollowers.data?.length == 0) &&
            <Text style={[Styles.darkMedium16, { marginTop: 40, textAlign: 'center' }]}>{data ? t(mainData.lang).Notfound : t(mainData.lang).Nosubscriptions}</Text>
        }
        }
        data={getFollowers?.data}
        enableEmptySections={true}
        renderItem={renderItem}
        onEndReached={() => {
          if (getFollowers?.nextPage) {
            dispatch(
              GetFollowerAction(
                { search: data, user_id: id },
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
