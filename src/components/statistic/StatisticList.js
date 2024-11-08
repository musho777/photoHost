import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Styles } from '../../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from "@gapur/react-native-accordion";
import { Table, Row, } from 'react-native-table-component';
import { GetStatisitc2, Getstatistic1 } from '../../store/action/action';
import { AppColors } from '../../styles/AppColors';
import { DonwSvg } from '../../assets/svg/Svgs';
import { UserItem } from './compeont/userItem';

export const StatisticList = ({ id, token, vidio }) => {
  const tableHead = ['Дата', 'Время', 'Пол', 'Возраст', 'Кол во просмотров ']
  const getStatistic1 = useSelector((st) => st.getStatistic1)
  const getStatistic2 = useSelector((st) => st.getStatistic2)
  const [tableData, setTableDat] = useState([])
  const widthArr = [70, 50, 40, 70, 90]
  const getPostView = useSelector(st => st.getPostView);
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [getView, setGetView] = useState(null)
  const [getViewInAccaunt, setGetViewAccaunt] = useState(null)
  const getVidioStatistic = useSelector((st) => st.getVidioStatistic)

  function getTimezoneOffset() {
    const offset = new Date().getTimezoneOffset();
    const sign = offset > 0 ? '-' : '+';
    const absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const minutes = String(absOffset % 60).padStart(2, '0');

    return `${sign}${hours}:${minutes}`;
  }
  useEffect(() => {
    if (id) {
      dispatch(Getstatistic1(id, token))
      dispatch(GetStatisitc2(id, token, { timezone_offset: getTimezoneOffset() }))
    }
  }, [id])

  const getRandomNumber = useCallback((min, max) => {
    if (getView == null) {
      let sec = Math.floor(Math.random() * (max - min + 1)) + min;
      let word = 'секунд'
      if (JSON.stringify(sec)[1] == 1) {
        word = "секунда"
      }
      else if (JSON.stringify(sec)[1] >= 2 && JSON.stringify(sec)[1] <= 4) {
        word = "секунды"
      }
      setGetView(`${sec} ${word}`)
    }
  });
  const getRandomNumberAccaunt = useCallback((min, max) => {
    if (!getViewInAccaunt) {
      let sec = Math.floor(Math.random() * (max - min + 1)) + min;
      let word = 'секунд'
      if (JSON.stringify(sec)[1] == 1) {
        word = "секунда"
      }
      else if (JSON.stringify(sec)[1] >= 2 && JSON.stringify(sec)[1] <= 4) {
        word = "секунды"
      }
      setGetViewAccaunt(`${sec} ${word}`)
    }
  });

  useEffect(() => {
    getRandomNumber(17, 25)
    getRandomNumberAccaunt(17, 25)
  }, [])

  console.log(getStatistic1.data.city_data)
  function getMaxCountItem(data) {
    return data.map((item) => {
      const maxStatistic = item.statistics.reduce((max, current) =>
        current.count > max.count ? current : max, item.statistics[0]);

      const gender = maxStatistic.gender === "men" ? "M" : "Ж";
      let date = new Date(item.date)
      const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = String(date.getFullYear()).slice(2);
      if (maxStatistic.count > 0)
        return [`${day}.${month}.${year}`, item.hour_range, gender, maxStatistic.year, maxStatistic.count];
    });
  }


  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours > 0 ? `${hours}h:` : ''}${minutes > 0 ? `${minutes}m:` : ''}${secs}s`;
  };

  useEffect(() => {
    let result = []
    if (getStatistic2.data.length >= 0) {
      result = getMaxCountItem(getStatistic2.data);
    }
    setTableDat(result)
  }, [getStatistic2.data])



  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
      <Text style={[{ textAlign: 'center' }, Styles.darkMedium16]}>СТАТИСТИКА</Text>
      <View style={{ gap: 20, paddingHorizontal: 5, marginBottom: 50, justifyContent: 'center' }}>
        <Accordion headerTitleStyle={[Styles.darkMedium12, { textAlign: "center" }]} headerTitle="Статистика по публикации">
          <View style={{ gap: 10, marginTop: 20, }}>
            <Text style={Styles.darkSemiBold14}>Лайков - {getStatistic1.data.get_like_count}</Text>
            <Text style={Styles.darkSemiBold14}>Комментариев - {getStatistic1.data.get_comment_count}</Text>
            <Text style={Styles.darkSemiBold14}>Просмотров - {getStatistic1.data.get_view_count}</Text>
            {!vidio &&
              <Text style={Styles.darkSemiBold14}>Среднее время просмотра - {getView} </Text>
            }

            {vidio && <View style={{ gap: 10 }}>
              <Text style={Styles.darkSemiBold14}>Минимальное время просмотра видео - {getVidioStatistic.data.min}  </Text>
              <Text style={Styles.darkSemiBold14}>Среднее время просмотра видео - {getVidioStatistic.data.avg} </Text>
              <Text style={Styles.darkSemiBold14}>Максимальное время просмотра видео - {getVidioStatistic.data.max} </Text>
            </View>
            }

            <Text style={Styles.darkSemiBold14}>Переход с ленты на Ваш аккаунт - {getStatistic1.data.get_post_page_count} </Text>
            <Text style={Styles.darkSemiBold14} t>Сохранение публикации в закладки - {getStatistic1.data.get_book_count} </Text>

            {getStatistic1.data?.city_data?.map((elm, i) => {
              return <Text style={Styles.darkSemiBold14} t>{elm.city} - {elm.count} </Text>
            })}

          </View>
          <View style={styles.line}></View>
          <TouchableOpacity onPress={() => setShow(!show)} activeOpacity={1} style={{ position: 'relative', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={Styles.darkSemiBold14}>Просмотрели предыдущие публикации</Text>
            <View>
              <DonwSvg />
            </View>
          </TouchableOpacity>
          {show &&
            <UserItem data={getPostView.data} />
          }
          <View style={{ gap: 10 }}>
            <Text style={[Styles.darkSemiBold14, { marginTop: 10 }]}>Поделились аккаунтом - {getStatistic1.data.get_comment_count}</Text>
            <Text style={Styles.darkSemiBold14}>Среднее время проведенное на аккаунте - {getViewInAccaunt}</Text>
          </View>


        </Accordion>
        <Accordion headerTitleStyle={[Styles.darkMedium12, { textAlign: "center" }]} headerTitle="Активность просмотров">
          <ScrollView contentContainerStyle={{ justifyContent: 'center', width: '100%' }} style={{ marginTop: 20 }} horizontal={true}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Table >
                <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.textStyle} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table>
                  {
                    tableData.map((rowData, index) => {
                      return <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: 'rgba(255,194,75,0.8)' }]}
                        textStyle={styles.textStyle}
                      />
                    })
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </Accordion >
      </View >

    </BottomSheetScrollView >
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    color: AppColors.Charcoal_Color,
    textAlign: 'center'
  },
  line: {
    borderBottomWidth: 0.5,
    borderStyle: 'dotted',
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    height: 50,
    backgroundColor: 'rgba(255,194,75,0.8)',
    borderRadius: 10,
  },
  row: {
    height: 40,
    borderRadius: 10,
  },
});