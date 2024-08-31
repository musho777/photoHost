import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { StartSvg } from "../../assets/svg/Svgs"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import Video from 'react-native-video';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "../Skeleton";

const windowWidth = Dimensions.get('window').width;

export const ImageComponent = React.memo(({ video, photo, my, data }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [loading, setLoaidng] = useState(false)
  const [videoPath, setVideoPath] = React.useState(null);
  useFocusEffect(
    useCallback(() => {
      setLoaidng(true)
      setPaused(false)
    }, [])
  );

  const navigation = useNavigation()
  return <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('SinglPageScreen', { data: data, my: my })}>
    {video &&
      <View style={styles.playerIcone}>
        <StartSvg />
      </View>
    }
    {!video ?
      <Image
        style={styles.img}
        source={{ uri: `https://chambaonline.pro/uploads/${photo}`, }}
      /> :
      <View>
        {loading &&
          <Skeleton
            width={windowWidth / 2 - 25}
            height={windowWidth / 2 - 25}
            style={{ borderRadius: 15 }}
          />
        }
        <Video
          ref={videoRef}
          paused={paused}
          repeat={false}
          style={[styles.img, loading && { width: 0, height: 0 }]}
          source={{ uri: `https://chambaonline.pro/uploads/${video}` }}
          resizeMode={'cover'}
          playInBackground={true}
          playWhenInactive={true}
          onLoad={(data) => {
            setPaused(true)
            setLoaidng(false)
          }}
          onEnd={() => {
            setPaused(true);
            videoRef?.current?.seek(0);
          }}
        />

      </View>
    }
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

