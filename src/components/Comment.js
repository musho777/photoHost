import { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { HeaderWhiteTitle } from '../headers/HeaderWhiteTitle.';
import { Styles } from '../styles/Styles';
import { CommentBlock } from './CommentBlock';
import { Input } from '../ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AddCommentAction, DeletComment, GelPostCommentsAction } from '../store/action/action';
import { ClearSinglpAgeComment } from '../store/action/clearAction';
export const Comments = ({ visible, close, parentId, userImg, userName, description }) => {
  const [sendComment, setSendCommet] = useState('');
  const [parenId, setParentId] = useState(null);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState(1);
  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const [senderName, setSenderNAme] = useState('')
  const getComments = useSelector(st => st.getComments);
  const textInputRef = useRef(null);
  const flatListRef = useRef(null);

  const [data, setData] = useState([]);
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) {
      dispatch(ClearSinglpAgeComment())
      dispatch(GelPostCommentsAction({ post_id: parentId }, staticdata.token, 1));
    }
  }, [visible]);

  const sendCommentFunction = () => {
    let send = sendComment
    if (senderName) {
      let regex = new RegExp(senderName, "gi");
      send = send.replace(regex, "");
    }
    dispatch(
      AddCommentAction(
        {
          comment: send,
          parent_id: parenId,
          post_id: parentId,
        },
        staticdata.token,
        { post_id: parentId }
      ),
    )
    setParentId(null)

    if (!parenId) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
    setSendCommet('')
  };


  const deletComment = (id) => {
    dispatch(DeletComment({ comment_id: id }, staticdata.token, { post_id: parentId }))
  }


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
    // let daysAgo = (timeDifference / (1000 * 60 * 60 * 24))
    // if (+daysAgo < 1) {
    //   daysAgo = daysAgo * 24
    //   if (daysAgo <= 1) {
    //     daysAgo = Math.floor(daysAgo * 60) + 'минут назад'
    //     if (daysAgo == '0минут назад' || daysAgo[0] == '-') {
    //       daysAgo = 'только что'
    //     }
    //   }
    //   else {
    //     daysAgo = Math.floor(daysAgo) + 'часов назад'
    //   }
    // }
    // else {
    //   daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + ' дней назад';
    // }
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
    daysAgo = `${dayOfMonth} ${mounth[Mounth]} в ${hour}:${minute}`
    return (
      <View style={{ marginVertical: 20 }}>
        <CommentBlock
          text={item.comment}
          replay={item.replay}
          user={item.user}
          like_count={item.likes_count}
          isLiked={item.like_auth_user?.length}
          id={item.id}
          token={staticdata.token}
          owner={false}
          daysAgo={daysAgo}
          replay_count={item.replay_count}
          deletComment={(e) => { deletComment(e) }}
          onPressAnsswer={(e) => {
            Answer(e)
          }}
        />
      </View >
    );
  };
  return (

    <ScrollView keyboardShouldPersistTaps="handled">
      <Modal animationType="slide" visible={visible}>
        <HeaderWhiteTitle onPress={() => close()} title={'Комментарии'} />
        <View style={{ height: '86%', justifyContent: 'space-between' }}>

          <View style={{ paddingHorizontal: 10, height: '100%' }}>
            {/* <View
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
            </View> */}
            <View style={{ height: '97%' }}>
              <FlatList
                ref={flatListRef}
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
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 3
            }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 50, marginHorizontal: 10 }}
              source={{
                uri: `https://chamba.justcode.am/uploads/${user.data.avatar}`,
              }}
            />
            <Input
              ref={textInputRef}
              pdR={50}
              send
              sendCom={() => sendCommentFunction()}
              value={sendComment}
              onChange={e => setSendCommet(e)}
              width={'83%'}
              placeholder=" Оставьте комментарий"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
