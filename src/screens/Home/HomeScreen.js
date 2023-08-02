import {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '../../components/Post';
import {GetLentsAction, GetPostsAction} from '../../store/action/action';
import {Styles} from '../../styles/Styles';

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(st => st.userData);
  const staticdata = useSelector(st => st.static);
  const getLents = useSelector(st => st.getLents);
  const [page,setPage] =useState(1)
  useEffect(()=>{
    if(staticdata.token && !getLents.length){
      dispatch(GetLentsAction(staticdata.token))
    }
  },[staticdata.token])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if(staticdata.token){
        dispatch(GetLentsAction(staticdata.token))
      }
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          backfaceVisibility: 'visible',
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
          marginVertical: 10,
        }}>
        <Post
          userImg={item.user.avatar}
          userName={item.user.name}
          description={item.description}
          like = {item.like_count}
          commentCount = {item.comment_count}
          view = {item.view_count}
          photo = {item.photo}
        />
      </View>
    );
  };

  if (getLents?.loading) {
    return (
      <View style={Styles.loading}>
        <ActivityIndicator size="large" color="#FFC24B" />
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator = {false}
      style={Styles.bg}
      refreshControl={
        <RefreshControl
          refreshing={getLents?.loading}
          onRefresh={() => {
            dispatch(GetLentsAction(staticdata.token))
          }}
        />
      }
      data={getLents?.data}
      enableEmptySections={true}
      // ListEmptyComponent = {()=>(
      //   !getFollowers?.loading && <Text style = {[Styles.darkMedium16,{marginTop:40,textAlign:'center'}]}>{data?"Не найдено":'У Вас нет подписчиков'}</Text>
      // )}
      renderItem={renderItem}
      onEndReached={() => {
        if (getLents?.nextPage) {
          let p = page +1
          dispatch(
            GetLentsAction(
              {search: data, user_id: id},
              staticdata.token,
              p,
            ),
          );
          setPage(p)
        }
      }}
    />
  );
};
