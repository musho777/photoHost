import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator, Text, Animated, TouchableOpacity, Easing } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Styles } from '../styles/Styles';

const windowWidth = Dimensions.get('window').width;

const SliderImage = React.memo(({ item, height, description, index, setIsExpanded }) => {

  const [loading, setLoading] = useState(true)
  const heightAnim = useRef(new Animated.Value(0)).current;
  // const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(false)
  const MAX_Height = 40;
  const Description = useMemo(() => {
    let desc = "";
    try {
      desc = JSON.parse(description);
    } catch (error) { }
    return desc;
  }, [description]);

  const startAnimation = (show) => {
    setIsExpanded(show)
    setShowText(!showText)
    // setIsExpanded()
    Animated.timing(heightAnim, {
      toValue: show ? height - 70 : 0,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return <View >
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
    <View style={{ marginVertical: 10, position: 'absolute', top: 45, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5, marginHorizontal: 5 }}>
      {(Description && Description[index]) && !showText &&
        <View style={[{ paddingHorizontal: 10 }]}>
          <View>
            {Description[index] &&
              <View>
                <Text style={[Styles.darkMedium13, { color: 'white' }]}>
                  {`${Description[index].slice(0, MAX_Height)}`}
                </Text>
              </View>
            }
            {Description[index].length > MAX_Height && <TouchableOpacity
              onPress={() => startAnimation(true)}
            >
              <Text style={[Styles.balihaiMedium13, { color: 'white' }]}>Показать больше</Text>
            </TouchableOpacity>}
          </View>
        </View>
      }
    </View>

    <Animated.View style={[{ position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%', borderTopRightRadius: 10, borderTopLeftRadius: 10 }, { height: heightAnim }]}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.textScrollContainer}>
        <TouchableOpacity style={{ padding: 10 }} activeOpacity={1}>
          {Description && Description[index] &&
            <View>
              <Text style={[Styles.darkMedium13]}>
                {Description[index]}
              </Text>
            </View>
          }
          {Description && Description[index] && <TouchableOpacity onPress={() => startAnimation(false)}>
            <Text style={[Styles.balihaiMedium13]}>
              Cвернуть
            </Text>
          </TouchableOpacity>}
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>

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
  textScrollContainer: {
    maxHeight: 300,  // Limit height to enable scrolling within this area
    paddingRight: 10, // Add some padding for better readability
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
