import { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { MsgBlock } from '../../components/MsgBlock';
import { GetSinglePageChatAction, newMessageAction, SinglChatPageId, } from '../../store/action/action';
import { ClearChat, ClearDeletChat } from '../../store/action/clearAction';
import { InputComponent } from './component/input';
import { Header } from './component/header';
import { Emojy, Sticker } from '../../assets/svg/Svgs';
import Main from '../../components/GIf/main';
import Sound from 'react-native-sound';
import EmojiPicker from 'rn-emoji-keyboard'


export const ChatScreen = ({ navigation, route }) => {
  const bottomSheetRef = useRef(null);


  const dispatch = useDispatch();
  const music = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error) => { });

  const staticdata = useSelector(st => st.static);
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [addToblackList, setAddToBlackList] = useState('')
  const user = useSelector(st => st.userData);
  const [page, setPage] = useState(1);
  const deletChat = useSelector((st) => st.deletChatPusher)
  const [data, setData] = useState([])
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [sendMSg, setSendMsg] = useState('');


  const handlePick = (e) => {
    setSendMsg(sendMSg + e.emoji)
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  useEffect(() => {
    if (Object.keys(deletChat.deletChatPusher).length) {
      if (deletChat.deletChatPusher.reseiver_id == user.data.id && deletChat.deletChatPusher.sender_id == route.params.id) {
        navigation.goBack()
        dispatch(ClearDeletChat())
      }
    }
  }, [deletChat.deletChatPusher])


  useEffect(() => {
    dispatch(GetSinglePageChatAction({ receiver_id: route.params.id }, staticdata.token, page,),);
  }, [page]);

  useEffect(() => {
    dispatch(SinglChatPageId(route.params.id, user.data.id))
    dispatch(ClearDeletChat())
    dispatch(ClearChat())
  }, [])


  useEffect(() => {
    let item = getSinglePageChat?.message.reverse()
    setData(item)
  }, [getSinglePageChat?.message])

  const SendSticker = (e) => {
    music.play()
    setTimeout(() => {
      music.stop()
    }, 2000);
    dispatch(
      newMessageAction({ message: e, receiver_id: route.params.id }, staticdata.token));
    bottomSheetRef.current?.close()

  }

  return (
    <SafeAreaView style={styles.body}>
      <Header user={user} route={route} setAddToBlackList={(e) => setAddToBlackList(e)} data={getSinglePageChat?.message} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <FlatList
          snapToEnd
          inverted={false}
          showsVerticalScrollIndicator={false}
          data={data}
          contentContainerStyle={styles.scrollViewContent}
          onEndReached={() => {
            if (getSinglePageChat.nextPage && !getSinglePageChat.loading) {
              setPage(page + 1);
            }
          }}
          renderItem={({ item }) => {
            return (
              <MsgBlock
                timestamp={item.created_at}
                msg={item.message}
                from={item.sender_id != user.data.id}
              />
            );
          }}
        />
        <View style={{ marginBottom: !keyboardOpen ? 10 : 60, width: '100%', paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <InputComponent sendMSg={sendMSg} setSendMsg={(e) => setSendMsg(e)} setAddToBlackList={(e) => setAddToBlackList(e)} addToblackList={addToblackList} route={route} />
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
      </KeyboardAvoidingView>
      <Main setSelected={(e) => SendSticker(e)} route={route} ref={bottomSheetRef} />
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
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    objectFit: 'contain',
    width: 200
  },
});