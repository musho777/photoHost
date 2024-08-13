import { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { MenuSvg2 } from '../../assets/svg/Svgs';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostsAction } from '../../store/action/action';
import { ProfilImage } from './components/profilImage';
import { ProfilInfo } from './components/profilInfo';
import { AlbomAndInfo } from './components/albomAndInfo';
import { Skeleton } from '../../components/Skeleton';

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
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setChangeAvatar(false)}
      style={{ flex: 1, marginTop: 10, paddingHorizontal: 15 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
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
          <View style={{ justifyContent: "center", alignItems: 'center', gap: 12, marginBottom: 16.5 }}>
            <Skeleton
              width={90}
              height={90}
              style={{ borderRadius: 50 }}
            />
            <Skeleton
              width={150}
              height={14}
            />
          </View> :
          <ProfilImage
            user={user}
            changeAvatar={changeAvatar}
            setChangeAvatar={(e) => setChangeAvatar(e)}
          />
        }
        <ProfilInfo user={user} />
        <AlbomAndInfo />
      </ScrollView>
    </TouchableOpacity>
  );
};
