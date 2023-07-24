import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AddDeleteFollowAction, DeleteOtherPeople} from '../store/action/action';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';
export const FollowingsBlock = ({
  name,
  username,
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
  const dispatch = useDispatch();
  const addFollow = () => {
    dispatch(AddDeleteFollowAction({user_id: userId}, staticdata.token));
    addClick();
  };
  const deleteData = () => {
    if(type1 === 'Удалить'){
      dispatch(DeleteOtherPeople({user_id: userId}, staticdata.token));
    }
    else {
      dispatch(AddDeleteFollowAction({user_id: userId}, staticdata.token))
    }
    deletClick();
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      // onPress={() => navigation.navigate('UserProfileScreen')}
      style={[{marginBottom: 20}, Styles.flexSpaceBetween]}>
      <View style={Styles.flexAlignItems}>
        <Image
          style={styles.img}
          source={{uri: `https://chamba.justcode.am/uploads/${img}`}}
        />
        <View>
          <Text style={Styles.darkSemiBold14}>{name}</Text>
          <Text style={Styles.balihaiRegular12}>{username}</Text>
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
                  // addFollow();
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
                  <Text style={Styles.darkSemiBold10}>Отписаться</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    addFollow();
                  }}
                  style={[
                    styles.button,
                    {backgroundColor: AppColors.GoldenTainoi_Color},
                  ]}>
                  <Text
                    style={[
                      Styles.darkSemiBold10,
                      {color: AppColors.White_Color},
                    ]}>
                    подписаться
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
