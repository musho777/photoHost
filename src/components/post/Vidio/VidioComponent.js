import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { Controler } from './component/Controler';
import Slider from 'react-native-slider'
import { Styles } from '../../../styles/Styles';



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
}, ref) => {
  const [first, setFirst] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(0);
  const [fullScreen, setFullScreen] = useState(false)
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)

  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

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
        {((showStartButton || first) && !big) &&
          <Controler
            setShowStartButton={(e) => setShowStartButton(e)}
            setCurrentTime={(e) => setCurrentTime(e)}
            ref={ref}
            currentTime={currentTime}
            big={big}
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
