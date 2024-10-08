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
import FastImage from 'react-native-fast-image';
import { LikePostAction } from '../store/action/action';
import { useDispatch, useSelector } from 'react-redux';
import SliderImage from './sliderImage';
// import Sliders from '@react-native-community/slider';
import { VidioComponent } from './post/Vidio/VidioComponent';
import { Styles } from '../styles/Styles';
import Sliders from '@react-native-community/slider';

const windowWidth = Dimensions.get('window').width;

export const Slider = React.memo(({ photo, viewableItems, setOpenModal, user, onLongClikc, long, onPressOut, setActiveImage, data }) => {
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
  const [showSlider, setShowSlider] = useState(true)
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])


  const onSeek = (value) => {
    let item = [...currentTime]
    item[active] = value
    setCurrentTime(item)
    videoRef?.current?.seek(value);
  };


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
    if (lastClickTime.current && now - lastClickTime.current < DOUBLE_CLICK_DELAY) {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
      const { locationX, locationY } = event.nativeEvent;
      setPosition({ x: locationX - 50, y: locationY - 50 });
      setShowLikeICone(true);
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
    setShowSlider(true)
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
    setActiveImage(index)
  };


  const CurrentTimeSet = (i, e) => {
    let item = [...currentTime]
    item[i] = e
    setCurrentTime(item)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };



  const renderItem = ({ item, index }) => {
    const height = item.height < 650 ? 370 : 570;
    return (
      <TouchableOpacity
        onLongPress={() => onLongClikc()}
        activeOpacity={1}
        onPressOut={() => onPressOut()}
        onPress={(e) => handleClick(e, item)}
        style={styles.img}>
        {item.video ?
          <View>
            {(data.description && data.description[0] === '[') &&
              <View style={styles.hover}>
                <Text style={Styles.whiteSemiBold12}>{JSON.parse(data.description)[index]}</Text>
              </View>
            }
            <VidioComponent
              active={active == index}
              viewableItems={viewableItems}
              music={data.music_name}
              item={item}
              currentTime={currentTime[active]}
              setCurrentTime={(e) => CurrentTimeSet(index, e)}
              setDuration={(e) => setDuration(e)}
              duration={duration}
              ref={videoRef}
              height={height}
              onSeek={onSeek}
            />
          </View>
          :
          <SliderImage
            long={long}
            description={data.description}
            index={index}
            item={item}
            height={height}
          />
        }

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
    <View style={{ position: 'relative' }}>
      <FlatList
        horizontal
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
        onScroll={() => {
          setShowSlider(false)
        }}
        renderItem={renderItem}
      />
      <View style={styles.paginationWrapper}>
        {photo?.length > 1 && photo?.map((elm, i) => (
          <View key={i} style={[styles.pagination, i === active && { backgroundColor: AppColors.GoldenTainoi_Color, borderRadius: 50 }]}></View>
        ))}
      </View>
      <View>
        {(photo[active]?.video && showSlider) &&
          <View style={styles.slider}>
            <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(currentTime[active])}</Text>

            <Sliders
              style={styles.seekSlider}
              value={currentTime[active]}
              minimumValue={0}
              maximumValue={duration}
              onValueChange={onSeek}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFC24B"
            />
            <Text style={[Styles.whiteSemiBold13, { textAlign: 'center' }]}>{formatTime(duration)}</Text>

          </View>
        }
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
    prevProps.data === nextProps.data &&
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
