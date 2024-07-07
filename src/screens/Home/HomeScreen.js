import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/post/Post';
import { AddPostViewCount, DelatePostAction, GetLentsAction, getUserInfoAction } from '../../store/action/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ModalComponent } from './modal';


export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const getLents = useSelector(st => st.getLents);
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [blackList, setBlackList] = useState([]);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const [showModal, setShowModal] = useState(false)
  const userData = useSelector((st) => st.userData)
  const [isChange, setIschange] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (userData.data.show_category_pop_up == 1) {
        setShowModal(true)
      }
    }, 5000)
  }, [userData.data])

  useEffect(() => {
    if (staticdata.token) {
      dispatch(GetLentsAction(staticdata.token));
    }
  }, [staticdata.token]);



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let token = await AsyncStorage.getItem('token')
      if (token) {
        // dispatch(GetLentsAction(token));
        setIschange(isChange + 1)
        dispatch(getUserInfoAction(token))
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
            marginTop: 5
          }}>
          <Post
            userImg={item.user.avatar}
            userName={item.user.name}
            userId={item.user.id}
            description={item.description}
            like={item.like_count}
            commentCount={item.comment_count}
            view={item.view_count}
            music={item.music_name}
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
            data={item.created_at}
            deletData={(e) => deletData(index, e)}
          />
        </View>
      );
    }
  };


  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 900;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = 400;
    const index = Math.floor(offsetY / itemHeight);
    setIndex(index);
  };

  // if (getLents?.loading) {
  //   return (
  //     <View style={Styles.loading}>
  //       <ActivityIndicator size="large" color="#FFC24B" />
  //     </View>
  //   );
  // }
  return (
    <View>
      {showModal && <ModalComponent
        showModal={showModal}
        close={() => setShowModal(false)}
        token={staticdata.token}
      />}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'rgb(237,238,240)' }}
        ref={flatListRef}
        onScroll={({ nativeEvent }) => {
          handleScroll({ nativeEvent })
          if (isCloseToBottom(nativeEvent)) {
            if (getLents?.nextPage) {
              let p = page + 1;
              dispatch(GetLentsAction(staticdata.token, p));
              setPage(p);
            }
          }

        }}
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
        renderItem={renderItem}
      />
    </View>
  );
};