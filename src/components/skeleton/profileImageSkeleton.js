import { StyleSheet, View } from "react-native"
import { Skeleton } from "../Skeleton"

export const ProfileImageSkeleton = () => {
  return <View style={styles.block}>
    <Skeleton
      width={90}
      height={90}
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
    justifyContent: "center",
    alignItems: 'center',
    gap: 12,
    marginBottom: 16.5
  }
});
