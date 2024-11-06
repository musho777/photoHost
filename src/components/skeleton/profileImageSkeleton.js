import { Dimensions, StatusBar, StyleSheet, View } from "react-native"
import { Skeleton } from "../Skeleton"
import { MenuSvg2 } from "../../assets/svg/Svgs";


const { width } = Dimensions.get('window');

export const ProfileImageSkeleton = ({ big }) => {
  if (big) {
    return <View style={{ width: width, height: 280 }}>
      <View style={styles.avatarWrapper1}>
        <Skeleton
          width={width}
          height={250}
        />
        <View style={styles.bigWrapper}>
          <View style={{ position: 'absolute', top: -55 }}>
            <Skeleton
              width={110}
              height={110}
              style={{ borderRadius: 100 }}
            />
          </View>
          <Skeleton
            width={120}
            height={15}
            style={{ marginBottom: 5 }}
          />
          <Skeleton
            width={120}
            height={15}
          />
        </View>
      </View>
    </View>
  }
  return <View style={{ width: '100%' }}>
    <View style={{ marginBottom: 20 }}>
      <MenuSvg2 />
    </View>
    <View style={{ width: '100%' }}>
      <Skeleton
        width={width - 90}
        height={130}
      />
      <View style={styles.avatarWrapper}>
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
    borderRadius: 10,
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

  avatarWrapper1: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
    height: 250,
  },
  bigWrapper: {
    position: 'absolute',
    bottom: -40,
    zIndex: 99999,
    marginTop: 80,
    backgroundColor: 'white',
    width: width,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
