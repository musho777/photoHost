import { Text, View } from "react-native"
import { Input } from "../../../ui/Input"
import { useEffect, useState } from "react"
import Sound from "react-native-sound"
import { useDispatch, useSelector } from "react-redux"
import { newMessageAction } from "../../../store/action/action"
import { t } from '../../../components/lang';
import { Styles } from "../../../styles/Styles"


export const InputComponent = ({ sendMSg, setSendMsg, setAddToBlackList, addToblackList, route }) => {
  const music = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error) => { });
  const dispatch = useDispatch()
  const [showInput, setShopwINput] = useState()
  let getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const addBlackPusher = useSelector(st => st.addBlackPusher)
  const user = useSelector(st => st.userData);
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);
  const [blackListStatus, setBlackListStatus] = useState()


  useEffect(() => {
    let a = addBlackPusher.addBlackListPusher?.reseiver_id == user.data.id && addBlackPusher.addBlackListPusher?.sender_id == route.params.id
    let b = addBlackPusher.addBlackListPusher?.reseiver_id == route.params.id && addBlackPusher.addBlackListPusher?.sender_id == user.data.id
    if (getSinglePageChat.blackList == 'You Blocked This User' || a || b) {
      setShopwINput(true)
      setBlackListStatus('Пользователь в черном списке')
    }
    if (getSinglePageChat.blackList == 'This User Blocked You') {
      setBlackListStatus('Вы в черном списке')
    }
    if (addBlackPusher.addBlackListPusher?.reseiver_id === 'black_list_delete' && addBlackPusher.addBlackListPusher?.sender_id === 'black_list_delete') {
      setShopwINput(false)

    }
  }, [getSinglePageChat.resiverUser, addBlackPusher, addToblackList]);



  useEffect(() => {
    if (getSinglePageChat.blackList == 'You Blocked This User') {
      setBlackListStatus('Пользователь в черном списке')
      setAddToBlackList('Удалить из черного списка')
    }
    else {
      setAddToBlackList(t(mainData.lang).intoablacklist)
    }
    if (getSinglePageChat.blackList === 'This User Blocked You') {
      setBlackListStatus('Вы в черном списке')
    }
  }, [getSinglePageChat.resiverUser])


  const sendMsgFunction = () => {
    music.play()
    setTimeout(() => {
      music.stop()
    }, 2000);
    dispatch(
      newMessageAction(
        { message: sendMSg, receiver_id: route.params.id, },
        staticdata.token));
    setSendMsg('')
  };

  return <View style={{ width: '80%' }}>
    {!showInput ?
      <Input
        msg
        pdR={50}
        placeholder={'Введите текст'}
        data={sendMSg}
        onChange={e => setSendMsg(e)}
        width={'100%'}
        sendMsg={() => sendMsgFunction()}
      /> :
      <View style={{ marginBottom: 20, justifyContent: 'center', }}>
        <Text style={[Styles.balihaiMedium14, { textAlign: 'center' }]}>{blackListStatus}</Text>
      </View>
    }
  </View>
}