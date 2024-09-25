import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { BackArrow } from '../../assets/svg/Svgs';
import { Button } from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeleteFollowAction, AddDeletFollowAction, GetOtherPostsAction, GetSinglPageAction } from '../../store/action/action';
import { t } from '../../components/lang';
import { useFocusEffect } from '@react-navigation/native';
import { ProfileImageSkeleton } from '../../components/skeleton/profileImageSkeleton';
import { ProfilInfo } from '../Profile/components/profilInfo';
import { Albom } from '../../components/Albom/Albom';
import { InfoBlock } from '../Profile/InfoBlock';
import debounce from 'lodash/debounce';
import { AlbomAndInfo } from '../Profile/components/albomAndInfo';



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
        dispatch(GetSinglPageAction({ user_id: route?.params?.id, }, staticdata.token));
        dispatch(GetOtherPostsAction({ user_id: route?.params?.id }, staticdata.token, page));
      }
    }, [route.params.id, staticdata.token, page, singlPage.data.id])
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
    return <Albom elm={item} loading={getPosts.loading} my={true} data={getPosts.data} />;
  };
  const renderItem2 = ({ item, index }) => {
    return <InfoBlock user={singlPage.data} />
  };

  const renderItem = seletedScreen ? renderItem1 : renderItem2;

  const ITEM_HEIGHT = 65;
  const getItemLayout = (data, index) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  };

  const windowSize = getPosts.data.length > 50 ? getPosts.data.length / 4 : 21;
  console.log(getPosts.secondLoading)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 15 }}>
        <FlatList
          data={seletedScreen ? getPosts?.data : [{ id: 1 }]}
          scrollEnabled={seletedScreen}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={getPosts?.loading}
          renderItem={renderItem}
          numColumns={2}
          scrollEventThrottle={16}
          getItemLayout={getItemLayout}
          onEndReached={debounce(handleEndReached, 300)}
          initialNumToRender={5}
          maxToRenderPerBatch={windowSize}
          onEndReachedThreshold={0.5}

          onRefresh={() => {
            if (!getPosts.loading) {
              dispatch(GetSinglPageAction({ user_id: route?.params?.id, }, staticdata.token));
              dispatch(GetOtherPostsAction({ user_id: route?.params?.id }, staticdata.token, 1));
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
                  <Image
                    style={styles.img}
                    source={{ uri: `https://chambaonline.pro/uploads/${singlPage.data.avatar}` }}
                  />
                  <Text style={[Styles.darkMedium16, { margin: 7 }]}>{singlPage.data.name}</Text>
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
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
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
    marginVertical: 15,
    width: 50,
    height: 30

  }
});

