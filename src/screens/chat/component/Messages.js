import { FlatList, StyleSheet } from "react-native";
import { MsgBlock } from "../../../components/MsgBlock";
import { SharePost } from "../SharePost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ClearSinglChatNumber, GetSinglePageChatAction } from "../../../store/action/action";

export const Messages = ({ route, id }) => {

  const getSinglePageChat = useSelector(st => st.getSinglePageChat);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);
  const user = useSelector(st => st.userData);

  useEffect(() => {
    dispatch(GetSinglePageChatAction({ receiver_id: route.params.id }, staticdata.token, page,),);
  }, [page]);

  useEffect(() => {
    dispatch(ClearSinglChatNumber(id))
  }, [getSinglePageChat.message.length])

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
        return <SharePost my id={item.post.user.id} postData={item.post} name={item.post.user.name} from={from} avatar={item.post.user.avatar} post={item.post.photo[0].photo} />
      }
      return (
        <MsgBlock
          timestamp={item.created_at}
          msg={item.message}
          from={item.sender_id != user.data.id}
        />
      );
    }}
  />
}


const styles = StyleSheet.create({
  body: {
    height: '100%',
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