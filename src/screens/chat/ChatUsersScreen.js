import { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChatUser } from '../../components/ChatUser';
import { ClearChatNumber, GetMyChatRoom } from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { Input } from '../../ui/Input';
import { t } from '../../components/lang';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ChatUsersScreen = () => {
  const [data, setData] = useState([]);
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const getMyChatRoom = useSelector(st => st.getMyChatRoom);
  const deletChat = useSelector((st) => st.deletChatPusher)
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);


  useEffect(() => {
    setData(getMyChatRoom.data);
  }, [getMyChatRoom]);

  useFocusEffect(
    useCallback(() => {
      if (user.msgCount > 0) {
        dispatch(ClearChatNumber())
      }
    }, [user])
  );


  const searchData = e => {
    setSearch(e)
    dispatch(GetMyChatRoom({ search: e }, staticdata.token, 1));
  };


  useEffect(() => {
    dispatch(GetMyChatRoom({ search: "" }, staticdata.token, page))
  }, [page])


  useEffect(() => {
    if (Object.keys(deletChat.deletChatPusher).length) {
      let item = [...data]
      data.map((elm, i) => {
        if (deletChat.deletChatPusher.reseiver_id == user.data.id && deletChat.deletChatPusher.sender_id == elm.sender_id) {
          item.splice(i, 1)
        }
        setData(item)
      })
    }
  }, [deletChat.deletChatPusher])

  const renderItem = ({ item }) => {
    let avatar = ''
    let name = ''
    if (item.sender?.id == user.allData?.data?.id) {
      avatar = item?.receiver_user.avatar
      name = item?.receiver_user.name
      otherUserId = item.receiver_user?.id
    }
    else {
      avatar = item?.sender.avatar
      name = item?.sender.name
      otherUserId = item.sender?.id
    }
    if (avatar)
      return (
        <ChatUser
          id={item.id}
          name={name}
          img={`https://chambaonline.pro/uploads/${avatar}`}
          sendWhiteMe={item.sendWhiteMe}
          sendr_id={item.latest_sender}
          user_id={user.data.id}
          seen={item.status}
          text={item.message}
          otherUserId={otherUserId}
          msg={item.message_sum}
        />
      );
  };
  return (
    <SafeAreaView style={[{ flex: 1, marginTop: insets.top ? insets.top : Styles.statusBar },]}>
      <View style={{ padding: 10, marginTop: 10 }}>
        {data.length > 0 && <Input
          placeholder={t(mainData.lang).search}
          search
          value={search}
          onChange={e => searchData(e)}
        />}
        <FlatList
          data={data}
          enableEmptySections={true}
          renderItem={renderItem}
          onEndReached={() => {
            if (getMyChatRoom.nextPage) {
              setPage(page + 1);
            }
          }}
          ListEmptyComponent={() => (
            !getMyChatRoom.loading &&
            <Text
              style={[
                Styles.darkMedium16,
                { marginTop: 10, textAlign: 'center' },
              ]}>
              {!search ? t(mainData.lang).Youhavenomessages : t(mainData.lang).Notfound}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}