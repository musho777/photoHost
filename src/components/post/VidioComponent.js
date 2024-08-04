import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import { AddSecSvg, FullScrenn, MuteSvg, Pause, SoundSvg, StartSvg, StartVidioSvg } from '../../assets/svg/Svgs';
import { Styles } from '../../styles/Styles';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log()

export const VidioComponent = ({ music, item, big, setResizeVidio }) => {

  const [showStartButton, setShowStartButton] = useState(false)

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const onSeek = (value) => {
    videoRef.current.seek(value);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(false);
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
      if (showStartButton) {
        setShowStartButton(false)
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [showStartButton]);


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

  return <TouchableOpacity onPress={() => setShowStartButton(true)} activeOpacity={1} style={[{ position: 'relative', height: 550 }, big && { height: windowHeight, marginTop: -122 }]}>
    {showStartButton && <TouchableOpacity onPress={() => setResizeVidio()} style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
      <FullScrenn />
    </TouchableOpacity>}
    {showStartButton && <View style={[styles.playButton]}>
      <TouchableOpacity onPress={() => lakeCurentTime()}>
        <AddSecSvg />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPlayPausePress()}>
        {!paused ? <Pause /> : <StartSvg />}
      </TouchableOpacity>
      {/* <Image source={require('../../assets/img/ic.png')} style={styles.playIcon} /> */}
      <TouchableOpacity onPress={() => AddCurentTime()}>
        <AddSecSvg />
      </TouchableOpacity>
    </View>}
    <Video
      ref={videoRef}
      paused={paused}
      repeat={true}
      volume={volume}
      style={[styles.Vidio, big && { height: windowHeight }]}
      source={{ uri: `https://chambaonline.pro/uploads/${item.video}` }}
      resizeMode={'cover'}
      onLoad={(data) => setDuration(data.duration)}
      onProgress={(data) => setCurrentTime(data.currentTime)}
    />
    <View style={styles.music}>
      <Text style={Styles.whiteSemiBold13}>{music}</Text>
      <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
    </View>
    <TouchableOpacity style={styles.controls}>
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
        {volume ? <MuteSvg /> : <Image style={{ width: 25, height: 25 }} source={require('../../assets/img/Sound.png')} />}
      </TouchableOpacity>
    </TouchableOpacity>
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
  },
  seekSlider: {
    width: '90%',
  },
});