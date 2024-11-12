import { useState, useEffect, useRef, useCallback } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DelateMesageAction, newMessageAction, SinglChatPageId, } from '../../store/action/action';
import { ClearChat, ClearDeletChat } from '../../store/action/clearAction';
import { Header } from './component/header';
import Main from '../../components/GIf/main';
import { BottomWrapper } from './component/bottomWrapper';
import { Messages } from './component/Messages';
import Sound from 'react-native-sound';
import { Styles } from '../../styles/Styles';


export const ChatScreen = ({ route }) => {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [addToblackList, setAddToBlackList] = useState('')
  const user = useSelector(st => st.userData);

  const music = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error) => { });
  const staticdata = useSelector(st => st.static);
  const [seleted, setSelected] = useState([])


  useEffect(() => {
    dispatch(SinglChatPageId(route.params.id, user.data.id))
    dispatch(ClearDeletChat())
    dispatch(ClearChat())
  }, [])


  const SendSticker = (e) => {
    music.play()
    setTimeout(() => {
      music.stop()
    }, 2000);
    dispatch(newMessageAction({ message: e, receiver_id: route.params.id }, staticdata.token));
    bottomSheetRef.current?.close()
  }

  const DelateMessage = () => {
    setSelected([])
    dispatch(DelateMesageAction(seleted, staticdata.token))
  }

  return (
    <SafeAreaView style={[styles.body, Styles.statusBar]}>
      {!seleted.length ?
        <Header user={user} route={route} setAddToBlackList={(e) => setAddToBlackList(e)} data={getSinglePageChat?.message} /> :
        <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
          <TouchableOpacity onPress={() => DelateMessage()} >
            <Text style={[Styles.darkMedium12, { color: 'red' }]}>Удалить</Text>
          </TouchableOpacity>
          <Text onPress={() => setSelected(false)} style={Styles.darkMedium12}>Отменить</Text>
        </View>
      }
      <Messages seleted={seleted} setSelected={(e) => setSelected(e)} id={route.params.chatId} route={route} />
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