import { Input } from '../../../ui/Input';
import { Image, StyleSheet, View } from "react-native"
import { useSelector } from "react-redux";
import { t } from '../../lang';


export const InputComponent = ({ user, sendComment, setSendCommet, sendCommentFunction }) => {
  const mainData = useSelector(st => st.mainData);

  return <View style={styles.InputComponent}>
    <Image
      style={styles.image}
      source={{ uri: `https://chambaonline.pro/uploads/${user.data.avatar}`, }}
    />
    <Input
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