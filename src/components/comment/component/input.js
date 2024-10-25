import { Input } from '../../../ui/Input';
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux";
import { t } from '../../lang';


export const InputComponent = ({ sendComment, setSendCommet, sendCommentFunction, width }) => {
  const mainData = useSelector(st => st.mainData);

  return <View style={[width ? styles.InputComponent : { width: '80%' }]}>
    <Input
      send
      pdR={50}
      sendCom={() => sendCommentFunction()}
      data={sendComment}
      onChange={e => setSendCommet(e)}
      width={'100%'}
      placeholder={t(mainData.lang).Leaveacomment}
    />
  </View>
}

const styles = StyleSheet.create({
  InputComponent: {
    width: '70%',
  }
});