import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BarChart } from "react-native-gifted-charts";
import { Styles } from '../../../styles/Styles';
import { useSelector } from 'react-redux';
import { t } from '../../lang';
import { ScrollView } from 'react-native-gesture-handler';


export const StatisticList = () => {
  const getPostView = useSelector(st => st.getPostView);
  const [womenData, setWomenData] = useState([])
  const [menData, setMewnData] = useState([])
  const [unknown, setUnknown] = useState([])
  const mainData = useSelector(st => st.mainData);

  useEffect(() => {
    let item = [...womenData]
    let temp = [...menData]
    let item2 = [...unknown]

    if (getPostView.stateData["unknown_year"].women >= 0) {
      item.push({
        label: 'Hеизвестный',
        value: getPostView.stateData["unknown_year"].women
      })
      item.push({
        label: '15-20',
        value: getPostView.stateData["15-20"].women
      })
      item.push({
        label: '20-25',
        value: getPostView.stateData["20-25"].women
      })
      item.push({
        label: '25-30',
        value: getPostView.stateData["25-30"].women
      })
      item.push({
        label: '30-35',
        value: getPostView.stateData["30-35"].women
      })
      item.push({
        label: '35-45',
        value: getPostView.stateData["35-45"].women
      })
      item.push({
        label: '45-60',
        value: getPostView.stateData["45-60"].women
      })
      item.push({
        label: '60+',
        value: getPostView.stateData["60_"].women
      })


      temp.push({
        label: 'Hеизвестный',
        value: getPostView.stateData["unknown_year"].men
      })
      temp.push({
        label: '15-20',
        value: getPostView.stateData["15-20"].men
      })
      temp.push({
        label: '20-25',
        value: getPostView.stateData["20-25"].men
      })
      temp.push({
        label: '25-30',
        value: getPostView.stateData["25-30"].men
      })
      temp.push({
        label: '30-35',
        value: getPostView.stateData["30-35"].men
      })
      temp.push({
        label: '35-45',
        value: getPostView.stateData["35-45"].men
      })
      temp.push({
        label: '45-60',
        value: getPostView.stateData["45-60"].men
      })
      temp.push({
        label: '60+',
        value: getPostView.stateData["60_"].men
      })


      item2.push({
        label: '15-20',
        value: getPostView.stateData.unknown_gender["15-20"]
      })
      item2.push({
        label: '20-25',
        value: getPostView.stateData.unknown_gender["20-25"]
      })
      item2.push({
        label: '25-30',
        value: getPostView.stateData.unknown_gender["25-30"]
      })
      item2.push({
        label: '30-35',
        value: getPostView.stateData.unknown_gender["30-35"]
      })
      item2.push({
        label: '35-45',
        value: getPostView.stateData.unknown_gender["35-45"]
      })
      item2.push({
        label: '45-60',
        value: getPostView.stateData.unknown_gender["45-60"]
      })
      item2.push({
        label: '60+',
        value: getPostView.stateData.unknown_gender["60"]
      })

      setMewnData(temp)
      setWomenData(item)
      setUnknown(item2)
    }


  }, [getPostView.stateData])

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
      <View style={{ gap: 20, paddingHorizontal: 20, marginBottom: 50 }}>
        <View>
          <Text style={Styles.darkMedium14}>общее кол-во просмотров - 5.</Text>
        </View>
        <View>
          <Text style={Styles.darkMedium14}>Среднее время просмотра - 8 секунд.</Text>
        </View>
        <View>
          <Text style={Styles.darkMedium14}>Активность просмотров</Text>
        </View>
        <View>
          <Text style={Styles.darkMedium14}>
            Статистина, идет и обновляется каждый час с того момента как выложил фото или ви,
          </Text>
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator horizontal style={{ minHeight: 100 }}>
        <View style={{ gap: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[{ width: 100, textAlign: 'center' }, Styles.balihaiSemiBold14]}>Дата</Text>
            <Text style={[{ width: 80, textAlign: 'center' }, Styles.balihaiSemiBold14]}>Время</Text>
            <Text style={[{ width: 50, textAlign: 'center' }, Styles.balihaiSemiBold14]}>Пол</Text>
            <Text style={[{ width: 80, textAlign: 'center' }, Styles.balihaiSemiBold14]}>Воз.</Text>
            <Text style={[{ width: 150, textAlign: 'center' }, Styles.balihaiSemiBold14]}>кол-во просмотров</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 100, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              <Text style={[{ textAlign: 'center' }, Styles.balihaiSemiBold14]}>05.08.24 г.</Text>
            </View>
            <View style={{ width: 80, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              <Text style={[{ textAlign: 'center' }, Styles.balihaiSemiBold14]}>01-02</Text>
            </View>
            <View style={{ width: 50, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              <Text style={[{ textAlign: 'center' }, Styles.balihaiSemiBold14]}>M</Text>
            </View>
            <View style={{ width: 80, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              <Text style={[{ textAlign: 'center' }, Styles.balihaiSemiBold14]}>20-25</Text>
            </View>
            <View style={{ width: 150, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              <Text style={[{ textAlign: 'center' }, Styles.balihaiSemiBold14]}>5</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </BottomSheetScrollView>
  );
}