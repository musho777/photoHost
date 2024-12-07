import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { StartSvg } from "../../assets/svg/Svgs"
import React, { useCallback, useState } from "react";
import FastImage from "react-native-fast-image";
import { useFocusEffect } from "@react-navigation/native";
import { InReview } from "../InReview";

const windowWidth = Dimensions.get('window').width;

export const ImageComponent = React.memo(({ adminStatus, background, video, photo, onPress, color, text, fontFamily }) => {

  const fone = [
    require('../../assets/img/fon/1.jpg'),
    require('../../assets/img/fon/2.jpg'),
    require('../../assets/img/fon/3.jpg'),
    require('../../assets/img/fon/4.jpg'),
    require('../../assets/img/fon/5.jpg'),



    require('../../assets/img/fon/6.jpg'),
    require('../../assets/img/fon/10.jpg'),
    require('../../assets/img/fon/11.jpg'),
    require('../../assets/img/fon/12.jpg'),
    require('../../assets/img/fon/13.jpg'),
    require('../../assets/img/fon/14.jpg'),
    require('../../assets/img/fon/15.jpg'),
    require('../../assets/img/fon/20.jpg'),
    require('../../assets/img/fon/21.jpg'),
    require('../../assets/img/fon/23.webp'),
    require('../../assets/img/fon/24.webp'),
    require('../../assets/img/fon/26.webp'),
    require('../../assets/img/fon/27.webp'),
    require('../../assets/img/fon/30.webp'),
    require('../../assets/img/fon/35.jpeg'),
    require('../../assets/img/fon/36.jpeg'),
    require('../../assets/img/fon/37.jpeg'),
    require('../../assets/img/fon/38.jpeg'),
    require('../../assets/img/fon/39.jpeg'),
    require('../../assets/img/fon/40.jpeg'),
    require('../../assets/img/fon/41.jpeg'),
    require('../../assets/img/fon/42.jpeg'),
    require('../../assets/img/fon/43.jpeg'),
    require('../../assets/img/fon/44.jpeg'),
    require('../../assets/img/fon/45.jpeg'),
    require('../../assets/img/fon/46.jpeg'),
    require('../../assets/img/fon/47.jpeg'),
    require('../../assets/img/fon/48.jpeg'),
    require('../../assets/img/fon/49.jpeg'),
    require('../../assets/img/fon/50.jpeg'),
    require('../../assets/img/fon/51.jpeg'),
    require('../../assets/img/fon/52.jpeg'),
    require('../../assets/img/fon/53.jpeg'),
    require('../../assets/img/fon/54.jpeg'),
    require('../../assets/img/fon/55.jpeg'),
    require('../../assets/img/fon/56.jpeg'),
    require('../../assets/img/fon/57.jpeg'),
    require('../../assets/img/fon/58.jpeg'),
    require('../../assets/img/fon/59.jpeg'),
    require('../../assets/img/fon/60.jpeg'),
    require('../../assets/img/fon/61.jpeg'),
    require('../../assets/img/fon/62.jpeg'),
    require('../../assets/img/fon/63.jpeg'),
    require('../../assets/img/fon/64.jpeg'),
    require('../../assets/img/fon/65.jpeg'),
    require('../../assets/img/fon/66.jpeg'),
    require('../../assets/img/fon/67.jpeg'),
    require('../../assets/img/fon/68.jpeg'),
    require('../../assets/img/fon/69.jpeg'),
    require('../../assets/img/fon/70.jpeg'),
    require('../../assets/img/fon/71.jpeg'),
    require('../../assets/img/fon/72.jpeg'),
    require('../../assets/img/fon/73.jpeg'),
    require('../../assets/img/fon/74.jpeg'),
    require('../../assets/img/fon/75.jpeg'),
    require('../../assets/img/fon/76.jpeg'),
    require('../../assets/img/fon/77.jpeg'),
    require('../../assets/img/fon/78.jpeg'),
    require('../../assets/img/fon/80.jpeg'),
    require('../../assets/img/fon/81.jpeg'),
    require('../../assets/img/fon/82.jpeg'),
    require('../../assets/img/fon/83.jpeg'),
    require('../../assets/img/fon/84.jpeg'),
    require('../../assets/img/fon/86.jpeg'),
    require('../../assets/img/fon/87.jpeg'),
    require('../../assets/img/fon/88.jpeg'),
    require('../../assets/img/fon/89.jpeg'),
    require('../../assets/img/fon/90.jpeg'),
    require('../../assets/img/fon/91.jpeg'),
    require('../../assets/img/fon/92.jpeg'),
    require('../../assets/img/fon/93.jpeg'),
    require('../../assets/img/fon/94.jpeg'),
    require('../../assets/img/fon/95.jpeg'),
    require('../../assets/img/fon/96.jpeg'),
    require('../../assets/img/fon/97.jpeg'),
    require('../../assets/img/fon/98.jpeg'),
    require('../../assets/img/fon/99.jpeg'),
    require('../../assets/img/fon/100.jpeg'),
  ]


  const [disabled, setDisabled] = useState(false)
  useFocusEffect(
    useCallback(() => {
      setDisabled(false)
    }, [])
  );
  if (background) {
    return <TouchableOpacity disabled={disabled} activeOpacity={1} onPress={() => {
      onPress()
      setDisabled(true)
    }}>
      <View style={[styles.img, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ position: 'absolute', zIndex: 9999, color: color, paddingHorizontal: 10, fontFamily: fontFamily }}>{text}</Text>
        <Image
          style={styles.img}
          source={fone[background - 1]}
        />
      </View>
    </TouchableOpacity>
  }
  return <TouchableOpacity disabled={disabled} activeOpacity={1} onPress={() => {
    onPress()
    setDisabled(true)
  }}>
    {adminStatus == 0 &&
      <InReview borderRadius={15} height={windowWidth / 2 - 19} />
    }
    {video &&
      <View style={styles.playerIcone}>
        <StartSvg />
      </View>
    }
    <FastImage
      style={styles.img}
      source={{ uri: `https://chambaonline.pro/uploads/${photo}`, }}
      resizeMode={FastImage.resizeMode.cover}
    />

  </TouchableOpacity>
}, (prevProps, nextProps) => {
  return prevProps.video === nextProps.video &&
    prevProps.photo === nextProps.photo &&
    prevProps.my === nextProps.my &&
    prevProps.data === nextProps.data &&
    prevProps.background === nextProps.background &&
    prevProps.color === nextProps.color &&
    prevProps.text === nextProps.text


})

const styles = StyleSheet.create({
  img: {
    width: windowWidth / 2 - 19,
    height: windowWidth / 2 - 19,
    borderRadius: 15,
    backgroundColor: '#dedcdc'

  },

  playerIcone: {
    position: 'absolute',
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
});

