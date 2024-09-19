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
import { Styles } from '../styles/Styles';
import FastImage from 'react-native-fast-image';
import { LikePostAction } from '../store/action/action';
import { useDispatch, useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

export const Slider = ({ photo, single, music, viewableItems, setOpenModal, description, id, user }) => {
  const [active, setActive] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [D, setD] = useState(description)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [showLikeIcone, setShowLikeICone] = useState(false)
  const staticdata = useSelector(st => st.static);

  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickTimeout, setClickTimeout] = useState(null);

  const SINGLE_CLICK_DELAY = 300; // Задержка для распознавания одиночного клика
  const DOUBLE_CLICK_DELAY = 300;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLikeICone(false)
    }, 1000); // 3-second delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [showLikeIcone]);


  const LikePost = () => {
    dispatch(LikePostAction({
      'post_id': id
    },
      staticdata.token,
      user.data.id
    ))
  }

  const handleClick = (event, item) => {
    const now = new Date().getTime();

    if (lastClickTime && (now - lastClickTime) < DOUBLE_CLICK_DELAY) {

      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
      const { locationX, locationY } = event.nativeEvent;
      setPosition({ x: locationX - 50, y: locationY - 50 });
      setShowLikeICone(true)
      LikePost()
    } else {
      const timeoutId = setTimeout(() => {
        !item.video && setOpenSlider(true)
        setOpenModal(false)
      }, SINGLE_CLICK_DELAY);

      setClickTimeout(timeoutId);
      setLastClickTime(now);
    }
  };

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
          let height = 570
          if (item.height) {
            height = (windowWidth * item.height) / item.width
          }
          if (height < 400) {
            height = 380
          }
          else {
            height = 570
          }
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => handleClick(e, item)}
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
                  <VidioComponent
                    active={active == index}
                    setScrollEnabled={(e) => setScrollEnabled(e)}
                    viewableItems={viewableItems} music={music} item={item} />
                </View>
              }
              {showLikeIcone && <View style={{ position: 'absolute', left: position.x, top: position.y }}>
                <FastImage
                  source={require('../assets/img/Animation3.gif')} // Ensure this path is correct
                  style={{ width: 130, height: 130 }}
                  resizeMode={FastImage.resizeMode.contain} // Can also use 'cover', 'stretch', etc.
                />
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
    marginHorizontal: 13,
    zIndex: 99999,
    backgroundColor: "rgba(0,0,0,0.7)",
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 3,
    top: 50,
    height: 'auto',
  }
});
