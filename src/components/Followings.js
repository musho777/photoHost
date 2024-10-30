import { useCallback, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DelateFollower, GetFollowersAction } from '../store/action/action';
import { Input } from '../ui/Input';
import { FollowingsBlock } from './FollowingsBlock';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Styles } from '../styles/Styles';
import { t } from './lang';
import { FollowerSkeleton } from './skeleton/followerSkeleton';


export const Followings = ({ id }) => {
  const navigation = useNavigation()
  const [data, setData] = useState();
  const getFollowers = useSelector((st) => st.getFollowers)
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState('')
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch()
  const loadingData = ['', '', '', '', '', '']


  useFocusEffect(
    useCallback(() => {
      dispatch(GetFollowersAction({ search: data, user_id: id }, staticdata.token, page))
    }, [data, id])
  );

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <FollowingsBlock
          onPress={() => {
            if (user.data.id == item.followers.id) {
              navigation.navigate('ProfileScreen', { screen: 'ProfileScreens' });
            }
            else {
              navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: item.followers.id, }, key: item.followers.id.toString() })
            }
            setData('')
          }}
          key={item.followers.id}
          name={item.followers.name}
          username={item.followers.nickname}
          img={item.followers.avatar}
          type1={'Удалить'}
          type2={id ? true : false}
          userId={item.followers.id}
          deletClick={() => dispatch(DelateFollower(item.followers.id))}
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
                dispatch(GetFollowersAction({ search: data, user_id: id }, staticdata.token, page))
              }}
            />
          }
          data={getFollowers?.data}
          enableEmptySections={true}
          ListEmptyComponent={() => (
            !getFollowers?.loading &&
            <Text style={[Styles.darkMedium16, { marginTop: 40, textAlign: 'center' }]}>{data ? t(mainData.lang).Notfound : t(mainData.lang).Nosubscribers}</Text>
          )}
          renderItem={renderItem}
          onEndReached={() => {
            if (getFollowers?.nextPage) {
              let p = page + 1
              setPage(p)
              dispatch(GetFollowersAction({ search: data, user_id: id }, staticdata.token, p))
            }
          }}
        />
      }
    </View>
  );
};
