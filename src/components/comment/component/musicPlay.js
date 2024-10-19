import { forwardRef, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Sound from 'react-native-sound'
import { useSelector } from 'react-redux'
import { SendMsgSvg, } from '../../../assets/svg/Svgs'
import { BootomModal } from '../../BootomSheet'
import { Waveform } from './Waveform'


export const MusicPlay = forwardRef(({ onSend }, ref) => {
  const getSound = useSelector((st) => st.getSound)
  const snapPoints = useMemo(() => ['50%'], []);

  const [isPlaying, setIsPlaying] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null)
  const [loading, setLoading] = useState(false)

  const waveformData = [23, 33, 22, 36, 24, 10, 18, 14, 49, 16, 50, 24, 46, 32, 48, 28, 31, 30, 16, 37, 45, 48, 43, 25, 20, 25, 13, 38, 16, 46, 45, 26, 17, 18, 47, 16, 24, 11]

  const [second, setSeccond] = useState(0)
  console.log(waveformData.length)
  const Stop = () => {
    if (selectedSound) {
      selectedSound.stop(() => {
        setSelectedSound(null)
      });
      setIsPlaying(null)
    }
  }

  const handleButtonClick = (index) => {

    if (selectedSound) {
      selectedSound.stop(() => {
        setSelectedSound(null)
      });
      setIsPlaying(null)
    }
    if (isPlaying != index) {
      setLoading(true)
      const sound = new Sound(`https://chambaonline.pro/uploads/audio/${getSound.data[index].name}`, null, (error) => {
        if (error) {
          return
        }
        sound.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Playback failed');
          }
          setIsPlaying(false);
        });
        setLoading(false)
        setSelectedSound(sound)

      })
      setIsPlaying(index);
    }
  };


  return <BootomModal
    ref={ref}
    snapPoints={snapPoints}
    close={() => Stop()}
  >
    <ScrollView showsVerticalScrollIndicator={false}>
      {getSound.data && getSound.data?.map((elm, i) => {
        return <View key={i} style={styles.wrapper}>
          <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
            {(loading && i == isPlaying) ?
              <View style={{ width: 26, height: 26 }}>
                <ActivityIndicator size={'small'} />
              </View> :
              <TouchableOpacity onPress={() => handleButtonClick(i)}>
                {(i != isPlaying) ?
                  <Image style={{ width: 26, height: 26 }} source={require('../../../assets/img/play.png')} /> :
                  <Image style={{ width: 26, height: 26 }} source={require('../../../assets/img/pause.png')} />
                }
              </TouchableOpacity>}
          </View>
          <Waveform second={second} waveformData={waveformData} />
          <TouchableOpacity onPress={() => {
            Stop()
            onSend(elm.name)
          }}>
            <SendMsgSvg />
          </TouchableOpacity>
        </View>
      })}
    </ScrollView>
  </BootomModal>
})

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    borderBottomWidth: 1,
    borderColor: '#f0eded',
  },
})