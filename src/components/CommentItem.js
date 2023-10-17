import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CommentLikeSvg } from '../assets/svg/Svgs';
import { LikeCommentAction } from '../store/action/action';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';

export const CommentItem = ({
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
  daysAgo,
  onDeletComment
}) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const myuser = useSelector((st) => st.userData)
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  useEffect(() => {
    setLikeCount(+like_count)
  }, [like_count])
  return (
    <View
      style={[
        Styles.flexAlignItems,
        { alignItems: 'flex-start', marginTop: 20 },
        // ansswer && { marginLeft: 30 },
      ]}>
      <View style={owner && styles.imgBlock}>
        <Image
          style={ansswer ? styles.answerImg : styles.img}
          source={{
            uri: `https://chamba.justcode.am/uploads/${owner ? userImg : user?.avatar
              }`,
          }}
        />
      </View>
      <View style={[{ marginLeft: 10 }, owner ? { width: '80%' } : { width: '75%' }]}>
        <Text style={Styles.darkMedium13}>
          {owner ? ownerName : user?.name}
        </Text>
        <Text style={[Styles.darkSemiBold12, { marginTop: 5 }]}>
          {text}
        </Text>
        <View style={Styles.flexAlignItems}></View>
        {!owner && (
          <View style={{ flexDirection: 'row', marginTop: 5, gap: 20 }}>
            <Text >{daysAgo}</Text>
            <TouchableOpacity
              onPress={() => onPressAnsswer({ name: user?.name, id: id })}>
              <Text>ответить</Text>
            </TouchableOpacity>
            {myuser.allData.data.id == user?.id && <TouchableOpacity
              onPress={() => onDeletComment(id)}>
              <Text>удалить</Text>
            </TouchableOpacity>}
          </View>
        )}
      </View>
      {
        !owner && (
          <View style={[styles.like]}>
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
            <Text
              style={[
                [Styles.eslipesMedium10, { textAlign: 'center', marginTop: -5 }],
              ]}>
              {likeCount}
            </Text>
          </View>
        )
      }
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
});
