import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import { AddSecSvg, AddSecSvg1, FullScrenn, MusicSvg, MuteSvg, Pause, StartSvg } from '../../assets/svg/Svgs';
import { Styles } from '../../styles/Styles';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreen } from '../../store/action/action';

const windowHeight = Dimensions.get('window').height;

export const VidioComponent = ({ music, setScrollEnabled = () => { }, item, big, setResizeVidio, viewableItems }) => {
  const [first, setFirst] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [holde, setHold] = useState(false);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(0);
  // const [full, setIsFullscreen] = useState(false);
  const dispatch = useDispatch()
  const { full } = useSelector((st) => st.fullScreen)
  const [width, setWidth] = useState(windowHeight)

  const onPlayPausePress = () => {
    setFirst(false);
    setPaused(!paused);
    setShowStartButton(false);
    setScrollEnabled(false);
  };

  const onSeek = (value) => {
    setHold(true);
    setCurrentTime(value);
    videoRef?.current?.seek(value);
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
    videoRef?.current?.seek(newTime);
    setCurrentTime(newTime);
    setShowStartButton(false);
  };

  const LakeCurrentTime = () => {
    const newTime = Math.max(currentTime - 5, 0);
    videoRef?.current?.seek(newTime);
    setCurrentTime(newTime);
    setShowStartButton(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!holde) {
        setShowStartButton(false);
        setScrollEnabled(false);
      } else {
        setHold(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [holde]);

  const ChangeVolume = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  const ChangeCurentTime = (data) => {
    if (currentTime <= duration) {
      setCurrentTime(currentTime + 0.251);
    } else {
      setCurrentTime(0);
      setPaused(true);
      videoRef.current.seek(0);
    }
  };
  useFocusEffect(
    useCallback(() => {
      setPaused(false);
      return () => {
        setPaused(true);
      };
    }, [])
  );

  useEffect(() => {
    if (big) {
      setWidth(windowHeight)
    }
    else {
      setWidth(windowHeight + 45)
    }
  }, [])

  return (
    <View style={{ position: 'relative', height: (big || full) ? width : 550 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => {
          setHold(true);
          setCurrentId(item.id);
          setShowStartButton(!showStartButton);
          setScrollEnabled(true);
        }}
        onPressOut={() => {
          setHold(false);
        }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        {(showStartButton || first) && (
          <TouchableOpacity onPress={() => dispatch(FullScreen(!full))} style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
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
          ref={videoRef}
          paused={paused}
          repeat={false}
          fullscreen={full}
          volume={volume}
          style={[styles.Vidio, (big || full) && { height: width }]}
          source={{ uri: `https://chambaonline.pro/uploads/${item.video}`, cache: true }}
          resizeMode={'cover'}
          onFullscreenPlayerWillPresent={() => dispatch(FullScreen(true))} // Set fullscreen state
          onFullscreenPlayerWillDismiss={() => dispatch(FullScreen(false))} // Reset fullscreen state
          onLoad={(data) => {
            setPaused(true);
            setDuration(data.duration);
            setVolume(1)
          }}
          onProgress={(data) => ChangeCurentTime(data)}
          onEnd={() => {
            setCurrentTime(0);
            setPaused(true);
            videoRef.current.seek(0);
          }}
        />
        {(showStartButton || first) && (
          <View style={styles.music}>
            <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', marginBottom: big ? 30 : 5 }}>
              {music && <MusicSvg />}
              <Text style={Styles.whiteSemiBold13}>{music}</Text>
            </View>
            <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
          </View>
        )}
        {(showStartButton || first) && (
          <View style={[styles.controls, big && { bottom: 40 }]}>
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
            <TouchableOpacity onPress={ChangeVolume}>
              {!volume ? <MuteSvg /> : <Image style={{ width: 25, height: 25 }} source={require('../../assets/img/Sound.png')} />}
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

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
    bottom: 25,
    flexDirection: 'column',
    paddingHorizontal: 14,
    color: 'white',
  },
  Vidio: {
    width: '100%',
    height: 550,
    position: 'relative',
    aspectRatio: 0.9,
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
  },
});
