import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl, Image, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/post/Post';
import { AddPostViewCount, DelatePostAction, EndViewPost, GetLentsAction, GetMyChatRoom, getUserInfoAction } from '../../store/action/action';
import { ModalComponent } from './modal';
import { PostLoading } from '../../components/post/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from '../../styles/Styles';
import { ViewComponent } from '../../components/statistic/ViewComponent';
import { HomeHeader } from '../../headers/HomeHeader';
import { LikeList } from '../../components/LikeList';
import { Share } from '../../components/share';
import debounce from 'lodash/debounce';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const getLents = useSelector(st => st.getLents, shallowEqual);
  const userData = useSelector(st => st.userData, shallowEqual);
  const [page, setPage] = useState(1);
  const [blackList, setBlackList] = useState([]);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const [showModal, setShowModal] = useState(false)
  const [viewableItems, setViewableItems] = useState([])
  const [currentPost, setCurrentPost] = useState({})
  const createPost = useSelector(st => st.createPost);
  const [selecteidId, setSelectidId] = useState(null)
  const [showView, setShowView] = useState(false)
  const [likeClose, setLikeClose] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isFetching, setIsFetching] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData.data.show_category_pop_up == 1) {
        setShowModal(true);
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [userData.data]);

  useEffect(() => {
    if (staticdata.token && !getLents?.data.length) {
      dispatch(GetLentsAction(staticdata.token, 1));
    }
  }, [staticdata.token, dispatch]);

  useEffect(() => {
    if (index != -1 && getLents?.data.length) {
      dispatch(AddPostViewCount({ post_id: getLents?.data[index]?.id }, staticdata.token))
    }
  }, [index, getLents?.data]);


  const deletData = useCallback((i, post_id) => {
    dispatch(DelatePostAction({ post_id }, staticdata.token))

  }, [dispatch, staticdata.token]);

  const AddToBack = useCallback((e) => {
    setBlackList(prev => [...prev, e]);
  }, []);


  useEffect(() => {
    if (createPost.loading) {
      goTop()
    }
  }, [createPost.loading])




  const goTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  }




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
    // if (changed[0].index) {
    //   End(viewableItems[0].item.id)
    // }
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      console.log('Current Index:', index);
      setIndex(index);
      setCurrentPost(getLents.data[index]);
    }
    setViewableItems(changed)
  }, []);


  // const viewabilityConfig = {
  //   itemVisiblePercentThreshold: 50,
  // };

  const viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50, // Increase threshold for fewer viewability callbacks
    minimumViewTime: 300, // Ensure an item is viewed for at least 300ms before triggering
  }).current;

  const handleEndReached = useCallback(() => {
    if (getLents?.nextPage && !getLents.loading && !getLents.secondLoading && !isFetching) {
      setIsFetching(true)
      let p = page + 1;
      dispatch(GetLentsAction(staticdata.token, p));
      setPage(p);

      setTimeout(() => {
        setIsFetching(false);
      }, 1000);
    }
  }, [getLents, page, isFetching]);

  const ListEndLoader = () => {
    if (getLents.secondLoading && getLents?.nextPage) {
      return <ActivityIndicator size="small" color='#FFC24B' />
    }
    else if ((!getLents?.nextPage && getLents.data.length > 5 && !getLents.secondLoading)) {
      return <Text style={[Styles.homeTitle, { textAlign: 'center', marginBottom: 10 }]}>Больше нет публикаций</Text>

    }
  };

  const loadingData = ['', '']
  const renderItem = useMemo(
    () => ({ item, index }) => {
      if (!blackList.includes(item.user.id)) {
        return (
          <Post
            data={item}
            viewableItems={viewableItems}
            setShowLike={() => setLikeClose(true)}
            setShowView={() => setShowView(true)}
            addToblack={(e) => AddToBack(e)}
            deletData={(e) => deletData(index, e)}
            setSelectidId={(id) => setSelectidId(id)}
            setShowShare={(e) => setShowShare(e)}
          />
        );
      }
      return null;
    },
    [blackList, getLents.data.length, viewableItems]
  );

  const ITEM_HEIGHT = 600;
  const getItemLayout = (data, index) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  };
  const windowSize = getLents.data.length > 50 ? getLents.data.length / 4 : 10;
  // const keyExtractor = (item) => item.id;
  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const refreshControl = <RefreshControl
    refreshing={getLents?.loading}
    tintColor="#FFC24B"
    onRefresh={() => {
      setPage(1)
      dispatch(GetLentsAction(staticdata.token, 1));
    }}
  />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeader onPress={() => goTop()} />
      {showModal && <ModalComponent
        showModal={showModal}
        close={() => setShowModal(false)}
        token={staticdata.token}
      />}
      {createPost.loading && <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, zIndex: 999 }}>
        <View style={styles.loadingVidio}>
          <Image source={{ uri: createPost.localImg.uri }} style={{ width: 50, height: 50, borderRadius: 5 }} />
          <Text style={Styles.darkMedium12}>загрузка</Text>
        </View>
      </View>}
      {!getLents.loading ?
        <FlatList
          keyExtractor={keyExtractor}
          ListFooterComponent={ListEndLoader}
          data={getLents.data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onEndReached={debounce(handleEndReached, 300)}
          initialNumToRender={5}
          maxToRenderPerBatch={windowSize}
          windowSize={windowSize}
          ref={flatListRef}
          getItemLayout={getItemLayout}
          onViewableItemsChanged={onViewableItemsChanged}
          refreshControl={refreshControl}
          viewabilityConfig={viewabilityConfig}
        />
        :
        <View>
          {loadingData.map((elm, i) => {
            return <PostLoading key={i} />
          })}
        </View>
      }
      {showView &&
        <ViewComponent
          id={selecteidId}
          token={staticdata.token}
          close={(e) => setShowView(e)}
        />
      }
      {likeClose && <LikeList
        close={(e) => setLikeClose(false)}
        token={staticdata.token}
        id={selecteidId}
      />}
      {showShare && <Share
        close={() => setShowShare(false)}
        postId={selecteidId}
        open={showShare}
        user_id={userData?.allData.data?.id}
      />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingVidio: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    width: '60%',
    paddingHorizontal: 10,
    height: 70,
    flexDirection: "row",
    alignItems: 'center',
    gap: 20,
    borderRadius: 10,
  }
})

