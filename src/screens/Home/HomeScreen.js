import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl, Text, SafeAreaView, ActivityIndicator, BackHandler, StatusBar } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/post/Post';
import { AddPostViewCount, DelatePostAction, GetLentsAction, GetPostsAction, getUserInfoAction, ShowTabNavigation } from '../../store/action/action';
import { ModalComponent } from './modal';
import { PostLoading } from '../../components/post/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from '../../styles/Styles';
import { ViewComponent } from '../../components/statistic/ViewComponent';
import { HomeHeader } from '../../headers/HomeHeader';
import { LikeList } from '../../components/LikeList';
import { Share } from '../../components/share';
import debounce from 'lodash/debounce';
import { AddImageLoading } from '../../components/addImageLoading';
import { EmptyFlatlist } from '../../components/emptyFlatlist';
import { t } from '../../components/lang';
import { useFocusEffect } from '@react-navigation/native';


export const HomeScreen = () => {
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const getLents = useSelector(st => st.getLents, shallowEqual);
  const userData = useSelector(st => st.userData, shallowEqual);
  const [page, setPage] = useState(1);
  const [blackList, setBlackList] = useState([]);
  const flatListRef = useRef(null);
  const [showModal, setShowModal] = useState(false)
  const [viewableItems, setViewableItems] = useState([])
  const createPost = useSelector(st => st.createPost);
  const [selecteidId, setSelectidId] = useState(null)

  const [selectedVidioId, setSelectedVidioId] = useState(null)

  const [showView, setShowView] = useState(false)
  const [likeClose, setLikeClose] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isFetching, setIsFetching] = useState(false);
  const mainData = useSelector(st => st.mainData);



  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData.data.show_category_pop_up == 1) {
        setShowModal(true);
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [userData.data.show_category_pop_up]);

  useEffect(() => {
    if (staticdata.token && !getLents?.data.length) {
      dispatch(GetLentsAction(staticdata.token, 1));
    }
  }, [staticdata.token, dispatch]);


  const deletData = useCallback((post_id) => {
    dispatch(DelatePostAction({ post_id }, staticdata.token))
  }, [dispatch, staticdata.token]);

  const AddToBack = useCallback((e) => {
    setBlackList(prev => [...prev, e]);
  }, []);


  useEffect(() => {
    if (createPost.loading) {
      dispatch(GetPostsAction({ user_id: userData.data?.id }, staticdata.token, 1));
      goTop()
    }
  }, [createPost.loading])




  const goTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  }



  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (showShare || likeClose || showView) {
        setShowShare(false)
        setLikeClose(false)
        setShowView(false)
        dispatch(ShowTabNavigation())
        return true;
      }
      else {
        return false
      }
    });

    return () => {
      backHandler.remove();
    };
  }, [showShare, likeClose, showView]);



  // const End = async (id) => {
  //   let token = await AsyncStorage.getItem('token')
  //   if (id) {
  //     dispatch(EndViewPost({ post_id: id }, token))
  //   }
  //   else {
  //     dispatch(EndViewPost({ post_id: currentPost?.id }, token))
  //   }
  // }

  const onViewableItemsChanged = useCallback(async ({ viewableItems, changed }) => {
    // if (changed[0].index) {
    //   End(viewableItems[0].item.id)
    // }
    let token = await AsyncStorage.getItem("token")
    if (viewableItems.length > 0) {
      dispatch(AddPostViewCount({ post_id: viewableItems[0]?.item.id }, token))
    }
    setViewableItems(changed)
  }, []);



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
      return <ActivityIndicator size="large" color='#FFC24B' />
    }
    else if ((!getLents?.nextPage && getLents.data.length > 5 && !getLents.secondLoading)) {
      return <Text style={[Styles.homeTitle, { textAlign: 'center', marginBottom: 55 }]}>Больше нет публикаций</Text>
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
            deletData={(e) => deletData(e)}
            setSelectidId={(id) => setSelectidId(id)}
            setShowShare={(e) => setShowShare(e)}
            setSelectedVidioId={(e) => setSelectedVidioId(e)}
          />
        );
      }
      return null;
    },
    [blackList, getLents.data.length, viewableItems]
  );
  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const refreshControl = <RefreshControl
    refreshing={getLents?.loading}
    tintColor="#FFC24B"
    onRefresh={() => {
      setPage(1)
      dispatch(getUserInfoAction(staticdata.token));
      dispatch(GetLentsAction(staticdata.token, 1));
    }}
  />
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300,
  };

  const ListEmptyComponent = () => {
    return <EmptyFlatlist loading={getLents.loading} text={t(mainData.lang).Thefeedisempty} />
  }


  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setTranslucent(false);

    }, [])
  );

  return (
    <SafeAreaView >
      <HomeHeader onPress={() => goTop()} />
      {showModal && <ModalComponent
        showModal={showModal}
        close={() => setShowModal(false)}
        token={staticdata.token}
      />}
      {createPost.loading && <AddImageLoading uri={createPost.localImg.uri} />}
      {!getLents.loading ?
        <FlatList
          keyExtractor={keyExtractor}
          ListFooterComponent={ListEndLoader}
          data={getLents.data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          onEndReached={debounce(handleEndReached, 300)}
          onEndReachedThreshold={0.5}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews={true}
          ref={flatListRef}
          viewabilityConfig={viewabilityConfig.current}
          // getItemLayout={getItemLayout}
          // onViewableItemsChanged={onViewableItemsChanged}
          refreshControl={refreshControl}
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
          selectedVidioId={selectedVidioId}
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