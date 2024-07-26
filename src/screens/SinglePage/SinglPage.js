import {
  Text,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Styles } from '../../styles/Styles';
import { LikeAndComment } from './components/likeAndCimment';
import { Slider } from './components/slider';
import { Header } from './components/Hedaer';

export const SinglPageScreen = ({ route, navigation }) => {

  let data = route.params.data
  const my = route.params.my
  return (
    <SafeAreaView>
      <Header data={data} navigation={navigation} my={my} />
      {data.description && <Text style={[Styles.darkSemiBold12, { marginTop: 5, marginBottom: 10, paddingHorizontal: 20 }]}>
        {data.description}
      </Text>}
      <Slider single image={data?.photo[0].photo} photo={data?.photo} />
      <LikeAndComment data={data} />
    </SafeAreaView>
  );
};

