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
    require('../../assets/img/fon1.png'),
    require('../../assets/img/fon2.jpg'),
    require('../../assets/img/fon3.jpg'),
    require('../../assets/img/fon4.jpg'),
    require('../../assets/img/fon5.jpg'),
  ]


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
                <Text style={{ color: data.color, fontFamily: data.font_family, fontSize: JSON.parse(data.font_size) }}>{JSON.parse(data.description)}</Text>
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
