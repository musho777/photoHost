import { useState, useEffect } from "react"
import { View, Text, RefreshControl, FlatList, BackHandler } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { BlackListBlock } from "../../components/blackListBlock"
import { AddBlackListAction, GetBlackListAction } from "../../store/action/action"
import { Styles } from "../../styles/Styles"
import { t } from '../../components/lang';
import { useIsFocused } from "@react-navigation/native"

export const BlackListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const blackList = useSelector((st) => st.blackList)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const mainData = useSelector(st => st.mainData);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(GetBlackListAction(staticdata.token, 1))
    });
    return unsubscribe;
  }, [navigation]);

  const isFocused = useIsFocused();
  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        navigation.goBack(); // Perform back action only if this is the active screen
        navigation.openDrawer()
        return true;
      }
      return false; // Let the default behavior happen if this screen isn't focused
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Cleanup the listener when the screen is not active
  }, [isFocused]);


  useEffect(() => {
    setData(blackList.data)
  }, [blackList.data])

  const RemoveFromBlackList = (id, index) => {
    dispatch(AddBlackListAction({ user_id: id }, staticdata.token))
    let item = [...data]
    item.splice(index, 1)
    setData(item)
  }

  const renderItem = ({ item, index }) => {
    return <BlackListBlock onPress1={() => RemoveFromBlackList(item.receiver.id, index)} key={index} name={item.receiver.name} img={item.receiver.avatar} username={item.receiver.nickname} type="Помиловать" />
  }
  return <View style={{ marginTop: 30, alignItems: 'center', paddingHorizontal: 15 }}>
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={blackList?.loading}
          onRefresh={() => {
            dispatch(GetBlackListAction(staticdata.token, 1))
          }}
        />
      }
      data={data}
      enableEmptySections={true}
      ListEmptyComponent={() => (
        !blackList?.loading && <Text style={[Styles.darkMedium16, { marginTop: 40, textAlign: 'center' }]}>{t(mainData.lang).Blacklistisempty}</Text>
      )}
      renderItem={renderItem}
      onEndReached={() => {
        if (blackList?.nextPage) {
          let p = page + 1
          dispatch(GetBlackListAction(staticdata.token, p))
          setPage(p)
        }
      }}
    />
  </View>
}