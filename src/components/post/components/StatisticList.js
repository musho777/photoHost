import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BarChart } from "react-native-gifted-charts";
import { Styles } from '../../../styles/Styles';
import { useSelector } from 'react-redux';
import { t } from '../../lang';


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

      <View>
        <Text style={[Styles.darkMedium14, { textAlign: 'center' }]}>{t(mainData.lang).Women}</Text>
        <BarChart
          barWidth={24}
          barBorderRadius={4}
          frontColor="#177AD5"
          data={womenData}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        <Text style={[Styles.darkMedium14, { textAlign: 'center' }]}>{t(mainData.lang).Men}</Text>
        <BarChart
          barWidth={24}
          barBorderRadius={4}
          frontColor="#177AD5"
          data={menData}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        <Text style={[Styles.darkMedium14, { textAlign: 'center' }]}>{t(mainData.lang).Unspecifiedgender}</Text>
        <BarChart
          barWidth={24}
          barBorderRadius={4}
          frontColor="#177AD5"
          data={unknown}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>

    </BottomSheetScrollView>
  );
}