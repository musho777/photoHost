import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CommentWhite, WhiteHeart, WhiteViewSvg } from "../assets/svg/TabBarSvg";
import { NotLineSvgWhite, ShearSvg } from "../assets/svg/Svgs";
import { Styles } from "../styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useRef, useState } from "react";
import { GetFollowerAction, GetPostLikeAction, LikePostAction, newMessageAction } from "../store/action/action";
import { useNavigation } from "@react-navigation/native";
import { LikeList } from "./LikeList";
import { Share } from "./share";

export const PostBody = ({
  commentCount,
  view,
  liked,
  id,
  like,
  user,
  my,
  setShowView,
  setSelectidId = () => { }
}) => {
  const likeRef = useRef(null)
  const shareRef = useRef(null)

  const CloseLike = () => { likeRef.current?.close() }
  const CloseShare = () => { shareRef.current?.close() }

  const snapPointsLike = useMemo(() => ['85%'], []);
  const snapPointsShare = useMemo(() => ['85%'], []);
  const ViewRef = useRef(null)
  const navigation = useNavigation()
  const staticdata = useSelector(st => st.static);
  const dispatch = useDispatch()
  const [openShare, setOpenShare] = useState(0)

  const handlePresentModalPressLike = useCallback(() => { likeRef.current?.present() }, []);
  const handlePresentModalPressShare = useCallback(() => { shareRef.current?.present() }, []);


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
      { paddingHorizontal: 5, marginBottom: 15, flexDirection: 'row', width: '100%' },
    ]}>
    <View style={Styles.flexAlignItems}>
      <View style={[Styles.flexAlignItems, styles.hover]}>
        <TouchableOpacity onPress={() => { LikePost() }}>
          {liked ? <WhiteHeart /> : <NotLineSvgWhite />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          dispatch(GetPostLikeAction({ post_id: id }, staticdata.token, 1));
          handlePresentModalPressLike()
        }
        }>
          <Text style={[Styles.darkMedium14, { color: 'white' }]}> - {like}</Text>
        </TouchableOpacity>
      </View>
      <View style={[Styles.flexAlignItems, styles.hover]}>
        <TouchableOpacity onPress={() => navigation.navigate('coment', { parentId: id })}>
          <CommentWhite />
        </TouchableOpacity>
        <Text style={[Styles.darkMedium14, { color: 'white' }]}> - {commentCount}</Text>
      </View>
      <View style={styles.hover}>
        <TouchableOpacity onPress={() => {
          dispatch(GetFollowerAction({ search: "", user_id: user.allData.data.id }, staticdata.token, 1));
          handlePresentModalPressShare()
          setOpenShare(openShare + 1)
        }}>
          <ShearSvg />
        </TouchableOpacity>
      </View>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, position: 'absolute', right: -8 }}>
      {/* {showView && view > 0 &&
        <TouchableOpacity onPress={() => handlePresentModalPressView()}>
          <Text style={Styles.whiteRegular12}>Посмотреть статистику?</Text>
        </TouchableOpacity>
      } */}
      <TouchableOpacity
        activeOpacity={my ? 0 : 1}
        // onPress={() => }
        onPress={() => {
          setShowView(true)
          setSelectidId(id)
        }}
        style={[Styles.flexAlignItems, styles.hover]}>
        <WhiteViewSvg />
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
  </View>
}

const styles = StyleSheet.create({
  hover: {
    marginRight: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  }
})