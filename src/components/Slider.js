import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { AppColors } from '../styles/AppColors';
import { SliderModal } from './SliderModal';
import { LikePostAction } from '../store/action/action';
import { useDispatch, useSelector } from 'react-redux';
import SliderImage from './sliderImage';
// import { VidioComponent } from './post/Vidio/VidioComponent';
// import { Styles } from '../styles/Styles';
// import Sliders from '@react-native-community/slider';
import LottieView from 'lottie-react-native';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;


export const Slider = React.memo(({ adminStatus, scroll, id, photo, viewableItems, setOpenModal, user, onLongClikc, long, onPressOut, setActiveImage, data, setHoriznotal = () => { }, description, setIsExpanded, isExpanded, setHeight, big, color, font }) => {
  const [active, setActive] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [showLikeIcone, setShowLikeICone] = useState(false)
  const staticdata = useSelector(st => st.static);
  const lastClickTime = useRef(0);
  const clickTimeout = useRef(null);
  const SINGLE_CLICK_DELAY = 300;
  const DOUBLE_CLICK_DELAY = 300;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch()

  const animation = useRef(null);


  const LikePost = useCallback(() => {
    dispatch(LikePostAction({ post_id: data?.id }, staticdata.token, user.data?.id));
  }, [dispatch, data?.id, staticdata.token, user.data?.id]);



  const handleClick = (event, item) => {
    const now = new Date().getTime();
    if (lastClickTime.current && now - lastClickTime.current < DOUBLE_CLICK_DELAY) {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
      const { locationX, locationY } = event.nativeEvent;
      setPosition({ x: locationX - 180, y: locationY - 180 });
      setShowLikeICone(true);
      animation?.current?.play();
      LikePost();
    } else {
      clickTimeout.current = setTimeout(() => {
        if (!item.video) {
          setOpenSlider(true);
          setOpenModal(false);
        }
      }, SINGLE_CLICK_DELAY);
      lastClickTime.current = now;
    }
  };

  const handleMomentumScrollEnd = (event) => {
    // setShowSlider(true)
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
    setActiveImage(index)
  };



  // const CurrentTimeSet = (i, e) => {
  //   let item = [...currentTime]
  //   let temp = [...paused]
  //   if (item[i] <= duration[i]) {
  //     item[i] = e
  //     setCurrentTime(item)
  //   }
  //   else {
  //     item[i] = 0
  //     setCurrentTime(item)
  //     temp[i] = true
  //     setPaused(temp)
  //   }
  // }

  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  // };


  // const GetDuration = (e, i) => {
  //   let item = [...duration]
  //   item[i] = e
  //   setDuration(item)
  // }

  const { fullScreen } = useSelector((st) => st.fullScreenData)

  const renderItem = ({ item, index }) => {
    let height = 545
    if (item.height - 200 > item.width) {
      height = 545
      setHoriznotal(false)
      if (active == index) {
        setHeight(545)
      }
    }
    else {
      height = 310
      setHoriznotal(true)
      if (active == index) {
        setHeight(310)
      }
    }




    return (
      <TouchableOpacity
        onLongPress={() => onLongClikc()}
        activeOpacity={1}
        onPressOut={() => onPressOut()}
        onPress={(e) => handleClick(e, item)}
        style={[styles.img, { height: height }]}>
        <SliderImage
          long={long}
          description={description}
          color={color}
          index={index}
          font={font}
          item={item}
          height={height}
          adminStatus={adminStatus}
          isExpanded={isExpanded}
          setIsExpanded={(e) => setIsExpanded(e)}
        />

        {showLikeIcone && <View style={{ position: 'absolute', left: position.x, top: position.y }}>
          <LottieView
            ref={animation}
            source={require('../assets/img/Animation.json')}
            autoPlay={true}
            loop={false}
            style={{ width: 350, height: 350 }}
            onAnimationFinish={(e) => { setShowLikeICone(false) }}
          />
        </View>}
      </TouchableOpacity>
    );
  }

  const flatListRef = useRef();
  useEffect(() => {
    if (photo?.length > 0) {
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
    setActive(0)
  }, [photo?.length])

  return (
    <View style={[{ position: 'relative' }]}>
      <FlatList
        horizontal
        ref={flatListRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        keyExtractor={(item) => item.id.toString()}
        data={photo}
        windowSize={5}
        initialNumToRender={5}
        removeClippedSubviews={false}
        maxToRenderPerBatch={10}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={renderItem}
      />
      {photo?.length > 1 && !fullScreen && <View style={styles.paginationWrapper}>
        {photo?.map((elm, i) => (
          <View key={i} style={[styles.pagination, i === active && { backgroundColor: AppColors.GoldenTainoi_Color, borderRadius: 50 }]}></View>
        ))}
      </View>}
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
    prevProps.data === nextProps.data &&
    process.viewableItems === nextProps.viewableItems &&
    prevProps.long === nextProps.long &&
    prevProps.color === nextProps.color &&
    prevProps.font === nextProps.font
  )
});

const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    flexShrink: 0,
    justifyContent: 'center',
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
    bottom: 10,
    position: 'absolute',
    left: 0,
    right: 0,
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
  },
  slider: {
    bottom: 100,
    position: 'absolute',
    zIndex: 99999,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    bottom: 5,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  seekSlider: {
    width: '80%',
    height: 40,
  }
});
