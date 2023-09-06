import { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { AppColors } from '../styles/AppColors';
import ImageZoom from 'react-native-image-pan-zoom';
import ZoomableImage from './ZoomImg';
import { SliderModal } from './SliderModal';

const windowWidth = Dimensions.get('window').width;
export const Slider = ({ photo, single, activePhoto }) => {
  const [active, setActive] = useState(0);
  const [isZoomVisible, setZoomVisible] = useState(false);
  const [openSlider, setOpenSlider] = useState(false)

  const closeZoom = () => {
    setZoomVisible(false);
  };
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        data={photo}
        onMomentumScrollEnd={event => {
          const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
            Math.floor(event.nativeEvent.layoutMeasurement.width),
          );
          setActive(index);
          activePhoto(index)
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => setOpenSlider(true)}
              style={!single ? styles.img : { ...styles.img, width: windowWidth, height: 350 }}>
              <Image
                style={[
                  { marginVertical: 10, width: '100%', height: '100%' },
                ]}
                // source={require('../assets/img/1.png')}
                source={{ uri: `https://chamba.justcode.am/uploads/${item.photo}` }}
                resizeMode={'cover'}
              />
              <ZoomableImage
                imageUrl={`https://chamba.justcode.am/uploads/${item.photo}`}
                isVisible={isZoomVisible}
                onClose={closeZoom}
              />
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        {photo?.map((elm, i) => (
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
      <SliderModal modalVisible={openSlider} activePhoto={active} photo={photo} close={() => setOpenSlider(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: windowWidth - 20,
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
