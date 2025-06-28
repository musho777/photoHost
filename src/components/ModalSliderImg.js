import { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { AppColors } from '../styles/AppColors';
import { CloseSvg } from '../assets/svg/Svgs';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ModalSliderImg = ({ photo, activePhoto,close,avatar }) => {
  const [active, setActive] = useState(activePhoto || 0);
  const [h,setH] = useState(329)
  console.log(h)
  return (
    <View style={styles.wrapper}>
      <SwiperFlatList
        index={active}
        horizontal
        pagingEnabled
        showPagination={false}
        data={photo}
        onChangeIndex={({ index }) => setActive(index)}
        style={styles.swiper}
        renderItem={({ item }) => {
          let height = item.height - 200 > item.width ? 565 : 329;
          const imageUrl = `https://chambaonline.pro/uploads/${item.photo}`;
          if(!item.height){
              Image.getSize(imageUrl, (width, height) => {
               const ratio = height / width;
               setH(windowWidth*ratio)
        });
          }
          {console.log(h,avatar,"222")}
          return (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: imageUrl }}
                style={[styles.image, { height:avatar?h:height }]}
                resizeMode="cover"
              />
              <TouchableOpacity onPress={()=>close()} style  = {{position:'absolute',right:10,top:10}}>
                <CloseSvg color='red'  />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      {photo.length > 1 && (
        <View style={styles.paginationWrapper}>
          {photo.map((_, i) => (
            <View
              key={i}
              style={[
                styles.pagination,
                i === active && { backgroundColor: AppColors.GoldenTainoi_Color },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
  },
  swiper: {
    flexGrow: 0,
  },
  imageWrapper: {
    width: windowWidth,
  },
  image: {
    width: windowWidth,
    borderRadius: 10,
  },
  paginationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  pagination: {
    width: 6,
    height: 6,
    backgroundColor: '#CCD6DF',
    marginHorizontal: 5,
    borderRadius: 50,
  },
});
