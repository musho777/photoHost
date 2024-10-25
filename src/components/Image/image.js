import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { StartSvg } from "../../assets/svg/Svgs"
import React, { useCallback, useState } from "react";
import FastImage from "react-native-fast-image";
import { useFocusEffect } from "@react-navigation/native";
import { Skeleton } from "../Skeleton";

const windowWidth = Dimensions.get('window').width;

export const ImageComponent = React.memo(({ background, video, photo, onPress, color, text }) => {
  const [loading, setLoading] = useState(true)
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
      {background == 1 &&
        <View>
          <Text style={{ position: 'absolute', zIndex: 9999, color: color }}>{text}</Text>
          <Image
            style={styles.img}
            source={require('../../assets/img/fon1.png')}
          />
        </View>
      }
      {background == 2 &&
        <View style={[styles.img, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ position: 'absolute', zIndex: 9999, color: color }}>{text}</Text>
          <Image
            style={styles.img}
            source={require('../../assets/img/fon2.jpg')}
          />
        </View>
      }
      {background == 3 &&
        <View style={[styles.img, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ position: 'absolute', zIndex: 9999, color: color }}>{text}</Text>
          <Image
            style={styles.img}
            source={require('../../assets/img/fon3.jpg')}
          />
        </View>
      }
      {background == 4 &&
        <View style={[styles.img, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ position: 'absolute', zIndex: 9999, color: color }}>{text}</Text>
          <Image
            style={styles.img}
            source={require('../../assets/img/fon4.jpg')}
          />
        </View>
      }
      {background == 5 &&
        <View style={[styles.img, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ position: 'absolute', zIndex: 9999, color: color }}>{text}</Text>
          <Image
            style={styles.img}
            source={require('../../assets/img/fon5.jpg')}
          />
        </View>
      }
    </TouchableOpacity>
  }
  return <TouchableOpacity disabled={disabled} activeOpacity={1} onPress={() => {
    onPress()
    setDisabled(true)
  }}>
    {video &&
      <View style={styles.playerIcone}>
        <StartSvg />
      </View>
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
    prevProps.data === nextProps.data &&
    prevProps.background === nextProps.background &&
    prevProps.color === nextProps.color &&
    prevProps.text === nextProps.text


})

const styles = StyleSheet.create({
  img: {
    width: windowWidth / 2 - 25,
    height: windowWidth / 2 - 25,
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

