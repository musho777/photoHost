import { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { BackArrow, BackArrowWhite, CheckMarkUserSvg } from '../../assets/svg/Svgs';
import { Button } from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeleteFollowAction, AddDeletFollowAction, Api, ClearFollowrs } from '../../store/action/action';
import { t } from '../../components/lang';
import { useFocusEffect } from '@react-navigation/native';
import { ProfilInfo } from '../Profile/components/profilInfo';
import { Albom } from '../../components/Albom/Albom';
import { InfoBlock } from '../Profile/InfoBlock';
import debounce from 'lodash/debounce';
import { AlbomAndInfo } from '../Profile/components/albomAndInfo';
import { EmptyFlatlist } from '../../components/emptyFlatlist';
import FastImage from 'react-native-fast-image';
import { SliderModal } from '../../components/SliderModal';

const { width } = Dimensions.get('window');


export const SearchProfil = ({ navigation, route }) => {
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  const mainData = useSelector(st => st.mainData);
  const [isFollow, setIsFollow] = useState(false)
  const [followersCount, setFollowersCount] = useState(0)
  const user = useSelector(st => st.userData);
  const [seletedScreen, setSelectedScreen] = useState(true)
  const [loadBgImage, setLoadBgImage] = useState(true)
  const [openSlider, setOpenSlider] = useState(false)
  const [openBg, setOpenBg] = useState(false)
  const { id } = route.params;
  const [data, setData] = useState(null)
  const [post, setPost] = useState({})
  const [postLoading, setPostLoading] = useState(true)
  const [postSecondLoading, setPostSecondLoadin] = useState(false)
  const [postData, setPostData] = useState([])




  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.darkMedium16, {
        textAlign: 'center', paddingTop: 15, color: JSON.parse(data.data?.name)?.color?.title, fontFamily: JSON.parse(data?.data.name)?.font
      }]}>{JSON.parse(data?.data.name)?.name}</Text>
    } catch (error) {
      return <Text style={[Styles.darkMedium16, { textAlign: 'center', paddingTop: 15 }]}>{data?.data?.name}</Text>
    }
  }

  const AddDeletFollow = () => {
    if (isFollow) {
      setFollowersCount(followersCount - 1)
      dispatch(AddDeletFollowAction('remove'))
    }
    else {
      setFollowersCount(followersCount + 1)
      dispatch(AddDeletFollowAction('add'))
    }
    setIsFollow(!isFollow)
    dispatch(AddDeleteFollowAction({ user_id: data.data.id }, staticdata.token))
  }


  const sendMsg = () => {
    navigation.navigate('ChatScreen', { id: id })
  }

  const fetchPost = async (page) => {
    let item = [...postData]
    if (page == 1) {
      setPostLoading(true)
    }
    else {
      setPostSecondLoadin(true)
    }
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${staticdata.token}`);
    try {
      const response = await fetch(`${Api}/get_all_post_auth_user_or_other_user?page=${page}`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ user_id: id }),
      })
      const result = await response.json();
      setPostLoading(false)
      setPostSecondLoadin(false)
      setPost(result.data);
      let current = [...item, ...result.data.data];
      if (page == 1) {
        setPostData(result.data.data)

      }
      else {
        setPostData(current)
      }
    } catch (error) {
      setPostSecondLoadin(false)
      setPostLoading(false)
    } finally {
      setPostSecondLoadin(false)
      setPostLoading(false)
    }
  };

  useEffect(() => {
    setData(null)
    setPost(null)
    setPostData([])
    const fetchData = async () => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${staticdata.token}`);
      try {
        const response = await fetch(`${Api}/single_page_user`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({ user_id: id }),
        })
        const result = await response.json();
        let index = result?.data.follow_status_sender?.findIndex((elm) => elm.sender_id == user.data.id)
        setIsFollow(index >= 0)
        setFollowersCount(result?.followers_count)
        setData(result);
      } catch (error) {
      } finally { }
    };

    fetchData();
    fetchPost(1);
    return () => {
      setPost(null)
      setData(null)
      setPostData([])
    };
  }, [id])

  const handleEndReached = () => {
    if (seletedScreen) {
      if (post?.next_page_url && !postSecondLoading) {
        let pages = page + 1
        setPage(pages)
        fetchPost(pages)
      }
    }
  }




  const renderItem1 = ({ item, index }) => {
    return <Albom id={item.id} index={index} elm={item} loading={postLoading} my={false} data={postData} />;
  };
  const renderItem2 = ({ item, index }) => {
    return <InfoBlock user={data.data} />
  };

  const renderItem = seletedScreen ? renderItem1 : renderItem2;


  const windowSize = postData.length > 50 ? postData.length / 4 : 21;

  const ListEmptyComponent = () => {
    return <EmptyFlatlist loading={postLoading} text={t(mainData.lang).Thefeedisempty} />
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setTranslucent = true
      StatusBar.setBackgroundColor("transparent")
      StatusBar.setBarStyle('dark-content');
      return () => {
        StatusBar.setBarStyle('dark-content');
      };
    }, [])
  );



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={seletedScreen ? postData : [{ id: 1 }]}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshing={postLoading}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        renderItem={renderItem}
        numColumns={2}
        scrollEventThrottle={16}
        ListEmptyComponent={ListEmptyComponent}
        // getItemLayout={getItemLayout}
        onEndReached={debounce(handleEndReached, 300)}
        initialNumToRender={5}
        maxToRenderPerBatch={windowSize}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
              <BackArrowWhite />
            </TouchableOpacity>
            <View style={{ width: width, marginLeft: -15 }}>
              <View style={{ width: width }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setOpenBg(true)}>
                  <FastImage
                    onLoad={() => {
                      setLoadBgImage(false)
                    }}
                    style={[styles.bgImage1, loadBgImage && { opacity: 0 }]}
                    source={{ uri: `https://chambaonline.pro/uploads/${data?.data.backround_photo}`, }}
                  />
                </TouchableOpacity>
                <View style={styles.avatarWrapper1} activeOpacity={1} >
                  <TouchableOpacity activeOpacity={1} onPress={() => setOpenSlider(true)} style={[styles.shadow, styles.avatar]}>
                    <Image
                      style={styles.img}
                      source={{ uri: `https://chambaonline.pro/uploads/${data?.data.avatar}`, }}
                    />
                  </TouchableOpacity>
                </View>
              </View>


              <View style={{ marginTop: -50, backgroundColor: 'white', width: width, borderTopLeftRadius: 30, borderTopEndRadius: 30, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 45, width: '100%', justifyContent: 'center', }}>
                  {canParseJSON(data?.data?.name)}
                  {data?.data.star > 0 && <View style={{ marginTop: 3, left: 5 }}>
                    <CheckMarkUserSvg />
                  </View>}
                </View>
                {data?.data.description &&
                  <Text style={[Styles.darkMedium14, { width: '100%', textAlign: 'center', color: JSON.parse(data?.data.description).color.title, fontFamily: JSON.parse(data?.data.description).font }]}>{
                    JSON.parse(data?.data.description).text
                  }</Text>
                }
              </View>
            </View>


            <ProfilInfo id={data?.data?.id} loading={data?.loading} user={{ followersCount: followersCount, followerCount: data?.follower_count }} postCount={data?.post_count} />
            <View
              style={[
                Styles.flexSpaceBetween,
                { paddingHorizontal: 15, marginVertical: 10 },
              ]}>
              <Button
                bg={isFollow}
                onPress={() => AddDeletFollow()} paddingV={10}
                title={isFollow ? t(mainData.lang).Unsubscribe : t(mainData.lang).subscribe}
                width="48%"
              />
              <Button onPress={() => sendMsg()} bg paddingV={10} title={'Сообщение'} width="48%" />
            </View>
            <AlbomAndInfo setSelectedScreen={(e) => setSelectedScreen(e)} seletedScreen={seletedScreen} />
          </>
        }
        ListFooterComponent={
          postSecondLoading && (
            <ActivityIndicator style={styles.loading} size="small" color="#FFC24B" />
          )}
      />
      {openSlider &&
        <SliderModal
          modalVisible={openSlider} photo={[{ photo: data?.data.avatar }]} close={() => setOpenSlider(false)} />
      }
      {openBg &&
        <SliderModal
          modalVisible={openBg} photo={[{ photo: data?.data.backround_photo }]} close={() => setOpenBg(false)} />
      }
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textWrapper: {
    width: '50%',
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#E7EEF5',
  },
  goBack: {
    width: 50,
    height: 30,
    position: 'absolute',
    top: 40,
    zIndex: 9999,
  },
  avatar: {
    width: 110,
    height: 110,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    justifyContent: 'center',
  },
  bgImage1: {
    objectFit: 'cover',
    width: width,
    height: 250,
  },
  avatarWrapper1: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
  },
});

