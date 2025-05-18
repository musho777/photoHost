import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { CommentBlock } from './component/CommentBlock';
import { t } from '../lang';
import { useDispatch, useSelector } from 'react-redux';
import { AddCommentAction, DelateCommentLocal, DeletComment, GelPostCommentsAction, GetMusic } from '../../store/action/action';
import { ClearSinglpAgeComment } from '../../store/action/clearAction';
import Main from '../GIf/main';
import { Emojy, Nota, SendMsgSvg, Sticker } from '../../assets/svg/Svgs';
import EmojiPicker from 'rn-emoji-keyboard';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { MusicPlay } from './component/musicPlay';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AppColors } from '../../styles/AppColors';



export const Comments = ({ commentData, CommentCount = () => { } }) => {
  let { parentId } = commentData
  let { categoryId } = commentData
  const [sendComment, setSendCommet] = useState('');
  const [parenId, setParentId] = useState(null);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState(1);
  const bottomSheetRef = useRef(null);
  const bottomSheetRef1 = useRef(null);
  const getSound = useSelector((st) => st.getSound)

  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const [senderName, setSenderNAme] = useState('')
  const getComments = useSelector(st => st.getComments);
  const textInputRef = useRef(null);
  const mainData = useSelector(st => st.mainData);

  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    dispatch(GetMusic(categoryId, staticdata.token))
  }, [staticdata.token, categoryId])


  useEffect(() => {
    dispatch(ClearSinglpAgeComment())
    dispatch(GelPostCommentsAction({ post_id: parentId }, staticdata.token, 1));
  }, []);


  const deletComment = (id, parent_id) => {
    CommentCount(false)
    dispatch(DelateCommentLocal({ id: parentId, comment_id: id, parent_id: parent_id, }))
    dispatch(DeletComment({ comment_id: id }, staticdata.token))
  }


  const Answer = (e) => {
    setParentId(e.id)
    setSendCommet(e.name + ":")
    setSenderNAme(e.name + ":")
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }



  const onEndReached = () => {
    if (getComments?.nextPage) {
      let p = page + 1;
      dispatch(GelPostCommentsAction({ post_id: parentId }, staticdata.token, p));
      setPage(p);
    }
  }


  const sendCommentFunction = (sticker) => {
    const date = new Date();
    const isoDate = date.toISOString().replace('Z', '') + '000Z';
    let send = ''
    if (sticker) {
      send = sticker
      bottomSheetRef.current?.close()
    }
    else {
      send = sendComment
    }
    if (senderName) {
      let regex = new RegExp(senderName, "gi");
      send = send.replace(regex, "");
    }
    bottomSheetRef1.current?.close()
    if (send) {
      CommentCount(true)
      dispatch(
        AddCommentAction(
          {
            comment: send,
            parent_id: parenId,
            post_id: parentId,
          }, staticdata.token,
          {
            comment: send,
            parent_id: parenId,
            post_id: parentId,
            created_at: isoDate,
            like_auth_user: [],
            likes_count: 0,
            replay: [],
            replay_count: 0,
            user: user.allData.data,
          }
        ))
    }
    setParentId(null)
    setSendCommet('')
  };

  const handlePick = (e) => {
    setSendCommet(sendComment + e.emoji)
  }

  const renderItem = ({ item, index }) => {
    const currentDate = new Date(item.created_at);
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
      <View style={{ marginBottom: 10 }}>
        <CommentBlock
          key={index}
          text={item.comment}
          categoryID={categoryId}
          replay={item.replay}
          user={item.user}
          like_count={item.likes_count}
          isLiked={item.like_auth_user?.length}
          id={item?.id}
          token={staticdata.token}
          owner={item.user.id == user.allData?.data?.id}
          daysAgo={daysAgo}
          replay_count={item.replay_count}
          deletComment={(id, parent_id) => { deletComment(id, parent_id) }}
          onPressAnsswer={(e) => { Answer(e) }}
        />
      </View >
    );
  };

  return (
    <View style={styles.body}>
      <View style={{ paddingHorizontal: 15 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getComments.data}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.scrollViewContent}
          onEndReached={() => { onEndReached() }}
          renderItem={renderItem}
          accessible={false}
          refreshControl={
            <RefreshControl
              refreshing={getComments?.loading}
              onRefresh={() => {
                if (getComments?.loading) {
                  dispatch(GelPostCommentsAction({ post_id: parentId }, staticdata.token, 1));
                }
              }}
            />
          }
        />
        <View style={styles.bottom}>
          <View style={{ width: getSound.data.length ? "70%" : "70%" }}>
            <BottomSheetTextInput
              style={styles.Input}
              placeholder={t(mainData.lang).Leaveacomment}
              placeholderTextColor={AppColors.BaliHai_Color}
              value={sendComment}
              ref={textInputRef}
              onChangeText={e => setSendCommet(e)}
              multiline
            />
            <View style={[Styles.flexAlignItems, styles.eye, { height: '100%' }]}>
              <TouchableOpacity onPress={() => sendCommentFunction()}>
                <SendMsgSvg />
              </TouchableOpacity>
            </View>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap:getSound.data.length ? 5:15 }}>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <Emojy />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
              <Sticker />
            </TouchableOpacity>
            {getSound.data.length > 0 && <TouchableOpacity onPress={() => bottomSheetRef1.current?.present()}>
              <Nota />
            </TouchableOpacity>}
          </View>
          <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
        </View>
        <Main SendSticker={(e) => sendCommentFunction(e)} ref={bottomSheetRef} />
      </View>
      <MusicPlay categoryID={categoryId} ref={bottomSheetRef1} onSend={(e) => sendCommentFunction(e)} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    paddingTop: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  Input: {
    backgroundColor: AppColors.AliceBlue_Color,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingRight: 45,
    color: AppColors.Blcak_Color,
    position: 'relative',
    height: 40,
    width: '100%',
    paddingTop: 12
  },
  eye: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    height: '70%',
  },
});