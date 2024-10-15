import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import emojiRegex from 'emoji-regex';
import { Styles } from '../../../styles/Styles';
import { LikeCommentAction } from '../../../store/action/action';
import { CommentLikeSvg, VoiceAmplituda } from '../../../assets/svg/Svgs';
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
  parent_id,
  setCureent,
  current
}) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const myuser = useSelector((st) => st.userData)
  const [isPlaying, setIsPlaying] = useState(false)
  const [soundInstance, setSoundInstance] = useState(null);
  const [loading, setLoading] = useState(false)


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


  const handleButtonClick = (name) => {
    setLoading(true)
    current?.stop(() => { });
    if (soundInstance) {
      soundInstance.stop(() => {
        setLoading(false)
        setIsPlaying(false);
        setSoundInstance(null)
      });
    }
    else {
      const sound = new Sound(`https://chambaonline.pro/uploads/audio/${name}`, null, (error) => {
        if (error) {
          console.log('Failed to load sound', name, error);
          return;
        }
        else {
          setLoading(false)
        }
        sound.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Playback failed');
          }
          setSoundInstance(null)
          setIsPlaying(false);
        });

        setSoundInstance(sound);
        setIsPlaying(true);
      });
      setCureent(sound)
    }
  }


  const TextType = (text) => {
    if (text.includes('https://media')) {
      return <View style={{ gap: 5 }}>
        <Text style={Styles.darkMedium13}>{user?.name}</Text>
        <FastImage source={{ uri: text }} style={styles.image} />
      </View>
    }
    else if (checkIfEmoji(text)) {
      return <View style={{ gap: 5 }}>
        <Text style={Styles.darkMedium13}>{user?.name}</Text>
        <Text style={[Styles.darkSemiBold12, { marginTop: -5, fontSize: 40 }]}>
          {text}
        </Text>
      </View>
    }
    else if (text.includes('.wav')) {
      if (loading) {

        return <View style={{ gap: 5 }}>
          <Text style={Styles.darkMedium13}>{user?.name}</Text>
          <View style={styles.voice}>
            <View style={{ width: 20 }}>
              <ActivityIndicator color={"#141c3b"} />
            </View>
            <View style={{ width: '60%', alignItems: 'flex-start' }}>
              <VoiceAmplituda height={20} />
            </View>
          </View>
        </View>
      }
      else {
        return <View style={{ gap: 5 }}>
          <Text style={Styles.darkMedium13}> {user?.name}</Text>
          <View style={styles.voice}>
            <TouchableOpacity onPress={() => handleButtonClick(text)}>
              {!isPlaying ?
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/play.png')} /> :
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/img/pause.png')} />
              }
            </TouchableOpacity>
            <View style={{ width: '60%', alignItems: 'flex-start' }}>
              <VoiceAmplituda height={20} />
            </View>
          </View>
        </View>
      }
    }
    else {

      return <View style={{ gap: 5 }}>
        <Text style={Styles.darkMedium13}>{user?.name}</Text>
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
      <View >
        <Image
          style={ansswer ? styles.answerImg : styles.img}
          source={{ uri: `https://chambaonline.pro/uploads/${user?.avatar}` }}
        />
      </View>
      <View style={[{ marginLeft: 10 }, owner ? { width: '80%' } : { width: '75%' }]}>
        {TextType(text)}
        <View style={Styles.flexAlignItems}></View>
        <View style={{ flexDirection: 'row', marginTop: 5, gap: 20, alignItems: 'center' }}>
          <Text style={Styles.balihaiMedium13}>{daysAgo}</Text>
          {(!owner && !ansswer) && <TouchableOpacity
            onPress={() => onPressAnsswer({ name: user?.name, id: id })}>
            <Text>ответить</Text>
          </TouchableOpacity>}
          {myuser.allData?.data?.id == user?.id &&
            <TouchableOpacity
              style={{ marginBottom: 2 }}
              onPress={() => {
                StopSound()
                onDeletComment(id, parent_id)
              }}>
              <Text style={Styles.balihaiMedium13}>удалить</Text>
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
