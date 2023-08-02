import {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '../../components/Post';
import {GetPostsAction} from '../../store/action/action';
import {Styles} from '../../styles/Styles';

export const HomeScreen = () => {
  const [post, setPost] = useState([
    {
      userImg: require('../../assets/img/MaskGroup.png'),
    },
    {
      userImg: require('../../assets/img/MaskGroup.png'),
    },
    {
      userImg: require('../../assets/img/MaskGroup.png'),
    },
  ]);

  const disabled = useDispatch();
  const user = useSelector(st => st.userData);
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getPosts);


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

  if (getPosts.loading) {
    return (
      <View style={Styles.loading}>
        <ActivityIndicator size="large" color="#FFC24B" />
      </View>
    );
  }

  return (
    <FlatList
      style={Styles.bg}
      refreshControl={
        <RefreshControl
          // refreshing={getFollowers?.loading}
          onRefresh={() => {
            // dispatch(clearGetFollowersAction());
            // dispatch(
            //   GetFollowersAction(
            //     {search: data, user_id: id},
            //     staticdata.token,
            //     page,
            //   ),
            // );
          }}
        />
      }
      data={getPosts.data}
      enableEmptySections={true}
      // ListEmptyComponent = {()=>(
      //   !getFollowers?.loading && <Text style = {[Styles.darkMedium16,{marginTop:40,textAlign:'center'}]}>{data?"Не найдено":'У Вас нет подписчиков'}</Text>
      // )}
      renderItem={renderItem}
      onEndReached={() => {
        // if (getFollowers?.nextPage) {
        //   dispatch(
        //     GetFollowersAction(
        //       {search: data, user_id: id},
        //       staticdata.token,
        //       page,
        //     ),
        //   );
        // }
      }}
    />
  );
};
