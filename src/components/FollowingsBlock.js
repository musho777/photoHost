import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeleteFollowAction, DeleteOtherPeople } from '../store/action/action';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';
import { t } from '../components/lang';
export const FollowingsBlock = ({
  name,
  img,
  type,
  onPress,
  userId,
  addClick,
  type1,
  deletClick,
  type2,
}) => {
  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);
  const dispatch = useDispatch();


  const addFollow = () => {
    dispatch(AddDeleteFollowAction({ user_id: userId }, staticdata.token));
    addClick();
  };


  const deleteData = () => {
    if (type1 === 'Удалить') {
      dispatch(DeleteOtherPeople({ user_id: userId }, staticdata.token));
    }
    else {
      dispatch(AddDeleteFollowAction({ user_id: userId }, staticdata.token))
    }
    deletClick();
  };

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.balihaiRegular12, { color: JSON.parse(name)?.color?.title, fontFamily: JSON.parse(name)?.font }]}>{JSON.parse(name)?.name}</Text>

    } catch (error) {
      return <Text style={Styles.balihaiRegular12}> {name}</Text >
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[{ marginBottom: 20 }, Styles.flexSpaceBetween]}>
      <View style={Styles.flexAlignItems}>
        <Image
          style={styles.img}
          source={{ uri: `https://chambaonline.pro/uploads/${img}` }}
        />
        <View>
          {canParseJSON(name)}
          {/* <Text style={Styles.balihaiRegular12}>{name}</Text> */}
        </View>
      </View>
      {type2 ? (
        <View></View>
      ) : (
        <View>
          {type1 ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  deleteData();
                }}
                style={styles.button}>
                <Text style={Styles.darkSemiBold10}>{type1}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {type ? (
                <TouchableOpacity
                  onPress={() => {
                    addFollow();
                  }}
                  style={styles.button}>
                  <Text style={Styles.darkSemiBold10}>{t(mainData.lang).Unsubscribe}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    addFollow();
                  }}
                  style={[
                    styles.button,
                    { backgroundColor: AppColors.GoldenTainoi_Color },
                  ]}>
                  <Text
                    style={[
                      Styles.darkSemiBold10,
                      { color: AppColors.White_Color },
                    ]}>
                    {t(mainData.lang).subscribe}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}
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
