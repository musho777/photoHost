import { View, Text, TouchableOpacity } from "react-native";
import { Comment, CommentWhite, Heart, ViewSvg, WhiteHeart, WhiteViewSvg } from "../assets/svg/TabBarSvg";
import { NotLineSvg, NotLineSvgWhite, ShearSvg } from "../assets/svg/Svgs";
import { Styles } from "../styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useRef, useState } from "react";
import { GetFollowerAction, GetPostLikeAction, LikePostAction, newMessageAction } from "../store/action/action";
import { useNavigation } from "@react-navigation/native";
import { LikeList } from "./LikeList";
import { ViewComponent } from "./statistic/ViewComponent";
import { Share } from "./share";

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
  const shareRef = useRef(null)

  const CloseLike = () => { likeRef.current?.close() }
  const CloseShare = () => { shareRef.current?.close() }
  const CloseView = () => { ViewRef.current?.close() }

  const [currentId, setCurrentId] = useState(null)
  const snapPointsLike = useMemo(() => ['85%'], []);
  const snapPointsShare = useMemo(() => ['85%'], []);
  const ViewRef = useRef(null)
  const navigation = useNavigation()
  const staticdata = useSelector(st => st.static);
  const dispatch = useDispatch()
  const [showView, setShowView] = useState(false)
  const [openShare, setOpenShare] = useState(0)

  const handlePresentModalPressLike = useCallback(() => { likeRef.current?.present() }, []);
  const handlePresentModalPressShare = useCallback(() => { shareRef.current?.present() }, []);

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
      { paddingHorizontal: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    ]}>
    <View style={Styles.flexAlignItems}>
      <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
        {
          // big ?
          <TouchableOpacity onPress={() => { LikePost() }}>
            {liked ? <WhiteHeart /> : <NotLineSvgWhite />}
          </TouchableOpacity>
          // <TouchableOpacity onPress={() => { LikePost() }}>
          //   {liked ? <Heart /> : <NotLineSvg />}
          // </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => {
          dispatch(GetPostLikeAction({ post_id: id }, staticdata.token, 1));
          handlePresentModalPressLike()
        }
        }>
          <Text style={[Styles.darkMedium14, { color: 'white' }]}> - {like}</Text>
        </TouchableOpacity>
      </View>
      <View style={[Styles.flexAlignItems, { marginRight: 10 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('coment', { parentId: id })}>
          {/* {big ? */}
          <CommentWhite />
          {/* <Comment /> */}
          {/* } */}
        </TouchableOpacity>
        <Text style={[Styles.darkMedium14, { color: 'white' }]}> - {commentCount}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => {
          dispatch(GetFollowerAction({ search: "", user_id: user.allData.data.id }, staticdata.token, 1));
          handlePresentModalPressShare()
          setOpenShare(openShare + 1)
        }}>
          <ShearSvg />
        </TouchableOpacity>
      </View>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      {showView && view > 0 &&
        <TouchableOpacity onPress={() => handlePresentModalPressView()}>
          <Text style={Styles.balihaiRegular12}>Посмотреть статистику?</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity
        activeOpacity={my ? 0 : 1}
        onPress={() => setShowView(!showView)}
        style={[Styles.flexAlignItems, { zIndex: 999 }]}>
        {/* {big ? */}
        <WhiteViewSvg />
        {/* // <ViewSvg /> */}
        {/* } */}
        <Text style={[Styles.balihaiRegular14, { color: 'white' }, { marginLeft: 5 }]}>
          {view}
        </Text>
      </TouchableOpacity>
    </View>

    <LikeList
      close={() => CloseLike()}
      token={staticdata.token}
      id={id}
      ref={likeRef}
      snapPoints={snapPointsLike}
    />
    <Share
      close={() => CloseShare()}
      postId={id}
      ref={shareRef}
      user_id={user?.allData.data?.id}
      snapPoints={snapPointsShare}
      open={openShare}
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