import { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { MenuSvg2 } from '../../assets/svg/Svgs';
import { Menu } from '../../components/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostsAction } from '../../store/action/action';
import { ProfilImage } from './components/profilImage';
import { ProfilInfo } from './components/profilInfo';
import { AlbomAndInfo } from './components/albomAndInfo';

export const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getPosts);
  const user = useSelector(st => st.userData);
  const [page, setPage] = useState(1)
  const [activeCard, setActiveCard] = useState(0)
  const [changeAvatar, setChangeAvatar] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    if (user.data?.id) {
      dispatch(GetPostsAction({ user_id: user.data?.id }, staticdata.token, 1));
    }
  }, [user.data?.id]);


  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setChangeAvatar(false)}
      style={{ flex: 1, marginTop: 10, paddingHorizontal: 15, }}>
      <ScrollView
        scrollEnabled={activeCard == 0}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            if (getPosts.nextPage) {
              let pages = page + 1
              dispatch(GetPostsAction({ user_id: user.data.id }, staticdata.token, pages));
              setPage(pages)
            }
          }
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}

          style={{ marginVertical: 25 }}>
          <MenuSvg2 />
        </TouchableOpacity>
        <ProfilImage
          user={user}
          changeAvatar={changeAvatar}
          setChangeAvatar={(e) => setChangeAvatar(e)}
        />
        <ProfilInfo user={user} />
        <AlbomAndInfo
          activeCard={activeCard}
          setActiveCard={(e) => setActiveCard(e)}
        />
      </ScrollView >
      <Menu close={() => setOpenMenu(false)} visible={openMenu} />
    </TouchableOpacity >
  );
}