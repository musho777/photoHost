import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
import { CommentItem } from './CommentItem';
import CommentComponent from './CommetnComponent';

export const CommentBlock = ({
  text,
  isLiked,
  owner,
  ansswer,
  user,
  like_count,
  id,
  token,
  ownerName,
  userImg,
  onPressAnsswer,
  replay,
  replay_count,
  daysAgo
}) => {
  const [showAnswrs, setShowAnswers] = useState(false);
  const staticdata = useSelector(st => st.static);

  return (
    <View>
      <CommentItem
        text={text}
        isLiked={isLiked}
        owner={owner}
        ansswer={ansswer}
        user={user}
        like_count={like_count}
        id={id}
        token={token}
        ownerName={ownerName}
        userImg={userImg}
        onPressAnsswer={onPressAnsswer}
        replay={replay}
        daysAgo={daysAgo}
      />
      {showAnswrs &&
        <CommentComponent token={staticdata.token} onPressAnsswer={onPressAnsswer} commentData={replay} />
      }
      {!owner && (
        <TouchableOpacity onPress={() => setShowAnswers(!showAnswrs)}>
          {replay_count != 0 && <Text
            style={[Styles.balihaiMedium9, { marginLeft: 70, marginTop: 20 }]}>
            {showAnswrs ? 'Скрыть ответы' : `Смотреть ещё ${replay_count} ответа`}
          </Text>}
        </TouchableOpacity>
      )}
    </View>
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
});
