import { View, TouchableOpacity, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { forwardRef, useEffect, useState } from "react";
import { Styles } from "../../../styles/Styles";
import { AddBlackListAction, AddBookLocal, AddInBookAction, } from "../../../store/action/action";


export const BootomModalComponent = forwardRef(({ setShowSave, setSaveType, navigation, id, user, isBook, otherUserId }, ref) => {
  const dispatch = useDispatch()
  const staticdata = useSelector(st => st.static);

  const addToBlackList = () => {
    ref.current?.close();
    dispatch(AddBlackListAction({ user_id: otherUserId }, staticdata.token));
    navigation.navigate('SearchScreen')
  };
  const addToBook = () => {
    ref.current?.close();
    setShowSave()
    dispatch(AddInBookAction({ post_id: id }, staticdata.token));
    dispatch(AddBookLocal({ post_id: id, userId: user.data.id }))
    setSaveType(isBook >= 0 ? "Запись удалена из закладок" : 'Запись сохранена в закладках')
  };
  return <View >
    <View style={{ paddingHorizontal: 20, gap: 20 }}>
      <TouchableOpacity
        onPress={() => addToBook()}>
        <Text style={Styles.darkRegular14}>
          {isBook >= 0 ? 'Удалить из закладок' : 'В закладки'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => addToBlackList()}>
        <Text style={Styles.darkRegular14}>В чёрный список</Text>
      </TouchableOpacity>
    </View>
  </View>
})