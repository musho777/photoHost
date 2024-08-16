import { StyleSheet, View } from "react-native"
import { AppColors } from "../styles/AppColors"

export const Pagination = ({ photo, active }) => {
  return <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    }}>
    {photo?.length > 1 &&
      photo?.map((elm, i) => (
        <View
          style={[
            styles.pagination,
            i === active && {
              backgroundColor: AppColors.GoldenTainoi_Color,
              borderRadius: 50,
            },
          ]}></View>
      ))}
  </View>
}

const styles = StyleSheet.create({
  pagination: {
    width: 6,
    height: 6,
    backgroundColor: '#CCD6DF',
    marginHorizontal: 5,
    borderRadius: 50,
  },
});