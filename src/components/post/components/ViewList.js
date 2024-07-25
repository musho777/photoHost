import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import {
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from '../../../styles/Styles';
import { GetPostViewAction } from '../../../store/action/action';

export const ViewList = ({ id, token, close, navigation }) => {

  const user = useSelector(st => st.userData);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
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
  return (
    <BottomSheetScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          if (getPosts.nextPage) {
            let pages = page + 1;
            dispatch(GetPostViewAction({ post_id: id }, token, page));
            setPage(pages);
          }
        }
      }}>
      {getPostView.data.map((elm, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              close();
              if (user.data.id == elm.user.id) {
                navigation.navigate('ProfileNavigation');
              }
              else {
                navigation.navigate('SearchProfil', { id: elm.user.id });
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
              <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}>
                {elm.user.name}
              </Text>
            </View>
            <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}>{elm.count}</Text>
          </TouchableOpacity>
        );
      })}
    </BottomSheetScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
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
