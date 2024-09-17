import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CommentWhite, WhiteHeart, WhiteViewSvg } from "../assets/svg/TabBarSvg";
import { NotLineSvgWhite, ShearSvg } from "../assets/svg/Svgs";
import { Styles } from "../styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useRef, useState } from "react";
import { GetFollowerAction, GetPostLikeAction, LikePostAction } from "../store/action/action";
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
  const navigation = useNavigation()
  const [showViewText, setShowViewText] = useState(false)
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

  return <View style={styles.bostBody}>
    <View style={{ gap: 15, position: 'absolute', bottom: 0, right: 5, }}>
      <View style={styles.hover}>
        <View style={styles.hoverItem}>
          <TouchableOpacity onPress={() => { LikePost() }}>
            {liked ? <WhiteHeart /> : <NotLineSvgWhite />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            dispatch(GetPostLikeAction({ post_id: id }, staticdata.token, 1));
            handlePresentModalPressLike()
          }
          }>
            <Text style={[Styles.darkMedium14, { color: 'white' }]}>{like}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('coment', { parentId: id })} style={styles.hover}>
        <View style={styles.hoverItem}>
          <CommentWhite />
          <Text style={[Styles.darkMedium14, { color: 'white' }]}>{commentCount}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.hover}
        onPress={() => {
          dispatch(GetFollowerAction({ search: "", user_id: user.allData.data.id }, staticdata.token, 1));
          handlePresentModalPressShare()
          setOpenShare(openShare + 1)
        }}>
        <ShearSvg />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1, right: 0 }}>
        {showViewText && view > 0 &&
          <TouchableOpacity onPress={() => {
            setShowView(true)
            setSelectidId(id)
          }} style={[styles.hover, { position: 'absolute', right: 60, height: 36 }]}>
            <Text style={[Styles.whiteRegular12]}>Посмотреть статистику?</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          activeOpacity={my ? 0 : 1}
          onPress={() => {
            setShowViewText(!showViewText)
          }}
          style={styles.hover}>
          <View style={styles.hoverItem}>
            <View style={{ marginTop: 4 }}>
              <WhiteViewSvg />
            </View>
            <Text style={[Styles.balihaiRegular14, { color: 'white' }]}>{view}</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    marginRight: 3,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 20,
    height: 55,
    justifyContent: "space-around",
    flexDirection: 'column',
    alignItems: 'center'
  },
  bostBody: {
    paddingHorizontal: 5,
    marginBottom: 15,
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