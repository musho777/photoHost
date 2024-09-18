import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl, Image, Text, StyleSheet, PermissionsAndroid, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/post/Post';
import { AddPostViewCount, DelatePostAction, EndViewPost, GetLentsAction, GetMyChatRoom, getUserInfoAction } from '../../store/action/action';
import { ModalComponent } from './modal';
import { PostLoading } from '../../components/post/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Styles } from '../../styles/Styles';
import { ViewComponent } from '../../components/statistic/ViewComponent';
import { HomeHeader } from '../../headers/HomeHeader';

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
  const handleClosePress = () => ViewRef.current?.close();
  const handlePresentModalPressView = () => {
    setShowView(true)
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
    }, 2000)
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      End()
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (createPost.loading) {
      goTop()
    }
  }, [createPost.loading])



  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS == 'android') {
        StatusBar.setBackgroundColor('white');
      }
    }, [])
  );


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
        <View key={index} style={[{ marginTop: 5 }, index == data.length - 1 && { marginBottom: 5 }]}>
          <Post
            viewableItems={viewableItems}
            userInfo={item.user}
            setShowView={() => handlePresentModalPressView()}
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
            setSelectidId={(id) => setSelectidId(id)}
            isLiked={item.like_auth_user.findIndex((elm, i) => elm.user_id == userData.data.id)}
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

      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={"white"}
      />
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
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={false}
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
        {showView &&
          <ViewComponent
            id={selecteidId}
            token={staticdata.token}
            snapPoints={snapPointsLike}
            close={(e) => setShowView(e)}
          />
        }
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

