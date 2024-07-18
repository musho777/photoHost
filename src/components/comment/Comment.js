import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  Platform,
} from 'react-native';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { Styles } from '../../styles/Styles';
import { CommentBlock } from '../CommentBlock';
import { t } from '../lang';
import { useDispatch, useSelector } from 'react-redux';
import { DeletComment, GelPostCommentsAction } from '../../store/action/action';
import { ClearSinglpAgeComment } from '../../store/action/clearAction';
import { useNavigation } from '@react-navigation/native';
import { InputComponent } from './component/input';


const screenWidth = Dimensions.get('window').height;
export const Comments = ({ route, }) => {
  console.log(screenWidth, 'screenWidth')
  let parentId = route?.params?.parentId
  const [sendComment, setSendCommet] = useState('');
  const [parenId, setParentId] = useState(null);
  const staticdata = useSelector(st => st.static);
  const [page, setPage] = useState(1);
  const [keyboardOpen, setKeyboardOpen] = useState(10);

  const mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const [senderName, setSenderNAme] = useState('')
  const getComments = useSelector(st => st.getComments);
  const textInputRef = useRef(null);
  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()

  const [data, setData] = useState([]);
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(60);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(10);
    });

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(ClearSinglpAgeComment())
    dispatch(GelPostCommentsAction({ post_id: parentId }, staticdata.token, 1));
  }, []);

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

  const Refresh = () => {
    dispatch(GelPostCommentsAction({ post_id: parentId }, staticdata.token, 1));
  }
  const onEndReached = () => {
    if (getComments?.nextPage) {
      let p = page + 1;
      dispatch(
        GelPostCommentsAction(
          { post_id: parentId },
          staticdata.token,
          p));
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


  const renderItem = ({ item, index }) => {
    const currentDate = new Date();
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
      <View style={{ marginVertical: 10, }}>
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

    <SafeAreaView>
      <HeaderWhiteTitle onPress={() => navigation.goBack()} title={t(mainData.lang).comments} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={<RefreshControl refreshing={getComments?.loading} onRefresh={() => Refresh()} />}
          data={data}
          enableEmptySections={true}
          ListEmptyComponent={() => Empty()}
          renderItem={renderItem}
          onEndReached={() => { onEndReached() }}
        />
        <View style={{ marginBottom: keyboardOpen }}>
          <InputComponent setParentId={(e) => setParentId(e)} parentId={parentId} parenId={parenId} sendComment={sendComment} setSendCommet={(e) => setSendCommet(e)} senderName={senderName} user={user} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',

  },
  keyboardAvoidingView: {
    height: screenWidth - 80,
    width: '100%',
    paddingHorizontal: 10
  },
  scrollViewContent: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});