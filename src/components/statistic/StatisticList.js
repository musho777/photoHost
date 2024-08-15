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
  const tableHead = ['Дата', 'Время', 'Пол', 'Возраст', 'кол-во просмотров ']
  const getStatistic1 = useSelector((st) => st.getStatistic1)
  const getStatistic2 = useSelector((st) => st.getStatistic2)
  // const tableData = [
  //   ['01.04.24 г.', '08-09', 'М', ' 15-20', '1500'],
  //   ['01.04.24 г.', '08-09', 'М', ' 15-20', '1500'],
  //   ['01.04.24 г.', '08-09', 'М', ' 15-20', '1500'],
  //   ['01.04.24 г.', '08-09', 'М', ' 15-20', '1500'],
  //   ['01.04.24 г.', '08-09', 'М', ' 15-20', '1500'],
  // ]
  const [tableData, setTableDat] = useState([])
  const widthArr = [100, 60, 80, 100, 120]
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(Getstatistic1(id, token))
      dispatch(GetStatisitc2(id, token))
    }
  }, [id])


  useEffect(() => {
    let item = [...tableData]
    console.log(getStatistic2.data, 'getStatistic2.data')
    if (getStatistic2.data.length) {
      let result = []
      getStatistic2?.data?.map((elm, i) => {
        for (const [ageRange, genders] of Object.entries(elm.stat)) {
          if (ageRange !== "unknown_gender" && ageRange !== "unknown_year") {
            for (const [gender, count] of Object.entries(genders)) {
              result.push([gender, ageRange, String(count)]);
            }
          }
        }

        // Handle unknown genders
        for (const [ageRange, count] of Object.entries(elm.stat["unknown_gender"])) {
          result.push(["unknown_gender", ageRange, String(count)]);
        }

        // Handle unknown year
        for (const [gender, count] of Object.entries(elm.stat["unknown_year"])) {
          result.push([gender, "unknown_year", String(count)]);
        }
      })
    }
  }, [getStatistic2.data])

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
      <Text style={[{ textAlign: 'center' }, Styles.darkMedium16]}>СТАТИСТИКА</Text>
      <View style={{ gap: 20, paddingHorizontal: 5, marginBottom: 50 }}>
        <Accordion headerTitleStyle={Styles.darkMedium12} headerTitle="СТАТИСТИКА НОМЕР 1">
          <View style={{ gap: 10, marginTop: 20, }}>
            <Text style={Styles.darkSemiBold14}>лайков - {getStatistic1.data.get_like_count}</Text>
            <Text style={Styles.darkSemiBold14}>комментариев - {getStatistic1.data.get_comment_count}</Text>
            <Text style={Styles.darkSemiBold14}>просмотров - {getStatistic1.data.get_comment_count}</Text>
            <Text style={Styles.darkSemiBold14}>Среднее время просмотра - {getStatistic1.data.get_post_view_minute} секунды</Text>
            <Text style={Styles.darkSemiBold14}>ПЕРЕХОД  (С ЛЕНТЫ СОБЫТИЙ НА ВАШ АККАУНТ) - {getStatistic1.data.get_post_page_count} </Text>
            <Text style={Styles.darkSemiBold14} t>Сохранение публикации  в закладки  - {getStatistic1.data.get_book_count} </Text>
          </View>
        </Accordion>
        <Accordion headerTitleStyle={Styles.darkMedium12} headerTitle="СТАТИСТИКА НОМЕР 2">
          <ScrollView style={{ marginTop: 20 }} horizontal={true}>
            <View>
              <Table borderStyle={{}}>
                <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.textStyle} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{}} >
                  {/* {
                    tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: 'rgba(255,194,75,0.8)' }]}
                        textStyle={
                          [Styles.darkSemiBold12, {
                            textAlign: 'center',
                          }]}
                      />
                    ))
                  } */}
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
    fontSize: 12,
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