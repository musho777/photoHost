import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CommentWhite, WhiteHeart, WhiteViewSvg } from "../assets/svg/TabBarSvg";
import { NotLineSvgWhite, ShearSvg } from "../assets/svg/Svgs";
import { Styles } from "../styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetFollowerAction, GetPostLikeAction, LikePostAction } from "../store/action/action";
import { useNavigation } from "@react-navigation/native";

export const PostBody = ({
  commentCount,
  view,
  liked,
  id,
  like,
  user,
  my,
  setShowView,
  postCount,
  setShowLike,
  setShowShare,
  likeClose,
  showShare,
  categoryId,
  setShowComment,
  setCommentData,
  setSelectidId = () => { }
}) => {
  const navigation = useNavigation()
  const [showViewText, setShowViewText] = useState(false)
  const staticdata = useSelector(st => st.static);
  const dispatch = useDispatch()
  const [isliked, setIsliked] = useState(null)
  const [likeCount, setlikeCount] = useState(null)

  useEffect(() => {
    setlikeCount(like)
    setIsliked(liked)
  }, [like, liked])

  const LikePost = () => {
    setIsliked(!isliked)
    if (isliked) {
      setlikeCount(likeCount - 1)
    }
    else {
      setlikeCount(likeCount + 1)
    }
    dispatch(LikePostAction({
      'post_id': id
    },
      staticdata.token,
      user.data.id
    ))
  }

  useEffect(() => {
    if (postCount <= 3 && my) {
      setShowViewText(true)
    }
  }, [postCount])

  return <View style={styles.bostBody}>
    {(!likeClose && !showShare) && <View style={{ gap: 5, position: 'absolute', bottom: 0, right: 5, }}>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => {
          dispatch(GetPostLikeAction({ post_id: id }, staticdata.token, 1));
          setShowLike(true)
        }} style={styles.hover}>
        <TouchableOpacity onPress={() => LikePost()} style={styles.hoverItem}>
          <View >
            {isliked ? <WhiteHeart /> : <NotLineSvgWhite />}
          </View>
          <TouchableOpacity onPress={(e) => {
            e.preventDefault()
            dispatch(GetPostLikeAction({ post_id: id }, staticdata.token, 1));
            setShowLike(true)
          }
          }>
            <Text style={[Styles.darkMedium14, { color: 'white' }]}>{likeCount}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setShowComment(true)
        setCommentData({ parentId: id, categoryId: categoryId })
        // navigation.navigate('coment', { parentId: id, categoryId: categoryId })
      }} style={styles.hover}>
        <View style={styles.hoverItem}>
          <CommentWhite />
          <Text style={[Styles.darkMedium14, { color: 'white' }]}>{commentCount}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.hover}
        onPress={() => {
          dispatch(GetFollowerAction({ search: "", user_id: user.allData.data.id }, staticdata.token, 1));
          setShowShare(true)
          setSelectidId(id)
        }}>
        <ShearSvg />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1, right: 0 }}>
        {(showViewText && view > 0) &&
          <TouchableOpacity onPress={() => {
            setShowView(true)
            setSelectidId(id)
          }} style={[styles.hover, { position: 'absolute', right: 50, height: 36 }]}>
            <Text style={[Styles.whiteRegular12]}>Посмотреть статистику?</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          activeOpacity={my ? 0 : 1}
          onPress={() => {
            if (my && view > 0) {
              setShowView(true)
              setSelectidId(id)
            }
          }}
          style={styles.hover}>
          <View style={styles.hoverItem}>
            <View style={{ marginTop: 1 }}>
              <WhiteViewSvg />
            </View>
            <Text style={[Styles.balihaiRegular14, { color: 'white' }]}>{view}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>}
  </View>
}

const styles = StyleSheet.create({
  hover: {
    marginRight: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 20,
    height: 50,
    justifyContent: "space-around",
    flexDirection: 'column',
    alignItems: 'center'
  },
  bostBody: {
    paddingHorizontal: 5,
    // marginBottom: 30,
    flexDirection: 'row',
    width: '100%'
  },
  hoverItem: {
    height: '100%',
    justifyContent: 'space-between',
    width: 20,
    alignItems: 'center'
  }
})