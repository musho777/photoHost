import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import { AddSecSvg, AddSecSvg1, FullScrenn, MuteSvg, Pause, StartSvg } from '../../assets/svg/Svgs';
import { Styles } from '../../styles/Styles';


const windowHeight = Dimensions.get('window').height;
export const VidioComponent = ({ music, setScrollEnabled, item, big, setResizeVidio, viewableItems }) => {
  const [first, setFirst] = useState(true)
  const [showStartButton, setShowStartButton] = useState(false)
  const [currentId, setCurrentId] = useState()
  const [holde, setHold] = useState(false)
  const onPlayPausePress = () => {
    setFirst(false)
    setPaused(!paused);
    setShowStartButton(false)
    setScrollEnabled(false)
  };

  const onSeek = (value) => {
    videoRef?.current?.seek(value);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  useEffect(() => {
    if (viewableItems?.length) {
      if (currentId == viewableItems[0]?.item.id && !viewableItems[0]?.isViewable) {
        setFirst(true)
        setPaused(true)
      }
      else if (currentId != viewableItems[0]?.item.id) {
        setFirst(true)
        setPaused(true)
      }
    }
  }, [viewableItems])

  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [volume, setVolium] = useState(1)

  const AddCurentTime = () => {
    let value = 0
    if (currentTime + 5 <= duration) {
      value = currentTime + 5
    }
    else {
      let add = duration - currentTime
      value = currentTime + add
    }
    setCurrentTime(value)
    videoRef.current.seek(value);
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      if (!holde) {
        setShowStartButton(false)
        setScrollEnabled(false)
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [holde]);


  const lakeCurentTime = () => {
    let value = 0
    if (currentTime - 5 >= 0) {
      value = currentTime - 5
    }
    videoRef.current.seek(value);
    setCurrentTime(value)
  }

  const ChnageVoulum = () => {
    if (volume == 0) {
      setVolium(1)
    }
    if (volume == 1) {
      setVolium(0)
    }
  }
  return <TouchableOpacity
    activeOpacity={1}
    onPressIn={() => {
      setHold(true)
      setCurrentId(item.id)
      setShowStartButton(true)
      setScrollEnabled(true)
    }}
    onPressOut={() => {
      setHold(false)
    }}

    style={[{ position: 'relative', height: 550 }, big && { height: windowHeight, marginTop: -122 }]}>
    {(showStartButton || first) && <TouchableOpacity onPress={() => setResizeVidio()} style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
      <FullScrenn />
    </TouchableOpacity>}
    {(showStartButton || first) && <View style={[styles.playButton]}>
      <TouchableOpacity style={{ transform: [{ rotate: '360deg' }] }} onPress={() => lakeCurentTime()}>
        <AddSecSvg1 />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPlayPausePress()}>
        {!paused ? <Pause /> : <StartSvg />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => AddCurentTime()}>
        <AddSecSvg />
      </TouchableOpacity>
    </View>}
    {(paused && first) &&
      <View>
        <Image style={[styles.Vidio, { objectFit: 'cover' }, big && { height: windowHeight }]} source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }} />
      </View>
    }
    <Video
      ref={videoRef}
      paused={paused}
      repeat={false}
      volume={volume}
      style={[styles.Vidio, big && { height: windowHeight }]}
      source={{ uri: `https://chambaonline.pro/uploads/${item.video}` }}
      resizeMode={'cover'}
      onLoad={(data) => setDuration(data.duration)}

      onProgress={(data) => setCurrentTime(data.currentTime)}
      onEnd={() => {
        setCurrentTime(0)
        setPaused(true)
      }}
    />
    {(showStartButton || first) && < View style={styles.music}>
      <Text style={Styles.whiteSemiBold13}>{music}</Text>
      <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
    </View>
    }
    {
      (showStartButton || first) && <View style={styles.controls}>
        <Slider
          style={styles.seekSlider}
          value={currentTime}
          volume={volume}
          minimumValue={0}
          onSlidingComplete={onSeek}
          maximumValue={duration}
          onValueChange={onSeek}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFC24B"
        />
        <TouchableOpacity onPress={() => ChnageVoulum()}>
          {!volume ? <MuteSvg /> : <Image style={{ width: 25, height: 25 }} source={require('../../assets/img/Sound.png')} />}
        </TouchableOpacity>
      </View>
    }
  </TouchableOpacity >
}

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
    width: 50
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
    zIndex: 9999
  },
  seekSlider: {
    width: '90%',
  },
});