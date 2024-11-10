import { forwardRef, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Sound from 'react-native-sound'
import { useSelector } from 'react-redux'
import { SendMsgSvg, } from '../../../assets/svg/Svgs'
import { BootomModal } from '../../BootomSheet'
import { Waveform } from './Waveform'
import { t } from '../../../components/lang';
import { Styles } from '../../../styles/Styles'
import { FlatList } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export const MusicPlay = forwardRef(({ categoryID, onSend }, ref) => {
  const getSound = useSelector((st) => st.getSound)
  const snapPoints = useMemo(() => ['50%'], []);
  const [intervalId, setIntervalId] = useState(null);


  const [isPlaying, setIsPlaying] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const mainData = useSelector(st => st.mainData);
  const [endReach, setEndReach] = useState(false)
  const [waveformData, setWaveformData] = useState([
  ])

  const Eda = [
    [18, 23, 14, 13, 11, 42, 50, 18, 30, 43, 38, 47, 45, 20, 41, 50],
    [30, 29, 30, 39, 17, 50, 26, 21, 12, 44, 50, 43, 48, 38, 22, 42, 28, 18, 42, 37, 45, 18, 33, 14],
    [35, 15, 28, 44, 19, 21, 50, 31, 12, 40, 14, 48, 38, 25, 17, 23,
      47, 29, 36, 45, 32, 26, 11, 30, 24, 41, 18, 27, 13, 22, 46, 16],
    [17, 42, 23, 35, 11, 30, 49, 14, 27, 45, 32, 19,
      21, 46, 38, 13, 25, 40, 31, 12, 48, 26, 20, 15],
    [33, 15, 27, 41, 18, 12, 49, 35, 21, 47, 30, 13,
      44, 26, 19, 50, 23, 37, 11, 40, 29, 16, 32, 22,
      17, 45, 14, 25, 48, 28, 39, 20, 34, 31, 46, 24,
      42, 36, 43, 38],
    [27, 14, 39, 42],
    [12, 29, 46, 34, 22, 18],
    [25, 41]
  ]

  const musInst = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    [33, 34],
    [35, 36],
    [37, 38],
    [39, 40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
    [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
  ]

  const animals = [
    [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
    [1, 2, 3, 4],                        // 4 items
    [5, 6, 7, 8],                        // 4 items
    [9, 10, 11, 12, 13, 14, 15, 16, 17, 18], // 10 items
    [19, 20, 21, 22, 23, 24, 25, 26],    // 8 items
    [27, 28],                            // 2 items
    [29, 30, 31, 32],                    // 4 items
    [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52], // 20 items
    [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70], // 18 items
    [71, 72],                            // 2 items
    [73, 74, 75, 76],                    // 4 items
    [77, 78, 79, 80],                    // 4 items
    [81, 82, 83, 84, 85, 86, 87, 88, 89, 90] // 10 items
  ];

  const PrirodaYavlenia = [
    [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62], // 16 items
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], // 26 items
    [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], // 20 items
    [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62], // 16 items
    [63, 64, 65, 66, 67, 68] // 6 items
  ];

  const Priroda = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
    [65, 66],
    [67, 68, 69, 70, 71, 72],
    [73, 74],
    [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
  ]

  const fest = [
    [1, 2, 3, 4, 5, 6],                          // 6 items
    [7, 8, 9, 10, 11, 12, 13, 14],              // 8 items
    [15, 16, 17, 18, 19, 20, 21, 22, 23, 24],   // 10 items
    [25, 26, 27, 28, 29, 30, 31, 32, 33, 34]    // 10 items
  ];
  const sport = [
    [1, 3],                                       // 1 item
    [2, 3, 4, 5, 6, 7, 8, 9],                  // 8 items
    [10, 11, 12, 13],                          // 4 items
    [14, 15, 16, 17, 18, 19, 20, 21],          // 8 items
    [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41], // 20 items
    [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69] // 28 items
  ];

  const stroyInst = [
    [1, 2],                                       // 2 items
    [3, 4],                                       // 2 items
    [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],  // 20 items
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68] // 48 items
  ];

  const stroyibag = [
    [1, 2],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25, 26],
    [27, 28],
    [29, 30, 31, 32, 33, 34],
    [35],
    [36, 37, 38, 39, 40, 41, 42, 43],
    [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]
  ]

  const transport = [[48, 31, 23, 36, 35, 42, 38, 11, 44, 39, 28, 39, 10, 32, 41, 40, 39, 26, 27, 41, 46, 29, 42, 21, 34, 39, 31, 41, 34, 12, 42, 34, 41, 38, 44, 32, 41, 41], [26, 36, 34, 45, 50, 14, 43, 37, 39, 29], [47, 16, 10, 17, 18, 14, 12, 28, 19, 25, 45, 10, 20, 22], [18, 17], [10, 10], [33, 18, 18, 49, 41, 14, 28, 30, 16, 28, 24, 21, 15, 39, 24, 23, 32, 12, 28, 24, 24, 17, 32, 40, 25, 44, 40, 18], [47, 16, 19, 16], [13, 39, 39, 49, 32, 16], [13, 16, 47, 15, 22, 15, 49, 20], [18, 45, 47, 44, 50, 39, 23, 32, 15, 31, 26, 20, 13, 21, 26, 47, 16, 25, 42, 33], [50, 46], [33, 35, 35, 50, 23, 39, 31, 48, 14, 36, 37, 17, 31, 36, 46, 50, 17, 10, 17, 16, 15, 49, 13, 39, 42, 17, 48, 26], [20, 39, 24, 36, 13, 45, 29, 38, 30, 21, 34, 30, 29, 16, 49, 41, 25, 19, 10, 14, 30, 15], [12, 48, 17, 49, 13, 34, 12, 23, 35, 45, 50, 30, 43, 22, 11, 38], [10, 13, 41, 48, 34, 36, 43, 35, 15, 35, 12, 48, 38, 35, 22, 20, 42, 38, 29, 47, 15, 30, 30, 30, 20, 18, 50, 11, 29, 42, 43, 21, 15, 29, 14, 31, 50, 19], [34, 13, 24, 29, 49, 15, 13, 23, 34, 32, 38, 47, 40, 38, 17, 32, 17, 37, 38, 34, 23, 43, 30, 46]]
  const [emojy, setEmojy] = useState([])

  useEffect(() => {
    let temp = []
    const uniqueCategoryIds = [...new Set(getSound.data.map(item => item.category_id))];
    let emojys = []
    uniqueCategoryIds.map((elm, i) => {
      if (elm == 138) {
        // [...array1, ...array2];
        // temp = temp.concat(Eda)
        Eda.map((elm, i) => {
          emojys.push("")
        })
        temp = [...temp, ...Eda]
        // setWaveformData(temp)
      }
      else if (elm == 170) {
        // temp = temp.concat(musInst)
        musInst.map((elm, i) => {
          emojys.push("")
        })
        temp = [...temp, ...musInst]

        // setWaveformData(temp)
        // setWaveformData([...item, ...musInst])
        // setWaveformData(musInst)
      }
      else if (elm == 164) {
        // setWaveformData(animals)
        // setWaveformData([...item, ...animals])
        // temp = temp.concat(animals)

        temp = [...temp, ...animals]

        // setWaveformData(temp)
        let emojy1 = ["🐥", "🐦", '🐈', '🦆', '🐔', '🐶', '🐕', '🦮', '🐺', '🐅', '🐄', '🐎', '🐯']
        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
        // setEmojy(["🐥", "🐦", '🐈', '🦆', '🐔', '🐶', '🐕', '🦮', '🐺', '🐅', '🐄', '🐎', '🐯'])
      }
      else if (elm == 160) {
        // temp = temp.concat(PrirodaYavlenia)
        temp = [...temp, ...PrirodaYavlenia]
        PrirodaYavlenia.map((elm, i) => {
          emojys.push("")
        })

        // setWaveformData(temp)
        // setWaveformData([...item, ...PrirodaYavlenia])
        // setWaveformData(PrirodaYavlenia)
      }
      else if (elm == 159) {
        // setWaveformData(Priroda)
        temp = [...temp, ...Priroda]
        Priroda.map((elm, i) => {
          emojys.push("")
        })

        // temp = temp.concat(Priroda)

        // setWaveformData([...item, ...Priroda])

      }
      else if (elm == 156) {
        temp = [...temp, ...fest]
        fest.map((elm, i) => {
          emojys.push("")
        })

        // setWaveformData(fest)
        // temp = temp.concat(fest)

        // setWaveformData([...item, ...fest])

      }
      else if (elm == 154) {
        temp = [...temp, ...sport]
        sport.map((elm, i) => {
          emojys.push("")
        })

        // temp = temp.concat(sport)

        // setWaveformData([...item, ...sport])
        // setWaveformData(sport)
      }
      else if (elm == 142) {
        stroyInst.map((elm, i) => {
          emojys.push("")
        })
        temp = [...temp, ...stroyInst]

        // temp = temp.concat(stroyInst)

        // setWaveformData([...item, ...stroyInst])
        // setWaveformData(stroyInst)
      }
      else if (elm == 141) {
        stroyibag.map((elm, i) => {
          emojys.push("")
        })
        temp = [...temp, ...stroyibag]
        // temp = temp.concat(stroyibag)

        // setWaveformData([...item, ...stroyibag])
        // setWaveformData(stroyibag)
      }
      else if (elm == 136) {
        transport.map((elm, i) => {
          emojys.push("")
        })
        temp = temp.concat(transport)

        // setWaveformData([...item, ...transport])
        // setWaveformData(transport)
      }
    })
    setEmojy(emojys)
    setWaveformData(temp)

  }, [getSound])


  const Stop = () => {
    if (selectedSound) {
      selectedSound.stop(() => {
        setSelectedSound(null)
      });
      setIsPlaying(null)
    }
  }

  const handleButtonClick = (index) => {
    setCurrentTime(0)
    let interval = null;
    if (selectedSound) {
      selectedSound.stop(() => {
        setSelectedSound(null);
        setCurrentTime(0); // Reset current time
      });
      setIsPlaying(null);
      clearInterval(intervalId);
    }
    if (isPlaying != index) {
      setEndReach(false)
      setLoading(true);
      const sound = new Sound(`https://chambaonline.pro/uploads/audio/${getSound.data[index].name}`, null, (error) => {
        if (error) {
          return;
        }
        sound.play((success) => {
          setCurrentTime(0);
          clearInterval(intervalId);
          setIsPlaying(null);
          setEndReach(true)
        });

        // Update current time every second
        interval = setInterval(() => {
          sound.getCurrentTime((seconds) => {
            setCurrentTime(seconds * 2);
          });
        }, 500);
        setIntervalId(interval)

        setLoading(false);
        setSelectedSound(sound);

      });
      setIsPlaying(index);
    }
  };


  // useEffect(() => {
  //   // Preload the sound durations
  //   if (getSound.data) {
  //     getSound.data.forEach((elm, index) => {
  //       const sound = new Sound(`https://chambaonline.pro/uploads/audio/${elm.name}`, null, (error) => {
  //         if (!error) {
  //           const array = Array.from({ length: Math.floor(sound.getDuration()) }, () => {
  //             return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  //           });
  //           setDurations(prev => ({ ...prev, [index]: array })); // Store duration
  //         }
  //       });
  //     });
  //   }
  // }, [getSound.data]);

  return <BootomModal
    ref={ref}
    snapPoints={snapPoints}
    close={() => Stop()}
  >
    <FlatList
      data={getSound.data}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
          <Text style={Styles.darkMedium14}>{t(mainData.lang).Nosoundsavailable}</Text>
        </View>
      }
      renderItem={({ item, index }) => {
        let wave = waveformData[index]
        if (!waveformData[index]) {
          wave = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
        }
        return <TouchableOpacity activeOpacity={1} style={styles.wrapper}>
          <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
            {(loading && index == isPlaying) ?
              <View style={{ width: 26, height: 26 }}>
                <ActivityIndicator size={'small'} />
              </View> :

              <TouchableOpacity onPress={() => handleButtonClick(index)}>
                {(index != isPlaying) ?
                  <Image style={{ width: 26, height: 26 }} source={require('../../../assets/img/play.png')} /> :
                  <Image style={{ width: 26, height: 26 }} source={require('../../../assets/img/pause.png')} />
                }
              </TouchableOpacity>}
            <View>
              {<Text style={{ fontSize: 25 }}>
                {emojy[index]}
              </Text>}
            </View>
          </View>
          <Waveform
            isPlaying={isPlaying}
            soundInstance={selectedSound}
            currentTime={index == isPlaying && currentTime}
            waveformData={wave}
            endReach={endReach}
            index={index}
          />
          <TouchableOpacity onPress={() => {
            Stop()
            onSend(item.name)
          }}>
            <SendMsgSvg />
          </TouchableOpacity>
        </TouchableOpacity>
      }}
      showsVerticalScrollIndicator={false}
    />

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


