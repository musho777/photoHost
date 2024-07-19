import { Input } from '../../../ui/Input';
import { Image, StyleSheet, View } from "react-native"
import { AddCommentAction } from "../../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import { t } from '../../lang';


export const InputComponent = ({ parentId, user, sendComment, setSendCommet, senderName, parenId, setParentId }) => {
  const dispatch = useDispatch()
  const mainData = useSelector(st => st.mainData);
  const staticdata = useSelector(st => st.static);


  const sendCommentFunction = () => {
    let send = sendComment
    if (senderName) {
      let regex = new RegExp(senderName, "gi");
      send = send.replace(regex, "");
    }
    dispatch(
      AddCommentAction(
        {
          comment: send,
          parent_id: parenId,
          post_id: parentId,
        },
        staticdata.token,
        { post_id: parentId }
      ),
    )
    setParentId(null)

    // if (!parenId) {
    //   flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    // }
    setSendCommet('')
  };
  return <View style={styles.InputComponent}>
    <Image
      style={styles.image}
      source={{ uri: `https://chamba.digiluys.com/uploads/${user.data.avatar}`, }}
    />
    <Input
      // ref={textInputRef}
      pdR={50}
      send
      sendCom={() => sendCommentFunction()}
      value={sendComment}
      onChange={e => setSendCommet(e)}
      width={'85%'}
      placeholder={t(mainData.lang).Leaveacomment}
    />
  </View>
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  InputComponent: {
    width: '80%',
    flexDirection: 'row',
    gap: 10,
  }
});