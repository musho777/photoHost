import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet, FlatList, Text } from 'react-native';
import { MenuSvg2 } from '../../assets/svg/Svgs';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostsAction, getUserInfoAction } from '../../store/action/action';
import { ProfilImage } from './components/profilImage';
import { ProfilInfo } from './components/profilInfo';
import { AlbomAndInfo } from './components/albomAndInfo';
import { ProfileImageSkeleton } from '../../components/skeleton/profileImageSkeleton';
import { Albom } from '../../components/Albom/Albom';
import debounce from 'lodash/debounce';
import { InfoBlock } from './InfoBlock';


export const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getPosts);
  const user = useSelector(st => st.userData);
  const [page, setPage] = useState(1);
  const [seletedScreen, setSelectedScreen] = useState(true)
  const [changeAvatar, setChangeAvatar] = useState(false);
  useEffect(() => {
    if (user.data?.id) {
      dispatch(GetPostsAction({ user_id: user.data?.id }, staticdata.token, page));
    }
  }, [user.data?.id, page]);



  const handleEndReached = useCallback(() => {
    if (seletedScreen)
      if (getPosts.nextPage && !getPosts.secondLoading) {
        let pages = page + 1;
        dispatch(GetPostsAction({ user_id: user.data.id }, staticdata.token, pages));
        setPage(pages);
      }
  }, [getPosts, page, seletedScreen]);

  const renderItem1 = ({ item, index }) => {
    return <Albom elm={item} loading={getPosts.loading} my={true} data={getPosts.data} />;
  };
  const renderItem2 = ({ item, index }) => {
    return <InfoBlock user={user.data} />
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setChangeAvatar(false)}
        style={{ flex: 1, marginTop: 10, paddingHorizontal: 15 }}>
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
              setPage(1);
              dispatch(getUserInfoAction(staticdata.token));
            }
          }}

          ListHeaderComponent={
            <>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{ marginVertical: 10 }}>
                <MenuSvg2 />
              </TouchableOpacity>

              {user.loading ? (
                <ProfileImageSkeleton />
              ) : (
                <ProfilImage
                  user={user}
                  changeAvatar={changeAvatar}
                  setChangeAvatar={(e) => setChangeAvatar(e)}
                />
              )}
              <ProfilInfo
                id={user?.allData?.data?.id}
                loading={getPosts.loading}
                postCount={user.postCount}
                user={user}
              />
              <AlbomAndInfo setSelectedScreen={(e) => setSelectedScreen(e)} seletedScreen={seletedScreen} />
            </>
          }
          ListFooterComponent={
            getPosts.secondLoading && (
              <ActivityIndicator style={styles.loading} size="small" color="#FFC24B" />
            )}
        />

      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginVertical: 20,
  },
});