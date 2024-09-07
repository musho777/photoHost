import {
  Text,
  SafeAreaView,
  View,
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
      <View style={{ position: 'absolute', top: 0, zIndex: 999, width: "100%" }}>
        <Header big={true} data={data} navigation={navigation} my={my} />
        {data.description && <Text style={[Styles.darkSemiBold12, { marginTop: 5, marginBottom: 10, paddingHorizontal: 10, color: 'white' }]}>
          {data.description}
        </Text>}
      </View>
      <Slider big={true} music_name={data.music_name} single image={data?.photo[0].photo} photo={data?.photo} />
      <View style={{ position: 'absolute', bottom: 15, width: '100%', zIndex: 999 }}>
        <PostBody
          my={my}
          commentCount={data.comment_count}
          liked={data.like_auth_user.findIndex((elm) => elm.user_id == user.data.id) >= 0}
          view={data.view_count}
          like={data.like_count}
          id={data.id}
          user={user}
          big={true}
        />
      </View>
    </SafeAreaView>
  );
};

