import { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
import { CommentBlock } from './CommentBlock';
import { Input } from '../ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AddCommentAction, GelPostCommentsAction } from '../store/action/action';

export const Comments = ({ visible, close, parentId, userImg, userName, description }) => {
  const [sendComment, setSendCommet] = useState('');
  const [parenId, setParentId] = useState(null);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState(1);
  const [senderName, setSenderNAme] = useState('')
  const getComments = useSelector(st => st.getComments);
  const textInputRef = useRef(null);

  const [data, setData] = useState([]);
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) {
      dispatch(GelPostCommentsAction({ post_id: parentId }, staticdata.token, 1));
    }
  }, [visible]);

  const sendCommentFunction = () => {
    let item = [...data]
    let send = sendComment
    if (senderName) {
      let regex = new RegExp(senderName, "gi");
      send = originalString.replace(regex, "");
    }
    dispatch(
      AddCommentAction(
        {
          comment: send,
          parent_id: parenId,
          post_id: parentId,
        },
        staticdata.token,
      ),
    );
    setParentId(null)
    dispatch(
      GelPostCommentsAction(
        { post_id: parentId },
        staticdata.token,
        1,
      ),
    );
    setSendCommet('')
  };


  useEffect(() => {
    setData(getComments.data);
  }, [getComments.data]);


  const Answer = (e) => {
    setParentId(e.id)
    setSendCommet(e.name + ":")
    setSenderNAme(e.name + ":")
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }

  const renderItem = ({ item, index }) => {
    const givenDate = new Date(item.created_at);
    const currentDate = new Date();
    const timeDifference = currentDate - givenDate;
    let daysAgo = (timeDifference / (1000 * 60 * 60 * 24))
    if (+daysAgo < 1) {
      daysAgo = daysAgo * 24
      if (daysAgo <= 1) {
        daysAgo = Math.floor(daysAgo * 60) + 'минут назад'
      }
      else {
        daysAgo = Math.floor(daysAgo) + 'часов назад'
      }
    }
    else {
      daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + ' дней назад';
    }
    return (
      <View style={{ marginVertical: 20 }}>
        <CommentBlock
          text={item.comment}
          replay={item.replay}
          user={item.user}
          like_count={item.likes_count}
          isLiked={item.like_auth_user.length}
          id={item.id}
          token={staticdata.token}
          owner={false}
          daysAgo={daysAgo}
          replay_count={item.replay_count}
          onPressAnsswer={(e) => {
            Answer(e)
          }}
        />

      </View>
    );
  };
  return (
    <View>
      <Modal animationType="slide" visible={visible}>
        <HeaderWhiteTitle onPress={() => close()} title={'Комментарии'} />
        <View style={{ paddingHorizontal: 15, height: '90%' }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: AppColors.PattenseBlue_Color,
              paddingBottom: 25,
            }}>
            <CommentBlock
              ownerName={userName}
              text={description}
              owner={true}
              userImg={userImg}
            />
          </View>
          <View style={{ height: '70%' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={getComments?.loading}
                  onRefresh={() => {
                    dispatch(
                      GelPostCommentsAction(
                        { post_id: parentId },
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
                      { marginTop: 40, textAlign: 'center' },
                    ]}>
                    Нет комментариев
                  </Text>
                )
              }
              renderItem={renderItem}
              onEndReached={() => {
                if (getComments?.nextPage) {
                  let p = page + 1;
                  dispatch(
                    GelPostCommentsAction(
                      { post_id: parentId },
                      staticdata.token,
                      p,
                    ),
                  );
                  setPage(p);
                }
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 20 }}
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
          </View>
        </View>
      </Modal>
    </View>
  );
};
