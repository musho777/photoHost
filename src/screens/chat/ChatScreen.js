import { useState, useEffect, useRef } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
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
const { height, width } = Dimensions.get('window');


export const ChatScreen = ({ route }) => {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [addToblackList, setAddToBlackList] = useState('')
  const user = useSelector(st => st.userData);

  const music = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error) => { });
  const staticdata = useSelector(st => st.static);
  const [seleted, setSelected] = useState([])
  const [askdelateModal, setAskDelateModal] = useState(false)
  const [openSelet, setOpenSelect] = useState(false)
  const [date, setDate] = useState(undefined)

  const monthsInRussian = [
    "Январь",   // January
    "Февраль",  // February
    "Март",     // March
    "Апрель",   // April
    "Май",      // May
    "Июнь",     // June
    "Июль",     // July
    "Август",   // August
    "Сентябрь", // September
    "Октябрь",  // October
    "Ноябрь",   // November
    "Декабрь"   // December
  ];


  const [lastItem, setLastImte] = useState({})

  useEffect(() => {
    const date = new Date(lastItem.updated_at);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (day && month)
      setDate(`${day} ${monthsInRussian[month]}`)
  }, [lastItem])


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
    if (getSinglePageChat.message.length - seleted.length == 0) {
      setAskDelateModal(true)
    }
    else {
      setAskDelateModal(false)
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={1} style={[styles.body]}>
          {date && <View style={styles.date}>
            <Text style={Styles.darkMedium12}>{date}</Text>
          </View>}
          {!openSelet ?
            <Header askdelateModal={askdelateModal} user={user} route={route} setAddToBlackList={(e) => setAddToBlackList(e)} data={getSinglePageChat?.message} /> :
            <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
              <Text onPress={() => setSelected(false)} style={Styles.darkMedium12}>Отменить</Text>
              <TouchableOpacity disabled={!seleted.length} onPress={() => DelateMessage()} >
                <Text style={[Styles.darkMedium12, { color: seleted.length > 0 ? 'red' : '#adadad', }]}>Удалить</Text>
              </TouchableOpacity>
            </View>
          }
          <Messages
            setLastImte={(e) => setLastImte(e)}
            setOpenSelect={(e) => setOpenSelect(e)}
            openSelet={openSelet} seleted={seleted}
            setSelected={(e) => setSelected(e)}
            id={route.params.chatId}
            route={route}
          />
        </TouchableOpacity >
        <BottomWrapper ref={bottomSheetRef} setAddToBlackList={(e) => setAddToBlackList(e)} addToblackList={addToblackList} route={route} />
        <Main SendSticker={(e) => SendSticker(e)} route={route} ref={bottomSheetRef} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "95%"
    // paddingBottom: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 50,
    maxWidth: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(201,201,201,0.5)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    left: '40%',
    margin: 'auto',
    display: 'flex',
    zIndex: 999999999999,
  }
});