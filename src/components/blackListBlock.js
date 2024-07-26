import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
export const BlackListBlock = ({
  name,
  img,
  type,
  onPress,
  onPress1,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ marginBottom: 20 }, Styles.flexSpaceBetween]}>
      <View style={Styles.flexAlignItems}>
        <Image
          style={styles.img}
          source={{ uri: `https://chambaonline.pro/uploads/${img}` }}
        />
        <View>
          <Text style={Styles.darkSemiBold14}>{name}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={onPress1}
          style={styles.button}>
          <Text style={Styles.darkSemiBold10}>{type}</Text>
        </TouchableOpacity>
      </View>
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
