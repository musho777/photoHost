import {useNavigation} from '@react-navigation/native';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';
export const FollowingsBlock = ({name, username, img, type}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserProfileScreen')}
      style={[{marginBottom: 20}, Styles.flexSpaceBetween]}>
      <View style={Styles.flexAlignItems}>
        <Image
          style={styles.img}
          source={{uri: `https://chamba.justcode.am/uploads/${img}`}}
        />
        <View>
          <Text style={Styles.darkSemiBold14}>{name}</Text>
          <Text style={Styles.balihaiRegular12}>{username}</Text>
        </View>
      </View>
      {type ? (
        <TouchableOpacity style={styles.button}>
          <Text style={Styles.darkSemiBold10}>Удалить</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button,{backgroundColor:AppColors.GoldenTainoi_Color}]}>
          <Text style={[Styles.darkSemiBold10,{color:AppColors.White_Color}]}>подписаться</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    marginRight: 15,
    borderRadius: 50,
  },
  button: {
    backgroundColor: AppColors.PattensBlue_Color,
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 50,
  },
});
