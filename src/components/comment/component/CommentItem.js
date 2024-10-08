import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import emojiRegex from 'emoji-regex';
import { Styles } from '../../../styles/Styles';
import { LikeCommentAction } from '../../../store/action/action';
import { CommentLikeSvg } from '../../../assets/svg/Svgs';
import { AppColors } from '../../../styles/AppColors';
import Sound from 'react-native-sound';

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
  parent_id
}) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const myuser = useSelector((st) => st.userData)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState(false)
  const [soundInstance, setSoundInstance] = useState(null);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  useEffect(() => {
    setLikeCount(+like_count)
  }, [like_count])



  const checkIfEmoji = (text) => {
    const regex = emojiRegex();
    return regex.test(text);
  };


  const handleButtonClick = (name) => {
    setLoading(true)
    if (isPlaying) {
      // Stop the sound if it's currently playing
      if (soundInstance) {
        soundInstance.stop(() => {
          setLoading(false)
          console.log('Sound stopped');
          setIsPlaying(false);
        });
      }
    } else {
      // If the sound is not playing, create a new Sound instance
      const sound = new Sound(`https://chambaonline.pro/uploads/audio/${name}`, null, (error) => {
        if (error) {
          console.log('Failed to load sound', name, error);
          return;
        }
        else {
          setLoading(false)
        }
        console.log('Sound loaded successfully');

        // Play the sound
        sound.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Playback failed');
          }
          setIsPlaying(false);  // Reset isPlaying state after sound finishes
        });

        // Save the sound instance in the state to use it for stopping
        setSoundInstance(sound);
        setIsPlaying(true);
      });
    }
  }

  // const handleButtonClick = (name) => {
  //   console.log(name)

  //   const sound = new Sound(`https://chambaonline.pro/uploads/audio/${name}`, null, (error) => {
  //     if (error) {
  //       console.log('Failed to load sound', name, error);
  //     }
  //   });
  //   console.log(sound, 'isPlaying')
  //   if (isPlaying) {
  //     sound.stop(() => console.log(`Sound ${index} stopped`));
  //     setIsPlaying(false);
  //   } else {
  //     sound.play((success) => {
  //       if (success) {
  //         console.log(`Sound played successfully`);
  //       } else {
  //         console.log(`Failed to play sound `);
  //       }
  //     });
  //     setIsPlaying(true);
  //   }
  // };

  const TextType = (text) => {
    if (text.includes('https://media')) {
      return <FastImage source={{ uri: text }} style={styles.image} />
    }
    else if (checkIfEmoji(text)) {
      return <View >
        <Text style={[Styles.darkSemiBold12, { marginTop: -5, fontSize: 15, marginBottom: 7 }]}>
          {user?.name}
        </Text>
        <Text style={[Styles.darkSemiBold12, { marginTop: -5, fontSize: 40 }]}>
          {text}
        </Text>
      </View>
    }
    else if (text.includes('.wav')) {
      console.log(loading, '21')
      if (loading) {
        return <View style={styles.voice}>
          <View style={{ width: 20 }}>
            <ActivityIndicator color={"#141c3b"} />
          </View>
          <Text style={Styles.darkMedium10}>{text}</Text>
        </View>
      }
      else {
        return <View style={styles.voice}>
          <TouchableOpacity onPress={() => handleButtonClick(text)}>
            {!isPlaying ?
              <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/play.png')} /> :
              <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/pause.png')} />
            }
          </TouchableOpacity>
          <Text style={Styles.darkMedium10}>{text}</Text>
        </View>
      }
    }
    else {

      return <Text style={[Styles.darkSemiBold12, { marginTop: 5, fontSize: 15, color: 'red' }]}>
        {user?.name}:<Text style={[Styles.darkMedium12, { fontSize: 13 }]}>{text}</Text>
      </Text>
    }
  }
  return (
    <View
      style={[
        Styles.flexAlignItems,
        { alignItems: 'flex-start', marginTop: 15 },
      ]}>
      <View >
        <Image
          style={ansswer ? styles.answerImg : styles.img}
          source={{ uri: `https://chambaonline.pro/uploads/${user?.avatar}` }}
        />
      </View>
      <View style={[{ marginLeft: 10 }, owner ? { width: '80%' } : { width: '75%' }]}>
        {TextType(text)}
        <View style={Styles.flexAlignItems}></View>
        <View style={{ flexDirection: 'row', marginTop: 5, gap: 20 }}>
          <Text >{daysAgo}</Text>
          {(!owner && !ansswer) && <TouchableOpacity
            onPress={() => onPressAnsswer({ name: user?.name, id: id })}>
            <Text>ответить</Text>
          </TouchableOpacity>}
          {myuser.allData?.data?.id == user?.id && <TouchableOpacity
            onPress={() => onDeletComment(id, parent_id)}>
            <Text>удалить</Text>
          </TouchableOpacity>}
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
    width: 50,
    height: 50,
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
    top: -7,
    alignItems: 'centerd',
    justifyContent: 'center',
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
    alignItems: 'center'
  }
});
