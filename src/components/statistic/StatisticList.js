import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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


export const StatisticList = ({ id, token }) => {
  console.log(id)
  const tableHead = ['Дата', 'Время', 'Пол', 'Возраст', 'кол-во просмотров ']
  const getStatistic1 = useSelector((st) => st.getStatistic1)
  const getStatistic2 = useSelector((st) => st.getStatistic2)
  const [tableData, setTableDat] = useState([])
  const widthArr = [100, 40, 40, 80, 80]
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(Getstatistic1(id, token))
      dispatch(GetStatisitc2(id, token))
    }
  }, [id])
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    let item = [...tableData]
    if (getStatistic2.data.length) {
      getStatistic2.data.map((elm, i) => {
        elm.statistics.map((el, i) => {
          let gender = el.gender
          if (gender == 'men') {
            gender = "М"
          }
          else if (gender == 'women') {
            gender = "Ж"
          }

          let year = elm.date.slice(2, 4)
          let mounth = elm.date.slice(5, 7)
          let day = elm.date.slice(8, 10)
          const newDateString = `${day}.${mounth}.${year}`;
          item.push([newDateString, elm.hour_range, gender, el.year, el.count])
        })
      })
    }
    setTableDat(item)
  }, [getStatistic2.data])
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours > 0 ? `${hours}h:` : ''}${minutes > 0 ? `${minutes}m:` : ''}${secs}s`;
  };
  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
      <Text style={[{ textAlign: 'center' }, Styles.darkMedium16]}>СТАТИСТИКА</Text>
      <View style={{ gap: 20, paddingHorizontal: 5, marginBottom: 50 }}>
        <Accordion headerTitleStyle={Styles.darkMedium12} headerTitle="СТАТИСТИКА НОМЕР 1">
          <View style={{ gap: 10, marginTop: 20, }}>
            <Text style={Styles.darkSemiBold14}>Лайков - {getStatistic1.data.get_like_count}</Text>
            <Text style={Styles.darkSemiBold14}>Комментариев - {getStatistic1.data.get_comment_count}</Text>
            <Text style={Styles.darkSemiBold14}>Просмотров - {getStatistic1.data.get_view_count}</Text>
            {/* <Text style={Styles.darkSemiBold14}>Среднее время просмотра - {formatTime(getStatistic1.data.get_post_view_minute)} секунды</Text> */}
            <Text style={Styles.darkSemiBold14}>Активность просмотров - {getRandomNumber(4, 25)} секунды</Text>
            <Text style={Styles.darkSemiBold14}>Переход
              <Text style={{ fontSize: 10 }}>(С ЛЕНТЫ СОБЫТИЙ НА ВАШ АККАУНТ)</Text>
              - {getStatistic1.data.get_post_page_count} </Text>
            <Text style={Styles.darkSemiBold14} t>Сохранение публикации  в закладки  - {getStatistic1.data.get_book_count} </Text>
          </View>
        </Accordion>
        <Accordion headerTitleStyle={Styles.darkMedium12} headerTitle="СТАТИСТИКА НОМЕР 2">
          <ScrollView style={{ marginTop: 20 }} horizontal={true}>
            <View>
              <Table >
                <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.textStyle} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table>
                  {
                    tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: 'rgba(255,194,75,0.8)' }]}
                        textStyle={styles.textStyle}

                      />
                    ))
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
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    color: AppColors.Charcoal_Color,
    textAlign: 'center'
  },
  button: {
    fontSize: 10,
    color: 'red',
  },
  header: {
    height: 50,
    backgroundColor: 'rgba(255,194,75,0.8)',
    borderRadius: 10,
  },
  borderRadius: 10,
  row: {
    height: 40,
    borderRadius: 10,
  }
});