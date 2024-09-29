import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { StartSvg } from "../../assets/svg/Svgs"
import React, { useCallback, useState } from "react";
import FastImage from "react-native-fast-image";
import { useFocusEffect } from "@react-navigation/native";
import { Skeleton } from "../Skeleton";

const windowWidth = Dimensions.get('window').width;

export const ImageComponent = React.memo(({ video, photo, onPress }) => {
  const [loading, setLoading] = useState(true)
  const [disabled, setDisabled] = useState(false)
  useFocusEffect(
    useCallback(() => {
      setDisabled(false)
    }, [])
  );
  return <TouchableOpacity disabled={disabled} activeOpacity={1} onPress={() => {
    onPress()
    setDisabled(true)
  }}>
    {video &&
      <View style={styles.playerIcone}>
        <StartSvg />
      </View>
    }
    {loading &&
      <Skeleton
        width={windowWidth / 2 - 25}
        height={windowWidth / 2 - 25}
        style={{ borderRadius: 15, marginBottom: 10 }}
      />
    }
    <FastImage
      onLoad={() => {
        setLoading(false)
      }}
      style={styles.img}
      source={{ uri: `https://chambaonline.pro/uploads/${photo}`, }}
      resizeMode={FastImage.resizeMode.cover}
    />

  </TouchableOpacity>
}, (prevProps, nextProps) => {
  return prevProps.video === nextProps.video &&
    prevProps.photo === nextProps.photo &&
    prevProps.my === nextProps.my &&
    prevProps.data === nextProps.data;
})

const styles = StyleSheet.create({
  img: {
    width: windowWidth / 2 - 25,
    height: windowWidth / 2 - 25,
    borderRadius: 15,
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

