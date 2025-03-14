import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddMsgAction, newMessageAction } from "../../../store/action/action"
import { t } from '../../../components/lang';
import { Styles } from "../../../styles/Styles"
import { AppColors } from "../../../styles/AppColors"
import { SendMsgSvg } from "../../../assets/svg/Svgs"


export const InputComponent = ({ sendMSg, setSendMsg, setAddToBlackList, addToblackList, route }) => {
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
    dispatch(
      newMessageAction(
        { message: sendMSg, receiver_id: route.params.id, },
        staticdata.token));
    const today = new Date()
    dispatch(
      AddMsgAction({
        message: sendMSg,
        sender_id: user.data.id,
        receiver_id: route.params.id,
        created_at: today,
        // id: JSON.parse(event.data)?.message.id
      }),
    );
    setSendMsg('')
  };

  return <View style={{ width: '80%' }}>
    {!showInput ?

      <View
        style={{ width: "100%", }}>
        <TextInput
          numberOfLines={2}
          style={styles.Input}
          multiline
          placeholder={'Введите текст'}
          placeholderTextColor={AppColors.BaliHai_Color}
          onChangeText={e => setSendMsg(e)}
          value={sendMSg}
        />
        <View style={[Styles.flexAlignItems, styles.eye, { height: '100%' }]}>
          {sendMSg?.length > 0 &&
            <TouchableOpacity onPress={() => sendMsgFunction()} style={{ marginLeft: 10 }}>
              <SendMsgSvg />
            </TouchableOpacity>
          }
        </View>
      </View>
      // <Input
      //   msg
      //   pdR={30}
      //   placeholder={'Введите текст'}
      //   data={sendMSg}
      //   onChange={e => setSendMsg(e)}
      //   width={'100%'}
      //   sendMsg={() => sendMsgFunction()}
      // />
      :
      <View style={{ marginBottom: 20, justifyContent: 'center', }}>
        <Text style={[Styles.balihaiMedium14, { textAlign: 'center' }]}>{blackListStatus}</Text>
      </View>
    }
  </View>
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: AppColors.AliceBlue_Color,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingRight: 40,
    paddingTop: 12,
    // paddingBottom: 20,
    color: AppColors.Blcak_Color,
    position: 'relative',
    maxHeight: 80,
    minHeight: 40,
  },
  eye: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    height: '70%',
  },
});