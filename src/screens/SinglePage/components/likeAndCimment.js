import { Text, TouchableOpacity, View } from "react-native";
import { Comment, Heart, ViewSvg } from "../../../assets/svg/TabBarSvg";
import { NotLineSvg } from "../../../assets/svg/Svgs";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../../../styles/Styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LikePostAction } from "../../../store/action/action";

export const LikeAndComment = ({ singlData, id, staticdata, user }) => {

  const [likeCount, setLikeCount] = useState();
  const [isLiked, setIsLiked] = useState();

  const dispatch = useDispatch()


  useEffect(() => {
    if (singlData.data) {
      const foundElement = singlData?.data.like_auth_user?.find(
        item => item?.user_id == user?.data?.id,
      );
      setIsLiked(foundElement);
    }
    setLikeCount(singlData?.data.like_auth_user?.length);
  }, [singlData.data]);

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
            - {singlData.data.comment_count}
          </Text>
        </View>
      </View>
      <View>
        <View style={Styles.flexAlignItems}>
          <ViewSvg />
          <Text style={[Styles.balihaiRegular14, { marginLeft: 5, }]}>
            {singlData.data.view_count}
          </Text>
        </View>
      </View>
    </View>
  </View>
}