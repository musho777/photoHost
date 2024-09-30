import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import { AddSecSvg, AddSecSvg1, FullScrenn, MusicSvg, MuteSvg, Pause, StartSvg } from '../../assets/svg/Svgs';
import { Styles } from '../../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreen } from '../../store/action/action';
import FastImage from 'react-native-fast-image';


export const VidioComponent = forwardRef(({
  onSeek,
  duration,
  currentTime,
  setCurrentTime,
  music,
  item,
  big,
  viewableItems,
  setDuration,
  height
}, ref) => {
  const [first, setFirst] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(0);
  const dispatch = useDispatch()
  const { full } = useSelector((st) => st.fullScreen)

  const onPlayPausePress = () => {
    setFirst(false);
    setPaused(!paused);
    setShowStartButton(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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

  const AddCurrentTime = () => {
    const newTime = Math.min(currentTime + 5, duration);
    ref?.current?.seek(newTime);
    setCurrentTime(newTime)
    setShowStartButton(false);
  };

  const LakeCurrentTime = () => {
    const newTime = Math.max(currentTime - 5, 0);
    ref?.current?.seek(newTime);
    setCurrentTime(newTime)
    setShowStartButton(false);
  };

  useEffect(() => {
    const timer = null
    if (showStartButton) {
      setTimeout(() => {
        setShowStartButton(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showStartButton]);

  const ChangeVolume = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

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

  console.log(first && paused)

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

        {((showStartButton || first) && !big) && (
          <TouchableOpacity onPress={() => {
            setPaused(true)
            dispatch(FullScreen(!full))
          }} style={{ position: 'absolute', top: 60, right: 10, zIndex: 999 }}>
            <FullScrenn />
          </TouchableOpacity>
        )}
        {(showStartButton || first) && (
          <TouchableOpacity activeOpacity={1} onPress={ChangeVolume} style={[{ position: 'absolute', top: 100, zIndex: 9999, right: 10 }]}>
            {!volume ? <MuteSvg /> : <Image style={{ width: 25, height: 25 }} source={require('../../assets/img/Sound.png')} />}
          </TouchableOpacity>
        )}

        {(showStartButton || first) && (
          <View style={styles.playButton}>
            <TouchableOpacity style={{ transform: [{ rotate: '360deg' }] }} onPress={() => LakeCurrentTime()}>
              <AddSecSvg1 />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayPausePress}>
              {!paused ? <Pause /> : <StartSvg />}
            </TouchableOpacity>
            <TouchableOpacity onPress={AddCurrentTime}>
              <AddSecSvg />
            </TouchableOpacity>
          </View>
        )}
        {(first && paused) &&
          <FastImage
            style={styles.Vidio}
            onLoad={() => {
              console.log("39")
            }}
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
          fullscreen={full}
          volume={volume}
          style={[styles.Vidio, { height: height }, first && { opacity: 0 }]}
          source={{ uri: `https://chambaonline.pro/uploads/${item.video}`, cache: true }}
          resizeMode={'cover'}
          onFullscreenPlayerWillPresent={() => dispatch(FullScreen(true))} // Set fullscreen state
          onFullscreenPlayerWillDismiss={() => dispatch(FullScreen(false))} // Reset fullscreen state
          onProgress={(data) => ChangeCurentTime(data)}
          useTextureView={false}
          onLoad={(data) => handleLoad(data)}
          onEnd={() => {
            setCurrentTime(0);
            setPaused(true);
            ref.current.seek(0);
          }}
        />



        {full && <Modal
          visible={true}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => {
              setCurrentId(item.id);
              setShowStartButton(!showStartButton);
            }}

            style={{ justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'black' }}>
            {(showStartButton || first) && (
              <TouchableOpacity onPress={() => {
                setPaused(false)
                dispatch(FullScreen(!full))
              }} style={{ position: 'absolute', top: big ? 10 : 50, right: 10, zIndex: 999 }}>
                <FullScrenn />
              </TouchableOpacity>
            )}
            {(showStartButton || first) && (
              <View style={styles.playButton}>
                <TouchableOpacity style={{ transform: [{ rotate: '360deg' }] }} onPress={() => LakeCurrentTime()}>
                  <AddSecSvg1 />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPlayPausePress}>
                  {!paused ? <Pause /> : <StartSvg />}
                </TouchableOpacity>
                <TouchableOpacity onPress={AddCurrentTime}>
                  <AddSecSvg />
                </TouchableOpacity>
              </View>
            )}
            <Video
              ref={ref}
              paused={paused}
              repeat={false}
              fullscreen={full}
              volume={volume}
              style={[styles.Vidio]}
              source={{ uri: `https://chambaonline.pro/uploads/${item.video}`, cache: true }}
              resizeMode={'cover'}
              onFullscreenPlayerWillPresent={() => dispatch(FullScreen(true))} // Set fullscreen state
              onFullscreenPlayerWillDismiss={() => dispatch(FullScreen(false))} // Reset fullscreen state
              onProgress={(data) => ChangeCurentTime(data)}
              useTextureView={false}
              onLoad={(data) => handleLoad(data)}
              onEnd={() => {
                setPaused(true);
                ref.current.seek(0);
              }}
            />
            {(showStartButton || first) &&

              <TouchableOpacity activeOpacity={1} onPress={ChangeVolume} style={[{ position: 'absolute', top: 100, zIndex: 9999, right: 10 }]}>
                {!volume ? <MuteSvg /> : <Image style={{ width: 25, height: 25 }} source={require('../../assets/img/Sound.png')} />}
              </TouchableOpacity>
            }
            {(showStartButton || first) && (
              <View style={styles.music}>
                <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                  {music && <MusicSvg />}
                  <Text style={Styles.whiteSemiBold13}>{music}</Text>
                </View>
                <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
              </View>
            )}
            {(showStartButton || first) && (
              <TouchableOpacity style={[styles.controls, { bottom: 40, justifyContent: 'center' }]}>
                <Slider
                  style={styles.seekSlider}
                  value={currentTime}
                  minimumValue={0}
                  maximumValue={duration}
                  onValueChange={onSeek}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#FFC24B"
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </Modal>}



        <TouchableOpacity
          onPressIn={() => {
            setCurrentId(item.id);
          }}
          style={{ height: 60, width: '100%', position: 'absolute', bottom: 5 }}>

          {(showStartButton || first) && (
            <View style={styles.music}>
              <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                {music && <MusicSvg />}
                <Text style={Styles.whiteSemiBold13}>{music}</Text>
              </View>
              <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
            </View>
          )}
        </TouchableOpacity>


      </TouchableOpacity>
    </View>
  );
})

const styles = StyleSheet.create({
  playButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    zIndex: 999,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 70,
  },
  playIcon: {
    height: 50,
    resizeMode: "contain",
    width: 50,
  },
  music: {
    zIndex: 999,
    position: 'absolute',
    width: '100%',
    bottom: 10,
    flexDirection: 'column',
    paddingHorizontal: 14,
    color: 'white',
  },
  Vidio: {
    width: '100%',
    height: 570,
    position: 'relative',
  },
  controls: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    paddingRight: 15,
    zIndex: 9999,
  },
  seekSlider: {
    width: '90%',
    height: 50,
  },
});
