import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { VidioComponent } from './post/VidioComponent';
import { Styles } from '../styles/Styles';

const windowWidth = Dimensions.get('window').width;

const SliderImage = React.memo(({ data, item, long, height, index, setScrollEnabled, viewableItems }) => {

  const [D, setD] = useState(data.description)

  useEffect(() => {
    let desc = data.description
    if (data.description && data.description[0] == '[') {
      desc = JSON.parse(data.description)
    }
    setD(desc)
  }, [data.description])

  return <View>
    {(!long && (Array.isArray(D) ? D[index] : D)) && <View style={styles.hover}>
      <Text style={[Styles.whiteSemiBold12]}>
        {Array.isArray(D) ? D[index] : D}
      </Text>
    </View>}
    {item.video ?
      <VidioComponent
        active={active == index}
        setScrollEnabled={(e) => setScrollEnabled(e)}
        viewableItems={viewableItems} music={data.music_name} item={item} /> :
      <FastImage
        style={[{ height: height }, styles.img]}
        source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }}
        resizeMode={FastImage.resizeMode.cover}
      />
    }
  </View>

}, (prevProps, nextProps) => {
  return (
    prevProps.item.photo === nextProps.item.photo &&
    prevProps.long === nextProps.long &&
    prevProps.index === nextProps.index &&
    prevProps.data === nextProps.prevProps &&
    process.viewableItems === nextProps.viewableItems
  )
});

export default SliderImage;


const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    flexShrink: 0,
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
