import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
} from 'react-native';
import { Slider } from './components/slider';
import { Header } from './components/Hedaer';
import { PostBody } from '../../components/postBody';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { AddPostViewCount, EndViewPost, LocalSinglImage } from '../../store/action/action';
import { ViewComponent } from '../../components/statistic/ViewComponent';
import { AppColors } from '../../styles/AppColors';
import { LikeList } from '../../components/LikeList';
import { Share } from '../../components/share';
import { HeaderInfo } from '../../components/post/postHeader/component/headerInfro';

export const SinglPageScreen = ({ route, navigation }) => {
  const user = useSelector((st) => st.userData)
  const localSinglPage = useSelector((st) => st.localSinglPage)
  let data = localSinglPage.data
  const staticdata = useSelector(st => st.static);
  const my = route.params.my
  const save = route.params.seved
  const post = route.params.data
  const dispatch = useDispatch()
  const [showView, setShowView] = useState(null)
  const [likeClose, setLikeClose] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedVidioId, setSelectedVidioId] = useState(null)

  const [vertical, setVertical] = useState(false)


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

  // const bagraund = [
  //   require('../../assets/img/fon/1.jpg'),
  //   require('../../assets/img/fon/2.jpg'),
  //   require('../../assets/img/fon/3.jpg'),
  //   require('../../assets/img/fon/4.jpg'),
  //   require('../../assets/img/fon/6.jpg'),
  // ]


  const [showShare, setShowShare] = useState(false)
  const End = async (id) => {
    dispatch(EndViewPost({ post_id: id }, staticdata.token))
  }

  useEffect(() => {
    setLoading(true)
    dispatch(LocalSinglImage(post))
  }, [])

  useEffect(() => {
    if (data) {
      setLoading(false)
    }
  }, [data])


  useFocusEffect(
    useCallback(() => {
      dispatch(AddPostViewCount({ post_id: data.id }, staticdata.token))
      return () => {
        End(data.id)
      };
    }, [])
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {!loading && <View style={styles.header}>
        <Header activeImage={activeImage} big={true} data={data} navigation={navigation} my={my} />
        {save && <View style={styles.headerWrapper}>
          <HeaderInfo
            id={data.user.id}
            userImg={data.user.avatar}
            data={data.created_at}
            user={user}
            userId={data.user.id}
            star={data.user.star}
            userName={data.user.name}
          />
        </View>}
      </View>}

      {(!loading && !data.background) &&
        <View style={{ height: '100%', justifyContent: 'center', }}>
          <Slider
            setVertical={(e) => setVertical(e)}
            save={save} setActiveImage={(e) => setActiveImage(e)} description={data.description} big={true} music_name={data.music_name} single image={data?.photo[0].photo} photo={data?.photo} />
          {!loading &&
            <View style={{ position: 'absolute', width: '100%', zIndex: 999, bottom: vertical ? '9%' : '20%' }}>
              {!showView && <PostBody
                my={my}
                commentCount={data.comment_count}
                liked={data.like_auth_user.findIndex((elm) => elm.user_id == user.data.id) >= 0}
                view={data.view_count}
                like={data.like_count}
                id={data.id}
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
      }
      {(!loading && data.background) &&
        <View style={{ height: '100%', justifyContent: 'center' }}>
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
              <View style={{ position: 'absolute', width: '100%', zIndex: 999, bottom: 0 }}>
                {!showView && <PostBody
                  my={my}
                  commentCount={data.comment_count}
                  liked={data.like_auth_user.findIndex((elm) => elm.user_id == user.data.id) >= 0}
                  view={data.view_count}
                  like={data.like_count}
                  id={data.id}
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
        id={data.id}
        big={true}
        token={staticdata.token}
        close={(e) => setShowView(e)}
        selectedVidioId={data?.photo[activeImage]}
      />}
      {likeClose && <LikeList
        close={(e) => setLikeClose(false)}
        token={staticdata.token}
        id={data.id}
      />}
      {showShare && <Share
        close={() => setShowShare(false)}
        postId={data.id}
        open={showShare}
        big={true}
        user_id={user?.allData.data?.id}
      />}
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
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : 0,
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
});
