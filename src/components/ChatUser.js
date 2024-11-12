import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ChatSeenSvg, OnlineSvg } from '../assets/svg/Svgs';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
export const ChatUser = ({
  seen,
  online,
  msg,
  img,
  name,
  text,
  sendr_id,
  user_id,
  otherUserId,
  id
}) => {

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.darkSemiBold14, { color: JSON.parse(name)?.color?.title ? JSON.parse(name)?.color?.title : "black", fontFamily: JSON.parse(name)?.font }]}>{JSON.parse(name)?.name}</Text>

    } catch (error) {
      return <Text style={[Styles.darkSemiBold14]}> {name}</Text >
    }
  }

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('ChatScreen', { id: otherUserId, chatId: id })
      }}
      style={[Styles.flexSpaceBetween, { marginVertical: 20 }]}>
      <View style={Styles.flexAlignItems}>
        <View>
          <Image style={styles.img} source={{ uri: img }} />
          {online && (
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <OnlineSvg />
            </View>
          )}
        </View>
        <View style={{ marginHorizontal: 5 }}>
          {canParseJSON(name)}
          {sendr_id != user_id &&
            <Text>{((text)?.length > 30) ?
              (((text).substring(0, 30 - 3)) + '...') :
              text}
            </Text>
          }
        </View>
      </View>
      {sendr_id == user_id ? (
        <ChatSeenSvg seen={seen} />
      ) : (msg != 0 &&
        <View style={styles.msg}>
          <Text style={[Styles.whiteSemiBold10]}>{msg}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 43,
    height: 43,
    borderRadius: 50,
  },
  msg: {
    width: 16,
    height: 16,
    backgroundColor: AppColors.GoldenTainoi_Color,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
