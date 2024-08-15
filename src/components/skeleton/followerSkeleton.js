import { StyleSheet, View } from "react-native"
import { Skeleton } from "../Skeleton"

export const FollowerSkeleton = () => {
  return <View style={styles.block}>
    <Skeleton
      width={40}
      height={40}
      style={{ borderRadius: 50 }}
    />
    <Skeleton
      width={150}
      height={14}
    />
  </View>
}
const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    gap: 15,
    marginBottom: 16.5,
    flexDirection: "row",
    marginHorizontal: 15,
  }
});
