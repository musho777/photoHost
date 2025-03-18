import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Styles } from '../../styles/Styles';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { t } from '../../components/lang';
import { useSelector } from 'react-redux';
import { BackArrow, BackArrowWhite } from '../../assets/svg/Svgs';
import Video from 'react-native-video';


const { width, height } = Dimensions.get('window');

export const AboutApplication = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [active, setActive] = useState(0);
  const ref = useRef()
  const [paused, setPaused] = useState(false)
  const sliderData = [
    {
      id: "1",
      type: "video",
      image: require("../../assets/img/aboutUs.mp4")
    },
    {
      id: '2',
      image: require('../../assets/img/2.jpg'),
    },
    {
      id: '3',
      title: '',
      image: require('../../assets/img/3.jpg'),
    },
    {
      id: '4',
      title: "",
      image: require('../../assets/img/4.jpg'),
    },
    {
      id: '5',
      image: require('../../assets/img/5.jpg'),
    },
    {
      id: '6',
      image: require('../../assets/img/6.jpg'),
    },
    {
      id: '7',
      image: require('../../assets/img/7.jpg'),
    },
    {
      id: '8',
      image: require('../../assets/img/8.jpg'),
    },
    {
      id: '9',
      image: require('../../assets/img/9.jpg'),
    },
    {
      id: '10',
      image: require('../../assets/img/10.jpg'),
    },
    {
      id: '11',
      image: require('../../assets/img/11.jpg'),
    },
    {
      id: '12',
      image: require('../../assets/img/12.jpg'),
    },
    {
      id: '13',
      image: require('../../assets/img/1.jpg'),
    },
    {
      id: '14',
      image: require('../../assets/img/13.jpg'),
    },
    {
      id: '15',
      image: require('../../assets/img/14.jpg'),
    },
    {
      id: '16',
      type: "text",
    },
  ];


  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
  };


  const renderItem = ({ item }) => {
    if (item.type == "video") {
      return <Video
        style={styles.image}
        ref={ref}
        paused={paused}
        source={require("../../assets/img/aboutUs.mp4")}
      />
    }
    else if (item.type == "text") {
      return <SafeAreaView style={[styles.image, { marginTop: 120 }]}>
        <ScrollView style={{ gap: 10 }} showsHorizontalScrollIndicator>
          <View style={{ gap: 10, paddingHorizontal: 15 }}>
            <Text style={Styles.whiteRegular12}>Красота не только в тебе, но и вокруг тебя!</Text>
            <Text style={Styles.whiteRegular12}>Chamba - это приложение для любителей снимать крутые фото событий, происходящих не с тобой, а вокруг тебя!</Text>
            <Text style={Styles.whiteRegular12}>Chamba - это приложение для любителей снимать крутые фото событий, происходящих не с тобой, а вокруг тебя!</Text>
            <Text style={Styles.whiteRegular12}>Представляем приложение, которое перевернет твою ленту и позволит тебе увидеть мир по-новому! Вот то, что мы приготовили для тебя:</Text>
            <Text style={Styles.whiteRegular12}>Открытая платформа для абсолютно разных, творческих, креативных людей и бизнеса.</Text>
            <Text style={Styles.whiteRegular12}>Персональная лента для тебя! После быстрой регистрации, ты выбираешь любимые рубрики, а их более 40, и получаешь контент, подходящий именно тебе!</Text>
            <Text style={Styles.whiteRegular12}>Попутный контент - это контент, который косвенно или напрямую имеет отношение к выбранными тобою рубриками. Любишь путешествовать? Выбрав эту рубрику, к красочному контенту будут предложены такие рубрики как фрукты и овощи, города и страны, активный отдых, экстрим, развлечения, природа, времена года, охота и рыбалка и релакс.</Text>
            <Text style={Styles.whiteRegular12}>Уникальный контент: Все самое свежее и интересное, никаких групп, сообществ, фотофильтров и повторяющегося контента!</Text>
            <Text style={Styles.whiteRegular12}>Разнообразие контента: От спокойных пейзажей до захватывающих событий, у нас найдется что-то для каждого!</Text>
            <Text style={Styles.whiteRegular12}>Локальный контент: Получай контент в первую очередь со своего города! Интересные места, природные явления и многое другое - все это в твоей ленте!</Text>
            <Text style={Styles.whiteRegular12}>Информация о коллегах по сфере/отрасли: Ты риэлтор, строитель, блогер, бармен, шеф-повар или предоставляешь товары или услуги? Мы аккуратно предложим тебе контент от твоих коллег по отрасли, как работают другие специалисты, и будь в курсе последних трендов!</Text>
            <Text style={Styles.whiteRegular12}>Иногда мы затрудняемся в вопросе, в какую рубрику выложить контент, так как на одной публикации может быть запечатлен красивый автомобиль, милая собачка, красивые пальмы и нежное море! Куда выложить? Мы предлагаем такой контент выложить в несколько рубрик (не более 4-х), где твое искусство увидят любители разного.</Text>
            <Text style={Styles.whiteRegular12}>Автоматическая категоризация:
              Сделал(а) фото → выложил(а) согласно рубрики → улетело точно тем людям, кто не обязательно подписан на тебя, но выбрал эту рубрику! Прокачивать свой аккаунт нет необходимости, алгоритмы сами направят твои публикации тем, кто в них заинтересован!</Text>
            <Text style={Styles.whiteRegular12}>Активность просмотров Каждый пользователь может посмотреть подробную статистику по загруженной публикации.</Text>
            <Text style={Styles.whiteRegular12}>Вырази свой аккаунт индивидуальным шрифтом и цветом.</Text>
            <Text style={Styles.whiteRegular12}>Выбери уникальный шрифт и цвет для описания о себе.</Text>
            <Text style={Styles.whiteRegular12}>Подчеркни описание к публикации особенным шрифтом и цветом.</Text>
            <Text style={Styles.whiteRegular12}>Оставь запись на стене.</Text>
            <Text style={Styles.whiteRegular12}>Готовые изображения на фон для твоего аккаунта.</Text>
            <Text style={Styles.whiteRegular12}>Звуковой комментарий к публикации.</Text>
            <Text style={Styles.whiteRegular12}>Маленькое правило Не выкладывать фото с собой, в только то, что происходит вокруг тебя!</Text>
            <Text style={[Styles.whiteRegular12, { marginBottom: 120 }]}>Не трать время на скучную ленту! Скачай приложение и окунись в мир интересных открытий!</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    }
    else {
      return <Image source={item.image} style={styles.image} />
    }
  };

  useEffect(() => {
    if (active == "0") {
      setPaused(false)
    }
    else {
      setPaused(true)
    }
  }, [active])

  return (
    <View style={{ backgroundColor: 'rgb(12,59,78)' }}>
      <View style={{ position: 'absolute', top: 55, width: '100%', height: 30, zIndex: 9999 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }} onPress={() => navigation.goBack()}>
          <BackArrowWhite />
          <Text style={[Styles.darkSemiBold16, { marginHorizontal: 15, color: 'white' }]}>
            {t(mainData.lang).AboutProgram}
          </Text>
        </TouchableOpacity>
      </View>
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
  image: {
    width: width,
    height: height,
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  pagination: {
    width: width / 21,
    height: 3,
    backgroundColor: '#CCD6DF',
    borderRadius: 10,
  },
  paginationWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    gap: 5,
    top: 85,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'center'
  },
  textWrapper: {
    position: 'absolute',
    marginTop: 120,
    gap: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  }
});
