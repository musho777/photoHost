import React, { useCallback, forwardRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Styles } from '../../styles/Styles';
import { SelectedSvg, SelectSvg, ShearSvg } from '../../assets/svg/Svgs';
import { GetFollowerAction, newMessageAction } from '../../store/action/action';


export const Share = forwardRef(
  ({ snapPoints, postId, close, open, user_id }, ref) => {
    const [select, setSelect] = useState([])
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    let getFollowers = useSelector(st => st.getFollower);
    const staticdata = useSelector(st => st.static);
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

    useEffect(() => {
      setSelect([])
    }, [open])

    const ShareFunction = () => {
      select.map((elm, i) => {
        dispatch(newMessageAction({ post_id: `${postId}`, receiver_id: elm }, staticdata.token));
      })
      close()
    }

    const SelectUsers = (id) => {
      let item = [...select]
      let index = item.findIndex((elm) => elm == id)
      if (index < 0) {
        item.push(id)
      }
      if (index >= 0) {
        item.splice(index, 1)
      }
      setSelect(item)
    }

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
          <ShearSvg />
          <Text style={[Styles.darkMedium16, { marginHorizontal: 10 }]}>
            Поделиться: {getFollowers.data?.length}
          </Text>
        </View>
        <BottomSheetScrollView
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
        </BottomSheetScrollView>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 30,
        }}>
          <TouchableOpacity
            onPress={() => ShareFunction()}
            style={{
              backgroundColor: '#FFDF6C',
              width: 200,
              paddingVertical: 13,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={Styles.darkRegular14}>Отправить {select.length}</Text>
          </TouchableOpacity>
        </View>
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