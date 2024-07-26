import { Text, TouchableOpacity, View } from "react-native";
import { Comment, Heart, ViewSvg } from "../../../assets/svg/TabBarSvg";
import { NotLineSvg } from "../../../assets/svg/Svgs";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../../../styles/Styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LikePostAction } from "../../../store/action/action";

export const LikeAndComment = ({ data }) => {
  const [likeCount, setLikeCount] = useState();
  const [isLiked, setIsLiked] = useState();
  const staticdata = useSelector(st => st.static);
  const user = useSelector(st => st.userData);
  const id = data.id
  const dispatch = useDispatch()

  useEffect(() => {
    let likde = data?.like_auth_user?.findIndex(item => item?.user_id == user?.data?.id)
    setIsLiked(likde >= 0)
    setLikeCount(data.like_count)
  }, [data])


  const LikePost = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
    dispatch(
      LikePostAction(
        {
          post_id: id,
        },
        staticdata.token,
      ),
    );
  };


  const navigation = useNavigation()
  return <View style={{ paddingHorizontal: 20 }}>
    <View style={[Styles.flexSpaceBetween, { marginBottom: 20 }]}>
      <View style={Styles.flexAlignItems}>
        <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
          <TouchableOpacity
            onPress={() => {
              LikePost();
            }}>
            {isLiked ? <Heart /> : <NotLineSvg />}
          </TouchableOpacity>
          <Text style={[Styles.darkMedium14, { marginLeft: 5 }]}>
            - {likeCount}
          </Text>
        </View>
        <View style={[Styles.flexAlignItems, { marginRight: 15 }]}>
          <TouchableOpacity onPress={() => navigation.navigate("coment", { parentId: id })}>
            <Comment />
          </TouchableOpacity>
          <Text style={[Styles.darkMedium14, { marginLeft: 5 }]}>
            - {data.comment_count}
          </Text>
        </View>
      </View>
      <View>
        <View style={Styles.flexAlignItems}>
          <ViewSvg />
          <Text style={[Styles.balihaiRegular14, { marginLeft: 5, }]}>
            {data.view_count}
          </Text>
        </View>
      </View>
    </View>
  </View>
}