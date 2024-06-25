import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { Albom } from '../../components/Albom';
import { CheckMarkUserSvg, MenuSvg2 } from '../../assets/svg/Svgs';
import { Menu } from '../../components/Menu';
import { Button } from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostsAction, chnageAvatarAction, getUserInfoAction } from '../../store/action/action';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { InfoBlock } from './InfoBlock';
import { Shadow } from 'react-native-shadow-2';
import ImagePicker from 'react-native-image-crop-picker';
import { SliderModal } from '../../components/SliderModal';
import { t } from '../../components/lang';

const { width } = Dimensions.get('window');

export const ProfileScreen = ({ navigation, profile }) => {
  const [imgFile, setImgFile] = useState();
  const [openSlider, setOpenSlider] = useState(false)
  const [active, setActive] = useState(0);

  const mainData = useSelector(st => st.mainData);

  const changeImg = () => {
    ImagePicker.openPicker({
      width: 450,
      height: 450,
      cropping: false,
    }).then(image => {
      setImgUrl(image.path);
      setImgFile(image);
      if (image.path) {
        setChangeAvatar(false)
        dispatch(chnageAvatarAction(image.path, staticdata.token));
      }
    });

  };


  const DelatePhoto = () => {
    setChangeAvatar(false)
    setImgUrl('')
    dispatch(chnageAvatarAction('', staticdata.token));
  }




  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getPosts);
  const [page, setPage] = useState(1)
  const user = useSelector(st => st.userData);
  const [activeCard, setActiveCard] = useState(0)
  const swiperRef = useRef(null);
  const [changeAvatar, setChangeAvatar] = useState(false)
  const [imgUrl, setImgUrl] = useState('');


  const [data, setData] = useState(['albom', ''])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(getUserInfoAction(staticdata.token))
      dispatch(GetPostsAction({ user_id: user.data?.id }, staticdata.token, 1));
      setActiveCard(0)
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!Object.keys(user.data).length && staticdata.token) {
      dispatch(GetPostsAction({ user_id: user.data?.id }, staticdata.token, 1));
      dispatch(getUserInfoAction(staticdata.token))
    }
  }, [staticdata.token, Object.keys(user.data).length])

  useEffect(() => {
    if (user.data?.id) {
      dispatch(GetPostsAction({ user_id: user.data?.id }, staticdata.token, 1));
    }
  }, [user.data?.id]);

  const [openMenu, setOpenMenu] = useState(false)

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  const handelChange = () => {
    setActiveCard(1);
    swiperRef.current.goToLastIndex();
  };
  const handelChangeFirst = () => {
    setActiveCard(0);
    swiperRef.current.goToFirstIndex();
  };

  if (user.loading) {
    return (
      <View style={Styles.loading}>
        <ActivityIndicator size="large" color="#FFC24B" />
      </View>
    );
  }
  else {
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
            onPress={() => setOpenMenu(true)}
            style={{ marginVertical: 25 }}>
            <MenuSvg2 />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setChangeAvatar(!changeAvatar)}>
              <Image
                style={styles.img}
                source={{
                  uri: imgUrl
                    ? imgUrl
                    : `https://chamba.digiluys.com/uploads/${user.avatar}`,
                }}
              />
              {/* <Image
                style={styles.img}
                source={{ uri: `https://chamba.digiluys.com/uploads/${user?.avatar}` }}
              /> */}
            </TouchableOpacity>
            {changeAvatar && <View style={{ top: 100, position: "absolute", }}>
              <Shadow
                style={styles.block}
                startColor={'#00000010'}
              >
                <TouchableOpacity style={{ flexDirection: 'row', gap: 10, width: 150, }} onPress={() => {
                  setChangeAvatar(false)
                  setOpenSlider(true)
                }}>
                  <View style={{ width: 25, height: 25 }}>
                    <Image style={{ width: 23, height: 23 }} source={require('../../assets/img/user1.png')} />
                  </View>
                  <Text style={{ color: "black", fontSize: 14, fontWeight: '500', }}>Открыть фото</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', gap: 10, width: 150 }}>
                  <View style={{ width: 25, height: 25 }}>
                    <Image style={{ width: 25, height: 20, marginLeft: -2 }} source={require('../../assets/img/edit.png')} />
                  </View>
                  <Text style={{ color: "black", fontSize: 14, fontWeight: '500', }} onPress={() => changeImg()}>{t(mainData.lang).Changemail}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', gap: 10, width: 150 }} onPress={() => DelatePhoto()}>
                  <View style={{ width: 25, height: 25 }}>
                    <Image style={{ width: 23, height: 23 }} source={require('../../assets/img/delete.png')} />
                  </View>
                  <Text style={{ color: "black", fontWeight: '500', fontSize: 14, }}>Удалить фото</Text>
                </TouchableOpacity>
              </Shadow>
            </View>}
            <View style={{ marginTop: 7, marginBottom: 15, alignItems: 'center', marginLeft: 10 }}>
              <View style={Styles.flexAlignItems}>
                <Text style={[Styles.darkMedium16, { marginRight: 5 }]}>{user?.username}</Text>
                {user.data.star > 0 &&
                  <CheckMarkUserSvg />
                }
              </View>
              <Text style={[Styles.balihaiRegular12, { marginLeft: -17 }]}>@{user?.name}</Text>
            </View>
            {user.data.description && (
              <Text style={Styles.darkRegular14}>{user.description}</Text>
            )}
          </View>
          <View
            style={[
              { marginVertical: 20, paddingHorizontal: 15 },
              Styles.flexSpaceBetween,
            ]}>
            <View style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{user.postCount}</Text>
              <Text style={Styles.balihaiRegular12}>{t(mainData.lang).Publications}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('FollowersScreen', { index: 0 })}
              style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{user.followersCount}</Text>
              <Text style={Styles.balihaiRegular12}>{t(mainData.lang).Subscribers}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('FollowersScreen', { index: 1 })}
              style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{user.followerCount}</Text>
              <Text style={Styles.balihaiRegular12}>{t(mainData.lang).Subscriptions}</Text>
            </TouchableOpacity>
          </View>
          {
            profile && (
              <View
                style={[
                  Styles.flexSpaceBetween,
                  { paddingHorizontal: 15, marginVertical: 10 },
                ]}>
                <Button paddingV={10} title={t(mainData.lang).subscribe} width="48%" />
                <Button bg paddingV={10} title={'Сообщение'} width="48%" />
              </View>
            )
          }
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text onPress={() => handelChangeFirst()} style={[
              Styles.balihaiMedium14,
              styles.textWrapper,
              activeCard == 0 && { borderColor: '#000', color: '#000' }
            ]}>{t(mainData.lang).Album}</Text>
            <Text onPress={() => handelChange()} style={[Styles.balihaiMedium14,
            styles.textWrapper,
            activeCard == 1 && { borderColor: '#000', color: '#000' }

            ]}>{t(mainData.lang).Information}</Text>
          </View>
          <SwiperFlatList
            index={0}
            ref={swiperRef}
            onChangeIndex={(index) => { setActiveCard(index.index) }}
          >
            {data.map((elm, i) => {
              return <View key={i} style={{ width: width - 32 }}>
                {elm === 'albom' ?
                  <View>
                    <Albom loading={getPosts.loading} data1={getPosts.data1} data={getPosts.data} />
                  </View> :
                  <InfoBlock user={user.data} />
                }
              </View>
            })}
          </SwiperFlatList>
        </ScrollView >
        <Menu close={() => setOpenMenu(false)} visible={openMenu} />
        <SliderModal
          modalVisible={openSlider} activePhoto={active} photo={[{ photo: user.avatar }]} close={() => setOpenSlider(false)} />
      </TouchableOpacity >
    );
  }
};

const styles = StyleSheet.create({
  img: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  textWrapper: {
    width: '50%',
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#E7EEF5',
  },
  block: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 999,
    gap: 13
  }
});
