import {
  Text,
  SafeAreaView,
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { Slider } from './components/slider';
import { Header } from './components/Hedaer';
import { PostBody } from '../../components/postBody';
import { useSelector } from 'react-redux';

export const SinglPageScreen = ({ route, navigation }) => {
  const user = useSelector((st) => st.userData)
  let data = route.params.data
  const my = route.params.my
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

