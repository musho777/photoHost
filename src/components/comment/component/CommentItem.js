import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import emojiRegex from 'emoji-regex';
import { Styles } from '../../../styles/Styles';
import { LikeCommentAction } from '../../../store/action/action';
import { CommentLikeSvg } from '../../../assets/svg/Svgs';
import { AppColors } from '../../../styles/AppColors';
import Sound from 'react-native-sound';
import { Waveform } from './Waveform';
import { DelateModal } from '../../DelateModel';
import { t } from '../../lang';


export const CommentItem = ({
  text,
  isLiked,
  owner,
  ansswer,
  user,
  like_count,
  id,
  token,
  onPressAnsswer,
  daysAgo,
  onDeletComment,
  parent_id,
  setCureent,
  current,
  categoryID
}) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const myuser = useSelector((st) => st.userData)
  const [isPlaying, setIsPlaying] = useState(false)
  const [soundInstance, setSoundInstance] = useState(null);
  const [loading, setLoading] = useState(false)
  const [intervalId, setIntervalId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [endReach, setEndReach] = useState(false)
  const mainData = useSelector(st => st.mainData);


  const getSound = useSelector((st) => st.getSound)

  const [show, setShow] = useState(false)



  const Eda = [
    [18, 23, 14, 13, 11, 42, 50, 18, 30, 43, 38, 47, 45, 20, 41, 50],
    [30, 29, 30, 39, 17, 50, 26, 21, 12, 44, 50, 43, 48, 38, 22, 42, 28, 18, 42, 37, 45, 18, 33, 14],
    [35, 15, 28, 44, 19, 21, 50, 31, 12, 40, 14, 48, 38, 25, 17, 23,
      47, 29, 36, 45, 32, 26, 11, 30, 24, 41, 18, 27, 13, 22, 46, 16],
    [17, 42, 23, 35, 11, 30, 49, 14, 27, 45, 32, 19,
      21, 46, 38, 13, 25, 40, 31, 12, 48, 26, 20, 15],
    // [33, 15, 27, 41, 18, 12, 49, 35, 21, 47, 30, 13,
    //   44, 26, 19, 50, 23, 37, 11, 40, 29, 16, 32, 22,
    //   17, 45, 14, 25, 48, 28, 39, 20, 34, 31, 46, 24,
    //   42, 36, 43, 38],
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
    [10, 15],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25, 26],
    [27, 28],
    [29, 30, 31, 32, 33, 34],
    [35],
    [36, 37, 38, 39, 40, 41, 42, 43],
    [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]
  ]

  const Anticvar = [
    [22, 21, 2, 23, 19, 13, 18, 8, 30, 6, 5, 2, 24, 1, 18, 11, 10, 19, 8, 19,
      11, 28, 1, 22, 15, 19, 29, 7, 9, 19, 30, 25, 1, 30, 1, 25, 18, 14, 3, 5,
      18, 9],
    [30, 25, 23, 6, 11, 5, 4, 22, 1, 18, 16, 13, 20, 12, 8, 12, 26, 22, 24, 28,
      19, 19, 27, 26, 4, 21, 9, 27, 25, 27, 3, 25, 12, 24, 10, 25, 18, 10, 12,
      26, 27, 24, 30, 27, 13, 24, 18, 20],
    [19, 2, 14, 16, 10, 7, 27, 5, 22, 9, 21, 7, 20, 12, 22, 18, 1, 2, 21, 7,
      8, 25, 5, 21, 12, 11, 10, 2, 5, 4, 14, 1, 12, 14, 5, 18, 8, 26, 6, 22,
      6, 22, 16, 6, 7, 9, 18, 5, 7, 8, 7, 9, 2, 6, 12, 16, 23, 21],
    [5, 9, 10, 12, 20, 3, 13],
  ]

  const transport = [[48, 31, 23, 36, 35, 42, 38, 11, 44, 39, 28, 39, 10, 32, 41, 40, 39, 26, 27, 41, 46, 29, 42, 21, 34, 39, 31, 41, 34, 12, 42, 34, 41, 38, 44, 32, 41, 41], [26, 36, 34, 45, 50, 14, 43, 37, 39, 29], [47, 16, 10, 17, 18, 14, 12, 28, 19, 25, 45, 10, 20, 22], [18, 17], [10, 10], [33, 18, 18, 49, 41, 14, 28, 30, 16, 28, 24, 21, 15, 39, 24, 23, 32, 12, 28, 24, 24, 17, 32, 40, 25, 44, 40, 18], [47, 16, 19, 16], [13, 39, 39, 49, 32, 16], [13, 16, 47, 15, 22, 15, 49, 20], [18, 45, 47, 44, 50, 39, 23, 32, 15, 31, 26, 20, 13, 21, 26, 47, 16, 25, 42, 33], [50, 46], [33, 35, 35, 50, 23, 39, 31, 48, 14, 36, 37, 17, 31, 36, 46, 50, 17, 10, 17, 16, 15, 49, 13, 39, 42, 17, 48, 26], [20, 39, 24, 36, 13, 45, 29, 38, 30, 21, 34, 30, 29, 16, 49, 41, 25, 19, 10, 14, 30, 15], [12, 48, 17, 49, 13, 34, 12, 23, 35, 45, 50, 30, 43, 22, 11, 38], [10, 13, 41, 48, 34, 36, 43, 35, 15, 35, 12, 48, 38, 35, 22, 20, 42, 38, 29, 47, 15, 30, 30, 30, 20, 18, 50, 11, 29, 42, 43, 21, 15, 29, 14, 31, 50, 19], [34, 13, 24, 29, 49, 15, 13, 23, 34, 32, 38, 47, 40, 38, 17, 32, 17, 37, 38, 34, 23, 43, 30, 46]]
  const [emojy, setEmojy] = useState([])




  const [currentArray, setCurrentArray] = useState([])

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.darkMedium16, { textAlign: 'center', paddingTop: 15, color: JSON.parse(user?.name)?.color?.title ? JSON.parse(user?.name)?.color?.title : "black", fontFamily: JSON.parse(user?.name)?.font }]}>{JSON.parse(user?.name)?.name}</Text>

    } catch (error) {
      return <Text style={[Styles.darkMedium16, { textAlign: 'center', paddingTop: 15, }]}> {user?.name}</Text >
    }
  }


  useEffect(() => {
    let temp = []
    const uniqueCategoryIds = [...new Set(getSound.data.map(item => item.category_id))];
    let emojys = []
    uniqueCategoryIds.map((elm, i) => {
      if (elm == 138) {
        let emojy1 = ["🍎", "🍕", '🥕', '🍏', '🥤', '🥛', '🤩']
        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
        temp = [...temp, ...Eda]
      }
      else if (elm == 170) {
        let emojy1 = ["🎹", "🎶", '🎸', '🎷', '🎸', '🪇', "🎼", '🎹', '🎸',]
        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
        temp = [...temp, ...musInst]
      }
      else if (elm == 164) {
        temp = [...temp, ...animals]
        let emojy1 = ["🐥", "🐦", '🐈', '🦆', '🐔', '🐶', '🐕', '🦮', '🐺', '🐅', '🐄', '🐎', '🐯']
        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
      }
      else if (elm == 160) {
        temp = [...temp, ...PrirodaYavlenia]
        let emojy1 = ["🌧", "☔", '🚰', '⛈️', '⚡', '⛈️']

        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
      }
      else if (elm == 159) {
        temp = [...temp, ...Priroda]
        Priroda.map((elm, i) => {
          emojys.push("")
        })
      }
      else if (elm == 156) {
        temp = [...temp, ...fest]
        fest.map((elm, i) => {
          emojys.push("")
        })
      }
      else if (elm == 154) {
        temp = [...temp, ...sport]
        let emojy1 = ["🏁", "🏀", '🥋', '🏆', '🥳', '🏃']
        emojy1.map((elm, i) => {
          emojys.push(elm)
        })

      }
      else if (elm == 142) {
        let emojy1 = ['🛠', '🛠', require('../../../assets/img/drill2-min.png'), require('../../../assets/img/vacuu.png')]
        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
        temp = [...temp, ...stroyInst]
      }
      else if (elm == 141) {
        let emojy1 = [require('../../../assets/img/drill.png'), require('../../../assets/img/drill-min.png'), '🔨', require('../../../assets/img/drill-satire-min.png'), '🪚', require('../../../assets/img/bosch-drill-min.png'), require('../../../assets/img/welding-helmet--min.png'), '🔧', require('../../../assets/img/drilln.png')]
        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
        temp = [...temp, ...stroyibag]
      }
      else if (elm == 136) {
        let emojy1 = ["🏎️", "🏍️", require('../../../assets/img/red-sport-car-min.png'), '🚗', '🚖', '🛻', '🚚', require('../../../assets/img/sport-car-min.png'), require('../../../assets/img/sport-car.png'), require('../../../assets/img/sport-car2.png'), '🚍', '🚘', '🚜', '🚜', '🚁', '🚆']

        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
        temp = temp.concat(transport)
      }
      else if (elm == 166) {
        let emojy1 = ['🎥', '🕰', '📺', '🗝']

        emojy1.map((elm, i) => {
          emojys.push(elm)
        })
        temp = temp.concat(Anticvar)
      }
    })

    setEmojy(emojys)
    setCurrentArray(temp)
  }, [categoryID])


  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  useEffect(() => {
    setLikeCount(+like_count)
  }, [like_count])



  useEffect(() => {
    // Add back handler to stop sound when navigating back
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      StopSound();
      if (soundInstance) {
        return true; // Return false to let the default back behavior happen
      }
      else {
        return false
      }
    });

    return () => {
      StopSound();
      backHandler.remove(); // Clean up the event listener
    };
  }, [soundInstance]);

  const checkIfEmoji = (text) => {
    const regex = emojiRegex();
    return regex.test(text);
  };


  const StopSound = () => {
    if (soundInstance) {
      soundInstance.stop(() => {
        setLoading(false)
        setIsPlaying(false);
        setSoundInstance(null)
      });
    }
  }

  function isEmoji(char) {
    if (char > 0 && char < 1400) {
      return true
    }
    return false
  }



  const handleButtonClick = (name) => {
    setLoading(true)
    let interval = null;
    setCurrentTime(0)
    clearInterval(intervalId);
    current?.stop(() => { });
    if (soundInstance) {
      soundInstance.stop(() => {
        setLoading(false)
        setIsPlaying(false);
        setSoundInstance(null)
      });
    }
    else {
      setEndReach(false)
      const sound = new Sound(`https://chambaonline.pro/uploads/audio/${name}`, null, (error) => {
        if (error) {
          return;
        }
        else {
          setLoading(false)
        }
        sound.play((success) => {
          setSoundInstance(null)
          setEndReach(false)
          setIsPlaying(false);
        });
        interval = setInterval(() => {
          sound.getCurrentTime((seconds) => {
            setCurrentTime(seconds * 2);
          });
        }, 500);
        setIntervalId(interval)

        setSoundInstance(sound);
        setIsPlaying(true);
      });
      setCureent(sound)
    }
  }

  const TextType = (text) => {
    if (text.includes('https://media')) {
      return <View >
        <Text style={Styles.darkMedium13}>{canParseJSON(user?.name)}</Text>
        <FastImage source={{ uri: text }} style={styles.image} />
      </View>
    }

    else if (checkIfEmoji(text)) {
      return <View >
        <Text style={Styles.darkMedium13}>{canParseJSON(user?.name)}</Text>
        <Text style={[Styles.darkMedium13]}>
          {text}
        </Text>
      </View>
    }
    else if (text.includes('.wav')) {
      let ind = getSound.data.findIndex((elm) => elm.name == text)
      let wave = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
      let emojys = null
      if (ind >= 0) {
        wave = currentArray[ind]
        emojys = emojy[ind]
      }

      if (loading) {
        return <View>
          <Text style={Styles.darkMedium13}>{canParseJSON(user?.name)}</Text>
          <View style={styles.voice}>
            <View style={{ width: 20 }}>
              <ActivityIndicator color={"#141c3b"} />
            </View>
            <View style={{ width: '60%', alignItems: 'flex-start' }}>
              <Waveform currentTime={true} waveformData={wave} />
            </View>
          </View>
        </View>
      }
      else {
        return <View >
          <Text style={Styles.darkMedium13}>{canParseJSON(user?.name)}</Text>
          <View style={styles.voice}>
            <TouchableOpacity style={{}} onPress={() => handleButtonClick(text)}>
              {!isPlaying ?
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/play.png')} /> :
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/pause.png')} />
              }
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', }}>
              {!isEmoji(emojys) ?
                <Text style={{ fontSize: 25, marginTop: -3 }}>
                  {emojys}
                </Text> :
                <View>
                  {emojys &&
                    <Image style={{ width: 35, height: 35, objectFit: 'contain' }} source={emojys} />
                  }
                </View>
              }
            </View>
            <Waveform endReach={endReach} soundInstance={soundInstance} currentTime={currentTime} waveformData={wave} />
          </View>
        </View>
      }
    }
    else {

      return <View>
        <Text style={Styles.darkMedium13}>{canParseJSON(user?.name)}</Text>
        <Text style={[Styles.darkMedium12, { fontSize: 13 }]}>{text}</Text>
      </View>
    }
  }
  return (
    <View
      style={[
        Styles.flexAlignItems,
        { alignItems: 'flex-start', marginTop: 15 },
      ]}>

      <DelateModal
        Confirm={() => {
          StopSound()
          onDeletComment(id, parent_id)
        }}
        confirmText={t(mainData.lang).Delete}
        title={"Удалить комментарий ?"}

        show={show}
        setModalVisible={(e) => setShow(e)}
      />

      <View style={{ flexDirection: 'row' }}>
        <Image
          style={ansswer ? styles.answerImg : styles.img}
          source={{ uri: `https://chambaonline.pro/uploads/${user?.avatar}` }}
        />
        <View style={[{ marginLeft: 10, marginTop: -10 }, owner ? { width: '80%' } : { width: '75%' }]}>
          {TextType(text)}
          <View style={{ flexDirection: 'row', gap: 20, marginTop: 2, alignItems: 'center' }}>
            <Text style={Styles.balihaiMedium13}>{daysAgo}</Text>
            {(!owner && !ansswer) && <TouchableOpacity
              onPress={() => onPressAnsswer({ name: user?.name, id: id })}>
              <Text>ответить</Text>
            </TouchableOpacity>}
            {myuser.allData?.data?.id == user?.id &&
              <TouchableOpacity
                style={{ marginBottom: 2 }}
                onPress={() => {
                  // StopSound()
                  setShow(true)
                  // onDeletComment(id, parent_id)
                }}
              >
                <Text style={Styles.balihaiMedium13}>удалить</Text>
              </TouchableOpacity>}
          </View>
        </View>
      </View>
      <View style={styles.like}>
        <TouchableOpacity
          onPress={() => {
            if (liked) {
              setLikeCount(likeCount - 1);
              setLiked(false);
            } else {
              setLikeCount(likeCount + 1);
              setLiked(true);
            }
            dispatch(LikeCommentAction({ comment_id: id }, token));
          }}>
          <CommentLikeSvg liked={liked} />
        </TouchableOpacity>
        <Text style={[Styles.eslipesMedium10, { textAlign: 'center', marginTop: -5, width: '100%' }]}>{likeCount}</Text>
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  imgBlock: {
    borderRadius: 60,
    height: 55,
    width: 55,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppColors.Mustard_Color,
  },
  img: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  answerImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  like: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'centerd',
    justifyContent: 'center',
    height: '100%'
  },
  image: {
    height: 200,
    objectFit: 'contain',
    width: 200,
    borderRadius: 10,
  },
  voice: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  }
});
