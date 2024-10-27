import { Dimensions, StyleSheet, View } from "react-native"
import { Skeleton } from "../Skeleton"


const { width } = Dimensions.get('window');


export const ProfileImageSkeleton = () => {
  return <View>

    <View style={{ width: '100%' }}>
      <Skeleton
        width={width - 90}
        height={130}
      />
      <View style={styles.avatarWrapper} activeOpacity={1}>
        <View style={styles.avatar}>
          <Skeleton
            width={100}
            height={100}
            style={{ borderRadius: 100 }}
          />
        </View>
      </View>
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 6 }}>
      <View style={{ paddingRight: 2, flexDirection: 'column', gap: 3 }}>
        <Skeleton
          width={120}
          height={15}
        />
        <Skeleton
          width={120}
          height={15}
        />
      </View>
    </View>

  </View>
}
const styles = StyleSheet.create({
  block: {
    justifyContent: "center",
    alignItems: 'center',
    gap: 12,
    marginBottom: 16.5
  },
  bgImage: {
    objectFit: 'cover',
    width: width - 90,
    height: 150,
    // borderRadius: 10,
  },
  avatarWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
