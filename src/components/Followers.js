import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeletFollowAction, GetFollowerAction, } from '../store/action/action';
import { Input } from '../ui/Input';
import { FollowingsBlock } from './FollowingsBlock';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Styles } from '../styles/Styles';
import { t } from '../components/lang';
import { FollowerSkeleton } from './skeleton/followerSkeleton';

export const Followers = React.memo(({ id }) => {
  const navigation = useNavigation();
  const [data, setData] = useState('');
  let getFollowers = useSelector(st => st.getFollower);
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState('');
  const dispatch = useDispatch();
  const loadingData = ['', '', '', '', '', '', '', '']
  const user = useSelector(st => st.userData);


  useFocusEffect(
    useCallback(() => {
      dispatch(GetFollowerAction({ search: data, user_id: id }, staticdata.token, page));
    }, [data, id])
  );


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
            if (user.data.id == item.follower.id) {
              navigation.navigate('ProfileScreen', { screen: 'ProfileScreens' });
            }
            else {
              navigation.push('SearchProfil', { screen: "SearchProfils", params: { id: item.follower.id, key: item.follower.id.toString(), } });
            }
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
      {getFollowers.loading ?

        <View>
          {loadingData.map((elm, i) => {
            return <FollowerSkeleton key={i} />
          })}
        </View> :
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => {
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
              let p = page + 1
              setPage(p)
              dispatch(GetFollowerAction({ search: data, user_id: id }, staticdata.token, p))
            }
          }}
        />
      }
    </View>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id
  )
});
