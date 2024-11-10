import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeleteFollowAction, AddDeletFollowAction } from '../../../store/action/action';
import { AppColors } from '../../../styles/AppColors';
import { Styles } from '../../../styles/Styles';
import { t } from '../../../components/lang';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
export const SearchItem = ({ data }) => {
  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);
  const userData = useSelector((st) => st.userData)
  const [isFollow, setIsFollow] = useState()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let item = data?.follow_status_sender.findIndex((elm) => elm.sender_id == userData.data.id)
  //   setIsFollow(item >= 0)
  // }, [data])


  // const addFollow = () => {
  //   dispatch(AddDeleteFollowAction({ user_id: data.id }, staticdata.token));
  //   setIsFollow(!isFollow)
  //   if (isFollow) {
  //     dispatch(AddDeletFollowAction('remove'))
  //   }
  //   else {
  //     dispatch(AddDeletFollowAction('add'))
  //   }
  // };

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.balihaiRegular12]}>{JSON.parse(data?.name)?.name}</Text>

    } catch (error) {
      return <Text style={Styles.balihaiRegular12}>{data.name}</Text>
    }
  }


  return (
    <TouchableOpacity activeOpacity={1} onPress={() => navigation.push('SearchProfil', { screen: "SearchProfils", params: { id: data.id } })}
      style={[{ marginBottom: 20 }, Styles.flexSpaceBetween]}>
      <View style={Styles.flexAlignItems}>
        <Image
          style={styles.img}
          source={{ uri: `https://chambaonline.pro/uploads/${data.avatar}` }}
        />
        {canParseJSON(data.name)}
        {/* <Text style={Styles.balihaiRegular12}>{data.name}</Text> */}
      </View>
      {/* <TouchableOpacity
        onPress={() => addFollow()}
        style={[styles.button, !isFollow && { backgroundColor: AppColors.GoldenTainoi_Color }]}>
        <Text style={Styles.darkSemiBold10}>{
          isFollow ?
            t(mainData.lang).Unsubscribe :
            t(mainData.lang).subscribe
        }</Text>
      </TouchableOpacity> */}
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
