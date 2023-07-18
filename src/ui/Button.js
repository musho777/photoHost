import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';

export const Button = ({
  title,
  marginV,
  disabled,
  onPress,
  width = 220,
  paddingV = 15,
  bg,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {marginVertical: marginV, width: width, paddingVertical: paddingV},
        disabled && {backgroundColor: AppColors.PattenseBlue_Color},
        bg && {backgroundColor: AppColors.PattensBlue_Color}
      ]}>
      <Text
        style={[
          Styles.darkMedium12,
          disabled && {color: AppColors.White_Color},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.Mustard_Color,
    borderRadius: 50,
  },
});
