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

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.darkSemiBold14, { color: JSON.parse(jsonString)?.color?.title ? JSON.parse(jsonString)?.color?.title : "black", fontFamily: JSON.parse(jsonString)?.font, marginTop: -2 }]}>{JSON.parse(jsonString).name}</Text>
    } catch (error) {
      return <Text style={[Styles.whiteSemiBold14, { marginTop: -2 }]}>{jsonString}</Text>
    }
  }


  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ marginBottom: 20, width: '100%' }, Styles.flexSpaceBetween]}>
      <View style={Styles.flexAlignItems}>
        <Image
          style={styles.img}
          source={{ uri: `https://chambaonline.pro/uploads/${img}` }}
        />
        <View>
          {canParseJSON(name)}
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
