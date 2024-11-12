import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from "react-native"
import FastImage from "react-native-fast-image"
import { CheckMarkUserSvg, EditSvg, MenuSvg1 } from "../../../assets/svg/Svgs"
import { forwardRef, useState } from "react";
import { Styles } from "../../../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "../../../components/Skeleton";
import { ProfileImageSkeleton } from "../../../components/skeleton/profileImageSkeleton";


const { width } = Dimensions.get('window');

export const BigBgImage = forwardRef(({ changeAvatar, setChangeAvatar, user, bg, bgPhoto, imgUrl, setOpenBg }, ref) => {
  const navigation = useNavigation()
  const [loadBgImage, setLoadBgImage] = useState(true)

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.darkMedium16, { textAlign: 'center', paddingTop: 15, color: JSON.parse(user?.name)?.color?.title ? JSON.parse(user?.name)?.color?.title : "black", fontFamily: JSON.parse(user?.name)?.font }]}>{JSON.parse(user?.name)?.name}</Text>

    } catch (error) {
      return <Text style={[Styles.darkMedium16, { textAlign: 'center', paddingTop: 15, }]}> {user?.name}</Text >
    }
  }

  if (user.loading) {
    return <ProfileImageSkeleton big={true} />
  }
  return <View>
    {loadBgImage &&
      <Skeleton
        width={width}
        height={250}
        style={{ position: "absolute", borderRadius: 10 }}
      />
    }
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{ width: 50, height: 50, position: "absolute", top: 30, right: 0, zIndex: 9999, justifyContent: 'center', alignItems: 'center' }}
    >
      <MenuSvg1 />
    </TouchableOpacity>
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setOpenBg()}>
        <FastImage
          onLoad={() => {
            setLoadBgImage(false)
          }}
          style={[styles.bgImage1, loadBgImage && { opacity: 0 }]}
          source={{ uri: bg ? bg : `https://chambaonline.pro/uploads/${bgPhoto}` }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(e) => {
          e.preventDefault()
          e.stopPropagation()
          ref.current?.present()
        }}
        style={styles.editIcon1}>
        <EditSvg />
      </TouchableOpacity>


      <View style={styles.avatarWrapper1} activeOpacity={1} >
        <TouchableOpacity onPress={() => setChangeAvatar(!changeAvatar)} style={[styles.shadow, styles.avatar]}>
          <Image
            style={styles.img}
            source={{ uri: imgUrl ? imgUrl : `https://chambaonline.pro/uploads/${user.avatar}`, }}
          />
        </TouchableOpacity>
      </View>

    </View>
    <View style={{ marginTop: -50, backgroundColor: 'white', width: width, borderTopLeftRadius: 30, borderTopEndRadius: 30, minHeight: 100, justifyContent: 'flex-end', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 45, width: '100%', justifyContent: 'center', }}>
        {canParseJSON(user.name)}
        {user.data.star > 0 && <View style={{ marginTop: 3, left: 5 }}>
          <CheckMarkUserSvg />
        </View>}
      </View>
      {user?.description ? <Text style={[Styles.darkMedium14, { width: '100%', textAlign: 'center', color: JSON.parse(user?.description)?.color.title, fontFamily: JSON.parse(user?.description)?.font, paddingHorizontal: 10 }]}>{
        JSON.parse(user?.description)?.text
      }</Text> :
        <Text>
        </Text>
      }
    </View>
  </View>
})

const styles = StyleSheet.create({
  img: {
    width: 105,
    height: 105,
    borderRadius: 105,
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
    height: 250,
  },
  avatar: {
    width: 115,
    height: 115,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper1: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: -8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
  },
  editIcon1: {
    position: 'absolute',
    bottom: 70,
    zIndex: 9999999,
    right: 15,
  }
});
