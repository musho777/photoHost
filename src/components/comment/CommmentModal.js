import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Styles } from '../../styles/Styles';
import { ShearSvg } from '../../assets/svg/Svgs';
import { HidenTabNavigation, newMessageAction, ShowTabNavigation } from '../../store/action/action';
import BottomSheet from '@gorhom/bottom-sheet';
import { Comments } from './Comment';
import { t } from '../lang';


export const CommmentModal = ({ close, commentData }) => {
  const mainData = useSelector(st => st.mainData);

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



  return (
    <BottomSheet
      index={0}
      snapPoints={['80%']}
      onClose={() => {
        dispatch(ShowTabNavigation())
        close()
      }}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}>
      <View
        style={[
          Styles.flexAlignItems,
          { justifyContent: 'center', marginVertical: 20 },
        ]}>
        <Text style={[Styles.darkMedium16, { marginHorizontal: 10 }]}>
          {t(mainData.lang).comments}
        </Text>
      </View>
      <Comments commentData={commentData} />
      {/* <BottomSheetScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            if (getPosts.nextPage) {
              let pages = page + 1;
              dispatch(GetFollowerAction({ search: "", user_id: user_id }, staticdata.token, 1));
              // dispatch(GetPostLikeAction({ post_id: id }, token, page));
              setPage(pages);
            }
          }
        }}>
        {getFollowers.data.map((elm, i) => {
          return <TouchableOpacity onPress={() => SelectUsers(elm.follower.id)} key={i} style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginVertical: 10, paddingHorizontal: 10, justifyContent: "space-between" }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} key={i}>
              <Image
                source={{ uri: `https://chambaonline.pro/uploads/${elm.follower.avatar}` }}
                style={{ width: 50, height: 50, borderRadius: 50 }} />
              <Text style={Styles.balihaiMedium13}>{elm.follower.name}</Text>
            </View>
            {select.findIndex((el) => el == elm.follower.id) >= 0 ?
              <SelectedSvg /> :
              <SelectSvg />
            }
          </TouchableOpacity>
        })}
      </BottomSheetScrollView> */}
    </BottomSheet>
  );
}
