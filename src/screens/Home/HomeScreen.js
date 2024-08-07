import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/post/Post';
import { AddPostViewCount, DelatePostAction, GetLentsAction, GetMyChatRoom, getUserInfoAction } from '../../store/action/action';
import { ModalComponent } from './modal';
import { ClearCreatPost } from '../../store/action/clearAction';


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
  };
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setViewableItems(changed)
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // trigger when at least 50% of the item is visible
  };


  const renderItem = ({ item, index }) => {
    if (!blackList.includes(item.user.id)) {
      return (
        <View key={index} style={{ marginTop: 5 }}>
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