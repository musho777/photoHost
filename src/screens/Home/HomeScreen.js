import { useState, useEffect, useRef } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/Post';
import { AddPostViewCount, DelatePostAction, GetLentsAction } from '../../store/action/action';
import { Styles } from '../../styles/Styles';

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const getLents = useSelector(st => st.getLents);
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [blackList, setBlackList] = useState([]);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  useEffect(() => {
    if (staticdata.token) {
      dispatch(GetLentsAction(staticdata.token));
    }
  }, [staticdata.token]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (staticdata.token) {
        dispatch(GetLentsAction(staticdata.token));
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (index) {
      dispatch(
        AddPostViewCount(
          {
            post_id: getLents?.data[index]?.id,
          },
          staticdata.token,
        ),
      );
    }
  }, [index]);

  useEffect(() => {
    setData(getLents.data)
  }, [getLents.data])

  const deletData = (i, post_id) => {
    let item = [...data]
    item.splice(i, 1)
    dispatch(DelatePostAction({ post_id: post_id }, staticdata.token))
    setData(item)
  }

  const renderItem = ({ item, index }) => {
    console.log(item)
    const givenDate = new Date(item.created_at);
    const currentDate = new Date();
    const timeDifference = currentDate - givenDate;
    let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + ' дней назад';
    if (daysAgo < 0) {
      daysAgo = daysAgo * 24 + 'часов назад'
      if (daysAgo < 0) {
        daysAgo = daysAgo * 60 + 'минут назад'
      }
    }

    if (!blackList.includes(item.user.id)) {
      return (
        <View
          key={index}
          style={{
            backfaceVisibility: 'visible',
            backgroundColor: 'transparent',
            paddingHorizontal: 10,
            marginVertical: 5,
          }}>
          <Post
            userImg={item.user.avatar}
            userName={item.user.name}
            userId={item.user.id}
            description={item.description}
            like={item.like_count}
            commentCount={item.comment_count}
            view={item.view_count}
            photo={item.photo}
            liked={item.like_auth_user.length}
            id={item.id}
            star={item.user.star}
            isBook={item.auth_user_book.length > 0}
            isFollow={item.user.follow_status_sender.length}
            daysAgo={daysAgo}
            addToblack={e => {
              let item = [...blackList];
              item.push(e);
              setBlackList(item);
            }}
            deletData={(e) => deletData(index, e)}
          />
        </View>
      );
    }
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = 400;
    const index = Math.floor(offsetY / itemHeight);
    setIndex(index);
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
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'rgb(237,238,240)' }}
      ref={flatListRef}
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl
          refreshing={getLents?.loading}
          onRefresh={() => {
            dispatch(GetLentsAction(staticdata.token));
          }}
        />
      }
      data={data}
      enableEmptySections={true}
      // ListEmptyComponent = {()=>(
      //   !getFollowers?.loading && <Text style = {[Styles.darkMedium16,{marginTop:40,textAlign:'center'}]}>{data?"Не найдено":'У Вас нет подписчиков'}</Text>
      // )}
      renderItem={renderItem}
      onEndReached={() => {
        if (getLents?.nextPage) {
          let p = page + 1;
          dispatch(GetLentsAction(staticdata.token, p));
          setPage(p);
        }
      }}
    />
  );
};
