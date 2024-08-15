import { StyleSheet, View } from "react-native";
import { Skeleton } from "../../Skeleton";

export const ViewSkeleton = () => {
  return <View style={styles.block}>
    <Skeleton
      width={45}
      height={45}
      style={{ borderRadius: 50 }}
    />
    <Skeleton
      width={130}
      height={13}
      style={{ borderRadius: 50 }}
    />
  </View>
}
const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  }
});
