import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { MsgBlock } from "../../../components/MsgBlock";
import { SharePost } from "../SharePost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ClearSinglChatNumber, GetSinglePageChatAction } from "../../../store/action/action";
import { ChecboxUnchekedForMsgSvg, CheckedChexboxForMSg } from "../../../assets/svg/Svgs";

export const Messages = ({ route, id, setSelected, seleted, setOpenSelect, openSelet }) => {

  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const user = useSelector(st => st.userData);
  // const [openSelet, setOpenSelect] = useState(false)
  const [selectedData, setSelectedData] = useState([])

  useEffect(() => {
    dispatch(GetSinglePageChatAction({ receiver_id: route.params.id }, staticdata.token, page,),);
  }, [page]);

  useEffect(() => {
    dispatch(ClearSinglChatNumber(id))
  }, [getSinglePageChat.message.length])

  useEffect(() => {
    if (!seleted?.length) {
      setSelectedData([])
      setOpenSelect(false)
    }
  }, [seleted])

  const onLongPress = () => {
    setOpenSelect(true)
  }



  const SelectMsg = (id) => {
    let item = [...selectedData]
    if (openSelet) {
      let index = item.findIndex((elm) => elm == id)
      if (index >= 0) {
        item.splice(index, 1)
      }
      else {
        item.push(id)
      }
    }
    setSelected(item)
    setSelectedData(item)
  }

  return <FlatList
    snapToEnd
    inverted={true}
    showsVerticalScrollIndicator={false}
    data={getSinglePageChat?.message}
    contentContainerStyle={styles.scrollViewContent}
    onEndReached={() => {
      if (getSinglePageChat.nextPage && !getSinglePageChat.loading) {
        setPage(page + 1);
      }
    }}
    renderItem={({ item }) => {
      if (item.post) {
        let from = item.sender_id != user.data.id
        return <TouchableOpacity activeOpacity={openSelet ? 1 : 0.3} onPress={() => SelectMsg(item.id)} onLongPress={() => onLongPress()}>
          {openSelet && <View style={styles.message}>
            {selectedData?.findIndex(elm => elm == item.id) > -1 ?
              <CheckedChexboxForMSg /> :
              <ChecboxUnchekedForMsgSvg />
            }
          </View>}
          <View style={{ marginRight: openSelet ? 20 : 0 }}>
            <SharePost openSelet={openSelet} onLongPress={() => onLongPress()} my id={item.post.user.id} postData={item.post} name={item.post.user.name} from={from} avatar={item.post.user.avatar} post={item.post.photo[0]?.photo} />
          </View>
        </TouchableOpacity>
      }
      return (
        <TouchableOpacity activeOpacity={openSelet ? 1 : 0.3} onPress={() => SelectMsg(item.id)} onLongPress={() => onLongPress()}>
          {openSelet && <View style={styles.message}>
            {selectedData?.findIndex(elm => elm == item.id) > -1 ?
              <CheckedChexboxForMSg /> :
              <ChecboxUnchekedForMsgSvg />
            }
          </View>}
          <View style={{ marginRight: openSelet ? 10 : 0 }}>
            <MsgBlock
              timestamp={item.created_at}
              msg={item.message}
              from={item.sender_id != user.data.id}
            />
          </View>
        </TouchableOpacity>
      );
    }}
  />
}


const styles = StyleSheet.create({
  body: {
    height: '100%',
  },
  message: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 3,
    justifyContent: 'center'
    // flexDirection: 'row'
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    objectFit: 'contain',
    width: 200
  },
  post: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.00,
    elevation: 1,
    padding: 10,
    marginBottom: 30,
    borderWidth: 3,
    borderRadius: 20
  }
});