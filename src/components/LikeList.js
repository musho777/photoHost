import React, { useCallback, forwardRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostLikeAction } from '../store/action/action';
import { useNavigation } from '@react-navigation/native';

import { HearSvg2 } from '../assets/svg/Svgs';

import { Styles } from '../styles/Styles';

export const LikeList = forwardRef(
  ({ snapPoints, id, token, close }, ref) => {
    const navigation = useNavigation();
    const user = useSelector(st => st.userData);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const getPostLike = useSelector(st => st.getPostLike);
    const renderBackdrop = useCallback(
      props => (
        <BottomSheetBackdrop
          {...props}
          animatedIndex={{
            value: 1,
          }}
          opacity={0.85}
        />
      ),
      [],
    );

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
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        <View
          style={[
            Styles.flexAlignItems,
            { justifyContent: 'center', marginVertical: 20 },
          ]}>
          <HearSvg2 />
          <Text style={[Styles.darkMedium16, { marginHorizontal: 10 }]}>
            Нравится: {getPostLike.data?.length}
          </Text>
        </View>

        {getPostLike.loading ?
          <View style={Styles.loading}>
            <ActivityIndicator size="large" color="#FFC24B" />
          </View> :
          <BottomSheetScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                if (getPosts.nextPage) {
                  let pages = page + 1;
                  dispatch(GetPostLikeAction({ post_id: id }, token, page));
                  setPage(pages);
                }
              }
            }}>
            {getPostLike.data.map((elm, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    close();
                    if (user.data.id == elm.user.id) {
                      close()
                      navigation.navigate('ProfileNavigation');
                    }
                    else {
                      navigation.navigate('SearchProfil', { id: elm.user.id });
                    }
                  }}
                  key={i}
                  style={[
                    Styles.flexAlignItems,
                    { paddingHorizontal: 15, marginVertical: 10 },
                  ]}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: `https://chamba.digiluys.com/uploads/${elm.user.avatar}`,
                    }}
                  />
                  <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}>
                    {elm.user.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </BottomSheetScrollView>}
      </BottomSheetModal>
    );
  },
);

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
});
