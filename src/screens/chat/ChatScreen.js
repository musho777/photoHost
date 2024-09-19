import { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClearSinglChatNumber, SinglChatPageId, } from '../../store/action/action';
import { ClearChat, ClearDeletChat } from '../../store/action/clearAction';
import { Header } from './component/header';
import Main from '../../components/GIf/main';
import { BottomWrapper } from './component/bottomWrapper';
import { Messages } from './component/Messages';


export const ChatScreen = ({ route }) => {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [addToblackList, setAddToBlackList] = useState('')
  const user = useSelector(st => st.userData);


  useEffect(() => {
    dispatch(SinglChatPageId(route.params.id, user.data.id))
    dispatch(ClearDeletChat())
    dispatch(ClearChat())
    // dispatch(ClearSinglChatNumber(route.params.chatId))
  }, [])

  return (
    <SafeAreaView style={styles.body}>
      <Header user={user} route={route} setAddToBlackList={(e) => setAddToBlackList(e)} data={getSinglePageChat?.message} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <Messages id={route.params.chatId} route={route} />
        <BottomWrapper ref={bottomSheetRef} setAddToBlackList={(e) => setAddToBlackList(e)} addToblackList={addToblackList} route={route} />
      </KeyboardAvoidingView>
      <Main route={route} ref={bottomSheetRef} />
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