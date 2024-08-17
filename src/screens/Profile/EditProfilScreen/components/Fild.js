import { StyleSheet, TextInput, View } from "react-native";
import { Styles } from "../../../../styles/Styles"
import { AppColors } from "../../../../styles/AppColors";
import { useState } from "react";

export const Fild = ({ placeholder, value, hadnelChange, svg }) => {
  const [height, setHeight] = useState();

  return <View style={styles.textWrapper}>
    {svg}
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={'#8C9CAB'}
      multiline
      value={value}
      onChangeText={e => hadnelChange(e)}
      onContentSizeChange={event => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      style={[Styles.balihaiMedium14, { width: '90%', height: height }]}
    />
  </View>
}
const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
