import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { BackArrow } from '../../assets/svg/Svgs';
import { Button } from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeleteFollowAction, AddDeletFollowAction, ClearFollowrs, GetOtherPostsAction, GetSinglPageAction } from '../../store/action/action';
import { t } from '../../components/lang';
import { useFocusEffect } from '@react-navigation/native';
import { ProfileImageSkeleton } from '../../components/skeleton/profileImageSkeleton';
import { ProfilInfo } from '../Profile/components/profilInfo';
import { Albom } from '../../components/Albom/Albom';
import { InfoBlock } from '../Profile/InfoBlock';
import debounce from 'lodash/debounce';
import { AlbomAndInfo } from '../Profile/components/albomAndInfo';
import { EmptyFlatlist } from '../../components/emptyFlatlist';
import FastImage from 'react-native-fast-image';
import { Skeleton } from '../../components/Skeleton';
import { SliderModal } from '../../components/SliderModal';

const { width } = Dimensions.get('window');


export const SearchProfil = ({ navigation, route }) => {
  const singlPage = useSelector(st => st.singlPage);
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getOtherPosts);
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
    dispatch(AddDeleteFollowAction({ user_id: singlPage.data.id }, staticdata.token))
  }


  const sendMsg = () => {
    navigation.navigate('ChatScreen', { id: route.params.id })
  }

  useFocusEffect(
    useCallback(() => {
      if (singlPage.data.id != route?.params?.id) {
        dispatch(ClearFollowrs())
        dispatch(GetSinglPageAction({ user_id: route?.params?.id, }, staticdata.token));
        dispatch(GetOtherPostsAction({ user_id: route?.params?.id }, staticdata.token, 1));
      }
    }, [route.params.id, staticdata.token, singlPage.data.id])
  );



  useEffect(() => {
    let index = singlPage.data?.follow_status_sender?.findIndex((elm) => elm.sender_id == user.data.id)
    setIsFollow(index >= 0)
    setFollowersCount(singlPage.followersCount)
  }, [singlPage.data])

  const handleEndReached = useCallback(() => {
    if (seletedScreen)
      if (getPosts.nextPage && !getPosts.secondLoading) {
        let pages = page
        pages = page + 1
        setPage(pages)
        dispatch(GetOtherPostsAction({ user_id: route?.params?.id }, staticdata.token, pages));
      }
  }, [getPosts, page, seletedScreen]);

  const renderItem1 = ({ item, index }) => {
    return <Albom index={index} elm={item} loading={getPosts.loading} my={false} data={getPosts.data} />;
  };
  const renderItem2 = ({ item, index }) => {
    return <InfoBlock user={singlPage.data} />
  };

  const renderItem = seletedScreen ? renderItem1 : renderItem2;


  const windowSize = getPosts.data.length > 50 ? getPosts.data.length / 4 : 21;

  const ListEmptyComponent = () => {
    return <EmptyFlatlist loading={getPosts.loading} text={t(mainData.lang).Thefeedisempty} />
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 15 }}>
        <FlatList
          data={seletedScreen ? getPosts?.data : [{ id: 1 }]}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={getPosts?.loading}
          renderItem={renderItem}
          numColumns={2}
          scrollEventThrottle={16}
          ListEmptyComponent={ListEmptyComponent}
          // getItemLayout={getItemLayout}
          onEndReached={debounce(handleEndReached, 300)}
          initialNumToRender={5}
          maxToRenderPerBatch={windowSize}
          onEndReachedThreshold={0.5}

          onRefresh={() => {
            if (!getPosts.loading) {
              dispatch(GetSinglPageAction({ user_id: route?.params?.id, }, staticdata.token));
              setPage(1);
            }
          }}

          ListHeaderComponent={
            <>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
                <BackArrow />
              </TouchableOpacity>
              {singlPage.loading ?
                <ProfileImageSkeleton /> :
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: '100%' }}>
                    {loadBgImage &&
                      <Skeleton
                        width={width - 83}
                        height={150}
                        style={{ position: "absolute", borderRadius: 10 }}
                      />
                    }
                    <TouchableOpacity onPress={() => setOpenBg()}>
                      <FastImage
                        onLoad={() => {
                          setLoadBgImage(false)
                        }}
                        style={[styles.bgImage, loadBgImage && { opacity: 0 }]}
                        source={{ uri: `https://chambaonline.pro/uploads/${singlPage.data.backround_photo}`, }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.avatarWrapper} activeOpacity={1} onPress={() => setOpenSlider(true)}>
                      <View style={[styles.shadow, styles.avatar]}>
                        <Image
                          style={styles.img}
                          source={{ uri: `https://chambaonline.pro/uploads/${singlPage.data.avatar}` }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <Text style={[Styles.darkMedium16, { marginTop: 20 }]}>{singlPage.data.name}</Text>
                  {singlPage.data.description && (
                    <Text style={[Styles.darkRegular14, { textAlign: 'center' }]}>{singlPage.data.description}</Text>
                  )}
                </View>
              }
              <ProfilInfo id={singlPage.data.id} loading={singlPage.loading} user={{ followersCount: followersCount, followerCount: singlPage.followerCount }} postCount={singlPage.postCount} />
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
            getPosts.secondLoading && (
              <ActivityIndicator style={styles.loading} size="small" color="#FFC24B" />
            )}
        />
      </View>

      <SliderModal
        modalVisible={openSlider} photo={[{ photo: singlPage.data.avatar }]} close={() => setOpenSlider(false)} />
      <SliderModal
        modalVisible={openBg} photo={[{ photo: singlPage.data.backround_photo }]} close={() => setOpenBg(false)} />
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
    height: 30
  },
  bgImage: {
    objectFit: 'cover',
    width: width - 90,
    height: 150,
    borderRadius: 10,
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
});

