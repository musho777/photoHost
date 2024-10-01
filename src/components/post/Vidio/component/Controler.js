import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AddSecSvg, AddSecSvg1, FullScrenn, MuteSvg, Pause, StartSvg } from "../../../../assets/svg/Svgs"
import { forwardRef } from "react";
import { Styles } from "../../../../styles/Styles";

export const Controler = forwardRef(({
  setVolume,
  music,
  setFirst,
  currentTime,
  duration,
  volume,
  setPaused,
  paused,
  setCurrentTime,
  setShowStartButton,
  setFullScreen,
  full
}, ref) => {

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const AddCurrentTime = () => {
    const newTime = Math.min(currentTime + 5, duration);
    ref?.current?.seek(newTime);
    setCurrentTime(newTime)
    setShowStartButton(false);
  };

  const onPlayPausePress = () => {
    setFirst(false);
    setPaused(!paused);
    setShowStartButton(false);
  };

  const LakeCurrentTime = () => {
    const newTime = Math.max(currentTime - 5, 0);
    ref?.current?.seek(newTime);
    setCurrentTime(newTime)
    setShowStartButton(false);
  };

  return <View style={styles.wrapper}>


    <TouchableOpacity onPress={() => {
      setPaused(true)
      setFullScreen(!full)
    }}
      style={styles.full}>
      <FullScrenn />
    </TouchableOpacity>

    <TouchableOpacity activeOpacity={1} onPress={() =>
      setVolume(volume === 0 ? 1 : 0)
    } style={styles.voice}>
      {!volume ?
        <MuteSvg /> :
        <Image style={{ width: 25, height: 25 }} source={require('../../../../assets/img/Sound.png')} />}
    </TouchableOpacity>
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

    <View
      style={{ height: 60, width: '100%', position: 'absolute', bottom: 5 }}>
      <View style={styles.music}>
        <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
          {music && <MusicSvg />}
          <Text style={Styles.whiteSemiBold13}>{music}</Text>
        </View>
        <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
      </View>
    </View>
  </View>
})

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    zIndex: 99999,
    position: 'absolute'
  },
  voice: {
    position: 'absolute',
    top: 100,
    zIndex: 9999,
    right: 10
  },
  full: {
    position: 'absolute',
    top: 60,
    right: 10,
    zIndex: 999
  },
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
  music: {
    zIndex: 999,
    position: 'absolute',
    width: '100%',
    bottom: 10,
    flexDirection: 'column',
    paddingHorizontal: 14,
    color: 'white',
  },
});