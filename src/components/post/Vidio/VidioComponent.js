import { BackHandler, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { Controler } from './component/Controler';
import Sliders from '@react-native-community/slider';



export const VidioComponent = forwardRef(({
  duration,
  currentTime,
  setCurrentTime,
  item,
  big,
  viewableItems,
  active,
  setDuration,
  onSeek
}, ref) => {
  const [first, setFirst] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(0);
  const [fullScreen, setFullScreen] = useState(false)
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)

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
    const timer = null
    if (showStartButton) {
      setTimeout(() => {
        setShowStartButton(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showStartButton]);

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
            volume={volume}
            setFullScreen={(e) => setFullScreen(e)}
            duration={duration}
            setVolume={(e) => setVolume(e)}
            paused={paused}
            setPaused={(e) => setPaused(e)}
            setFirst={(e) => setFirst(e)}
            full={fullScreen}
            loading={loading}
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
            {((showStartButton || first)) &&
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
              <Sliders
                style={styles.seekSlider}
                value={currentTime}
                minimumValue={0}
                maximumValue={duration}
                onValueChange={onSeek}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFC24B"
              />
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
    bottom: 5,
    position: 'absolute',
    zIndex: 99999,
    width: '100%',
    height: 10,
  },
  seekSlider: {
    width: '100%',
    height: 40,
  }
});
