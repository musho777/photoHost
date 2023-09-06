import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useDispatch, useSelector } from 'react-redux';
import { CheckMarkUserSvg, NotLineSvg } from '../assets/svg/Svgs';
import { Comment, Heart, MenuSvg, Share, ViewSvg } from '../assets/svg/TabBarSvg';
import { AddBlackListAction, AddDeleteFollowAction, AddInBookAction, LikePostAction } from '../store/action/action';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
import { BootomModal } from './BootomSheet';
import { Comments } from './Comment';
import { LikeList } from './LikeList';
import { Slider } from './Slider';
import { useNavigation } from '@react-navigation/native';
import { SliderModal } from './SliderModal';

const windowWidth = Dimensions.get('window').width;



export const Post = ({
  userImg,
  userName,
  description,
  like,
  commentCount,
  view,
  photo,
  liked,
  id,
  star,
  userId,
  addToblack,
  isBook,
  isFollow,
  daysAgo,
  deletData,
  data
}) => {
  const navigation = useNavigation()
  const [likedCount, setLikedCount] = useState(+like)
  const [isLiked, setIsLiked] = useState(liked)
  const staticdata = useSelector(st => st.static);
  const user = useSelector((st) => st.userData)
  const bottomSheetRef = useRef(null);
  const likeRef = useRef(null)
  const snapPointsLike = useMemo(() => ['50%'], []);
  const snapPoints = useMemo(() => [user.data.id !== userId ? '25%' : '15%'], []);
  const handlePresentModalPress = useCallback(() => { bottomSheetRef.current?.present(); }, []);
  const handlePresentModalPressLike = useCallback(() => {
    likeRef.current?.present();
  }, []);
  const [openLike, setOpenLike] = useState(false)
  const [comment, setComment] = useState(false)
  const [book, setBook] = useState(isBook)
  const [follow, setFollow] = useState(isFollow)
  const [day, setDay] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)
  const dispatch = useDispatch()
  const LikePost = () => {
    if (isLiked) {
      setLikedCount(likedCount - 1)
    }
    else {
      setLikedCount(likedCount + 1)
    }
    setIsLiked(!isLiked)
    dispatch(LikePostAction({
      'post_id': id
    },
      staticdata.token
    ))
  }


  const addToBlackList = () => {
    addToblack(userId)
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ 'user_id': userId }, staticdata.token))
  }


  const addToBook = () => {
    bottomSheetRef.current?.close();
    dispatch(AddInBookAction({ 'post_id': id }, staticdata.token))
    setBook(!book)
  }
  const CloseLike = () => {
    likeRef.current?.close();
    setOpenLike(false)
  }

  useEffect(() => {
    const currentDate = new Date(data);
    const dayOfMonth = currentDate.getDate();
    const hour = currentDate.getHours();
    const monthString = currentDate.toLocaleString('ru', { month: 'long' })
    const minute = currentDate.getMinutes();
    setDay(`${dayOfMonth} ${monthString} в ${hour}:${minute}`)
  }, [data])

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setOpenModal(false)} >
      <Shadow
        style={{ width: '100%', borderRadius: 10, backgroundColor: '#fff', position: 'relative' }}
        startColor={'#00000010'}>
        <View style={styles.block}>
          <View style={[Styles.flexSpaceBetween, { padding: 15, position: 'relative' }]}>
            <TouchableOpacity onPress={() => user.data.id !== userId && navigation.navigate('SearchProfil', { id: userId })} style={Styles.flexAlignItems}>
              <Image style={styles.userImg}
                source={{ uri: `https://chamba.justcode.am/uploads/${userImg}` }} />
              <View>
                <View style={Styles.flexAlignItems}>
                  <Text Text style={[Styles.darkSemiBold14, { marginRight: 5 }]}>{userName}</Text>
                  {star > 0 && <CheckMarkUserSvg />}
                </View>
                <Text style={Styles.balihaiMedium9}>{daysAgo != '0 дней назад' ? day : 'сегодня'} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOpenModal(!openModal)
                handlePresentModalPress()
              }}
              style={{ marginTop: -5, paddingLeft: 15, width: 30, height: 20, }}>
              <MenuSvg />
            </TouchableOpacity>
            {(user.data.id == userId && openModal) && <TouchableOpacity style={styles.delate} onPress={() => deletData(id)}>
              <Text style={Styles.darkRegular14}> Удалить пост </Text>
            </TouchableOpacity>}
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            <Text style={Styles.darkSemiBold12}>
              {description}
            </Text>
          </View>
          <Slider photo={photo} activePhoto={(e) => setActivePhoto(e)} />
          <View
            style={[
              { paddingHorizontal: 15, marginBottom: 15 },
              Styles.flexSpaceBetween,
            ]}>
            <View style={Styles.flexAlignItems}>
              <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
                <TouchableOpacity onPress={() => { LikePost() }}>
                  {isLiked ? <Heart /> : <NotLineSvg />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setOpenLike(true)
                  handlePresentModalPressLike()
                }
                }>
                  <Text style={[Styles.darkMedium14, { marginLeft: 4 }]}>{likedCount}</Text>
                </TouchableOpacity>
              </View>
              <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
                <TouchableOpacity onPress={() => setComment(true)}>
                  <Comment />
                </TouchableOpacity>
                <Text style={[Styles.darkMedium14, { marginLeft: 5 }]}>{commentCount}</Text>
              </View>
            </View>
            <View>
              <View style={Styles.flexAlignItems}>
                <ViewSvg />
                <Text style={[Styles.balihaiRegular14, { marginLeft: 5 }]}>
                  {view}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute' }}>
          {user.data.id != userId && <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
            <View style={{ paddingHorizontal: 20 }}>
              {user.data.id == userId && <TouchableOpacity style={{ marginBottom: 20, marginTop: 20 }} onPress={() => deletData(id)}>
                <Text style={Styles.darkRegular14}> Удалить пост </Text>
              </TouchableOpacity>}
              {user.data.id !== userId && <TouchableOpacity style={{ marginBottom: 20, marginTop: 20 }} onPress={() => addToBook()}>
                <Text style={Styles.darkRegular14}>{book ? 'Удалить из закладок' : 'В закладки'}</Text>
              </TouchableOpacity>}
              {user.data.id !== userId && <TouchableOpacity
                onPress={() => {
                  setFollow(!follow)
                  dispatch(AddDeleteFollowAction({ user_id: userId }, staticdata.token))
                }}

                style={{ marginBottom: 20 }}>
                <Text style={Styles.darkRegular14}>{!follow ? 'Подписаться' : 'Удалить из подписок'}</Text>
              </TouchableOpacity>}
              {user.data.id !== userId && <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => addToBlackList()}>
                <Text style={Styles.darkRegular14}>В чёрный список</Text>
              </TouchableOpacity>}
            </View>
          </BootomModal>}
        </View>

        <LikeList close={() => CloseLike()} count={likedCount} openLike={openLike} token={staticdata.token} id={id} ref={likeRef} snapPoints={snapPointsLike} />
        <Comments
          userImg={userImg}
          userName={userName}
          description={description}
          parentId={id}
          visible={comment}
          close={() => setComment(false)}
        />
      </Shadow>

    </TouchableOpacity>
  );
};
// AddInBook
const styles = StyleSheet.create({
  block: {
    shadowColor: '#7E9DB5',
    borderColor: AppColors.White_Color,
    borderRadius: 10,
    position: 'relative'
  },
  userImg: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 50,
  },
  img: {
    height: 300,
    width: windowWidth,
  },
  pagination: {},
  delate: {
    position: 'absolute',
    right: 20,
    top: 50,
    elevation: 5,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 30
  }
});
