import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../../styles/Styles';
import { StatisticSvg, ViewListSwg } from '../../assets/svg/Svgs';
import { ViewList } from './ViewList';
import { StatisticList } from './StatisticList';
import { GetPostViewAction, GetVidioStatistic, HidenTabNavigation, ShowTabNavigation } from '../../store/action/action';
import BottomSheet from '@gorhom/bottom-sheet';

export const ViewComponent = ({ id, token, close, big = false, selectedVidioId }) => {
  const dispatch = useDispatch()
  const [vidio, setVidio] = useState(false)
  useEffect(() => {
    if (id) {
      dispatch(GetPostViewAction({ post_id: id }, token, 1));
    }
  }, [id])

  useEffect(() => {
    dispatch(HidenTabNavigation())
  }, [])


  useEffect(() => {

    if (selectedVidioId?.video) {
      setVidio(true)
      dispatch(GetVidioStatistic(selectedVidioId?.id, token))
    }
    else {
      setVidio(false)
    }
  }, [selectedVidioId])

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
    <BottomSheet
      index={0}
      snapPoints={['80%']}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      onClose={() => {
        dispatch(ShowTabNavigation())
        close()
      }}
      style={{ zIndex: 999993, postion: 'absalute' }}
    >
      <View style={{ height: '100%' }}>
        <View
          style={[Styles.flexAlignItems, { justifyContent: 'center', marginVertical: 20 },]}>
          <StatisticSvg />
        </View>
        {!statistic ?
          <ViewList
            navigation={navigation}
            id={id}
            token={token}
            close={close}
          /> :
          <StatisticList vidio={vidio} token={token} id={id} />
        }

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 30, height: big ? 100 : 50, alignItems: 'center' }}>
          <TouchableOpacity style={[{ padding: 10, borderRadius: 10, }, statistic == false && { backgroundColor: '#FFC24B', }]} onPress={() => setStatistic(false)}>
            <ViewListSwg active={!statistic} />
          </TouchableOpacity>
          <TouchableOpacity style={[{ padding: 10, borderRadius: 10 }, statistic && { backgroundColor: '#FFC24B', }]} onPress={() => setStatistic(true)}>
            <StatisticSvg active={!statistic} />
          </TouchableOpacity>
        </View>
      </View>

    </BottomSheet>
  );
}