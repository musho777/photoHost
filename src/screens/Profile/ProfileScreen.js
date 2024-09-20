import { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { MenuSvg2 } from '../../assets/svg/Svgs';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostsAction, getUserInfoAction } from '../../store/action/action';
import { ProfilImage } from './components/profilImage';
import { ProfilInfo } from './components/profilInfo';
import { AlbomAndInfo } from './components/albomAndInfo';
import { ProfileImageSkeleton } from '../../components/skeleton/profileImageSkeleton';

export const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getPosts);
  const user = useSelector(st => st.userData);
  const [page, setPage] = useState(1);
  const [changeAvatar, setChangeAvatar] = useState(false);
  useEffect(() => {
    if (user.data?.id) {
      dispatch(GetPostsAction({ user_id: user.data?.id }, staticdata.token, page));
    }
  }, [user.data?.id, page]);


  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setChangeAvatar(false)}
        style={{ flex: 1, marginTop: 10, paddingHorizontal: 15 }}>
        <ScrollView
          removeClippedSubviews={false}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={getPosts?.loading}
              onRefresh={() => {
                if (!getPosts.loading) {
                  dispatch(GetPostsAction({ user_id: user.data.id }, staticdata.token, 1))
                  dispatch(getUserInfoAction(staticdata.token))
                }

              }}
            />
          }
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (getPosts.nextPage) {
                let pages = page + 1;
                dispatch(GetPostsAction({ user_id: user.data.id }, staticdata.token, pages));
                setPage(pages);
              }
            }
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginVertical: 10 }}>
            <MenuSvg2 />
          </TouchableOpacity>
          {user.loading ?
            <ProfileImageSkeleton /> :
            <ProfilImage
              user={user}
              changeAvatar={changeAvatar}
              setChangeAvatar={(e) => setChangeAvatar(e)}
            />
          }
          <ProfilInfo id={user?.allData?.data?.id} loading={getPosts.loading} postCount={user.postCount} user={user} />
          <AlbomAndInfo />
          {getPosts.secondLoading && <ActivityIndicator style={styles.loading} size="small" color="#FFC24B" />}
        </ScrollView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginVertical: 20,
  },
});