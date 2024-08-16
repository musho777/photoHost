import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, RefreshControl, AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/post/Post';
import { AddPostViewCount, DelatePostAction, EndViewPost, GetLentsAction, GetMyChatRoom, getUserInfoAction } from '../../store/action/action';
import { ModalComponent } from './modal';
import { PostLoading } from '../../components/post/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


export const HomeScreen = () => {
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
  const [viewableItems, setViewableItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPost, setCurrentPost] = useState({})



  useEffect(() => {
    if (!getLents.loading) {
      setLoading(false)
    }
  }, [getLents.loading])


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
      dispatch(getUserInfoAction(staticdata.token))
      dispatch(GetMyChatRoom({ search: "" }, staticdata.token, 1))
    }
  }, [staticdata.token]);

  useEffect(() => {
    if (index != -1) {
      dispatch(AddPostViewCount({ post_id: getLents?.data[index]?.id }, staticdata.token))
    }
  }, [index, getLents?.data]);

  useEffect(() => {
    setData(getLents.data)
  }, [getLents.data])

  const deletData = (i, post_id) => {
    let item = [...data]
    item.splice(i, 1)
    dispatch(DelatePostAction({ post_id: post_id }, staticdata.token))
    setData(item)
  }

  const AddToBack = (e) => {
    let item = [...blackList];
    item.push(e);
    setBlackList(item);
  }

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
    setCurrentPost(data[index])
  };


  const End = async (id) => {
    let token = await AsyncStorage.getItem('token')
    if (id) {
      dispatch(EndViewPost({ post_id: id }, token))
    }
    else {
      dispatch(EndViewPost({ post_id: currentPost?.id }, token))
    }
  }

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    if (changed[0].index) {
      End(viewableItems[0].item.id)
    }
    setViewableItems(changed)
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data[index]?.id) {
          End(data[index]?.id)
        }
      };
    }, [data])
  );

  const loadingData = ['', '']

  const renderItem = ({ item, index }) => {
    if (!blackList.includes(item.user.id)) {
      return (
        <View key={index} style={[{ marginTop: 5 }, index == data.length - 1 && { marginBottom: 5 }]}>
          <Post
            viewableItems={viewableItems}
            userInfo={item.user}
            description={item.description}
            like={item.like_count}
            commentCount={item.comment_count}
            view={item.view_count}
            music={item.music_name}
            photo={item.photo}
            id={item.id}
            star={item.user.star}
            isBook={item.auth_user_book.length > 0}
            isFollow={item.user.follow_status_sender.length}
            addToblack={(e) => AddToBack(e)}
            data={item.created_at}
            deletData={(e) => deletData(index, e)}
            isLiked={item.like_auth_user.findIndex((elm, i) => elm.user_id == userData.data.id)}
          />
        </View>
      );
    }
  };
  if (loading) {
    return (
      <View style={{ gap: 5, backgroundColor: 'rgb(237,238,240)', paddingVertical: 5 }}>
        {showModal && <ModalComponent
          showModal={showModal}
          close={() => setShowModal(false)}
          token={staticdata.token}
        />}
        {loadingData.map((elm, i) => {
          return <PostLoading key={i} />
        })}
      </View>
    );
  }

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
        onViewableItemsChanged={onViewableItemsChanged}
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
              if (!loading)
                dispatch(GetLentsAction(staticdata.token));
            }}
          />
        }
        viewabilityConfig={viewabilityConfig}
        data={data}
        enableEmptySections={true}
        renderItem={renderItem}
      />
    </View>
  );
};