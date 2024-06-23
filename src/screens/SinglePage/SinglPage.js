import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddBlackListAction,
  AddCommentAction,
  AddDeleteFollowAction,
  AddInBookAction,
  DelatePostAction,
  GelPostCommentsAction,
  GetSinglPostAction,
  LikePostAction,
} from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { BootomModal } from '../../components/BootomSheet';
import { BackArrow, NotLineSvg, Save, SaveSVG } from '../../assets/svg/Svgs';
import { Comment, Heart, MenuSvg, ViewSvg } from '../../assets/svg/TabBarSvg';
import { Slider } from '../../components/Slider';
import { CommentItem } from '../../components/CommentItem';
import { CommentBlock } from '../../components/CommentBlock';
import { Comments } from '../../components/Comment';
import { Input } from '../../ui/Input';
import { Shadow } from 'react-native-shadow-2';
import { t } from '../../components/lang';


export const SinglPageScreen = ({ route, navigation }) => {
  const staticdata = useSelector(st => st.static);
  const singlData = useSelector(st => st.getSinglPage);
  const user = useSelector(st => st.userData);
  const [book, setBook] = useState(route.params?.isBook);
  const mainData = useSelector(st => st.mainData);
  const [isLiked, setIsLiked] = useState();
  const dispatch = useDispatch();
  const [comment, setComment] = useState(false);
  const [likeCount, setLikeCount] = useState();
  const [parenId, setParentId] = useState(null);
  const [senderName, setSenderNAme] = useState('')
  const [follow, setFollow] = useState()
  const [activePhoto, setActivePhoto] = useState(0)

  const [saveType, setSaveType] = useState('Запись сохранена в закладках')


  const [sendComment, setSendCommet] = useState('');
  const textInputRef = useRef(null);
  const id = route.params.id;
  const bottomSheetRef = useRef(null);
  const getComments = useSelector(st => st.getComments);
  const [showSave, setShowSave] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSave(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [showSave]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const snapPoints = useMemo(
    () => [user?.data?.id != singlData?.data?.user?.id ? '25%' : '25%'],
    [],
  );
  const LikePost = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
    dispatch(
      LikePostAction(
        {
          post_id: id,
        },
        staticdata.token,
      ),
    );
  };
  const addToBlackList = () => {
    addToblack(user.data.id);
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ user_id: user.data.id }, staticdata.token));
    navigation.navigate('TabNavigation')
  };
  const addToBook = () => {
    bottomSheetRef.current?.close();
    setShowSave(true)
    dispatch(AddInBookAction({ post_id: id }, staticdata.token));
    setBook(!book);
  };

  useEffect(() => {
    dispatch(GelPostCommentsAction({ post_id: id }, staticdata.token));
    dispatch(GetSinglPostAction({ post_id: id }, staticdata.token));
  }, []);

  useEffect(() => {
    if (singlData.data) {
      const foundElement = singlData?.data.like_auth_user?.find(
        item => item?.user_id == user?.data?.id,
      );
      setIsLiked(foundElement);
    }
    // setBook()
    setLikeCount(singlData?.data.like_auth_user?.length);
  }, [singlData.data]);

  useEffect(() => {
    setFollow(singlData.data?.user?.follow_status_sender?.length)
  }, [singlData.data?.user])

  if (singlData.loading) {
    return (
      <View style={Styles.loading}>
        <ActivityIndicator size="large" color="#FFC24B" />
      </View>
    );
  }

  const Answer = e => {
    setParentId(e.id);
    setSendCommet(e.name + ':');
    setSenderNAme(e.name + ':');
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const sendCommentFunction = () => {
    // let item = [...data];
    let send = sendComment;
    if (senderName) {
      let regex = new RegExp(senderName, 'gi');
      send = send.replace(regex, '');
    }
    dispatch(
      AddCommentAction(
        {
          comment: send,
          parent_id: parenId,
          post_id: singlData.data.id,
        },
        staticdata.token,
      ),
    );
    // setData(item);
    setParentId(null);
    dispatch(
      GelPostCommentsAction({ post_id: singlData.data.id }, staticdata.token),
    );
    setSendCommet('');
  };


  return (
    <SafeAreaView>
      {showSave &&
        <View style={styles.block}>
          <Shadow
            style={{ width: '100%', borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: "center", height: 50 }}
            startColor={'#00000010'}
          >
            <View style={styles.card}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', gap: 10, paddingHorizontal: 2 }}>
                <Image source={require('../../assets/img/icons8-save-30.png')} />
                <Text style={styles.heading}>{saveType}</Text>
              </View>
            </View>
          </Shadow>
        </View>
      }
      <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
        <View
          style={[
            Styles.flexSpaceBetween,
            { paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
          ]}>
          <TouchableOpacity onPress={() => {
            // dispatch(ClearSinglpAgeComment())
            navigation.goBack()
          }}
          >
            <BackArrow />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePresentModalPress()}
            style={{ marginTop: -5, paddingLeft: 15 }}>
            <MenuSvg />
          </TouchableOpacity>

        </View>
        {singlData?.data?.description && <Text style={[Styles.darkSemiBold12, { marginTop: 5, marginBottom: 10, paddingHorizontal: 20 }]}>
          {singlData?.data?.description}
        </Text>}
        <View>
          <Slider activePhoto={(e) => setActivePhoto(e)} single photo={singlData.data.photo} />
          <View style={{ paddingHorizontal: 20 }}>
            <View style={[Styles.flexSpaceBetween, { marginBottom: 20 }]}>
              <View style={Styles.flexAlignItems}>
                <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      LikePost();
                    }}>
                    {isLiked ? <Heart /> : <NotLineSvg />}
                  </TouchableOpacity>
                  <Text style={[Styles.darkMedium14, { marginLeft: 5 }]}>
                    - {likeCount}
                  </Text>
                </View>
                <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
                  <TouchableOpacity onPress={() => navigation.navigate("coment", { parentId: id })}>
                    <Comment />
                  </TouchableOpacity>
                  <Text style={[Styles.darkMedium14, { marginLeft: 5 }]}>
                    - {singlData.data.comment_count}
                  </Text>
                </View>
              </View>
              <View>
                <View style={Styles.flexAlignItems}>
                  <ViewSvg />
                  <Text style={[Styles.balihaiRegular14, { marginLeft: 5, }]}>
                    {singlData.data.view_count}
                  </Text>
                </View>
              </View>
            </View>
            {/* <View
              style={{
                borderBottomWidth: 1,
                paddingBottom: 20,
                borderColor: '#D4DEE7',
              }}>
              <CommentItem
                text={singlData.data.description}
                owner={true}
                id={id}
                ownerName={singlData.data.user?.name}
                userImg={singlData.data.user?.avatar}
              />
            </View> */}
            {/* {getComments.data.length > 0 && (
              <View style={{ marginVertical: 20 }}>
                <CommentBlock
                  text={getComments.data[0]?.comment}
                  replay={getComments.data[0]?.replay}
                  user={getComments.data[0]?.user}
                  like_count={getComments.data[0]?.likes_count}
                  isLiked={getComments.data[0]?.like_auth_user.length}
                  id={getComments.data[0]?.id}
                  token={staticdata?.token}
                  owner={false}
                  replay_count={getComments.data[0]?.replay_count}
                  onPressAnsswer={e => {
                    Answer(e);
                  }}
                />
              </View>
            )} */}
          </View>
        </View>

        {/* <Comments
          userName={singlData.data.user?.name}
          userImg={singlData.data.user?.avatar}
          description={singlData.data.description}
          parentId={id}
          visible={comment}
          close={() => setComment(false)}
        /> */}

        <View style={{ position: 'absolute' }}>
          <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
            <View style={{ paddingHorizontal: 20 }}>
              {user?.data?.id != singlData?.data?.user?.id && <TouchableOpacity
                style={{ marginBottom: 20, marginTop: 20 }}
                onPress={() => {
                  addToBook()
                  setSaveType(book ? "Запись удалена из закладок" : 'Запись сохранена в закладках')
                }}>
                <Text style={Styles.darkRegular14}>
                  {book ? 'Удалить из закладок' : 'В закладки'}
                </Text>
              </TouchableOpacity>}
              {user?.data?.id != singlData?.data?.user?.id && (
                <TouchableOpacity
                  style={{ marginBottom: 20 }}
                  onPress={() => {
                    setFollow(!follow)
                    dispatch(AddDeleteFollowAction({ user_id: singlData?.data?.user?.id }, staticdata.token))
                    bottomSheetRef.current?.close();
                  }}>

                  <Text style={Styles.darkRegular14}>{!follow ? t(mainData.lang).subscribe : t(mainData.lang).Unsubscribe}</Text>
                </TouchableOpacity>
              )}
              {user?.data?.id != singlData?.data?.user?.id && (
                <TouchableOpacity
                  style={{ marginBottom: 20 }}
                  onPress={() => addToBlackList()}>
                  <Text style={Styles.darkRegular14}>В чёрный список</Text>
                </TouchableOpacity>
              )}
              {user?.data?.id == singlData?.data?.user?.id && (
                <TouchableOpacity
                  style={{ marginBottom: 20 }}
                  onPress={() => {
                    bottomSheetRef.current?.close();
                    navigation.navigate('EditPostScreen', {
                      description: singlData.data.description,
                      id: singlData.data.id,
                    });
                  }}>
                  <Text style={Styles.darkRegular14}>
                    {t(mainData.lang).Editprofile}

                  </Text>
                </TouchableOpacity>
              )}
              {user?.data?.id == singlData?.data?.user?.id && (
                <TouchableOpacity
                  style={{ marginBottom: 20 }}
                  onPress={() => {
                    bottomSheetRef.current?.close();
                    dispatch(DelatePostAction({ post_id: singlData.data.id }, staticdata.token))
                    navigation.goBack()
                  }}>
                  <Text style={Styles.darkRegular14}>Удалить пост</Text>
                </TouchableOpacity>
              )}
            </View>
          </BootomModal>
        </View>
      </ScrollView>
      {/* <View
        style={{
          position: 'absolute',
          bottom: -40,

          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            marginHorizontal: 20,
          }}
          source={{
            uri: `https://chamba.justcode.am/uploads/${user.data.avatar}`,
          }}
        />
        <Input
          ref={textInputRef}
          send
          sendCom={() => sendCommentFunction()}
          value={sendComment}
          onChange={e => setSendCommet(e)}
          width={'80%'}
          placeholder="Введите текст"
        />
      </View> */}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  block: {
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})
