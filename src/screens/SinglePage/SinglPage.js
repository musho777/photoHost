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
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { Api, EndViewPost, } from '../../store/action/action';
import { ViewComponent } from '../../components/statistic/ViewComponent';
import { AppColors } from '../../styles/AppColors';
import { LikeList } from '../../components/LikeList';
import { Share } from '../../components/share';
import { Post } from '../../components/post/Post';
import { Styles } from '../../styles/Styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


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


  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
    setActiveImage(index)
  };

  // useEffect(() => {
  //   let desc = data?.description
  //   if (data?.description && data?.description[0] == '[') {
  //     desc = JSON.parse(data?.description)
  //   }
  //   setD(desc)
  // }, [data?.description])

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

  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#000000');
      StatusBar.setTranslucent = true;
      return () => {
        StatusBar.setTranslucent = true;
        StatusBar.setBackgroundColor('transparent');
      };
    }, [])
  );



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
      {/* <StatusBar barStyle={"light-content"} backgroundColor={"#000"} translucent={false} /> */}
      <ActivityIndicator color="#FFC24B" />
    </View>
  }
  return (
    <SafeAreaView style={[{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', height: '100%', }, Styles.statusBar]}>
      <ScrollView contentContainerStyle={{ marginTop: (windowWidth - 570 / 2) }}>
        <Post
          data={data}
          setShowLike={() => setLikeClose(true)}
          setShowView={() => setShowView(true)}
          addToblack={(e) => AddToBack(e)}
          deletData={(e) => deletData(e)}
          setSelectidId={(id) => console.log(id)}
          setShowShare={(e) => setShowShare(e)}
          setSelectedVidioId={(e) => setSelectedVidioId(e)}
          big={true}
        />
      </ScrollView>
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
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
});
