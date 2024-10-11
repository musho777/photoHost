import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Sound from 'react-native-sound'
import { useSelector } from 'react-redux'
import { Styles } from '../../../styles/Styles'

export const MusicPlay = ({ onSend }) => {
  const getSound = useSelector((st) => st.getSound)

  const [isPlaying, setIsPlaying] = useState(null);
  const [sound, setSound] = useState(null);


  useEffect(() => {
    let loadedSounds = []
    if (getSound.data.length) {
      loadedSounds = getSound.data.map((fileName) => {
        const sound = new Sound(`https://chambaonline.pro/uploads/audio/${fileName.name}`, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('Failed to load sound', fileName.name, error);
          }
        });
        return sound;
      });
      setSound(loadedSounds);
    }

    return () => {
      loadedSounds.forEach(sound => sound.release());
    };
  }, [getSound.data]);


  const handleButtonClick = (index) => {
    const selectedSound = sound[index];
    if (isPlaying !== null && isPlaying !== index) {
      // Stop the currently playing sound
      const currentlyPlayingSound = sound[isPlaying];
      currentlyPlayingSound.stop(() => console.log(`Sound ${isPlaying} stopped`));
    }

    if (isPlaying === index) {
      selectedSound.stop(() => console.log(`Sound ${index} stopped`));
      setIsPlaying(null);
    } else {
      selectedSound.play((success) => {
        if (success) {
          setIsPlaying(null)
          console.log(`Sound ${index} played successfully`);
        } else {
          console.log(`Failed to play sound ${index}`);
        }
      });
      setIsPlaying(index);
    }
  };

  console.log(isPlaying, 'isPlaying')

  return <ScrollView showsVerticalScrollIndicator={false}>
    {getSound.data && getSound.data?.map((elm, i) => {
      return <TouchableOpacity
        onPress={() => onSend(elm.name)}
        key={i}
        style={styles.wrapper}>
        <TouchableOpacity onPress={() => handleButtonClick(i)}>
          {(isPlaying == null || i != isPlaying) ?
            <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/play.png')} /> :
            <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/pause.png')} />
          }
        </TouchableOpacity>
        <Text style={Styles.darkMedium14}>{elm.name}</Text>
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
    gap: 15,
    borderBottomWidth: 1,
    borderColor: '#f0eded'
  },
})