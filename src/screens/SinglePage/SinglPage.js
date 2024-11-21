import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { AddPostViewCount, Api, DelatePostAction, } from '../../store/action/action';
import { ViewComponent } from '../../components/statistic/ViewComponent';
import { LikeList } from '../../components/LikeList';
import { Share } from '../../components/share';
import { Post } from '../../components/post/Post';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommmentModal } from '../../components/comment/CommmentModal';


const windowWidth = Dimensions.get('window').width;


export const SinglPageScreen = ({ route }) => {
  const user = useSelector((st) => st.userData)
  const staticdata = useSelector(st => st.static);
  const [showView, setShowView] = useState(null)
  const [likeClose, setLikeClose] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [horiznotal, setHoriznotal] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [commentData, setCommentData] = useState({ parentId: "", categoryId: "" })
  const dispatch = useDispatch()

  const [showShare, setShowShare] = useState(false)

  const insets = useSafeAreaInsets();
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setTranslucent = true;
      return () => {
        StatusBar.setTranslucent = true;
      };
    }, [data?.id])
  );


  useEffect(() => {
    dispatch(AddPostViewCount({ post_id: data?.id }, staticdata.token))
  }, [staticdata.token, data])


  const deletData = useCallback((post_id) => {
    dispatch(DelatePostAction({ post_id }, staticdata.token))
    navigation.goBack()
  }, [dispatch, staticdata.token]);


  useEffect(() => {
    if (route.params?.description?.length) {
      setData({ ...data, description: route.params.description })
    }
  }, [route.params.description])


  useEffect(() => {
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
  }, [route.params.id])

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 40 }}>
      <ActivityIndicator color="#FFC24B" />
    </View>
  }
  return (
    <SafeAreaView style={[{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', height: '100%', }]}>
      <ScrollView contentContainerStyle={{ marginTop: 30 }}>
        <Post
          data={data}
          setHoriznotal={(e) => setHoriznotal(e)}
          setShowLike={() => setLikeClose(true)}
          setShowView={() => setShowView(true)}
          addToblack={(e) => AddToBack(e)}
          deletData={(e) => deletData(e)}
          setSelectidId={(id) => console.log(id)}
          setShowShare={(e) => setShowShare(e)}
          setCommentData={(e) => setCommentData(e)}
          setShowComment={() => setShowComment(true)}
          big={true}
          horiznotal={horiznotal}
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
      {showComment && <CommmentModal
        CommentCount={(add) => {
          if (add) {
            setData({ ...data, comment_count: data.comment_count + 1 })
          }
          else {
            setData({ ...data, comment_count: data.comment_count - 1 })
          }
        }}
        close={() => setShowComment(false)}
        commentData={commentData}
      />}
    </SafeAreaView>
  );
};
