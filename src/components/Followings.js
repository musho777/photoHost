import { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DelateFollower, GetFollowersAction } from '../store/action/action';
import { Input } from '../ui/Input';
import { FollowingsBlock } from './FollowingsBlock';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../styles/Styles';
import { t } from './lang';


export const Followings = ({ id }) => {
  const navigation = useNavigation()
  const [data, setData] = useState();
  const getFollowers = useSelector((st) => st.getFollowers)
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetFollowersAction({ search: data, user_id: id }, staticdata.token, page))
  }, [data])

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <FollowingsBlock
          onPress={() => {
            navigation.navigate('SearchProfil', { id: item.followers.id })
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
          (!getFollowers?.loading && getFollowers.data?.length == 0) && <Text style={[Styles.darkMedium16, { marginTop: 40, textAlign: 'center' }]}>{data ? t(mainData.lang).Notfound : t(mainData.lang).Nosubscribers}</Text>
        )}
        renderItem={renderItem}
        onEndReached={() => {
          if (getFollowers?.nextPage) {
            dispatch(GetFollowersAction({ search: data, user_id: id }, staticdata.token, page))
          }
        }}
      />
    </View>
  );
};
