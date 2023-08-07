import {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {HeaderWhiteTitle} from '../headers/HeaderWhiteTitle.';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';
import {CommentBlock} from './CommentBlock';
import {Input} from '../ui/Input';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AddCommentAction, GelPostCommentsAction} from '../store/action/action';

export const Comments = ({visible, close, parentId,userImg,userName,description}) => {
  const [showAnswrs, setShowAnswers] = useState(false);
  const [sendComment, setSendCommet] = useState('');
  const [parenId, setParentId] = useState(null);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState(1);
  const getComments = useSelector(st => st.getComments);
  const [data, setData] = useState([]);
  const user = useSelector(st => st.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      dispatch(GelPostCommentsAction({post_id: parentId}, staticdata.token, 1));
    }
  }, [visible]);

  const sendCommentFunction = () => {
    dispatch(
      AddCommentAction(
        {
          comment: sendComment,
          parent_id: parenId,
          post_id: parentId,
        },
        staticdata.token,
      ),
    );
  };
  console.log(getComments.data);
  useEffect(() => {
    setData(getComments.data);
  }, [getComments.data]);
  const renderItem = ({item, index}) => {
    return (
      <View style={{marginVertical: 20}}>
        <CommentBlock 
          text={item.comment} 
          replay = {item.replay} 
          user = {item.user} 
          like_count = {item.likes_count}
          isLiked = {item.like_auth_user.length} 
          id = {item.id}
          token = {staticdata.token}
          owner = {false}
        />
        {showAnswrs && <CommentBlock ansswer text={'☺'} />}
        <TouchableOpacity onPress={() => setShowAnswers(!showAnswrs)}>
          <Text
            style={[Styles.balihaiMedium9, {marginLeft: 70, marginTop: 20}]}>
            {showAnswrs ? 'Скрыть ответы' : 'Смотреть ещё 1 ответа'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <Modal animationType="slide" visible={visible}>
        <HeaderWhiteTitle onPress={() => close()} title={'Комментарии'} />
        <View style={{paddingHorizontal: 15, height: '90%'}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: AppColors.PattenseBlue_Color,
              paddingBottom: 25,
            }}>
            <CommentBlock
              ownerName={userName}
              text={description}
              owner = {true}
              userImg = {userImg}
            />
          </View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={getComments?.loading}
                onRefresh={() => {
                  dispatch(
                    GelPostCommentsAction(
                      {post_id: parentId},
                      staticdata.token,
                      1,
                    ),
                  );
                }}
              />
            }
            data={data}
            enableEmptySections={true}
            ListEmptyComponent={() =>
              !getComments?.loading && (
                <Text
                  style={[
                    Styles.darkMedium16,
                    {marginTop: 40, textAlign: 'center'},
                  ]}>
                  Черный список пуст
                </Text>
              )
            }
            renderItem={renderItem}
            onEndReached={() => {
              if (getComments?.nextPage) {
                let p = page + 1;
                dispatch(
                  GelPostCommentsAction(
                    {post_id: parentId},
                    staticdata.token,
                    p,
                  ),
                );
                setPage(p);
              }
            }}
          />
          <View>
            <View
              style={{
                position: 'absolute',
                bottom: 30,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 40, height: 40, borderRadius: 50}}
                source={require('../assets/img/user.png')}
              />
              <Input
                send
                sendCom={() => sendCommentFunction()}
                value={sendComment}
                onChange={e => setSendCommet(e)}
                width={'80%'}
                placeholder="Введите текст"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
