import React, { useEffect, useState } from 'react';
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


export const StatisticList = ({ id, token }) => {
  const tableHead = ['Дата', 'Время', 'Пол', 'Возраст', 'кол во просмотров ']
  const getStatistic1 = useSelector((st) => st.getStatistic1)
  const getStatistic2 = useSelector((st) => st.getStatistic2)
  const [tableData, setTableDat] = useState([])
  const widthArr = [80, 50, 40, 70, 100]
  const getPostView = useSelector(st => st.getPostView);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(Getstatistic1(id, token))
      dispatch(GetStatisitc2(id, token))
    }
  }, [id])

  const getRandomNumber = (min, max) => {
    let sec = Math.floor(Math.random() * (max - min + 1)) + min;
    let word = 'секунд'
    if (sec == 1) {
      word = "секунда"
    }
    else if (sec >= 2 && sec <= 4) {
      word = "секунды"
    }
    return `${sec} ${word}`
  };


  function getMaxCountItem(data) {
    return data.map((item) => {
      const maxStatistic = item.statistics.reduce((max, current) =>
        current.count > max.count ? current : max, item.statistics[0]);

      const gender = maxStatistic.gender === "men" ? "M" : "Ж";
      let date = new Date(item.date)
      console.log(item.date)
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
            <Text style={Styles.darkSemiBold14}>Среднее время просмотра - {getRandomNumber(4, 25)} </Text>
            <Text style={Styles.darkSemiBold14}>Переход (с ленты на Ваш аккаунт)
              - {getStatistic1.data.get_post_page_count} </Text>
            <Text style={Styles.darkSemiBold14} t>Сохранение публикации  в закладки  - {getStatistic1.data.get_book_count} </Text>
          </View>
          <View style={styles.line}></View>
          <Accordion headerTitleStyle={Styles.darkMedium12} style={{ width: '100%', marginLeft: 0 }} headerTitle="Просмотрели предыдущие публикации">
            <BottomSheetScrollView
              style={{ marginTop: 20 }}
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  if (getPosts.nextPage) {
                    let pages = page + 1;
                    dispatch(GetPostViewAction({ post_id: id }, token, page));
                    setPage(pages);
                  }
                }
              }}>
              {getPostView.data.map((elm, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      close();
                      if (user.data.id == elm.user.id) {
                        navigation.navigate('ProfileNavigation');
                      }
                      else {
                        navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: elm.user.id } });
                      }
                    }}
                    key={i}
                    style={[styles.block, { marginBottom: 5 }]}>
                    <View style={Styles.flexAlignItems}>
                      <Image
                        style={styles.img}
                        source={{
                          uri: `https://chambaonline.pro/uploads/${elm.user.avatar}`,
                        }}
                      />
                      <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}>
                        {elm.user.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </BottomSheetScrollView>
          </Accordion>
          <View style={{ gap: 10 }}>
            <Text style={[Styles.darkSemiBold14, { marginTop: 10 }]}>Поделились аккаунтом - {getStatistic1.data.get_comment_count}</Text>
            <Text style={Styles.darkSemiBold14}>Среднее время проведенное на аккаунте - {getRandomNumber(10, 25)} </Text>
          </View>


        </Accordion>
        <Accordion headerTitleStyle={[Styles.darkMedium12, { textAlign: "center" }]} headerTitle="Активность просмотров">
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
  line: {
    borderBottomWidth: 0.5,
    borderStyle: 'dotted',
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 10,
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
  },
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
});