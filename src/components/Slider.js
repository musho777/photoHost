import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { AppColors } from '../styles/AppColors';
import { SliderModal } from './SliderModal';
import { VidioComponent } from './post/VidioComponent';
import { VidioModal } from './post/VidionModal';
import { Styles } from '../styles/Styles';

const windowWidth = Dimensions.get('window').width;

export const Slider = ({ photo, single, music, viewableItems, setOpenModal, description }) => {
  const [active, setActive] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [resizeVidio, setResizeVidio] = useState(false)
  const [selectedVidio, setSelectedVidio] = useState(false)
  const [D, setD] = useState(description)
  const [scrollEnabled, setScrollEnabled] = useState(false)

  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
  };


  useEffect(() => {
    let desc = description
    if (description && description[0] == '[') {
      desc = JSON.parse(description)
    }
    setD(desc)
  }, [description])
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        data={photo}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEnabled={!scrollEnabled}
        renderItem={({ item, index }) => {
          let height = 580
          if (item.height) {
            height = (windowWidth * item.height) / item.width
          }
          if (height > 600) {
            height = 580
          }
          console.log(height, 'e')
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                !item.video && setOpenSlider(true)
                setOpenModal(false)
              }}
              style={!single ? styles.img : { ...styles.img, width: windowWidth }}>
              {!item.video ?
                <View>
                  {description && <View style={styles.hover}>
                    <Text style={[Styles.whiteSemiBold12]}>
                      {Array.isArray(D) ? D[index] : D}
                    </Text>
                  </View>}
                  <Image
                    style={{ height: height, width: windowWidth }}
                    source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }}
                    resizeMode="cover"
                  />
                </View> :
                <View>
                  {description && <View style={styles.hover}>
                    <Text style={[Styles.whiteSemiBold12]}>
                      {Array.isArray(D) ? D[index] : D}
                    </Text>
                  </View>}
                  <VidioComponent setResizeVidio={() => {
                    setSelectedVidio(item)
                    setResizeVidio(true)
                  }}

                    setScrollEnabled={(e) => setScrollEnabled(e)}
                    viewableItems={viewableItems} music={music} item={item} />
                </View>
              }
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.paginationWrapper}>
        {photo?.length > 1 && photo?.map((elm, i) => (
          <View key={i} style={[styles.pagination, i === active && { backgroundColor: AppColors.GoldenTainoi_Color, borderRadius: 50 }]}></View>
        ))}
      </View>
      {openSlider && (
        <SliderModal
          modalVisible={openSlider}
          activePhoto={active}
          photo={photo}
          close={() => setOpenSlider(false)}
        />
      )}
      <VidioModal close={() => setResizeVidio(false)} modalVisible={resizeVidio} music={music} item={selectedVidio} />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    flexShrink: 0,
  },
  pagination: {
    width: 6,
    height: 6,
    backgroundColor: '#CCD6DF',
    marginHorizontal: 5,
    borderRadius: 50,
  },
  paginationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  hover: {
    marginHorizontal: 15,
    zIndex: 99999,
    backgroundColor: "rgba(0,0,0,0.7)",
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 3,
    top: 60,
    height: 'auto',
  }
});
