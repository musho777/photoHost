import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl, Image, Text, StyleSheet, PermissionsAndroid, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
  const { full } = useSelector((st) => st.fullScreen)
  const createPost = useSelector(st => st.createPost);
  const snapPointsLike = useMemo(() => ['85%'], []);
  const [selecteidId, setSelectidId] = useState(null)
  const ViewRef = useRef(null)
  const [showView, setShowView] = useState(false)
  const [likeClose, setLikeClose] = useState(false)
  const [showShare, setShowShare] = useState(false)

  const handleClosePress = () => ViewRef.current?.close();
  const handlePresentModalPressView = () => {
    setShowView(true)
  }
  const handlePresentModalPressLike = () => {
    setLikeClose(true)
  }


  useEffect(() => {
    handleClosePress()
  }, [])

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
    }, 20000)
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
    if (getLents.data) {
      setData(getLents.data)
    }
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


  useEffect(() => {
    if (createPost.loading) {
      goTop()
    }
  }, [createPost.loading])




  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = 400;
    const index = Math.floor(offsetY / itemHeight);
    setIndex(index);
    setCurrentPost(data[index])
  };

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
    setViewableItems(changed)
  }, []);


  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       if (data[index]?.id) {
  //         End(data[index]?.id)
  //       }
  //     };
  //   }, [data])
  // );
  const loadingData = ['', '']
  const renderItem = ({ item, index }) => {
    if (!blackList.includes(item.user.id)) {
      return (
        <View key={index} style={[{ marginTop: 5 }, index == data.length - 1 && { marginBottom: 80 }]}>
          <Post
            data={item}
            viewableItems={viewableItems}
            setShowLike={() => handlePresentModalPressLike()}
            setShowView={() => handlePresentModalPressView()}
            addToblack={(e) => AddToBack(e)}
            deletData={(e) => deletData(index, e)}
            setSelectidId={(id) => setSelectidId(id)}
            setShowShare={(e) => setShowShare(e)}
          />
        </View>
      );
    }
  };
  if (loading) {
    return (
      <View style={{ gap: 5, paddingVertical: 5 }}>
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
    <SafeAreaView>
      <HomeHeader onPress={() => goTop()} />
      <View>
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
        <FlatList
          scrollEnabled={!full}
          removeClippedSubviews={false}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          onEndReached={() => {
            if (getLents?.nextPage) {
              let p = page + 1;
              dispatch(GetLentsAction(staticdata.token, p));
              setPage(p);
            }
          }}
          onScroll={({ nativeEvent }) => {
            handleScroll({ nativeEvent })
          }}
          refreshControl={
            <RefreshControl
              refreshing={getLents?.loading || getLents.secondLoading}
              onRefresh={() => {
                setPage(1)
                dispatch(GetLentsAction(staticdata.token, 1));
              }}
            />
          }
          viewabilityConfig={viewabilityConfig}
          data={data}
          enableEmptySections={true}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
        {showView &&
          <ViewComponent
            id={selecteidId}
            token={staticdata.token}
            snapPoints={snapPointsLike}
            close={(e) => setShowView(e)}
          />
        }
        {likeClose && <LikeList
          close={(e) => setLikeClose(false)}
          token={staticdata.token}
          id={selecteidId}
          snapPoints={snapPointsLike}
        />}
        {showShare && <Share
          close={() => setShowShare(false)}
          postId={selecteidId}
          open={showShare}
          user_id={userData?.allData.data?.id}
          snapPoints={snapPointsLike}
        />}
      </View >
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

