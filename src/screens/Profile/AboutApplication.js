import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Styles } from '../../styles/Styles';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { t } from '../../components/lang';
import { useSelector } from 'react-redux';
import { BackArrow, BackArrowWhite } from '../../assets/svg/Svgs';


const { width, height } = Dimensions.get('window');

export const AboutApplication = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [active, setActive] = useState(0);
  const sliderData = [
    {
      id: '1',
      image: require('../../assets/img/2.jpg'),
    },
    {
      id: '2',
      title: '',
      image: require('../../assets/img/3.jpg'),
    },
    {
      id: '3',
      title: "",
      image: require('../../assets/img/4.jpg'),
    },
    {
      id: '4',
      image: require('../../assets/img/5.jpg'),
    },
    {
      id: '5',
      image: require('../../assets/img/6.jpg'),
    },
    {
      id: '6',
      image: require('../../assets/img/7.jpg'),
    },
    {
      id: '7',
      image: require('../../assets/img/8.jpg'),
    },
    {
      id: '8',
      image: require('../../assets/img/9.jpg'),
    },
    {
      id: '9',
      image: require('../../assets/img/10.jpg'),
    },
    {
      id: '10',
      image: require('../../assets/img/11.jpg'),
    },
    {
      id: '11',
      image: require('../../assets/img/12.jpg'),
    },
    {
      id: '12',
      image: require('../../assets/img/1.jpg'),
    },
    {
      id: '13',
      image: require('../../assets/img/13.jpg'),
    },
    {
      id: '14',
      image: require('../../assets/img/14.jpg'),
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
    <Image source={item.image} style={styles.image} />
  );

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
    width: width / 18,
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
