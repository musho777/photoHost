import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { AppColors } from '../styles/AppColors';
import { SliderModal } from './SliderModal';
import FastImage from 'react-native-fast-image';
import { LikePostAction } from '../store/action/action';
import { useDispatch, useSelector } from 'react-redux';
import SliderImage from './sliderImage';

const windowWidth = Dimensions.get('window').width;

export const Slider = React.memo(({ photo, viewableItems, setOpenModal, user, onLongClikc, long, onPressOut, setActiveImage, data }) => {
  const [active, setActive] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [showLikeIcone, setShowLikeICone] = useState(false)
  const staticdata = useSelector(st => st.static);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickTimeout, setClickTimeout] = useState(null);
  const SINGLE_CLICK_DELAY = 300;
  const DOUBLE_CLICK_DELAY = 300;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch()

  useEffect(() => {
    let timer = null
    if (showLikeIcone) {
      timer = setTimeout(() => {
        setShowLikeICone(false)
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [showLikeIcone]);



  const LikePost = useCallback(() => {
    dispatch(LikePostAction({ post_id: data.id }, staticdata.token, user.data.id));
  }, [dispatch, data.id, staticdata.token, user.data.id]);


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
    setActiveImage(index)
  };



  const renderItem = ({ item, index }) => {
    let height = 570
    if (item.height < 650) {
      height = 370
    }
    else {
      height = 570
    }
    return (
      <TouchableOpacity
        onLongPress={() => onLongClikc()}
        activeOpacity={1}
        onPressOut={() => onPressOut()}
        onPress={(e) => handleClick(e, item)}
        style={styles.img}>
        <SliderImage
          data={data}
          long={long}
          index={index}
          setScrollEnabled={(e) => setScrollEnabled(e)}
          item={item}
          height={height}
          viewableItems={viewableItems}
        />
        {showLikeIcone && <View style={{ position: 'absolute', left: position.x, top: position.y }}>
          <FastImage
            source={require('../assets/img/Animation3.gif')}
            style={{ width: 130, height: 130 }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>}
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        keyExtractor={(item) => item.id.toString()}
        data={photo}
        windowSize={5}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEnabled={!scrollEnabled}
        renderItem={renderItem}
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
}, (prevProps, nextProps) => {
  return (
    prevProps.photo.id === nextProps.photo.id &&
    prevProps.index === nextProps.index &&
    prevProps.data === nextProps.prevProps &&
    process.viewableItems === nextProps.viewableItems &&
    prevProps.long === nextProps.long
  )
});

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
    marginHorizontal: 7,
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
