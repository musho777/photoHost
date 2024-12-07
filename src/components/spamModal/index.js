import React, { useCallback } from 'react';
import { View, Text, Keyboard, StyleSheet, Touchable } from 'react-native';
import {
  BottomSheetBackdrop,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Styles } from '../../styles/Styles';
import { AddBlackListAction, HidenTabNavigation, ShowTabNavigation } from '../../store/action/action';
import BottomSheet from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';


export const SpamModal = ({ close, postUserId, addToblack }) => {
  const staticdata = useSelector(st => st.static);
  const arr = [
    {
      mainTitle: "Травля или нежелательный контакт",
      item: []
    },
    {
      mainTitle: "Продажа или реклама товаров с ограничениями",
      item: []
    },
    {
      mainTitle: "Изображение обнаженного тела или действий сексуального характера",
      item: []
    },
    {
      mainTitle: "Мошенничество, обман или спам",
      item: []
    },
    {
      mainTitle: "Ложная информация",
      item: []
    },
    {
      mainTitle: "Мне это не нравится",
      item: []
    },
  ]

  const dispatch = useDispatch();
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        animatedIndex={{
          value: 1,
        }}
        opacity={0.1}
      />
    ),
    [],
  );

  useEffect(() => {
    dispatch(HidenTabNavigation())
  }, [])


  const addToBlackList = () => {
    addToblack(postUserId)
    dispatch(AddBlackListAction({ 'user_id': postUserId }, staticdata.token))
  }






  return (
    <BottomSheet
      index={0}
      snapPoints={['60%']}
      onClose={() => {
        dispatch(ShowTabNavigation())
        close()
      }}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}>
      <ScrollView>
        <View >
          <Text style={[Styles.darkSemiBold16, { textAlign: 'center' }]}>
            Пожаловаться
          </Text>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, marginTop: 20, gap: 10 }}>
            <Text style={[Styles.darkMedium12, { textAlign: 'center' }]}>
              Почему вы хотите пожаловаться
              на эту публикацию?
            </Text>
            <Text style={[Styles.darkMedium12, { textAlign: 'center' }]}>
              Ваша жалоба является анонимной. Если кому- {"\n"}
              то угрожает опасность, не ждите - позвоните {"\n"}
              в местную службу спасения.
            </Text>
          </View>
          {arr.map((elm, i) => {
            return <TouchableOpacity activeOpacity={1} onPress={() => {
              addToBlackList()
              close()
              dispatch(ShowTabNavigation())
            }} style={[styles.item, i == arr.length - 1 && { borderBottomWidth: 0.5 }]}>
              <Text style={Styles.balihaiMedium12}>{elm.mainTitle}</Text>
            </TouchableOpacity>
          })}

        </View>
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  item: {
    borderTopWidth: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderColor: '#cccccc'
  }
})
