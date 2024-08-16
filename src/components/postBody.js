import { View, Text, TouchableOpacity } from "react-native";
import { Comment, Heart, ViewSvg } from "../assets/svg/TabBarSvg";
import { NotLineSvg } from "../assets/svg/Svgs";
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
}) => {
  const user = useSelector((st) => st.userData)
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
        <TouchableOpacity onPress={() => { LikePost() }}>
          {liked ? <Heart /> : <NotLineSvg />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          dispatch(GetPostLikeAction({ post_id: id }, staticdata.token, 1));
          handlePresentModalPressLike()
        }
        }>
          <Text style={[Styles.darkMedium14]}> - {like}</Text>
        </TouchableOpacity>
      </View>
      <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('coment', { parentId: id })}>
          <Comment />
        </TouchableOpacity>
        <Text style={[Styles.darkMedium14]}> - {commentCount}</Text>
      </View>
    </View>
    <TouchableOpacity
      onPress={() => handlePresentModalPressView()}
      style={Styles.flexAlignItems}>
      <ViewSvg />
      <Text style={[Styles.balihaiRegular14, { marginLeft: 5 }]}>
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
    <ViewComponent
      close={() => CloseView()}
      currentId={currentId}
      token={staticdata.token}
      id={id}
      ref={ViewRef}
      snapPoints={snapPointsLike}
    />
  </View>
}