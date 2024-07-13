import {
  Text,
  SafeAreaView,
} from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GelPostCommentsAction, GetSinglPostAction } from '../../store/action/action';
import { Styles } from '../../styles/Styles';
import { Slider } from '../../components/Slider';
import { BootomModalComponent } from './components/BootomModal';
import { LikeAndComment } from './components/likeAndCimment';

export const SinglPageScreen = ({ route }) => {
  const staticdata = useSelector(st => st.static);
  const singlData = useSelector(st => st.getSinglPage);
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch();
  const id = route.params.id;

  useEffect(() => {
    dispatch(GelPostCommentsAction({ post_id: id }, staticdata.token));
    dispatch(GetSinglPostAction({ post_id: id }, staticdata.token));
  }, []);

  return (
    <SafeAreaView>
      <BootomModalComponent id={id} route={route} singlData={singlData} user={user} />
      {singlData?.data?.description && <Text style={[Styles.darkSemiBold12, { marginTop: 5, marginBottom: 10, paddingHorizontal: 20 }]}>
        {singlData?.data?.description}
      </Text>}
      <Slider single photo={singlData.data.photo} />
      <LikeAndComment user={user} staticdata={staticdata} id={id} singlData={singlData} />
    </SafeAreaView>
  );
};

