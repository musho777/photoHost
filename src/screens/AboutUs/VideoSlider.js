import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { BackArrowWhite, Pause, StartSvg } from '../../assets/svg/Svgs';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

export const VideoSlider = ({ navigation }) => {
  const ref = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const handleSeek = (value) => {
    ref.current.seek(value);
    setCurrentTime(value);
  };

  const handleLoad = (data) => {
    setDuration(data.duration);
  };

  const handleProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const handlePlayPause = () => {
    console.log("dsjf")
    setPaused(!paused);
  };

  const handleShowControls = () => {
    setShowControls(true);
    setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <View style={{ backgroundColor: 'rgb(12,59,78)', flex: 1 }}>
      <TouchableOpacity onPress={handleShowControls} style={styles.overlay} />

      {showControls && (
        <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
          {paused ? <StartSvg color={"rgb(12,59,78)"} /> : <Pause color={"rgb(12,59,78)"} />}
        </TouchableOpacity>
      )}

      <View style={styles.backButton}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }} onPress={() => navigation.goBack()}>
          <BackArrowWhite />
        </TouchableOpacity>
      </View>

      <Video
        ref={ref}
        source={require("../../assets/img/aboutUs.mp4")}
        style={styles.video}
        resizeMode="contain"
        paused={paused}
        onProgress={handleProgress}
        onLoad={handleLoad}
      />

      {showControls && (
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={handleSeek}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#8E8E93"
            thumbTintColor="#1EB1FC"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: width,
    height: height,
    borderRadius: 10,
    marginTop: 15,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 4
  },
  slider: {
    width: '100%',
  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 55,
    width: '100%',
    height: 30,
    zIndex: 9999,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
});

export default VideoSlider;
