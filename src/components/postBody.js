import { View, Text, TouchableOpacity } from "react-native";
import { Comment, CommentWhite, Heart, ViewSvg, WhiteHeart, WhiteViewSvg } from "../assets/svg/TabBarSvg";
import { NotLineSvg, NotLineSvgWhite } from "../assets/svg/Svgs";
import { Styles } from "../styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useRef, useState } from "react";
import { GetPostLikeAction, LikePostAction } from "../store/action/action";
import { useNavigation } from "@react-navigation/native";
import { LikeList } from "./LikeList";
import { ViewComponent } from "./statistic/ViewComponent";

export const PostBody = ({
  commentCount,
  view,
  liked,
  id,
  like,
  user,
  my,
  big = false
}) => {
  const likeRef = useRef(null)
  const CloseLike = () => { likeRef.current?.close() }
  const CloseView = () => { ViewRef.current?.close() }


  const [currentId, setCurrentId] = useState(null)
  const snapPointsLike = useMemo(() => ['85%'], []);
  const ViewRef = useRef(null)
  const navigation = useNavigation()
  const staticdata = useSelector(st => st.static);
  const dispatch = useDispatch()

  const handlePresentModalPressLike = useCallback(() => { likeRef.current?.present() }, []);
  const handlePresentModalPressView = useCallback(() => {
    setCurrentId(id)
    ViewRef.current?.present()
  }, []);


  const LikePost = () => {
    dispatch(LikePostAction({
      'post_id': id
    },
      staticdata.token,
      user.data.id
    ))
  }

  return <View
    style={[
      { paddingHorizontal: 15, marginBottom: 15 },
      Styles.flexSpaceBetween,
    ]}>
    <View style={Styles.flexAlignItems}>
      <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
        {big ? <TouchableOpacity onPress={() => { LikePost() }}>
          {liked ? <WhiteHeart /> : <NotLineSvgWhite />}
        </TouchableOpacity> : <TouchableOpacity onPress={() => { LikePost() }}>
          {liked ? <Heart /> : <NotLineSvg />}
        </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => {
          dispatch(GetPostLikeAction({ post_id: id }, staticdata.token, 1));
          handlePresentModalPressLike()
        }
        }>
          <Text style={[Styles.darkMedium14, big && { color: 'white' }]}> - {like}</Text>
        </TouchableOpacity>
      </View>
      <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('coment', { parentId: id })}>
          {big ?
            <CommentWhite /> :
            <Comment />
          }
        </TouchableOpacity>
        <Text style={[Styles.darkMedium14, big && { color: 'white' }]}> - {commentCount}</Text>
      </View>
    </View>
    <TouchableOpacity
      activeOpacity={my ? 0 : 1}
      onPress={() => handlePresentModalPressView()}
      style={Styles.flexAlignItems}>
      {big ?
        <WhiteViewSvg /> :
        <ViewSvg />
      }
      <Text style={[Styles.balihaiRegular14, big && { color: 'white' }, { marginLeft: 5 }]}>
        {view}
      </Text>
    </TouchableOpacity>
    <LikeList
      close={() => CloseLike()}
      token={staticdata.token}
      id={id}
      ref={likeRef}
      snapPoints={snapPointsLike}
    />
    {my && <ViewComponent
      close={() => CloseView()}
      currentId={currentId}
      token={staticdata.token}
      id={id}
      ref={ViewRef}
      snapPoints={snapPointsLike}
    />}
  </View>
}