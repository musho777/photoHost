import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Styles } from '../../styles/Styles';
import { HidenTabNavigation, ShowTabNavigation } from '../../store/action/action';
import BottomSheet from '@gorhom/bottom-sheet';
import { Comments } from './Comment';
import { t } from '../lang';


export const CommmentModal = ({ close, commentData, CommentCount = () => { } }) => {
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
      snapPoints={['65%']}
      onClose={() => {
        dispatch(ShowTabNavigation())
        close()
      }}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}>
      <View
        style={{ alignItems: 'center', justifyContent: 'space-between', }}>
        <Text style={[Styles.darkMedium16, { marginHorizontal: 10, position: 'absolute' }]}>
          {t(mainData.lang).comments}
        </Text>
        <Comments CommentCount={(e) => CommentCount(e)} commentData={commentData} />
      </View>
    </BottomSheet>
  );
}
