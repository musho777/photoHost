import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from "react-native"
import FastImage from "react-native-fast-image"
import { CheckMarkUserSvg, EditSvg, MenuSvg1 } from "../../../assets/svg/Svgs"
import { forwardRef, useCallback, useState } from "react";
import { Styles } from "../../../styles/Styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Skeleton } from "../../../components/Skeleton";
import { ProfileImageSkeleton } from "../../../components/skeleton/profileImageSkeleton";


const { width } = Dimensions.get('window');

export const BigBgImage = forwardRef(({ changeAvatar, setChangeAvatar, user, bg, bgPhoto, imgUrl }, ref) => {


  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);

    }, [])
  );
  const navigation = useNavigation()
  const [loadBgImage, setLoadBgImage] = useState(true)
  if (user.loading) {
    return <ProfileImageSkeleton big={true} />
  }
  return <View>
    {loadBgImage &&
      <Skeleton
        width={width}
        height={280}
        style={{ position: "absolute", borderRadius: 10 }}
      />
    }
    {/* <StatusBar barStyle="light-content" translucent backgroundColor="transparent" /> */}
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{ width: 30, height: 30, position: "absolute", top: 50, left: 10, zIndex: 9999 }}
    >
      <MenuSvg1 />
    </TouchableOpacity>
    <View style={{ width: '100%' }}>
      <FastImage
        onLoad={() => {
          setLoadBgImage(false)
        }}
        style={[styles.bgImage1, loadBgImage && { opacity: 0 }]}
        source={{ uri: bg ? bg : `https://chambaonline.pro/uploads/${bgPhoto}`, }}
      />
      <TouchableOpacity
        onPress={() => ref.current?.present()}
        style={styles.editIcon1}>
        <EditSvg />
      </TouchableOpacity>


      <TouchableOpacity style={styles.avatarWrapper1} activeOpacity={1} onPress={() => setChangeAvatar(!changeAvatar)}>
        <View style={[styles.shadow, styles.avatar]}>
          <Image
            style={styles.img}
            source={{ uri: imgUrl ? imgUrl : `https://chambaonline.pro/uploads/${user.avatar}`, }}
          />
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: -50, backgroundColor: 'white', width: width, borderTopLeftRadius: 30, borderTopEndRadius: 30, height: 100, justifyContent: 'flex-end', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, width: '100%', justifyContent: 'center', }}>
          <Text style={[Styles.darkMedium16, { textAlign: 'center' }]}>{user?.name}</Text>
          {user.data.star > 0 && <View style={{ marginTop: 3, left: 5 }}>
            <CheckMarkUserSvg />
          </View>}
        </View>
        <Text style={[Styles.darkMedium14, { width: '100%', textAlign: 'center' }]}>{user.description}</Text>
      </View>
    </View>
  </View>
})

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  bgImage1: {
    objectFit: 'cover',
    width: width,
    height: 280,
    borderRadius: 10,
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
  },
  editIcon1: {
    position: 'absolute',
    top: 50,
    zIndex: 9999,
    right: 10,
  }
});
