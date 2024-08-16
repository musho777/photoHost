import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { AppColors } from '../../../styles/AppColors';
import { VidioComponent } from '../../../components/post/VidioComponent';
import { VidioModal } from '../../../components/post/VidionModal';

const windowWidth = Dimensions.get('window').width;

export const Slider = ({ photo, music_name }) => {
  const [active, setActive] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [scroleEneble, setScrollEnabled] = useState(true)
  const [resizeVidio, setResizeVidio] = useState(false)
  const [selectedVidio, setSelectedVidio] = useState(false)


  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
  };

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEnabled={scroleEneble}
        data={photo}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item, index }) => {
          let aspectRatio = 0.65
          console.log(item)
          return (
            <TouchableOpacity activeOpacity={1} style={styles.img}>
              {!item.video ? (
                <Image
                  style={[{ width: '100%', aspectRatio: aspectRatio ? aspectRatio : 1 }]}
                  source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }}
                  resizeMode="cover"
                />
              ) : (

                <VidioComponent setResizeVidio={() => {
                  setSelectedVidio(item)
                  setResizeVidio(true)
                }}
                  setScrollEnabled={(e) => setScrollEnabled(false)}
                  music={music_name}
                  item={item}
                />

              )}
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 5,
        }}>
        {photo?.length > 1 &&
          photo?.map((elm, i) => (
            <View
              key={i}
              style={[
                styles.pagination,
                i === active && {
                  backgroundColor: AppColors.GoldenTainoi_Color,
                  borderRadius: 50,
                },
              ]}></View>
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
      <VidioModal close={() => setResizeVidio(false)} modalVisible={resizeVidio} music={music_name} item={selectedVidio} />
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
});
