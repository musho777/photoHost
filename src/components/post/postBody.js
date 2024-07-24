import { View, Text, TouchableOpacity } from "react-native";
import { Comment, Heart, ViewSvg } from "../../assets/svg/TabBarSvg";
import { NotLineSvg } from "../../assets/svg/Svgs";
import { Styles } from "../../styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { GetPostLikeAction, LikePostAction } from "../../store/action/action";
import { useNavigation } from "@react-navigation/native";

export const PostBody = ({
  commentCount,
  view,
  liked,
  id,
  setOpenLike,
  handlePresentModalPressLike,
  setLikedCount,
  likedCount,
}) => {

  const navigation = useNavigation()
  const [isLiked, setIsLiked] = useState(liked)
  const staticdata = useSelector(st => st.static);
  const dispatch = useDispatch()

  const LikePost = () => {
    if (isLiked) {
      setLikedCount(likedCount - 1)
    }
    else {
      setLikedCount(likedCount + 1)
    }
    setIsLiked(!isLiked)
    dispatch(LikePostAction({
      'post_id': id
    },
      staticdata.token
    ))
  }

  return <View
    style={[
      { paddingHorizontal: 15, marginBottom: 15 },
      Styles.flexSpaceBetween,
    ]}>
    <View style={Styles.flexAlignItems}>
      <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
        <TouchableOpacity onPress={() => { LikePost() }}>
          {isLiked ? <Heart /> : <NotLineSvg />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setOpenLike(true)
          dispatch(GetPostLikeAction({ post_id: id }, staticdata.token, 1));
          handlePresentModalPressLike()
        }
        }>
          <Text style={[Styles.darkMedium14]}> - {likedCount}</Text>
        </TouchableOpacity>
      </View>
      <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('coment', { parentId: id })}>
          <Comment />
        </TouchableOpacity>
        <Text style={[Styles.darkMedium14]}> - {commentCount}</Text>
      </View>
    </View>
    <View style={Styles.flexAlignItems}>
      <ViewSvg />
      <Text style={[Styles.balihaiRegular14, { marginLeft: 5 }]}>
        {view}
      </Text>
    </View>
  </View>
}