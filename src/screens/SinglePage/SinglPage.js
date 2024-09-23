import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import { Slider } from './components/slider';
import { Header } from './components/Hedaer';
import { PostBody } from '../../components/postBody';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { AddPostViewCount, EndViewPost } from '../../store/action/action';
import { ViewComponent } from '../../components/statistic/ViewComponent';
import { AppColors } from '../../styles/AppColors';
import { LikeList } from '../../components/LikeList';
import { Share } from '../../components/share';

export const SinglPageScreen = ({ route, navigation }) => {
  const user = useSelector((st) => st.userData)
  const localSinglPage = useSelector((st) => st.localSinglPage)
  let data = localSinglPage.data
  const staticdata = useSelector(st => st.static);
  const my = route.params.my
  const dispatch = useDispatch()
  const [showView, setShowView] = useState(null)
  const [likeClose, setLikeClose] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const [showShare, setShowShare] = useState(false)

  const End = async (id) => {
    dispatch(EndViewPost({ post_id: id }, staticdata.token))
  }


  console.log(localSinglPage.data.comment_count)

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
      <View style={styles.header}>
        <Header activeImage={activeImage} big={true} data={data} navigation={navigation} my={my} />
      </View>
      <Slider setActiveImage={(e) => setActiveImage(e)} description={data.description} big={true} music_name={data.music_name} single image={data?.photo[0].photo} photo={data?.photo} />
      <View style={{ position: 'absolute', bottom: 15, width: '100%', zIndex: 999 }}>
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
      {showView && <ViewComponent
        id={data.id}
        big={true}
        token={staticdata.token}
        close={(e) => setShowView(e)}
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
    width: "100%"
  },
  text: {
    paddingHorizontal: 15,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    paddingVertical: 3,
    width: 'auto',
    alignItems: 'center',
    color: "white",
  }
});
