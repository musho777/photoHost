import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { Controler } from './component/Controler';

export const VidioModal = forwardRef(({

}, ref) => {
  const [first, setFirst] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(0);
  const [fullScreen, setFullScreen] = useState(false)
  const navigation = useNavigation()

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
  }, [volume]);


  return <Modal
    visible={true}
    style={{ flex: 1 }}
  >
    <View style={{ width: '100%', height: '100%', zIndex: 9999999 }}>
      <View style={{ position: 'relative', height: 570, width: '100%', zIndex: 9999 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => {
            setCurrentId(item.id);
            setShowStartButton(true);
          }}
          style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'red' }}
        >
          {((showStartButton || first) && !big) &&
            <Controler
              setShowStartButton={(e) => setShowStartButton(e)}
              setCurrentTime={(e) => setCurrentTime(e)}
              ref={ref}
              currentTime={currentTime}
              big={big}
              setFullScreen={(e) => setFullScreen(e)}
              duration={duration}
              setVolume={(e) => setVolume(e)}
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
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
})

const styles = StyleSheet.create({
  Vidio: {
    width: '100%',
    height: 570,
    position: 'relative',
  },
});
