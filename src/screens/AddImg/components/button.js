import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../../../styles/Styles';
import { AppColors } from '../../../styles/AppColors';

export const Button = ({
  title,
  disabled,
  onPress,
  loading
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={styles.button}>
      {!loading ? <Text
        style={[
          Styles.darkMedium12,
          disabled && { color: AppColors.White_Color },
        ]}>
        {title}
      </Text> :
        <ActivityIndicator size={15} color="#fff" />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: 165,
    alignItems: 'center',
    backgroundColor: AppColors.Mustard_Color,
    borderRadius: 50,
    paddingVertical: 10,
  },
});
