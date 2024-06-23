import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
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
  daysAgo,
  deletComment
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
        onDeletComment={deletComment}
        replay={replay}
        daysAgo={daysAgo}
      />
      {showAnswrs &&
        <CommentComponent
          onDeletComment={deletComment}

          token={staticdata.token} onPressAnsswer={onPressAnsswer} commentData={replay} />
      }
      {!owner && (
        <TouchableOpacity onPress={() => setShowAnswers(!showAnswrs)}>
          {replay_count != 0 && <Text
            style={[Styles.balihaiMedium9, { marginLeft: 70, marginTop: 20 }]}>
            {showAnswrs ? 'Скрыть ответы' : `Смотреть ещё ${replay_count} Ответа`}
          </Text>}
        </TouchableOpacity>
      )}
    </View>
  );
};