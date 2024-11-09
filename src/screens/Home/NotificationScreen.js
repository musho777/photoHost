import { useState, useEffect } from "react"
import { View, Text, RefreshControl, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { NotificationBlock } from "../../components/NotificationBlock"
import { GetNotificationAction, getUserInfoAction } from "../../store/action/action"
import { Styles } from "../../styles/Styles"

export const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const notification = useSelector((st) => st.notification)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    dispatch(GetNotificationAction(staticdata.token, 1))
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (staticdata.token) {
        dispatch(getUserInfoAction(staticdata.token))
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setData(notification.data)
  }, [notification.data])



  const renderItem = ({ item, index }) => {
    return <NotificationBlock
      description={item.description}
      id={item.sender.id}
      itemId={item.parent_id}
      avatar={item.sender.avatar}
      name={item.sender.name}
      photo={item.photo}
    />
  }
  return <View style={[{ paddingHorizontal: 15 }]}>
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={notification?.loading}
          onRefresh={() => {
            dispatch(GetNotificationAction(staticdata.token, 1))
          }}
        />
      }
      data={data}
      enableEmptySections={true}
      ListEmptyComponent={() => (
        !notification?.loading && <Text style={[Styles.darkMedium16, { marginTop: 10, textAlign: 'center' }]}>Список пуст</Text>
      )}
      renderItem={renderItem}
      onEndReached={() => {
        if (notification?.nextPage) {
          let p = page + 1
          dispatch(GetNotificationAction(staticdata.token, p))
          setPage(p)
        }
      }}
    />
  </View>
}