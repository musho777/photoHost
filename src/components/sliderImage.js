import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;

const SliderImage = React.memo(({ item, height }) => {

  const [loading, setLoading] = useState(true)

  return <View>
    {loading && <View style={[styles.loading, { height: height }]}>
      <ActivityIndicator color='#FFC24B' size={"large"} />
    </View>}
    <FastImage
      style={[{ height: height }, styles.img]}
      source={{
        uri: `https://chambaonline.pro/uploads/${item.photo}`,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable
      }}
      fallback={false}
      onLoad={() => {
        setLoading(false)
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  </View>

}, (prevProps, nextProps) => {
  return (
    prevProps.long === nextProps.long &&
    prevProps.index === nextProps.index &&
    prevProps.description === nextProps.description
  )
});

export default SliderImage;


const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    flexShrink: 0,
    backgroundColor: '#dedcdc'
  },
  hover: {
    marginHorizontal: 7,
    zIndex: 99999,
    backgroundColor: "rgba(0,0,0,0.7)",
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 3,
    top: 50,
    height: 'auto',
  },
  loading: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    width: '100%'
  }
});
