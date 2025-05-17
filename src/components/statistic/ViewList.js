import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import {
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from '../../styles/Styles';
import { GetPostViewAction } from '../../store/action/action';
import { ViewSkeleton } from './compeont/ViewSkeleton';

export const ViewList = ({ id, token, navigation }) => {

  const user = useSelector(st => st.userData);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const loadingData = ['', '', '', '', '', '']
  const getPostView = useSelector(st => st.getPostView);
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };



  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.darkMedium13, { marginHorizontal: 10, color: JSON.parse(jsonString)?.color?.title, fontFamily: JSON.parse(jsonString)?.font }]}>{JSON.parse(jsonString)?.name}</Text>

    } catch (error) {
      return <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}> {jsonString}</Text >
    }
  }




  if (getPostView.loading) {
    return <View style={{ flex: 1 }}>
      {loadingData.map((elm, i) => {
        return <ViewSkeleton key={i} />
      })}
    </View>
  }
  return (
    <BottomSheetScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          if (getPostView.nextPage) {
            let pages = page + 1;
            dispatch(GetPostViewAction({ post_id: id }, token, pages));
            setPage(pages);
          }
        }
      }}>
      <Text style={[{ textAlign: 'center' }, Styles.darkMedium16]}>Просмотры по этой публикации</Text>
      {getPostView.data.map((elm, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (user.data.id == elm.user.id) {
                navigation.navigate('ProfileNavigation');
              }
              else {
                navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: elm.user.id } });
              }
            }}
            key={i}
            style={styles.block}>
            <View style={Styles.flexAlignItems}>
              <Image
                style={styles.img}
                source={{
                  uri: `https://chambaonline.pro/uploads/${elm.user.avatar}`,
                }}
              />
              {canParseJSON(elm.user.name)}
              {/* <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}>
                {elm.user.name}
              </Text> */}
            </View>
            <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}>{elm.count}</Text>
          </TouchableOpacity>
        );
      })}

    </BottomSheetScrollView>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  block: {
    paddingHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
