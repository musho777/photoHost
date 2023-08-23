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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackArrow, FotoSvg } from '../../assets/svg/Svgs';
import { MenuSvg } from '../../assets/svg/TabBarSvg';
import { BootomModal } from '../../components/BootomSheet';
import { MsgBlock } from '../../components/MsgBlock';
import {
  AddBlackListAction,
  DelateChatAction,
  GetSinglePageChatAction,
  newMessageAction,
} from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { Input } from '../../ui/Input';
import { ClearDeleteChat } from '../../store/action/clearAction';

export const ChatScreen = ({ navigation, route }) => {
  console.log(route.params.id)
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const staticdata = useSelector(st => st.static);
  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [addToblackList, setAddToBlackList] = useState('В черный список')
  const user = useSelector(st => st.userData);

  const snapPoints = useMemo(() => ['18%'], []);
  const [page, setPage] = useState(1);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const [data, setData] = useState([]);
  const [sendMSg, setSendMsg] = useState('');

  useEffect(() => {
    if (!getSinglePageChat.loading) {
      setData(getSinglePageChat?.message);
      if (getSinglePageChat.blackList == 'You Blocked This User') {
        setAddToBlackList('Удалить из черного списка')
      }
      else {
        setAddToBlackList('В черный список')
      }
    }
  }, [getSinglePageChat.data]);
  const sendMsgFunction = () => {
    let item = [...data];
    item.unshift({
      sender_id: user.data.id,
      message: sendMSg,
    });
    setData(item);
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
    dispatch(
      GetSinglePageChatAction(
        {
          receiver_id: route.params.id,
        },
        staticdata.token,
        page,
      ),
    );
  }, [page]);
  const addToBlackList = () => {
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ 'user_id': getSinglePageChat.data.id }, staticdata.token))
    if (addToblackList == 'В черный список') {
      setAddToBlackList('Удалить из черного списка')
    }
    else {
      setAddToBlackList('В черный список')

    }
  }

  useEffect(() => {
    if (getSinglePageChat.delateChatStatus) {
      bottomSheetRef.current?.close();
      dispatch(ClearDeleteChat())
      navigation.goBack()
    }
  }, [getSinglePageChat.delateChatStatus])
  if (getSinglePageChat.dleateChatLoading) {
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
                uri: `https://chamba.justcode.am/uploads/${getSinglePageChat.data.avatar}`,
              }}
            />
            <View style={{ marginHorizontal: 20 }}>
              <Text style={Styles.darkMedium14}>
                {getSinglePageChat.data.name}
              </Text>
              <Text style={Styles.balihaiMedium13}>
                @{getSinglePageChat.data.nickname}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => handlePresentModalPress()}>
          <MenuSvg />
        </TouchableOpacity>
      </View>
      <FlatList
        snapToEnd
        inverted={true}
        showsVerticalScrollIndicator={false}
        data={data}
        style={{ marginBottom: 60 }}
        onEndReached={() => {
          if (getSinglePageChat.nextPage && !getSinglePageChat.loading) {
            setPage(page + 1);
          }
        }}
        renderItem={({ item }) => {
          return (
            <View>
              <MsgBlock
                msg={item.message}
                from={item.sender_id != user.data.id}
              />
            </View>
          );
        }}
      />
      <View>
        {addToblackList === 'В черный список' && <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 10,
            width: '100%',
            alignItems: 'center',
          }}>
          <Input
            msg
            pdR={50}
            placeholder={'Введите текст'}
            data={sendMSg}
            onChange={e => setSendMsg(e)}
            width={'100%'}
            sendMsg={() => sendMsgFunction()}
          />
        </View>}
      </View>
      <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{ paddingHorizontal: 20 }}>
          {data.length > 0 && <TouchableOpacity
            onPress={() => dispatch(DelateChatAction({ receiver_id: route.params.id }, staticdata.token))}
            style={{ marginBottom: 20, marginTop: 20 }}>
            <Text style={Styles.darkRegular14}>Удалить переписку</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => addToBlackList()}>
            <Text style={Styles.darkRegular14}>{addToblackList}</Text>
          </TouchableOpacity>
        </View>
      </BootomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
});
