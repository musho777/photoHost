import React, { useMemo, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator, Text, Animated, TouchableOpacity, Easing } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Styles } from '../styles/Styles';
import { InReview } from './InReview'
import RenderHtml from 'react-native-render-html';


const windowWidth = Dimensions.get('window').width;

const SliderImage = React.memo(({ adminStatus, item, height, description, index, setIsExpanded, color, font }) => {
  const isHTML = (str) => {
    const htmlPattern = /<\/?[a-z][\s\S]*>/i;
    return htmlPattern.test(str);
  };

  // const [loading, setLoading] = useState(true)
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

  const textOnly = Description[index]?.replace(/<[^>]+>/g, '');
  const truncateText = (text) => {
    let modifiedContent = Description[index];
    if (!modifiedContent?.includes('color:')) {
      // Add a default white color to the body if no color is specified
      modifiedContent = `<div style="color: white;">${modifiedContent}</div>`;
    } else {
      // If color is defined, ensure all color: black is replaced with white
      modifiedContent = modifiedContent?.replace(/color:\s*(black|#000000|#000)/g, 'color: white');
    }

    if (textOnly?.length > MAX_Height) {
      return modifiedContent.slice(0, MAX_Height);
    }
    return modifiedContent;
  };
  const truncatedText = truncateText(Description[index]);

  return <View >
    {/* {loading && <View style={[styles.loading, { height: height }]}>
      <ActivityIndicator color='#FFC24B' size={"large"} />
    </View>} */}
    <View>
      {adminStatus == 0 &&
        <InReview borderRadius={0} height={height} />
      }
      <FastImage
        style={[{ height: height }, styles.img]}
        source={{
          uri: `https://chambaonline.pro/uploads/${item.photo}`,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable
        }}
        fallback={false}
        // onLoad={() => {
        //   setLoading(false)
        // }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
    {<View style={{ marginVertical: 10, position: 'absolute', top: 45, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5, marginHorizontal: 5 }}>

      {(Description && Description[index]) && !showText &&
        <View style={[{ paddingHorizontal: 10 }]}>
          <View>
            {Description[index] &&
              <View>
                {isHTML(Description[index]) ?
                  // textOnly?.length
                  <RenderHtml
                    contentWidth={Description[index].length}
                    source={{ html: truncatedText }}
                  /> :
                  <Text style={[Styles.darkMedium13, { color: color ?? "white", fontFamily: font }]}>
                    {`${Description[index].slice(0, MAX_Height)}`}
                  </Text>
                }
              </View>
            }
            {isHTML(Description[index]) ?
              <View style={{ marginBottom: 3 }}>
                {truncatedText > MAX_Height && <TouchableOpacity
                  onPress={() => startAnimation(true)}
                >
                  <Text style={[Styles.balihaiMedium13, { color: 'white' }]}>Показать больше</Text>
                </TouchableOpacity>}
              </View> :
              <View style={{ marginBottom: 3 }}>
                {Description[index].length > MAX_Height && <TouchableOpacity
                  onPress={() => startAnimation(true)}
                >
                  <Text style={[Styles.balihaiMedium13, { color: 'white' }]}>Показать больше</Text>
                </TouchableOpacity>}
              </View>}
          </View>
        </View>
      }
    </View>}

    <Animated.View style={[{ position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%', borderTopRightRadius: 10, borderTopLeftRadius: 10 }, { height: heightAnim }]}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.textScrollContainer}>
        <TouchableOpacity style={{ padding: 10 }} activeOpacity={1}>
          {Description && Description[index] &&
            <View>
              {isHTML(Description[index]) ?
                <RenderHtml
                  contentWidth={100}
                  source={{ html: Description[index] }}
                /> :
                <Text style={[Styles.darkMedium13]}>
                  {Description[index]}
                </Text>
              }
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
    prevProps.description === nextProps.description &&
    prevProps.color === nextProps.color &&
    prevProps.font === nextProps.font

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
