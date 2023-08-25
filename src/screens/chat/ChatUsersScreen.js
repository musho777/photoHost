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
export const ChatUsersScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const staticdata = useSelector(st => st.static);
  const getMyChatRoom = useSelector(st => st.getMyChatRoom);
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!getMyChatRoom.loading && page !== 1) {
      dispatch(GetMyChatRoom({ search: search }, staticdata.token, page));
    }
  }, [page]);
  useEffect(() => {
    if (!getMyChatRoom.loading) {
      setData(getMyChatRoom.data);
    }
  }, [getMyChatRoom.data]);

  useEffect(() => {
    setPage(1);
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(GetMyChatRoom({ search: search }, staticdata.token, page));
    });
    return unsubscribe;
  }, [navigation]);

  const searchData = e => {
    setSearch(e)
    dispatch(GetMyChatRoom({ search: e }, staticdata.token, page));
  };
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
        <Input
          placeholder={'Поиск'}
          search
          value={search}
          onChange={e => searchData(e)}
        />
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
                { marginTop: 40, textAlign: 'center' },
              ]}>
              {!search ? 'У вас нет сообщений' : 'Не найдено'}
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
