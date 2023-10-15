import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useDispatch, useSelector } from 'react-redux';
import { CheckMarkUserSvg, NotLineSvg } from '../assets/svg/Svgs';
import { Comment, Heart, MenuSvg, ViewSvg } from '../assets/svg/TabBarSvg';
import { AddBlackListAction, AddDeleteFollowAction, AddInBookAction, LikePostAction } from '../store/action/action';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
import { Comments } from './Comment';
import { LikeList } from './LikeList';
import { Slider } from './Slider';
import { useNavigation } from '@react-navigation/native';


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
  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
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
    let dayOfMonth = currentDate.getDate();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    const Mounth = currentDate.getMonth()
    if (minute <= 9) {
      minute = `0${minute}`
    }
    if (hour <= 9) {
      hour = `0${hour}`
    }
    if (dayOfMonth <= 9) {
      dayOfMonth = `0${dayOfMonth}`
    }
    setDay(`${dayOfMonth} ${mounth[Mounth]} в ${hour}:${minute}`)
  }, [data])

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setOpenModal(false)} >
      <Shadow
        style={{ width: '100%', borderRadius: 20, backgroundColor: '#fff', position: 'relative' }}
        startColor={'#00000010'}>
        <View style={styles.block}>
          <View style={[Styles.flexSpaceBetween, { padding: 15, position: 'relative' }]}>
            <TouchableOpacity onPress={() =>
              user.data.id !== userId ? navigation.navigate('SearchProfil', { id: userId }) :
                navigation.navigate('ProfileNavigation')
            }
              style={Styles.flexAlignItems
              }>
              <Image style={styles.userImg}
                source={{ uri: `https://chamba.justcode.am/uploads/${userImg}` }} />
              <View>
                <View style={Styles.flexAlignItems}>
                  <Text Text style={[Styles.darkSemiBold14, { marginRight: 5 }]}>{userName}</Text>
                  {star > 0 && <CheckMarkUserSvg />}
                </View>
                <Text style={Styles.balihaiMedium9}>{day} </Text>
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
            {(user.data.id == userId && openModal) &&
              <View style={styles.infoBlock}>
                <TouchableOpacity
                  style={{ marginVertical: 10 }}
                  onPress={() => {
                    setOpenModal(false)
                    navigation.navigate('EditPostScreen', {
                      description: description,
                      id: id,
                    });
                  }}>
                  <Text style={Styles.darkRegular14}>Редактировать</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginVertical: 10 }}
                  onPress={() => {
                    setOpenModal(false)
                    deletData(id)
                  }}>
                  <Text style={Styles.darkRegular14}>Удалить пост </Text>
                </TouchableOpacity>
              </View>}



            {(user.data.id != userId && openModal) &&
              <View style={styles.infoBlock}>
                <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => {
                  setOpenModal(false)
                  addToBook()
                }}>
                  <Text style={Styles.darkRegular14}>{book ? 'Удалить из закладок' : 'В закладки'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOpenModal(false)
                    setFollow(!follow)
                    dispatch(AddDeleteFollowAction({ user_id: userId }, staticdata.token))
                  }}
                  style={{ marginBottom: 20 }} >
                  <Text style={Styles.darkRegular14}>{!follow ? 'Подписаться' : 'Отписаться'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => {
                  setOpenModal(false)
                  addToBlackList()
                }}>
                  <Text style={Styles.darkRegular14}>В чёрный список</Text>
                </TouchableOpacity>
              </View>
            }
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

const styles = StyleSheet.create({
  block: {
    shadowColor: '#7E9DB5',
    borderColor: AppColors.White_Color,
    borderRadius: 10,
    position: 'relative',
  },
  userImg: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 50,
  },
  infoBlock: {
    position: 'absolute',
    right: 20,
    top: 50,
    elevation: 5,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 1
  },
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
