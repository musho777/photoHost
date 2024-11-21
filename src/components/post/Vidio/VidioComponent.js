import { Animated, Dimensions, Easing, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { Controler } from './component/Controler';
import Slider from 'react-native-slider'
import { Styles } from '../../../styles/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreenAction } from '../../../store/action/action';

const windowHeight = Dimensions.get('window').height;


export const VidioComponent = forwardRef(({
  duration,
  currentTime,
  setCurrentTime,
  item,
  big,
  viewableItems,
  active,
  setDuration,
  onSeek,
  description,
  index,
  setIsExpanded,
  height,
  id
}, ref) => {
  const [first, setFirst] = useState(true);
  const MAX_Height = 40;
  const dispatch = useDispatch()
  const [showStartButton, setShowStartButton] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(0);
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [showText, setShowText] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false);
  const [start, setStart] = useState(null)
  const [full, setFull] = useState(false)
  const { fullScreen } = useSelector((st) => st.fullScreenData)

  const handleBuffer = ({ isBuffering }) => {
    setIsBuffering(isBuffering);
    if (isBuffering) {
      setLoading(true)
      // setPaused(true);
    }
    else {
      setLoading(false)
    }
  };



  useEffect(() => {
    setPaused(true)
  }, [active])


  useEffect(() => {
    if (viewableItems?.length) {
      if (currentId === viewableItems[0]?.item.id && !viewableItems[0]?.isViewable) {
        setFirst(true);
        setPaused(true)
      } else if ((currentId !== viewableItems[0]?.item.id) && viewableItems[0]?.item.id && currentId) {
        setFirst(true);
        setPaused(true)
      }
    }
  }, [viewableItems]);



  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fullScreen) {
        if (!paused) {
          setShowStartButton(false);
        }
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [paused, showStartButton]);

  const ChangeCurentTime = () => {
    if (!isBuffering) {
      if (currentTime <= duration) {
        setCurrentTime(currentTime + 0.251);
      } else {
        setCurrentTime(0);
        setPaused(false);
        ref.current.seek(0);
      }
    }
  };





  const handleLoad = (data) => {
    setDuration(data.duration);
    setVolume(1)
    setLoading(false)
    ref.current.seek(currentTime)
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setFirst(true)
      setPaused(true)
    });
    return unsubscribe;
  }, [navigation]);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startAnimation = (show) => {
    setIsExpanded(show)
    setShowText(!showText)
    // setIsExpanded()
    Animated.timing(heightAnim, {
      toValue: show ? 400 : 0,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };


  const Description = useMemo(() => {
    let desc = "";
    try {
      desc = JSON.parse(description);
    } catch (error) { }
    return desc;
  }, [description]);

  return <View style={{ height: !fullScreen ? height : windowHeight, justifyContent: 'center' }}>
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => {
        setCurrentId(item.id);
        setShowStartButton(true);
      }}

      style={{ height: height }}
    >
      {(first && paused) &&
        <FastImage
          style={[styles.Vidio, { height: height }]}
          source={{
            uri: `https://chambaonline.pro/uploads/${item.photo}`,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable
          }}
          fallback={false}
          resizeMode={FastImage.resizeMode.cover}
        />
      }
      <Video
        ref={ref}
        paused={paused}
        repeat={false}
        volume={volume}
        style={[styles.Vidio, { height: height }, first && { opacity: 0 }]}
        source={{ uri: `https://chambaonline.pro/uploads/${item.video}`, cache: true }}
        resizeMode={'cover'}
        // onFullscreenPlayerWillPresent={() => {
        // }}
        // onFullscreenPlayerWillDismiss={() => {
        //   setPaused(true)
        // }}
        onProgress={(data) => ChangeCurentTime(data)}
        useTextureView={false}
        onLoad={(data) => handleLoad(data)}
        onBuffer={handleBuffer}
        onEnd={() => {
          setCurrentTime(0);
          setPaused(true);
          ref.current?.seek(0);
        }}
      />
    </TouchableOpacity>
    {fullScreen && <View style={styles.slider}>
      <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(currentTime)}</Text>
      <Slider
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        style={styles.seekSlider}
        minimumTrackTintColor="#FFFF"
        maximumTrackTintColor="#ababab"
        thumbTintColor="#FFC24B"
        onValueChange={onSeek}
        thumbStyle={{ width: 13, height: 13 }}
        trackStyle={{ height: 2 }}
      />
      <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(duration)}</Text>
    </View>}
    {((showStartButton || first)) &&
      <Controler
        setShowStartButton={(e) => setShowStartButton(e)}
        setCurrentTime={(e) => setCurrentTime(e)}
        ref={ref}
        currentTime={currentTime}
        setStart={(e) => setStart(e)}
        full={fullScreen}
        start={start}
        volume={volume}
        setFullScreen={(e) => {
          setFull(!full)
          dispatch(FullScreenAction(!full, id))
        }}
        duration={duration}
        setVolume={(e) => setVolume(e)}
        showStartButton={showStartButton}
        paused={paused}
        setPaused={(e) => setPaused(e)}
        setFirst={(e) => setFirst(e)}
        loading={loading}
        id={item.id}
      />
    }

    <View style={{ marginVertical: 10, position: 'absolute', top: 40, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5, marginHorizontal: 5 }}>
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

    <Animated.View style={[{ position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%' }, { height: heightAnim }]}>
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
})

const styles = StyleSheet.create({
  Vidio: {
    width: '100%',
    // height: 570,
    position: 'relative',
  },
  slider: {
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  seekSlider: {
    width: '80%',
    height: 50,
    // bottom: -25,
    // position: 'absolute',
    zIndex: 999999999,
  },
  full: {
    // position: 'absolute',
    height: 100,
  }
});
