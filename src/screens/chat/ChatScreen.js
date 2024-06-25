import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import { t } from '../../components/lang';
import { useDispatch, useSelector } from 'react-redux';
import { BackArrow, EmojiIcon } from '../../assets/svg/Svgs';
import { MenuSvg } from '../../assets/svg/TabBarSvg';
import { BootomModal } from '../../components/BootomSheet';
import { MsgBlock } from '../../components/MsgBlock';
import EmojiSelector, { Categories } from 'react-native-emoji-selector'
import {
  AddBlackListAction,
  AddMsgAction,
  AddMyMSgAction,
  DelateChatAction,
  GetSinglePageChatAction,
  SinglChatPageId,
  getUserInfoAction,
  newMessageAction,
} from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { Input } from '../../ui/Input';
import { ClearChat, ClearDeletChat, ClearDeleteChat } from '../../store/action/clearAction';
import Sound from 'react-native-sound';


export const ChatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const staticdata = useSelector(st => st.static);
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const addBlackPusher = useSelector(st => st.addBlackPusher)
  const [blackListStatus, setBlackListStatus] = useState('')
  const [addToblackList, setAddToBlackList] = useState('')
  const [showInput, setShopwINput] = useState()
  const user = useSelector(st => st.userData);
  const snapPoints = useMemo(() => ['18%'], []);
  const [page, setPage] = useState(1);
  const deletChat = useSelector((st) => st.deletChatPusher)
  const [openEmoji, setOpenEmoji] = useState(false)
  const mainData = useSelector(st => st.mainData);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const [data, setData] = useState([]);
  const [sendMSg, setSendMsg] = useState('');

  const music = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });

  useEffect(() => {
    let a = addBlackPusher.addBlackListPusher?.reseiver_id == user.data.id && addBlackPusher.addBlackListPusher?.sender_id == route.params.id
    let b = addBlackPusher.addBlackListPusher?.reseiver_id == route.params.id && addBlackPusher.addBlackListPusher?.sender_id == user.data.id
    if (getSinglePageChat.blackList == 'You Blocked This User' || getSinglePageChat.blackList == 'This User Blocked You' || a || b) {
      setShopwINput(true)
    }
    if (addBlackPusher.addBlackListPusher?.reseiver_id === 'black_list_delete' && addBlackPusher.addBlackListPusher?.sender_id === 'black_list_delete' && addToblackList != 'Удалить из черного списка') {
      setShopwINput(false)
    }

  }, [getSinglePageChat.data, addBlackPusher, addToblackList]);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setOpenEmoji(false)
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {

      }
    );

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (getSinglePageChat.blackList == 'You Blocked This User') {
      setBlackListStatus('Пользователь в черном списке')
      setAddToBlackList('Удалить из черного списка')
    }
    // else if()
    else {
      setAddToBlackList(t(mainData.lang).intoablacklist)
    }
    if (getSinglePageChat.blackList === 'This User Blocked You') {
      setBlackListStatus('Вы в черном списке')
    }
  }, [getSinglePageChat.data])

  useEffect(() => {
    setData(getSinglePageChat?.message);
  }, [getSinglePageChat.message])

  useEffect(() => {
    if (Object.keys(deletChat.deletChatPusher).length) {
      if (deletChat.deletChatPusher.reseiver_id == user.data.id && deletChat.deletChatPusher.sender_id == route.params.id) {
        navigation.goBack()
        dispatch(ClearDeletChat())
      }
    }
  }, [deletChat.deletChatPusher])


  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(SinglChatPageId(route.params.id, user.data.id))
      dispatch(ClearDeletChat())
      if (page == 1) {
        dispatch(ClearChat())
        dispatch(
          GetSinglePageChatAction(
            {
              receiver_id: route.params.id,
            },
            staticdata.token,
            page,
          ),
        );
      }
    });
    return unsubscribe;
  }, [navigation]);
  const sendMsgFunction = () => {
    music.play()
    setTimeout(() => {
      music.stop()
    }, 2000);
    dispatch(
      newMessageAction(
        {
          message: sendMSg,
          receiver_id: route.params.id,

        },
        staticdata.token,
      ),
    );
    setSendMsg('')

  };


  useEffect(() => {
    if (page != 1) {

      dispatch(
        GetSinglePageChatAction(
          {
            receiver_id: route.params.id,
          },
          staticdata.token,
          page,
        ),
      );
    }
  }, [page]);
  const addToBlackList = () => {
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ 'user_id': route.params.id }, staticdata.token))
    if (addToblackList == 'В черный список') {
      setAddToBlackList('Удалить из черного списка')
      setBlackListStatus('Пользователь в черном списке')
    }
    else {
      setAddToBlackList('В черный список')
    }
  }

  useEffect(() => {
    if (getSinglePageChat.delateChatStatus) {
      bottomSheetRef.current?.close();
      dispatch(ClearDeleteChat())
      // navigation.goBack()
    }
  }, [getSinglePageChat.delateChatStatus])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(getUserInfoAction(staticdata.token))
    });
    return unsubscribe;
  }, [navigation]);

  if (getSinglePageChat.loading) {
    return <View style={Styles.loading}>
      <ActivityIndicator size="large" color="#FFC24B" />
    </View>
  }
  return (
    <SafeAreaView style={{ paddingHorizontal: 15, height: '100%' }}>
      <View
        style={[
          Styles.flexSpaceBetween,
          { marginVertical: 20, marginBottom: 30 },
        ]}>
        <View style={Styles.flexAlignItems}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <View style={[{ marginHorizontal: 20 }, Styles.flexAlignItems]}>
            <Image
              style={styles.img}
              source={{
                uri: `https://chamba.digiluys.com/uploads/${getSinglePageChat.resiverUser.avatar}`,
              }}
            />
            <View style={{ marginHorizontal: 20 }}>
              <Text style={Styles.darkMedium14}>
                {getSinglePageChat.resiverUser.nickname}
              </Text>
              <Text style={Styles.balihaiMedium13}>
                @{getSinglePageChat.resiverUser.name}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'flex-end' }} onPress={() => handlePresentModalPress()}>
          <MenuSvg />
        </TouchableOpacity>
      </View>
      <FlatList
        snapToEnd
        inverted={true}
        showsVerticalScrollIndicator={false}
        data={data}
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
      {/* </TouchableWithoutFeedback> */}
      <View>
        {!showInput && addToblackList == 'В черный список'
          ? <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 10,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{
              position: 'absolute',
              right: 50,
              height: 23,
              width: 23,
              zIndex: 999
            }}>
              <TouchableOpacity onPress={() => {
                setOpenEmoji(true)
                Keyboard.dismiss()
              }}>
                <EmojiIcon />
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%' }}>
              <Input
                msg
                pdR={50}
                placeholder={'Введите текст'}
                data={sendMSg}
                onChange={e => setSendMsg(e)}
                width={'100%'}
                sendMsg={() => sendMsgFunction()}
              />
              {openEmoji && <View style={{ width: '100%', height: 300, zIndex: 9999, backgroundColor: 'white' }}>
                <EmojiSelector columns={10} onEmojiSelected={emoji => {
                  {

                    setSendMsg(sendMSg + emoji)
                  }
                }} />
              </View>}
            </View>
          </View> :
          <View style={{ marginBottom: 20, justifyContent: 'center' }}>
            <Text style={[Styles.balihaiMedium14, { textAlign: 'center' }]}>{blackListStatus}</Text>
          </View>
        }
      </View>
      <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{ paddingHorizontal: 20 }}>
          {data.length > 0 && <TouchableOpacity
            onPress={() => {
              dispatch(DelateChatAction({ receiver_id: route.params.id, }, staticdata.token))
              navigation.goBack()
            }}
            style={{ marginBottom: 20, marginTop: 20 }}>
            <Text style={Styles.darkRegular14}>Удалить переписку</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => addToBlackList()}>
            <Text style={Styles.darkRegular14}>{addToblackList}</Text>
          </TouchableOpacity>
        </View>
      </BootomModal>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  img: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
});
