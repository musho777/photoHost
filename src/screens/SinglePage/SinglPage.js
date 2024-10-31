import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { Slider } from './components/slider';
import { Header } from './components/Hedaer';
import { PostBody } from '../../components/postBody';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AddPostViewCount, Api, EndViewPost, } from '../../store/action/action';
import { ViewComponent } from '../../components/statistic/ViewComponent';
import { AppColors } from '../../styles/AppColors';
import { LikeList } from '../../components/LikeList';
import { Share } from '../../components/share';
import { HeaderInfo } from '../../components/post/postHeader/component/headerInfro';
import { Styles } from '../../styles/Styles';
import Sliders from '@react-native-community/slider';
import FastImage from 'react-native-fast-image';
import { VidioComponent } from '../../components/post/Vidio/VidioComponent';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const SinglPageScreen = ({ route, navigation }) => {
  const user = useSelector((st) => st.userData)
  const staticdata = useSelector(st => st.static);
  const my = route.params.my
  const save = route.params.seved
  const dispatch = useDispatch()
  const [showView, setShowView] = useState(null)
  const [likeClose, setLikeClose] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedVidioId, setSelectedVidioId] = useState(null)
  const [data, setData] = useState(null)
  const [active, setActive] = useState(0);
  const [D, setD] = useState()
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const videoRef = useRef(null);
  const [showSlider, setShowSlider] = useState(true)

  console.log(user.data.id)

  const [vertical, setVertical] = useState(false)

  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
    setActiveImage(index)
  };

  useEffect(() => {
    let desc = data?.description
    if (data?.description && data?.description[0] == '[') {
      desc = JSON.parse(data?.description)
    }
    setD(desc)
  }, [data?.description])

  const CurrentTimeSet = (i, e) => {
    let item = [...currentTime]
    item[i] = e
    setCurrentTime(item)
  }


  const onSeek = (value) => {
    let item = [...currentTime]
    item[active] = value
    setCurrentTime(item)
    videoRef?.current?.seek(value);
  };



  const bagraund = [
    require('../../assets/img/fon/1.jpg'),
    require('../../assets/img/fon/2.jpg'),
    require('../../assets/img/fon/3.jpg'),
    require('../../assets/img/fon/4.jpg'),
    require('../../assets/img/fon/5.jpg'),



    require('../../assets/img/fon/6.jpg'),
    require('../../assets/img/fon/10.jpg'),
    require('../../assets/img/fon/11.jpg'),
    require('../../assets/img/fon/12.jpg'),
    require('../../assets/img/fon/13.jpg'),
    require('../../assets/img/fon/14.jpg'),
    require('../../assets/img/fon/15.jpg'),
    require('../../assets/img/fon/20.jpg'),
    require('../../assets/img/fon/21.jpg'),
    require('../../assets/img/fon/23.webp'),
    require('../../assets/img/fon/24.webp'),
    require('../../assets/img/fon/26.webp'),
    require('../../assets/img/fon/27.webp'),
    require('../../assets/img/fon/30.webp'),
    require('../../assets/img/fon/35.jpeg'),
    require('../../assets/img/fon/36.jpeg'),
    require('../../assets/img/fon/37.jpeg'),
    require('../../assets/img/fon/38.jpeg'),
    require('../../assets/img/fon/39.jpeg'),
    require('../../assets/img/fon/40.jpeg'),
    require('../../assets/img/fon/41.jpeg'),
    require('../../assets/img/fon/42.jpeg'),
    require('../../assets/img/fon/43.jpeg'),
    require('../../assets/img/fon/44.jpeg'),
    require('../../assets/img/fon/45.jpeg'),
    require('../../assets/img/fon/46.jpeg'),
    require('../../assets/img/fon/47.jpeg'),
    require('../../assets/img/fon/48.jpeg'),
    require('../../assets/img/fon/49.jpeg'),
    require('../../assets/img/fon/50.jpeg'),
    require('../../assets/img/fon/51.jpeg'),
    require('../../assets/img/fon/52.jpeg'),
    require('../../assets/img/fon/53.jpeg'),
    require('../../assets/img/fon/54.jpeg'),
    require('../../assets/img/fon/55.jpeg'),
    require('../../assets/img/fon/56.jpeg'),
    require('../../assets/img/fon/57.jpeg'),
    require('../../assets/img/fon/58.jpeg'),
    require('../../assets/img/fon/59.jpeg'),
    require('../../assets/img/fon/60.jpeg'),
    require('../../assets/img/fon/61.jpeg'),
    require('../../assets/img/fon/62.jpeg'),
    require('../../assets/img/fon/63.jpeg'),
    require('../../assets/img/fon/64.jpeg'),
    require('../../assets/img/fon/65.jpeg'),
    require('../../assets/img/fon/66.jpeg'),
    require('../../assets/img/fon/67.jpeg'),
    require('../../assets/img/fon/68.jpeg'),
    require('../../assets/img/fon/69.jpeg'),
    require('../../assets/img/fon/70.jpeg'),
    require('../../assets/img/fon/71.jpeg'),
    require('../../assets/img/fon/72.jpeg'),
    require('../../assets/img/fon/73.jpeg'),
    require('../../assets/img/fon/74.jpeg'),
    require('../../assets/img/fon/75.jpeg'),
    require('../../assets/img/fon/76.jpeg'),
    require('../../assets/img/fon/77.jpeg'),
    require('../../assets/img/fon/78.jpeg'),
    require('../../assets/img/fon/80.jpeg'),
    require('../../assets/img/fon/81.jpeg'),
    require('../../assets/img/fon/82.jpeg'),
    require('../../assets/img/fon/83.jpeg'),
    require('../../assets/img/fon/84.jpeg'),
    require('../../assets/img/fon/86.jpeg'),
    require('../../assets/img/fon/87.jpeg'),
    require('../../assets/img/fon/88.jpeg'),
    require('../../assets/img/fon/89.jpeg'),
    require('../../assets/img/fon/90.jpeg'),
    require('../../assets/img/fon/91.jpeg'),
    require('../../assets/img/fon/92.jpeg'),
    require('../../assets/img/fon/93.jpeg'),
    require('../../assets/img/fon/94.jpeg'),
    require('../../assets/img/fon/95.jpeg'),
    require('../../assets/img/fon/96.jpeg'),
    require('../../assets/img/fon/97.jpeg'),
    require('../../assets/img/fon/98.jpeg'),
    require('../../assets/img/fon/99.jpeg'),
    require('../../assets/img/fon/100.jpeg'),
  ]


  const [showShare, setShowShare] = useState(false)
  const End = async (id) => {
    dispatch(EndViewPost({ post_id: id }, staticdata.token))
  }


  useFocusEffect(
    useCallback(() => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${staticdata.token}`);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ post_id: route.params.id }),
        redirect: 'follow',
      };
      setLoading(true)
      fetch(`${Api}/single_page_post`, requestOptions)
        .then(response => response.json())
        .then(r => {
          setLoading(false)
          setData(r.data)
        })
        .catch(error => {
          setLoading(false)
        });
      return () => {
        setData(null)
      };
    }, [])
  );
  if (loading) {
    return <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 40 }}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#000"} translucent={false} />
      <ActivityIndicator color="#FFC24B" />
    </View>
  }
  console.log(data?.user.id)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView contentContainerStyle={{ height: windowHeight }}>
        <StatusBar barStyle={"light-content"} backgroundColor={"#000"} translucent={false} />
        {!loading && <View style={styles.header}>
          {data &&
            <Header activeImage={activeImage} big={true} data={data} navigation={navigation} my={user.data.id == data?.user.id} />
          }
          {save && <View style={styles.headerWrapper}>
            <HeaderInfo
              id={data?.user.id}
              userImg={data?.user.avatar}
              data={data?.created_at}
              user={user}
              userId={data?.user.id}
              star={data?.user.star}
              userName={data?.user.name}
            />
          </View>}
        </View>}

        {(!loading && !data?.background) &&
          <View style={{ justifyContent: 'center', }}>
            {data?.photo.length > 0 &&
              <View style={{ backgroundColor: 'black', height: '100%' }}>
                <FlatList
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="fast"
                  data={data?.photo}
                  onScroll={() => {
                    setShowSlider(false)
                  }}
                  onMomentumScrollEnd={handleMomentumScrollEnd}
                  renderItem={({ item, index }) => {
                    let height = 570
                    if (item.height < 650) {
                      height = "75%"
                      setVertical(false)
                    }
                    else {
                      height = '90%'
                      setVertical(true)
                    }
                    return (
                      <View style={[styles.img, { height: height, marginTop: -20 }]}>

                        {!item.video ?
                          <View style={{ alignItems: 'center', justifyContent: 'center', height: height, }}>
                            <FastImage
                              style={[{ width: '100%', height: height, }]}
                              source={{
                                uri: `https://chambaonline.pro/uploads/${item.photo}`,
                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.immutable
                              }}
                              fallback={false}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            {!loading &&
                              <View style={{ width: '100%', zIndex: 999, bottom: 20 }}>
                                {!showView && <PostBody
                                  my={my}
                                  commentCount={data?.comment_count}
                                  liked={data?.like_auth_user.findIndex((elm) => elm.user_id == user.data.id) >= 0}
                                  view={data?.view_count}
                                  like={data?.like_count}
                                  id={data?.id}
                                  user={user}
                                  categoryId={data?.category?.id}
                                  setShowLike={() => setLikeClose(true)}
                                  big={true}
                                  likeClose={likeClose}
                                  showShare={showShare}
                                  setShowView={(e) => setShowView(e)}
                                  setShowShare={(e) => setShowShare(e)}
                                />}
                              </View>
                            }
                            {(data.description && D?.length > 0) && <View style={[styles.hover, { top: 10 }]}>
                              <Text style={[Styles.whiteSemiBold12]}>
                                {console.log(D)}
                                {D[index]}
                              </Text>
                            </View>}
                          </View>
                          : (
                            <View style={{ height: 570, marginTop: -30 }}>
                              <VidioComponent
                                active={active == index}
                                music={data.music_name}
                                item={item}
                                currentTime={currentTime[active]}
                                setCurrentTime={(e) => CurrentTimeSet(index, e)}
                                setDuration={(e) => setDuration(e)}
                                duration={duration}
                                onSeek={() => onSeek()}
                                ref={videoRef}
                                big={true}
                              />
                              {(data.description && D?.length > 0) && <View style={[styles.hover, { top: 10 }]}>
                                <Text style={[Styles.whiteSemiBold12]}>
                                  {console.log(D)}
                                  {D[index]}
                                </Text>
                              </View>}
                            </View>

                          )}
                      </View>
                    );
                  }}
                />
                {(data?.photo[active]?.video && true) &&
                  <View style={styles.slider}>
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
                  </View>
                }
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5,
                  }}>
                  {data?.photo?.length > 1 &&
                    data?.photo?.map((elm, i) => (
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
              </View>

              // <Slider
              //   setVertical={(e) => setVertical(e)}
              //   save={save} setActiveImage={(e) => setActiveImage(e)} description={data?.description} big={true} music_name={data?.music_name} single image={data?.photo[0].photo} photo={data?.photo} />
            }



          </View>
        }
        {(!loading && data?.background) &&
          <View style={{ justifyContent: 'center', height: '100%', marginTop: -60 }}>
            <View style={{ height: 570 }}>
              <Image style={{ width: '100%', height: 570, }} source={bagraund[data.background - 1]} />
              <View style={styles.textWrapper}>
                {data.font_size &&
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ color: data.color, fontFamily: data.font_family, fontSize: JSON.parse(data.font_size), textAlign: 'center' }}>{JSON.parse(data.description)}</Text>
                  </View>
                }
              </View>
              {!loading &&
                <View style={{ position: 'absolute', width: '100%', zIndex: 999, bottom: 10 }}>
                  {!showView && <PostBody
                    my={my}
                    commentCount={data?.comment_count}
                    liked={data?.like_auth_user.findIndex((elm) => elm.user_id == user.data.id) >= 0}
                    view={data?.view_count}
                    like={data?.like_count}
                    id={data?.id}
                    user={user}
                    setShowLike={() => setLikeClose(true)}
                    big={true}
                    likeClose={likeClose}
                    showShare={showShare}
                    setShowView={(e) => setShowView(e)}
                    setShowShare={(e) => setShowShare(e)}
                  />}
                </View>
              }
            </View>
          </View>
        }

        {showView && <ViewComponent
          id={data?.id}
          big={true}
          token={staticdata.token}
          close={(e) => setShowView(e)}
          selectedVidioId={data?.photo[activeImage]}
        />}
        {likeClose && <LikeList
          close={(e) => setLikeClose(false)}
          token={staticdata.token}
          id={data?.id}
        />}
        {showShare && <Share
          close={() => setShowShare(false)}
          postId={data?.id}
          open={showShare}
          big={true}
          user_id={user?.allData.data?.id}
        />}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  block: {
    borderColor: AppColors.White_Color,
    borderRadius: 10,
    position: 'relative',
  },
  header: {
    zIndex: 999,
    width: "100%",
  },
  text: {
    paddingHorizontal: 15,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    paddingVertical: 3,
    width: 'auto',
    alignItems: 'center',
    color: "white",
  },
  headerWrapper: {
    paddingHorizontal: 5,
    width: '100%',
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 10,
    marginTop: -15
  },
  textWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  img: {
    width: windowWidth,
    flexShrink: 0,
    justifyContent: 'center',
    position: 'relative',
  },
  pagination: {
    width: 6,
    height: 6,
    backgroundColor: '#CCD6DF',
    marginHorizontal: 5,
    borderRadius: 50,
  },
  hover: {
    paddingHorizontal: 15,
    width: '100%'
  },
  slider: {
    bottom: windowHeight - 640,
    position: 'absolute',
    zIndex: 99999,
    width: '100%',
    height: 10,
    // backgroundColor: 'red',
  }
});
