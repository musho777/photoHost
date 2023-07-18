import {View, Text, StyleSheet} from 'react-native';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';
export const MsgBlock = ({msg, data, from}) => {
  return (
    <View
      style={[
        styles.block,
        from
          ? {alignSelf: 'flex-start'}
          : {
              alignSelf: 'flex-end',
              backgroundColor: AppColors.SweetCorn_Color,
              borderBottomEndRadius: 0,
              borderBottomStartRadius: 20,
            },
      ]}>
      <Text style={Styles.CharcoalMedium14}>{msg}</Text>
      <View style = {from ?{position:'absolute',right:-20,bottom:-5}:{position:'absolute',left:-20,bottom:-5}}>
        <Text style={Styles.balihaiMedium10}>12:20</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    backgroundColor: AppColors.AliceBlue_Color,
    marginVertical: 10,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
  },
});
