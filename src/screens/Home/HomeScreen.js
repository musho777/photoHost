import {useState, useEffect, useRef} from 'react';
import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '../../components/Post';
import {AddPostViewCount, GetLentsAction} from '../../store/action/action';
import {Styles} from '../../styles/Styles';

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(st => st.userData);
  const staticdata = useSelector(st => st.static);
  const getLents = useSelector(st => st.getLents);
  const [first, setFires] = useState(true);
  const [page, setPage] = useState(1);
  const [blackList, setBlackList] = useState([]);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  useEffect(() => {
    if (staticdata.token) {
      setFires(false);
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

  const renderItem = ({item, index}) => {
    if (!blackList.includes(item.user.id)) {
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
            addToblack={e => {
              let item = [...blackList];
              item.push(e);
              setBlackList(item);
            }}
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
      style={Styles.bg}
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
      data={getLents?.data}
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
