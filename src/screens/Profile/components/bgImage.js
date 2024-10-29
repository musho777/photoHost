import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckMarkUserSvg, EditSvg, MenuSvg2 } from "../../../assets/svg/Svgs";
import { Skeleton } from "../../../components/Skeleton";
import FastImage from "react-native-fast-image";
import { forwardRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../../../styles/Styles";
import { ProfileImageSkeleton } from "../../../components/skeleton/profileImageSkeleton";

const { width } = Dimensions.get('window');

export const BgImage = forwardRef(({ user, loadBgImage, setLoadBgImage, bgPhoto, setChangeAvatar, changeAvatar, bg, imgUrl }, ref) => {
  const navigation = useNavigation()
  if (user.loading) {
    return <ProfileImageSkeleton />
  }
  return <View style={{ width: '100%' }}>
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{ width: 30, height: 30, }}
    >
      <MenuSvg2 />
    </TouchableOpacity>

    {loadBgImage &&
      <Skeleton
        width={width - 83}
        height={150}
        style={{ position: "absolute", borderRadius: 10 }}
      />
    }
    <View>
      <FastImage
        onLoad={() => {
          setLoadBgImage(false)
        }}
        style={[styles.bgImage, loadBgImage && { opacity: 0 }]}
        source={{ uri: bg ? bg : `https://chambaonline.pro/uploads/${bgPhoto}`, }}
      />
      <TouchableOpacity
        onPress={() => ref.current?.present()}
        style={styles.editIcon}>
        <EditSvg />
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.avatarWrapper} activeOpacity={1} onPress={() => setChangeAvatar(!changeAvatar)}>
      <View style={[styles.shadow, styles.avatar]}>
        <Image
          style={styles.img}
          source={{ uri: imgUrl ? imgUrl : `https://chambaonline.pro/uploads/${user.avatar}`, }}
        />
      </View>
    </TouchableOpacity>

    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>
      <Text style={[Styles.darkMedium16, { textAlign: 'center' }]}>{user?.name}</Text>
      {
        user.data.star > 0 && <View style={{ marginTop: 3 }}>
          <CheckMarkUserSvg />
        </View>
      }
    </View>
    <Text style={[Styles.darkMedium14, { textAlign: 'center' }]}>{user.description}</Text>
  </View>
})


const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userData: {
    marginTop: 10,
    marginBottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  shadow: {
    alignItems: 'center',
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
  },
  bgImage: {
    objectFit: 'cover',
    width: width - 83,
    height: 150,
    borderRadius: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarWrapper: {
    position: "absolute",
    right: 1,
    top: 0,
    bottom: 0,
    margin: 'auto',
    justifyContent: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    zIndex: 9999,
    left: 10,
  },
});
