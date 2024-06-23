import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MediaControls, { PLAYER_STATES } from '../components/vidio';
import Video from 'react-native-video';
import { AppColors } from '../styles/AppColors';

const windowWidth = Dimensions.get('window').width;

export const Slider = ({ photo, single, activePhoto, description }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [active, setActive] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const videoRef = useRef(null);
  const [first, setFirst] = useState(true)

  const [isPlayed, setIsPlayeds] = useState(false)

  useEffect(() => {
    setIsLoading(true); // Reset loading state when photo prop changes
  }, [photo]);

  const onSeek = (value) => {
    videoRef.current.seek(value);
  };

  const onSeeking = (value) => {
    setCurrentTime(value);
  };

  const onPaused = () => {
    setPaused(!paused);
    setIsPlayeds(!isPlayed)
    if (!paused) {
      setPlayerState(PLAYER_STATES.PAUSED);
    }
    else {
      setPlayerState(PLAYER_STATES.PLAYING);
    }
  };

  const onReplay = () => {
    setPaused(false);
    setPlayerState(PLAYER_STATES.PLAYING);
    videoRef.current?.seek(0);
  };

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
  };

  const handleMomentumScrollEnd = (event) => {
    setFirst(true)
    setPaused(true)
    setIsPlayeds(false)
    onReplay()
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
    activePhoto(index);
  };

  const togglePlayPause = () => {
    setPaused(!paused);
    setPlayerState(paused ? PLAYER_STATES.PLAYING : PLAYER_STATES.PAUSED);
  };

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        data={photo}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item, index }) => {
          let aspectRatio = 1;
          if (item.width > item.height) {
            aspectRatio = 0.2 + item.width / item.height;
          } else {
            aspectRatio = 0.2 + item.height / item.width;
          }
          if (aspectRatio > 1) {
            aspectRatio = single ? 0.65 : 0.70;
          } else if (aspectRatio < 1) {
            aspectRatio = single ? 0.65 : 0.70;
          }
          return (
            <TouchableOpacity style={!single ? styles.img : { ...styles.img, width: windowWidth }}>
              {!item.video ? (
                <Image
                  style={[{ width: '100%', aspectRatio: aspectRatio ? aspectRatio : 1 }]}
                  source={{ uri: `https://chamba.justcode.am/uploads/${item.photo}` }}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ position: 'relative', height: 400 }}>
                  {!isPlayed && first && <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={[{ width: '100%', height: 400 }]}
                      source={{ uri: `https://chamba.justcode.am/uploads/${item.photo}` }}
                    />
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, alignItems: 'center', height: "100%", justifyContent: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          setFirst(false)
                          setIsPlayeds(true)
                        }}
                        style={[styles.playButton, { backgroundColor: "orange" }]}
                      >
                        <Image source={require('../assets/img/ic.png')} style={styles.playIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  }
                  <Video
                    ref={videoRef}
                    paused={!isPlayed}
                    repeat={true}
                    style={[
                      {
                        width: '100%',
                        height: 400,
                        position: 'relative',

                      },
                    ]}
                    source={{ uri: `https://chamba.justcode.am/uploads/${item.video}` }}
                    resizeMode={'cover'}
                    onLoad={(data) => {
                      setDuration(data.duration);
                      setIsLoading(false);
                    }}
                    onProgress={(data) => setCurrentTime(data.currentTime)}
                    onEnd={onEnd}
                  />
                  {!first && <MediaControls
                    duration={duration}
                    mainColor="orange"
                    onSeek={onSeek}
                    onSeeking={onSeeking}
                    onPaused={onPaused}
                    onReplay={onReplay}
                    playerState={playerState}
                    showOnStart={true}
                    progress={currentTime}
                  />}
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 5,
        }}>
        {photo.length > 1 &&
          photo?.map((elm, i) => (
            <View
              key={i}
              style={[
                styles.pagination,
                i === active && {
                  backgroundColor: AppColors.GoldenTainoi_Color,
                  borderRadius: 50,
                },
              ]}></View>
          ))}
      </View>
      {openSlider && (
        <SliderModal
          modalVisible={openSlider}
          activePhoto={active}
          photo={photo}
          close={() => setOpenSlider(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    flexShrink: 0,
  },
  pagination: {
    width: 6,
    height: 6,
    backgroundColor: '#CCD6DF',
    marginHorizontal: 5,
    borderRadius: 50,
  },
  customControls: {
    height: 20,
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  playButton: {
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 0,
    height: 50,
    justifyContent: "center",
    width: 50,
    zIndex: 999,
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22
  },
});
