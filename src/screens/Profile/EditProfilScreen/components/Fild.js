import { StyleSheet, TextInput, View } from "react-native";
import { Styles } from "../../../../styles/Styles"
import { AppColors } from "../../../../styles/AppColors";

export const Fild = ({ placeholder, value, hadnelChange, svg, multiline }) => {

  return <View style={styles.textWrapper}>
    {svg && <View style={{ width: 20, marginRight: 10 }}>
      {svg}
    </View>}
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={'#8C9CAB'}
      multiline={multiline}
      value={value}
      onChangeText={e => hadnelChange(e)}
      style={[Styles.balihaiMedium14, { height: 'auto', width: '90%' }]}
    />
  </View>
}
const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 20 : 5,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
    height: 'auto',
  },
});
