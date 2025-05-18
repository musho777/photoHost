import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';
import { useSelector } from 'react-redux';
import { BackArrowWhite } from '../../assets/svg/Svgs';


const { width, height } = Dimensions.get('window');

export const PhotoSlider = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [active, setActive] = useState(0);

  const sliderData = [
    {
      id: '2',
      image: require('../../assets/img/14.jpg'),
    },
    {
      id: '3',
      title: '',
      image: require('../../assets/img/3.jpg'),
    },
    {
      id: '4',
      title: "",
      image: require('../../assets/img/33.jpg'),
    },
    {
      id: '5',
      image: require('../../assets/img/4.jpg'),
    },
    {
      id: '6',
      image: require('../../assets/img/55.jpg'),
    },
    {
      id: '7',
      image: require('../../assets/img/5.jpg'),
    },
    {
      id: '8',
      image: require('../../assets/img/6.jpg'),
    },
    {
      id: '9',
      image: require('../../assets/img/11.jpg'),
    },
    {
      id: '10',
      image: require('../../assets/img/12.jpg'),
    },
    {
      id: '11',
      image: require('../../assets/img/8.jpg'),
    },
    {
      id: '12',
      image: require('../../assets/img/9.jpg'),
    },
    {
      id: '14',
      image: require('../../assets/img/66.jpg'),
    },
    {
      id: '15',
      image: require('../../assets/img/77.jpg'),
    },
    {
      id: '16',
      image: require('../../assets/img/1.jpg'),
    },
    // {
    //   id: '19',
    //   image: require('../../assets/img/99.jpg'),
    // },


    {
      id: '20',
      image: require('../../assets/img/100.jpg'),
    },

    {
      id: '223',
      image: require('../../assets/img/223.jpg'),
    },

    // {
    //   id: '21',
    //   image: require('../../assets/img/101.jpg'),
    // },


    {
      id: '107',
      image: require('../../assets/img/120.jpg'),
    }, ///edit
    {
      id: '108',
      image: require('../../assets/img/108.jpg'),
    },
    {
      id: '109',
      image: require('../../assets/img/109.jpg'),
    },
    {
      id: '110',
      image: require('../../assets/img/110.jpg'),
    },
    {
      id: '111',
      image: require('../../assets/img/111.jpg'),
    },
    {
      id: '112',
      image: require('../../assets/img/112.jpg'),
    },
    // {
    //   id: '113',
    //   image: require('../../assets/img/113.jpg'),
    // },
    {
      id: '114',
      image: require('../../assets/img/114.jpg'),
    },
    //
    {
      id: '18',
      image: require('../../assets/img/88.jpg'),
    },
    {
      id: '17',
      image: require('../../assets/img/13.jpg'),
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
    return <View style={{ width: width, height: height, backgroundColor: 'rgb(12,59,78)' }}>
      <Image source={item.image} style={styles.image} />
    </View>
  };


  return (
    <View style={{ backgroundColor: 'rgb(12,59,78)' }}>
      <View style={{ position: 'absolute', top: 85, width: '100%', height: 30, zIndex: 9999 }}>
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
        keyExtractor={(item) => item?.id}
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
    height: height - 130,
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop: 15,
    position: 'absolute',
    bottom: 0
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  pagination: {
    width: width / 40,
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
    paddingHorizontal: 15,
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