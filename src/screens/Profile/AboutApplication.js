import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Styles } from '../../styles/Styles';


const { width, height } = Dimensions.get('window');

export const AboutApplication = () => {

  const [active, setActive] = useState(0);
  const sliderData = [
    {
      id: '1',
      title: "Взрывная энергия в фото и видео формате!",
      image: require('../../assets/img/info.jpg'),
      description: ""
    },
    {
      id: '2',
      title: '',
      image: require('../../assets/img/info2.jpg'),
      description: `Chamba – это приложение для любителей снимать крутые фото и короткие видео событий, происходящих не с тобой, а вокруг тебя!`,
    },
    {
      id: '3',
      title: "",
      description: "Представляем приложение, которое перевернет твою  ленту и позволит тебе увидеть мир по-новому! Вот то, что мы приготовили для тебя:",
      image: require('../../assets/img/info3.jpg'),
    },
    {
      id: '4',
      title: "Персональная лента:",
      description: " После быстрой регистрации, ты выбираешь любимые рубрики, а их более 35, и получаешь контент, подходящий именно тебе!",
      image: require('../../assets/img/info1.jpg'),
    },
    {
      id: '5',
      title: "Попутный контент:",
      description: "Любишь путешествовать? Выбрав эту рубрику, к красочному контенту будут предложены такие рубрики как фрукты, овощи, еда и напитки, города и страны, активный отдых, экстрим, развлечения, природа, времена года, охота и рыбалка, и релакс.",
      image: require('../../assets/img/info4.jpg'),
    },
    {
      id: '6',
      title: "Обожаешь свою любимую собачку?",
      description: "Мы сразу предложим загрузить ее в рубрику “Животные” и твой контент направится точно тем людям, которые выбрали эту рубрику!",
      image: require('../../assets/img/info5.jpg'),
    },
    {
      id: '7',
      title: "Локальный контент:",
      description: "Получай контент в первую очередь со своего города! интересные места, природные явления и многое другое - все это в твоей ленте!",
      image: require('../../assets/img/info6.jpg'),
    },
    {
      id: '8',
      title: "Информация о коллегах по сфере/отрасли",
      description: "Ты риэлтор, строитель, блогер, бармен, шеф-повар или представляешь товары или услуги? Мы аккуратно предложим тебе контент от твоих коллег по отрасли, как работают другие специалисты, и будь в курсе последних трендов!",
      image: require('../../assets/img/info7.jpg'),
    },
    {
      id: '9',
      title: "Уникальный контент:",
      description: "Мы покажем тебе все самое свежее и интересное, никаких групп, сообществ, фотофильтров и повторяющегося контента!",
      image: require('../../assets/img/info8.jpg'),
    },
    {
      id: '10',
      title: "Разнообразие контента:",
      description: "От спокойных пейзажей до захватывающих событий, у нас найдется что-то для каждого!",
      image: require('../../assets/img/info9.jpg'),
    },
    {
      id: '11',
      title: "",
      description: "Каждый пользователь может посмотреть подробную статистику по загруженной публикации.",
      image: require('../../assets/img/info10.jpg'),
    },
  ];


  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textWrapper}>
        {item.title && <Text style={[Styles.darkSemiBold14, { color: 'white', textAlign: 'center' }]}>{item.title}</Text>}
        {item.description && <Text style={[Styles.balihaiMedium13, { color: 'white' }]}>{item.description}</Text>}
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.paginationWrapper}>
        {sliderData.map((elm, i) => {
          return <View key={i} style={[styles.pagination, active == i && { backgroundColor: '#FFC24B' }]} />
        })}
      </View>
      <FlatList
        data={sliderData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={handleMomentumScrollEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  itemContainer: {
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  pagination: {
    width: width / 14,
    height: 3,
    backgroundColor: '#CCD6DF',
    borderRadius: 10,
  },
  paginationWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    gap: 5,
    top: 60,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'center'
  },
  textWrapper: {
    position: 'absolute',
    marginTop: 100,
    gap: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    borderRadius: 10
  }
});
