import { useState, useEffect, useRef, useCallback } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { newMessageAction, SinglChatPageId, } from '../../store/action/action';
import { ClearChat, ClearDeletChat } from '../../store/action/clearAction';
import { Header } from './component/header';
import Main from '../../components/GIf/main';
import { BottomWrapper } from './component/bottomWrapper';
import { Messages } from './component/Messages';
import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';


export const ChatScreen = ({ route }) => {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [addToblackList, setAddToBlackList] = useState('')
  const user = useSelector(st => st.userData);

  const music = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error) => { });
  const staticdata = useSelector(st => st.static);


  useEffect(() => {
    dispatch(SinglChatPageId(route.params.id, user.data.id))
    dispatch(ClearDeletChat())
    dispatch(ClearChat())
  }, [])


  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setTranslucent(false);
    }, [])
  );

  const SendSticker = (e) => {
    music.play()
    setTimeout(() => {
      music.stop()
    }, 2000);
    dispatch(newMessageAction({ message: e, receiver_id: route.params.id }, staticdata.token));
    bottomSheetRef.current?.close()
  }

  return (
    <SafeAreaView style={styles.body}>
      <Header user={user} route={route} setAddToBlackList={(e) => setAddToBlackList(e)} data={getSinglePageChat?.message} />
      <Messages id={route.params.chatId} route={route} />
      <BottomWrapper ref={bottomSheetRef} setAddToBlackList={(e) => setAddToBlackList(e)} addToblackList={addToblackList} route={route} />
      <Main SendSticker={(e) => SendSticker(e)} route={route} ref={bottomSheetRef} />
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});