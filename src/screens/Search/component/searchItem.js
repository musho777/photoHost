import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeleteFollowAction } from '../../../store/action/action';
import { AppColors } from '../../../styles/AppColors';
import { Styles } from '../../../styles/Styles';
import { t } from '../../../components/lang';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
export const SearchItem = ({ data }) => {
  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);
  const [isFollow, setIsFollow] = useState()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFollow(data?.follow_status_sender?.length)
  }, [data])

  const addDeletData = (id) => {
    setIsFollow(!isFollow)
  }
  const addFollow = () => {
    dispatch(AddDeleteFollowAction({ user_id: data.id }, staticdata.token));
    addDeletData();
  };
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchProfil', { id: data.id })}
      style={[{ marginBottom: 20 }, Styles.flexSpaceBetween]}>
      <View style={Styles.flexAlignItems}>
        <Image
          style={styles.img}
          source={{ uri: `https://chamba.digiluys.com/uploads/${data.avatar}` }}
        />
        <Text style={Styles.balihaiRegular12}>{data.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => addFollow()}
        style={[styles.button, !isFollow && { backgroundColor: AppColors.GoldenTainoi_Color }]}>
        <Text style={Styles.darkSemiBold10}>{
          isFollow ?
            t(mainData.lang).Unsubscribe :
            t(mainData.lang).subscribe
        }</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    marginRight: 15,
    borderRadius: 50,
  },
  button: {
    backgroundColor: AppColors.PattensBlue_Color,
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 50,
  },
});