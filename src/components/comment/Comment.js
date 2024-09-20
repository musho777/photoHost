import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { Styles } from '../../styles/Styles';
import { CommentBlock } from './component/CommentBlock';
import { t } from '../lang';
import { useDispatch, useSelector } from 'react-redux';
import { AddCommentAction, AddCommentInPost, DelateCommentLocal, DeletComment, GelPostCommentsAction } from '../../store/action/action';
import { ClearSinglpAgeComment } from '../../store/action/clearAction';
import { useNavigation } from '@react-navigation/native';
import { InputComponent } from './component/input';
import Main from '../GIf/main';
import { Emojy, Sticker } from '../../assets/svg/Svgs';
import EmojiPicker from 'rn-emoji-keyboard';
import { RefreshControl } from 'react-native-gesture-handler';


export const Comments = ({ route, }) => {
  let parentId = route?.params?.parentId
  const [sendComment, setSendCommet] = useState('');
  const [parenId, setParentId] = useState(null);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState(1);
  const [keyboardOpen, setKeyboardOpen] = useState(10);
  const bottomSheetRef = useRef(null);

  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const [senderName, setSenderNAme] = useState('')
  const getComments = useSelector(st => st.getComments);
  const textInputRef = useRef(null);
  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()

  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  console.log(getComments.addCommentLoading)



  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (Platform.OS == 'android') {
        setKeyboardOpen(60);
      }
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(10);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(ClearSinglpAgeComment())
    dispatch(GelPostCommentsAction({ post_id: parentId }, staticdata.token, 1));
  }, []);

  const deletComment = (id, parent_id) => {
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

  const Empty = () => {
    if (!getComments?.loading) {
      return <Text
        style={[
          Styles.darkMedium16,
          { marginTop: 40, textAlign: 'center' },
        ]}>
        {t(mainData.lang).Nocomments}
      </Text>
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
          replay={item.replay}
          user={item.user}
          like_count={item.likes_count}
          isLiked={item.like_auth_user?.length}
          id={item.id}
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
    <SafeAreaView style={styles.body}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <HeaderWhiteTitle onPress={() => navigation.goBack()} title={t(mainData.lang).comments} />
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getComments.data}
            contentContainerStyle={styles.scrollViewContent}
            onEndReached={() => { onEndReached() }}
            ListEmptyComponent={() => Empty()}
            renderItem={renderItem}
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
          <View style={{ marginBottom: keyboardOpen, width: '100%', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <InputComponent
              sendCommentFunction={() => sendCommentFunction()}
              sendComment={sendComment}
              setSendCommet={(e) => setSendCommet(e)}
              user={user}
            />
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
                <Sticker />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsOpen(true)}>
                <Emojy />
              </TouchableOpacity>
            </View>
            <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
          </View>
          <Main SendSticker={(e) => sendCommentFunction(e)} ref={bottomSheetRef} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});