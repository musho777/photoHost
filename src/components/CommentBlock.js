import {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CommentLikeSvg} from '../assets/svg/Svgs';
import {LikeCommentAction} from '../store/action/action';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';
import {CommentItem} from './CommentItem';

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
  replay_count
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(+like_count);
  const dispatch = useDispatch();
  const [comentReplay, setComentReplay] = useState([]);
  const [showAnswrs, setShowAnswers] = useState(false);
  const staticdata = useSelector(st => st.static);

  const ShowComment = (data, count) => {
    let item = [...comentReplay];
    data?.map((elm, i) => {
      item.push({replay: elm, count: count});
      setComentReplay(item);
    });
    data?.map((elm, i) => {
      if (elm?.replay?.length) {
        ShowComment(data.replay, count++);
      }
    });
  };
  useEffect(() => {
    ShowComment(replay, 1);
  }, []);
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
      />
      {showAnswrs &&
        comentReplay.map((elm, i) => {
          return (
            <CommentItem
              key={i}
              text={elm.replay.comment}
              owner={false}
              ansswer={true}
              replay={elm.replay.replay}
              user={elm.replay.user}
              like_count={elm.replay.likes_count}
              isLiked={elm.replay.like_auth_user.length}
              id={elm.replay.id}
              token={staticdata.token}
            />
          );
        })}
      {!owner && (
        <TouchableOpacity onPress={() => setShowAnswers(!showAnswrs)}>
         {replay_count !=0  &&<Text
            style={[Styles.balihaiMedium9, {marginLeft: 70, marginTop: 20}]}>
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
