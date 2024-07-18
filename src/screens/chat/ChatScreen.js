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

import {
  GifSearch,
  poweredByTenorLogoWhite,
  poweredByTenorLogoGrey,
  poweredByTenorLogoBlue,
  viaTenorLogoWhite,
  viaTenorLogoGrey,
  viaTenorLogoBlue,
  poweredByGiphyLogoGrey,
  poweredByGiphyLogoWhite
} from 'react-native-gif-search'
import { useDispatch, useSelector } from 'react-redux';
import { MsgBlock } from '../../components/MsgBlock';
import { GetSinglePageChatAction, SinglChatPageId, } from '../../store/action/action';
import { ClearChat, ClearDeletChat } from '../../store/action/clearAction';
import { InputComponent } from './component/input';
import { Header } from './component/header';
import { Sticker } from '../../assets/svg/Svgs';
import Main from '../../components/GIf/main';


export const ChatScreen = ({ navigation, route }) => {
  const bottomSheetRef = useRef(null);

  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [addToblackList, setAddToBlackList] = useState('')
  const user = useSelector(st => st.userData);
  const [page, setPage] = useState(1);
  const deletChat = useSelector((st) => st.deletChatPusher)
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [stickers, setStickers] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    // Cleanup listeners on component unmount
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

  const [data, setData] = useState([])

  useEffect(() => {
    let item = getSinglePageChat?.message.reverse()
    setData(item)
  }, [getSinglePageChat?.message])

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
          <InputComponent setAddToBlackList={(e) => setAddToBlackList(e)} addToblackList={addToblackList} route={route} />
          {/* <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
            <Sticker />
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
      <Main ref={bottomSheetRef} />
      {/* <GiphyExample /> */}
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
});