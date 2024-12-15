import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AddSecSvg, AddSecSvg1, FullScrenn, MuteSvg, Pause, StartSvg } from "../../../../assets/svg/Svgs"
import { forwardRef } from "react";
import { Styles } from "../../../../styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { FixVidioWatch } from "../../../../store/action/action";

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
  full,
  showStartButton,
  loading,
  id,
  setStart,
  start,
  big
}, ref) => {

  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);


  const AddCurrentTime = () => {
    const newTime = Math.min(currentTime + 5, duration);
    ref?.current?.seek(newTime);
    setCurrentTime(newTime)
    if (!full) {
      setShowStartButton(false);
    }
  };

  const onPlayPausePress = (type) => {
    setFirst(false);
    setPaused(type);
    if (type) {
      const endData = Date.now();
      // setEnd(endData)
      let seconds = (endData - start) / 1000
      dispatch(FixVidioWatch(id, seconds, staticdata.token))
    }
    else {
      const startDate = Date.now();
      setStart(startDate)
    }

    if (type && !full) {
      setShowStartButton(false);
    }
  };

  const LakeCurrentTime = () => {
    const newTime = Math.max(currentTime - 5, 0);
    ref?.current?.seek(newTime);
    setCurrentTime(newTime)
    if (!full) {
      setShowStartButton(false);
    }
  };
  if (!full) {
    return <View style={styles.wrapper}>
      {!big && <TouchableOpacity
        style={styles.full}
        onPress={() => {
          setFullScreen(!full)
          setShowStartButton(true)
        }}>
        <FullScrenn />
      </TouchableOpacity>}
      <TouchableOpacity activeOpacity={1} onPress={() =>
        setVolume(volume === 0 ? 1 : 0)
      } style={[styles.voice, big && { top: 10, right: 5 }]}>
        {!volume ?

          <MuteSvg /> :
          <Image style={{ width: 25, height: 25, marginTop: 30 }} source={require('../../../../assets/img/Sound.png')} />}
      </TouchableOpacity>
      <View style={styles.playButton}>
        {(showStartButton && !paused) && <TouchableOpacity style={{ transform: [{ rotate: '360deg' }] }} onPress={() => LakeCurrentTime()}>
          <AddSecSvg1 width={40} />
        </TouchableOpacity>}
        {loading ?
          <View>
            <ActivityIndicator size={"large"} color={'white'} />
          </View> :
          <View>
            {!paused ?
              <TouchableOpacity onPress={() => onPlayPausePress(true)}>
                <Pause width={40} />
              </TouchableOpacity >
              : <TouchableOpacity onPress={() => onPlayPausePress(false)}>
                <StartSvg width={40} />
              </TouchableOpacity>
            }
          </View>}
        {(showStartButton && !paused) && <TouchableOpacity onPress={AddCurrentTime}>
          <AddSecSvg width={40} />
        </TouchableOpacity>}
      </View>
    </View>
  }

  return <View style={styles.wrapper1}>
    <TouchableOpacity onPress={() => setFullScreen(!full)}>
      <FullScrenn />
    </TouchableOpacity>

    <View style={styles.playButtonFull}>
      <TouchableOpacity style={{ transform: [{ rotate: '360deg' }] }} onPress={() => LakeCurrentTime()}>
        <AddSecSvg1 />
      </TouchableOpacity>
      {loading ?
        <View>
          <ActivityIndicator size={"small"} color={'white'} />
        </View> :
        <View >
          {!paused ?
            <TouchableOpacity onPress={() => onPlayPausePress(true)}>
              <Pause />
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => onPlayPausePress(false)}>
              <StartSvg />
            </TouchableOpacity>
          }
        </View>}
      <TouchableOpacity onPress={AddCurrentTime}>
        <AddSecSvg />
      </TouchableOpacity>
    </View>

    <TouchableOpacity activeOpacity={1} onPress={() => setVolume(volume === 0 ? 1 : 0)}>
      {!volume ?
        <MuteSvg /> :
        <Image style={{ width: 25, height: 25 }} source={require('../../../../assets/img/Sound.png')} />}
    </TouchableOpacity>

    <View
      style={{ height: 60, width: '100%', position: 'absolute', bottom: 5 }}>
      <View style={styles.music}>
        <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
          {music && <MusicSvg />}
          <Text style={Styles.whiteSemiBold13}>{music}</Text>
        </View>
      </View>
    </View>
  </View >
})

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    zIndex: 99999,
    position: 'absolute',
  },
  wrapper1: {
    width: '100%',
    zIndex: 99999,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
    gap: 40,
  },
  playButtonFull: {
    flexDirection: 'row',
    gap: 25,
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