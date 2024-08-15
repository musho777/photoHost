import {
  Text,
  SafeAreaView,
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { Slider } from './components/slider';
import { Header } from './components/Hedaer';
import { PostBody } from '../../components/postBody';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { AddPostViewCount, EndViewPost } from '../../store/action/action';

export const SinglPageScreen = ({ route, navigation }) => {
  const user = useSelector((st) => st.userData)
  let data = route.params.data
  const staticdata = useSelector(st => st.static);
  const my = route.params.my
  const dispatch = useDispatch()

  const End = async (id) => {
    dispatch(EndViewPost({ post_id: id }, staticdata.token))
  }
  useFocusEffect(
    useCallback(() => {
      dispatch(AddPostViewCount({ post_id: data.id }, staticdata.token))
      return () => {
        End(data.id)
      };
    }, [])
  );

  return (
    <SafeAreaView>
      <Header data={data} navigation={navigation} my={my} />
      {data.description && <Text style={[Styles.darkSemiBold12, { marginTop: 5, marginBottom: 10, paddingHorizontal: 20 }]}>
        {data.description}
      </Text>}
      <Slider single image={data?.photo[0].photo} photo={data?.photo} />
      <PostBody
        commentCount={data.comment_count}
        liked={data.like_auth_user.findIndex((elm) => elm.user_id == user.data.id) >= 0}
        view={data.view_count}
        like={data.like_count}
        id={data.id}
      />
    </SafeAreaView>
  );
};

