import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
export const MsgBlock = ({ msg, from, timestamp }) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so adding 1
  const day = date.getDate();
  const hour = date.getHours();
  const minut = date.getMinutes()

  const today = new Date()

  const tyear = today.getFullYear();
  const tmonth = today.getMonth() + 1; // Months are zero-based, so adding 1
  const tday = today.getDate();
  const thour = today.getHours();
  const getData = () => {
    if (month == tmonth && tday == day) {
      return `${thour}:${minut}`
    }
    else {
      return `${day}. ${thour}:${minut}`
    }
  }
  return (
    <View
      style={[
        styles.block,
        from
          ? { alignSelf: 'flex-start' }
          : {
            alignSelf: 'flex-end',
            backgroundColor: AppColors.SweetCorn_Color,
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 20,
          },
      ]}>
      <Text style={Styles.CharcoalMedium14}>{msg}</Text>
      <View style={from ? { position: 'absolute', right: -20, bottom: -5 } : { position: 'absolute', left: -20, bottom: -5 }}>

        <Text style={Styles.balihaiMedium10}>{getData()}</Text>
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
    marginHorizontal: 20,
  },
});
