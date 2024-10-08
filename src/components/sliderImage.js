import React, { useMemo } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Styles } from '../styles/Styles';

const windowWidth = Dimensions.get('window').width;

const SliderImage = React.memo(({ description, item, long, height, index }) => {
  const Description = useMemo(() => {
    let desc = description;
    if (description && description[0] === '[') {
      try {
        desc = JSON.parse(description);
      } catch (error) {
        console.error('Failed to parse description:', error);
      }
    }
    return desc;
  }, [description]);

  return <View>
    {(!long && (Array.isArray(Description) ? Description[index] : Description)) && <View style={styles.hover}>
      <Text style={[Styles.whiteSemiBold12]}>
        {Array.isArray(Description) ? Description[index] : Description}
      </Text>
    </View>}
    <FastImage
      style={[{ height: height }, styles.img]}
      source={{
        uri: `https://chambaonline.pro/uploads/${item.photo}`,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable
      }}
      fallback={false}
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
  }
});
