import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Sound from 'react-native-sound'
import { useSelector } from 'react-redux'
import { Styles } from '../../../styles/Styles'
import { VoiceAmplituda, VoiceIcone } from '../../../assets/svg/Svgs'

export const MusicPlay = ({ onSend }) => {
  const getSound = useSelector((st) => st.getSound)

  const [isPlaying, setIsPlaying] = useState(null);
  // const [sound, setSound] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleButtonClick = (index) => {

    console.log(isPlaying, 'isPlaying')

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
          // Reset isPlaying state after sound finishes
        });
        setLoading(false)
        setSelectedSound(sound)

      })
      setIsPlaying(index);
    }
  };

  return <ScrollView showsVerticalScrollIndicator={false}>
    {getSound.data && getSound.data?.map((elm, i) => {
      return <TouchableOpacity
        onPress={() => onSend(elm.name)}
        key={i}
        style={styles.wrapper}>
        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
          {(loading && i == isPlaying) ?
            <View style={{ width: 20, height: 20 }}>
              <ActivityIndicator size={'small'} />
            </View> :
            <TouchableOpacity onPress={() => handleButtonClick(i)}>
              {(isPlaying == null || i != isPlaying) ?
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/play.png')} /> :
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/pause.png')} />
              }
            </TouchableOpacity>}
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
            <Text style={{ fontSize: 15 }}>
              🦊
            </Text>
            <VoiceAmplituda />
          </View>

          {/* <Image style={{ height: 40, width: '80%', resizeMode: 'cover' }} source={require('../../../assets/img/wave.jpg')}></Image> */}
        </View>
        <VoiceIcone />
      </TouchableOpacity>
    })}
  </ScrollView>
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    borderBottomWidth: 1,
    borderColor: '#f0eded'
  },
})