import React, { useMemo, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Styles } from '../styles/Styles';

const windowWidth = Dimensions.get('window').width;

const SliderImage = React.memo(({ description, item, long, height, index }) => {

  const [loading, setLoading] = useState(true)
  const Description = useMemo(() => {
    let desc = "";
    try {
      desc = JSON.parse(description);
    } catch (error) {
      console.error('Failed to parse description:', error);
    }
    return desc;
  }, [description]);

  console.log(description, 'des')
  return <View>
    {(!long && (description && Description?.length > 0)) && <View style={styles.hover}>
      <Text style={[Styles.whiteSemiBold12]}>
        {Description[index]}
      </Text>
    </View>}
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
