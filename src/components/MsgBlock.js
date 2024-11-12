import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
import FastImage from 'react-native-fast-image';
export const MsgBlock = ({ msg, from, timestamp }) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const minut = date.getMinutes()

  const today = new Date()
  function isEmoji(char) {
    const emojiRegex = /[\u203C-\u3299\u1F000-\u1FAFF\u2600-\u27BF\uFE00-\uFE0F\u1F004-\u1F9FF\u0023-\u0039\u200D]+/;
    return emojiRegex.test(char);
  }

  const tmonth = today.getMonth() + 1;
  const tday = today.getDate();
  const thour = today.getHours();
  const getData = () => {
    let m = minut
    if (m < 10) {
      m = '0' + m
    }
    if (month == tmonth && tday == day) {

      return `${thour}:${m}`
    }
    else {
      return `${day}. ${thour}:${m}`
    }
  }

  if (msg?.includes('https://media')) {
    return <View
      style={[styles.block1, from ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' },
      ]}>
      <FastImage source={{ uri: msg }} style={styles.image} />
      <View style={from ?
        [styles.msgDate,
        JSON.stringify(getData()).length > 7 ? { right: -35 } : { right: -20 }
        ] :
        [styles.msgDate,
        JSON.stringify(getData()).length > 7 ? { left: -35 } : { left: -20 }
        ]
      }
      >
        <Text style={Styles.balihaiMedium10}>{getData()}</Text>
      </View>
    </View>
  }
  else if (isEmoji(msg))
    return (
      <View
        style={[
          styles.block, from ? { alignSelf: 'flex-start' } : {
            alignSelf: 'flex-end',
            backgroundColor: AppColors.SweetCorn_Color,
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 20,
          },
        ]}>
        {msg?.includes('https://media') ?
          <FastImage source={{ uri: msg }} style={styles.image} /> :
          <Text style={Styles.CharcoalMedium14}>{msg}</Text>
        }
        <View style={from ?
          [styles.msgDate,
          JSON.stringify(getData()).length > 7 ? { right: -35 } : { right: -20 }
          ] :
          [styles.msgDate,
          JSON.stringify(getData()).length > 7 ? { left: -35 } : { left: -20 }
          ]
        }
        >
          <Text style={Styles.balihaiMedium10}>{getData()}</Text>
        </View>
      </View>
    );
  else {
    return (
      <View
        style={[
          styles.block2, from ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' },
        ]}>
        {msg?.includes('https://media') ?
          <FastImage source={{ uri: msg }} style={styles.image} /> :
          <Text style={{ fontSize: 35 }}>{msg}</Text>
        }
        <View style={from ?
          [styles.msgDate,
          JSON.stringify(getData()).length > 7 ? { right: -35 } : { right: -20 }
          ] :
          [styles.msgDate,
          JSON.stringify(getData()).length > 7 ? { left: -35 } : { left: -20 }
          ]
        }
        >
          <Text style={Styles.balihaiMedium10}>{getData()}</Text>
        </View>
      </View>
    );
  }
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
  block1: {
    marginVertical: 10,
  },
  block2: {
    padding: 10,
    marginHorizontal: 5,
  },
  msgDate: {
    position: 'absolute',
    bottom: -5
  },
  image: {
    height: 200,
    objectFit: 'contain',
    width: 200,
    borderRadius: 10,
  },
});
