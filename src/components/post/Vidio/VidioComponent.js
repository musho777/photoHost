import { Animated, Easing, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { Controler } from './component/Controler';
import Slider from 'react-native-slider'
import { Styles } from '../../../styles/Styles';
import { ScrollView } from 'react-native-gesture-handler';



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
  setIsExpanded
}, ref) => {
  const [first, setFirst] = useState(true);
  const MAX_Height = 40;

  const [showStartButton, setShowStartButton] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(0);
  const [fullScreen, setFullScreen] = useState(false)
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [showText, setShowText] = useState(false)


  const [start, setStart] = useState(null)

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
    if (currentTime <= duration) {
      setCurrentTime(currentTime + 0.251);
    } else {
      setCurrentTime(0);
      setPaused(true);
      ref.current.seek(0);
    }
  };




  const handleLoad = useCallback((data) => {
    setDuration(data.duration);
    setVolume(1)
    setLoading(false)
  }, []);


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
      toValue: show ? 300 : 0,
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


  return (
    <View style={{ position: 'relative', height: 570 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => {
          setCurrentId(item.id);
          setShowStartButton(true);
        }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        {((showStartButton || first)) &&
          <Controler
            setShowStartButton={(e) => setShowStartButton(e)}
            setCurrentTime={(e) => setCurrentTime(e)}
            ref={ref}
            currentTime={currentTime}
            setStart={(e) => setStart(e)}
            start={start}
            volume={volume}
            setFullScreen={(e) => setFullScreen(e)}
            duration={duration}
            setVolume={(e) => setVolume(e)}
            showStartButton={showStartButton}
            paused={paused}
            setPaused={(e) => setPaused(e)}
            setFirst={(e) => setFirst(e)}
            full={fullScreen}
            big={big}
            loading={loading}
            id={item.id}
          />

        }
        {(first && paused) &&
          <FastImage
            style={styles.Vidio}
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
          fullscreen={fullScreen}
          volume={volume}
          style={[styles.Vidio, first && { opacity: 0 }]}
          source={{ uri: `https://chambaonline.pro/uploads/${item.video}`, cache: true }}
          resizeMode={'cover'}
          onFullscreenPlayerWillPresent={() => setFullScreen(true)} // Set fullscreen state
          onFullscreenPlayerWillDismiss={() => setFullScreen(false)} // Reset fullscreen state
          onProgress={(data) => ChangeCurentTime(data)}
          useTextureView={false}
          onLoad={(data) => handleLoad(data)}
          onEnd={() => {
            setCurrentTime(0);
            setPaused(true);
            ref.current.seek(0);
          }}
        />
      </TouchableOpacity>
      <View style={{ marginVertical: 10, position: 'absolute', bottom: 40, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5, marginHorizontal: 5 }}>
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
                <Text style={[Styles.darkMedium13, { color: 'white' }]}>
                  {Description[index]}
                </Text>
              </View>
            }
            {Description && Description[index] && <TouchableOpacity onPress={() => startAnimation(false)}>
              <Text style={[Styles.balihaiMedium13]}>
                Показать меньше
              </Text>
            </TouchableOpacity>}
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      <Modal
        onRequestClose={() => setFullScreen(false)}
        visible={fullScreen}
        supportedOrientations={['portrait', 'landscape']}
      >
        <View style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => {
              setCurrentId(item.id);
              setShowStartButton(true);
            }}
            style={{ width: '100%', height: 570 }}
          >
            {((showStartButton || first || fullScreen)) &&
              <Controler
                setShowStartButton={(e) => setShowStartButton(e)}
                setCurrentTime={(e) => setCurrentTime(e)}
                ref={ref}
                currentTime={currentTime}
                setFullScreen={(e) => setFullScreen(e)}
                duration={duration}
                setVolume={(e) => setVolume(e)}
                volume={volume}
                paused={paused}
                setPaused={(e) => setPaused(e)}
                setFirst={(e) => setFirst(e)}
                full={fullScreen}
                id={item.id}
              />}
            {(first && paused) &&
              <FastImage
                style={styles.Vidio}
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
              fullscreen={fullScreen}
              volume={volume}
              style={[styles.Vidio, first && { opacity: 0 }]}
              source={{ uri: `https://chambaonline.pro/uploads/${item.video}`, cache: true }}
              resizeMode={'cover'}
              onFullscreenPlayerWillPresent={() => setFullScreen(true)} // Set fullscreen state
              onFullscreenPlayerWillDismiss={() => setFullScreen(false)} // Reset fullscreen state
              onProgress={(data) => ChangeCurentTime(data)}
              useTextureView={false}
              onLoad={(data) => handleLoad(data)}
              onEnd={() => {
                setCurrentTime(0);
                setPaused(true);
                ref.current.seek(0);
              }}
            />
            <View style={styles.slider}>
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
            </View>

          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
})

const styles = StyleSheet.create({
  Vidio: {
    width: '100%',
    height: 570,
    position: 'relative',
  },
  slider: {
    bottom: -25,
    position: 'absolute',
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
  }
});
