import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
import { useState } from 'react';
export const MsgBlock = ({ msg, from, timestamp }) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minut = date.getMinutes()
  const [margin, setMargin] = useState(-20)

  const today = new Date()

  const tyear = today.getFullYear();
  const tmonth = today.getMonth() + 1;
  const tday = today.getDate();
  const thour = today.getHours();
  const getData = () => {
    let m = minut
    if (m < 10) {
      m = '0' + m
    }
    if (month == tmonth && tday == day) {
      // setMargin(-20)
      return `${thour}:${m}`
    }
    else {
      // setMargin(-30)
      return `${day}. ${thour}:${m}`
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
      <View style={from ?
        [
          styles.msgDate,
          JSON.stringify(getData()).length > 7 ? { right: -35 } : { right: -20 }
        ] :
        [
          styles.msgDate,
          JSON.stringify(getData()).length > 7 ? { left: -35 } : { left: -20 }
        ]
      }
      >
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
  msgDate: {
    position: 'absolute',
    bottom: -5
  }
});
