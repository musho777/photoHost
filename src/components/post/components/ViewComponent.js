import React, { useCallback, forwardRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../../../styles/Styles';
import { StatisticSvg, ViewListSwg } from '../../../assets/svg/Svgs';
import { ViewList } from './ViewList';
import { StatisticList } from './StatisticList';
import { GetPostViewAction } from '../../../store/action/action';

export const ViewComponent = forwardRef(
  ({ snapPoints, id, token, close, currentId }, ref) => {
    const dispatch = useDispatch()
    useEffect(() => {
      if (currentId) {
        dispatch(GetPostViewAction({ post_id: currentId }, token, 1));
      }
    }, [currentId])

    const [statistic, setStatistic] = useState(false)

    const navigation = useNavigation();
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
          <StatisticSvg />
        </View>
        {!statistic ?
          <ViewList
            navigation={navigation}
            id={id}
            token={token}
            close={close}
          /> :
          <StatisticList />}

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 30, height: 50, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setStatistic(false)}>

            <ViewListSwg active={!statistic} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStatistic(true)}>
            <StatisticSvg active={!statistic} />
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
  block: {
    paddingHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
