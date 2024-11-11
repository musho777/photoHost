import React, { useCallback, forwardRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostLikeAction, HidenTabNavigation, ShowTabNavigation } from '../store/action/action';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import { HearSvg2 } from '../assets/svg/Svgs';
import { Styles } from '../styles/Styles';

export const LikeList = forwardRef(
  ({ id, token, close }, ref) => {
    const navigation = useNavigation();
    const user = useSelector(st => st.userData);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const getPostLike = useSelector(st => st.getPostLike);


    useEffect(() => {
      dispatch(HidenTabNavigation())
    }, [])

    function canParseJSON(jsonString) {
      try {
        JSON.parse(jsonString);
        return <Text style={[Styles.darkMedium13, { marginHorizontal: 10, color: JSON.parse(jsonString)?.color?.title ? JSON.parse(jsonString)?.color?.title : "black", fontFamily: JSON.parse(jsonString)?.font }]}>{JSON.parse(jsonString)?.name}</Text>

      } catch (error) {
        return <Text style={[Styles.darkMedium13, { marginHorizontal: 10, }]}> {jsonString}</Text >
      }
    }


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
      <BottomSheet
        ref={ref}
        index={0}
        snapPoints={['80%']}
        enablePanDownToClose={true}
        onClose={() => {
          dispatch(ShowTabNavigation())
          close()
        }}
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
                if (getPostLike.nextPage) {
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
                      navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: elm.user.id } });
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
                      uri: `https://chambaonline.pro/uploads/${elm.user.avatar}`,
                    }}
                  />
                  {canParseJSON(elm.user.name)}
                  {/* <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}>
                    {elm.user.name}
                  </Text> */}
                </TouchableOpacity>
              );
            })}
          </BottomSheetScrollView>}
      </BottomSheet>
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
