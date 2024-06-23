import { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChatUser } from '../../components/ChatUser';
import { GetMyChatRoom } from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { Input } from '../../ui/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from '../../components/lang';

export const ChatUsersScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [token, setToken] = useState('')
  const getMyChatRoom = useSelector(st => st.getMyChatRoom);
  const deletChat = useSelector((st) => st.deletChatPusher)
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();

  const mainData = useSelector(st => st.mainData);

  const getToken = async () => {
    let token = await AsyncStorage.getItem('token')
    dispatch(GetMyChatRoom({ search: search }, token, page));
    setToken(token)
  }

  useEffect(() => {
    if (!getMyChatRoom.loading && page !== 1) {
      dispatch(GetMyChatRoom({ search: search }, token, page));
    }
  }, [page, token]);


  useEffect(() => {
    if (!getMyChatRoom.loading) {
      setData(getMyChatRoom.data);
    }
  }, [getMyChatRoom.data]);

  useEffect(() => {
    setPage(1);
    const unsubscribe = navigation.addListener('focus', async () => {
      getToken()
    });
    return unsubscribe;
  }, [navigation]);

  const searchData = e => {
    setSearch(e)
    dispatch(GetMyChatRoom({ search: e }, token, page));
  };

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
    return (
      <ChatUser
        username={item.sender?.nickname}
        name={item.sender?.name}
        img={`https://chamba.justcode.am/uploads/${item?.sender?.avatar}`}
        sendWhiteMe={item.sendWhiteMe}
        sendr_id={item.latest_sender}
        user_id={user.data.id}
        seen={item.status}
        text={item.message}
        // online={elm.online}
        otherUserId={item.sender?.id}
        msg={item.message_sum}
      />
    );
  };
  if (getMyChatRoom.loading) {
    return (
      <View style={Styles.loading}>
        <ActivityIndicator size="large" color="#FFC24B" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ padding: 10, marginTop: 10 }}>
        {getMyChatRoom.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FFC24B" />
          </View>
        )}
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
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    zIndex: 1,
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
})
