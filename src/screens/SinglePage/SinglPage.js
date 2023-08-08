import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddBlackListAction,
  AddInBookAction,
  GelPostCommentsAction,
  GetSinglPostAction,
  LikePostAction,
} from '../../store/action/action';
import {Styles} from '../../styles/Styles';
import {BootomModal} from '../../components/BootomSheet';
import {BackArrow, NotLineSvg} from '../../assets/svg/Svgs';
import {Comment, Heart, MenuSvg, ViewSvg} from '../../assets/svg/TabBarSvg';
import {Slider} from '../../components/Slider';
import {CommentItem} from '../../components/CommentItem';
import { CommentBlock } from '../../components/CommentBlock';
import { Comments } from '../../components/Comment';

export const SinglPageScreen = ({route, navigation}) => {
  const staticdata = useSelector(st => st.static);
  const singlData = useSelector(st => st.getSinglPage);
  const user = useSelector((st)=>st.userData)
  const [book, setBook] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const [comment,setComment] = useState(false)

  const id = route.params.id;
  const bottomSheetRef = useRef(null);
  const getComments = useSelector(st => st.getComments);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const snapPoints = useMemo(() => ['30%'], []);

  const LikePost = () => {
    if (isLiked) {
      setLikedCount(likedCount - 1);
    } else {
      setLikedCount(likedCount + 1);
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
    dispatch(AddBlackListAction({user_id: user.data.id}, staticdata.token));
  };

  const addToBook = () => {
    bottomSheetRef.current?.close();
    dispatch(AddInBookAction({post_id: id}, staticdata.token));
    setBook(!book);
  };

  useEffect(() => {
    dispatch(GelPostCommentsAction({post_id: id}, staticdata.token));
    dispatch(GetSinglPostAction({post_id: id}, staticdata.token));
  }, []);

  useEffect(()=>{
    if(singlData.data){
        setIsLiked(singlData.data.like_auth_user)
    }
  },[singlData])

  if (singlData.loading) {
    return (
      <View style={Styles.loading}>
        <ActivityIndicator size="large" color="#FFC24B" />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            Styles.flexSpaceBetween,
            {paddingHorizontal: 20, marginTop: 20},
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePresentModalPress()}
            style={{marginTop: -5, paddingLeft: 15}}>
            <MenuSvg />
          </TouchableOpacity>
        </View>

        <View>
          <Slider single photo={singlData.data.photo} />
          <View style={{paddingHorizontal: 20}}>
            <View style={Styles.flexSpaceBetween}>
              <View style={Styles.flexAlignItems}>
                <View style={[Styles.flexAlignItems, {marginRight: 15}]}>
                  <TouchableOpacity
                    onPress={() => {
                      LikePost();
                    }}>
                    {isLiked ? <Heart /> : <NotLineSvg />}
                  </TouchableOpacity>
                  <Text style={[Styles.darkMedium14, {marginLeft: 5}]}>
                    {singlData.data.like_count}
                  </Text>
                </View>
                <View style={[Styles.flexAlignItems, {marginRight: 15}]}>
                  <TouchableOpacity onPress={() => setComment(true)}>
                    <Comment />
                  </TouchableOpacity>
                  <Text style={[Styles.darkMedium14, {marginLeft: 5}]}>
                    {singlData.data.comment_count}
                  </Text>
                </View>
              </View>
              <View>
                <View style={Styles.flexAlignItems}>
                  <ViewSvg />
                  <Text style={[Styles.balihaiRegular14, {marginLeft: 5}]}>
                    {singlData.data.view_count}
                  </Text>
                </View>
              </View>
            </View>
            <View
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
            </View>
            <View style={{marginVertical: 20}}>
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
          </View>
        </View>


        <Comments 
            userName = {singlData.data.user?.name}
            userImg = {singlData.data.user?.avatar}
            description = {singlData.data.description}
            parentId= {id} 
            visible={comment} 
            close = {()=>setComment(false)}
        />


        <View style={{position: 'absolute'}}>
          <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                style={{marginBottom: 20, marginTop: 20}}
                onPress={() => addToBook()}>
                <Text style={Styles.darkRegular14}>
                  {book ? 'Удалить из закладок' : 'В закладки'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginBottom: 20}}>
                <Text style={Styles.darkRegular14}>Подписаться</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() => addToBlackList()}>
                <Text style={Styles.darkRegular14}>В чёрный список</Text>
              </TouchableOpacity>
              {user?.data?.id == singlData?.data?.user?.id && <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() => {
                  bottomSheetRef.current?.close();
                  navigation.navigate('EditPostScreen',{description:singlData.data.description,id:singlData.data.id})
                }}>
                <Text style={Styles.darkRegular14}>Редактировать</Text>
              </TouchableOpacity>}
            </View>
          </BootomModal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Редактировать