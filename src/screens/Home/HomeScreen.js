import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl, Text, ActivityIndicator, BackHandler, StatusBar, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/post/Post';
import { AddPostViewCount, Api, DelatePostAction, FullScreenAction, GetLentsAction, getUserInfoAction, ShowTabNavigation } from '../../store/action/action';
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
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommmentModal } from '../../components/comment/CommmentModal';
import { SpamModal } from '../../components/spamModal';
import { Posts } from '../../components/Posts';
import axios from 'axios';



export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
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
  const [commentData, setCommentData] = useState({ parentId: "", categoryId: "" })

  const [selectedVidioId, setSelectedVidioId] = useState(null)
  const [showStatisitc, setShowStatistic] = useState(0)

  const [showView, setShowView] = useState(false)
  const [likeClose, setLikeClose] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isFetching, setIsFetching] = useState(false);

  const [showComment, setShowComment] = useState(false)
  const { fullScreen } = useSelector((st) => st.fullScreenData)
  const [postUserId, setPostUserId] = useState(null)
  const intervalRef = useRef(null);
  const [showButton, setShowButton] = useState(0)

  const isMoreThanFiveMinutes = (dateString) => {
    const givenDate = new Date(dateString);
    const now = new Date();

    const diffMs = now - givenDate; // Разница в миллисекундах
    const diffMinutes = diffMs / (1000 * 60); // Переводим в минуты

    return diffMinutes > 5;
  };

  useEffect(() => {
    if (userData.data.show_category_pop_up == 1) {
      setShowModal(true);
    }
    // if (userData.data.new_registred_status === 1 && isMoreThanFiveMinutes(userData.data.created_at)) {
    //   setShowModal(true);
    // }
    setShowStatistic(userData.allData.data?.view_statistics_open_text)
  }, [userData.data])

  useEffect(() => {
    if (staticdata.token && !getLents?.data.length) {
      dispatch(GetLentsAction(staticdata.token, "https://chambaonline.pro/api/lents?page=1"));
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
      goTop()
    }
  }, [createPost.loading])


  const fetchUserInfo = async () => {
    if (staticdata.token)
      try {
        const response = await axios.get(`${Api}/auth_user_info`, {
          headers: {
            Authorization: `Bearer ${staticdata.token}`,
          },
        });
        setShowButton(response.data?.data?.show_refresh_button_stauts)
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
  };


  useEffect(() => {
    fetchUserInfo();
    intervalRef.current = setInterval(fetchUserInfo, 10000);

    return () => clearInterval(intervalRef.current);
  }, [staticdata]);



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
        dispatch(FullScreenAction(false, null))
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


  const ChangeViewStatisticsOpenText = () => {
    setShowStatistic(0)
    if (showStatisitc) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${staticdata.token}`);
      fetch(`${Api}/view_statistics_open_text`, {
        method: 'POST',
        headers: myHeaders,
      })
        .then(response => response.json())
        .then(r => {
        })
        .catch(error => {
        });
    }
  }



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
      dispatch(GetLentsAction(staticdata.token, getLents?.nextPage));
      setPage(p);

      setTimeout(() => {
        setIsFetching(false);
      }, 1000);
    }
    else if (!getLents?.nextPage) {
      dispatch(AddPostViewCount({ post_id: getLents?.data[getLents?.data?.length - 1]?.id }, staticdata.token))
    }
  }, [getLents, page, isFetching, staticdata.token]);

  const ListEndLoader = () => {
    if (getLents.secondLoading && getLents?.nextPage) {
      return <ActivityIndicator size="large" color='#FFC24B' />
    }
  };


  const refresh = async () => {
    setShowButton(1)
    setPage(1)
    dispatch(getUserInfoAction(staticdata.token));
    dispatch(GetLentsAction(staticdata.token));
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${staticdata.token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${Api}/show_refresh_button_stauts`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }



  const loadingData = ['', '']
  const renderItem = useMemo(
    () => ({ item }) => {
      if (!blackList.includes(item.user.id)) {
        return (
          <Posts
            photos={item?.photo}
            cveta={item.cveta}
            surname={item?.user.surname}
            avatar={item?.user.avatar}
            auth_user_book={item.auth_user_book}
            created_at={item?.created_at}
            name={item?.user.name}
            description={JSON.parse(item.description)}
            id={item?.id}
            userID={item?.user.id}
            liked={item?.like_auth_user.findIndex((elm, i) => elm.user_id == userData.data.id) >= 0}
            comment_count={item?.comment_count}
            like_count={item?.like_count}
            view_count={item?.view_count}
            color={item.color}
            podcherknuti={item.podcherknuti}
            font_family={item.font_family}
            deletData={(e) => deletData(e)}
            setShowShare={(e) => setShowShare(e)}
            setShowLike={() => setLikeClose(true)}
            setSelectidId={(id) => setSelectidId(id)}
            setShowView={() => setShowView(true)}
            setShowComment={() => setShowComment(true)}
            setShowStatistic={() => ChangeViewStatisticsOpenText()}
            setCommentData={(e) => setCommentData(e)}
            many_category={item?.many_category}
            font_size={item.font_size}
            addToblack={(e) => AddToBack(e)}
            setShowInfo={(e) => setShowInfo(e)}
            setPostUserId={(e) => setPostUserId(e)}
            background={item.background}
            my={userData?.data.id != item?.user.id ? false : true}
            showStatisitc={showStatisitc}
          />
          // <Post
          //   data={item}
          //   adminStatus={item.admin_status}
          //   index={index}
          //   setShowStatistic={() => ChangeViewStatisticsOpenText()}
          //   showStatisitc={showStatisitc}
          //   // scroll={(e) => Scroll(e, index)}
          //   viewableItems={viewableItems}
          //   setShowLike={() => setLikeClose(true)}
          //   setShowView={() => setShowView(true)}
          //   addToblack={(e) => AddToBack(e)}
          //   setShowComment={() => setShowComment(true)}
          //   deletData={(e) => deletData(e)}
          //   setShowInfo={(e) => setShowInfo(e)}
          //   setSelectidId={(id) => setSelectidId(id)}
          //   setShowShare={(e) => setShowShare(e)}
          //   setCommentData={(e) => setCommentData(e)}
          //   setPostUserId={(e) => setPostUserId(e)}
          // />
        );
      }
      return null;
    },
    [blackList, getLents.data.length, viewableItems, fullScreen]
  );
  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const refreshControl = <RefreshControl
    refreshing={getLents?.loading}
    tintColor="#FFC24B"
    onRefresh={() => {
      setPage(1)
      dispatch(getUserInfoAction(staticdata.token));
      dispatch(GetLentsAction(staticdata.token));
    }}
  />
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300,
  };

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {
        StatusBar.setBarStyle('dark-content');
      };
    }, [])
  );
  return (
    <View style={[{ flex: 1 }, insets.top ? { paddingTop: insets.top } : Styles.statusBar, fullScreen && { backgroundColor: 'black' }]}>
      {showButton == 1 && <TouchableOpacity onPress={() => refresh()} style={styles.showRefreshButton}>
        <Text style={{ color: "white" }}>Refresh</Text>
      </TouchableOpacity>}
      {!fullScreen && <HomeHeader onPress={() => goTop()} />}
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
          onEndReached={debounce(handleEndReached, 300)}
          scrollEnabled={!fullScreen}
          ref={flatListRef}
          viewabilityConfig={viewabilityConfig.current}

          onViewableItemsChanged={onViewableItemsChanged}
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
      {showComment && <CommmentModal
        close={() => setShowComment(false)}
        postId={selecteidId}
        open={showShare}
        commentData={commentData}
      />}
      {showInfo && <SpamModal
        close={() => setShowInfo(false)}
        postUserId={postUserId}
        addToblack={(e) => AddToBack(e)}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  showRefreshButton: {
    position: 'absolute',
    top: 70,
    left: '50%',
    transform: [{ translateX: -50 - 10 }],
    backgroundColor: '#FFC24B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    zIndex: 99999,
    width: 130,
  },
})