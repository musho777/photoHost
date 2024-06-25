import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Styles } from '../../styles/Styles';
import { Albom } from '../../components/Albom';
import { BackArrow } from '../../assets/svg/Svgs';
import { Button } from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeleteFollowAction, AddDeletFollow, GetPostsAction, GetSinglPageAction } from '../../store/action/action';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { InfoBlock } from '../Profile/InfoBlock';
import { t } from '../../components/lang';

const { width } = Dimensions.get('window');


export const SearchProfil = ({ navigation, route }) => {
  const singlPage = useSelector(st => st.singlPage);
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getPosts);
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const mainData = useSelector(st => st.mainData);

  const [activeCard, setActiveCard] = useState(0)
  const [data, setData] = useState(['albom', ''])
  const handelChange = () => {
    setActiveCard(1);
    swiperRef.current.goToLastIndex();
  };
  const handelChangeFirst = () => {
    setActiveCard(0);
    swiperRef.current.goToFirstIndex();
  };

  useEffect(() => {
    dispatch(
      GetSinglPageAction(
        {
          user_id: route.params.id,
        },
        staticdata.token,
      ),
    );
    dispatch(GetPostsAction({ user_id: route.params.id }, staticdata.token, 1));
    setActiveCard(0)
  }, []);
  const sendMsg = () => {
    navigation.navigate('ChatScreen', { id: singlPage.data.id })
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  if (singlPage.loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={'#FFC24B'} />
    </View>
  }
  else {
    return (
      <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 15 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              let pages = page
              pages = page + 1
              setPage(pages)
              if (getPosts.nextPage) {
                dispatch(GetPostsAction({ user_id: route.params.id, }, staticdata.token, page));
              }
              // enableSomeButton();
            }
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginVertical: 25 }}>
            <BackArrow />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.img}
              source={{ uri: `https://chamba.digiluys.com/uploads/${singlPage.data.avatar}` }}
            />
            <View style={{ marginTop: 7, marginBottom: 15, alignItems: 'center' }}>
              <Text style={Styles.darkMedium16}>{singlPage.data.nickname}</Text>
              <Text style={Styles.balihaiRegular12}>@{singlPage.data.name}</Text>
            </View>
            {singlPage.data.description && (
              <Text style={Styles.darkRegular14}>{singlPage.data.description}</Text>
            )}
          </View>
          <View
            style={[
              { marginVertical: 20, paddingHorizontal: 15 },
              Styles.flexSpaceBetween,
            ]}>
            <View style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{singlPage.postCount}</Text>
              <Text style={Styles.balihaiRegular12}>{t(mainData.lang).Publications}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('FollowersScreen', { index: 0, id: singlPage.data.id })}
              style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{singlPage.followersCount}</Text>
              <Text style={Styles.balihaiRegular12}>{t(mainData.lang).Subscribers}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('FollowersScreen', { index: 1, id: singlPage.data.id })}
              style={{ alignItems: 'center' }}>
              <Text style={Styles.darkSemiBold16}>{singlPage.followerCount}</Text>
              {/* followerCount */}
              <Text style={Styles.balihaiRegular12}>{t(mainData.lang).Subscriptions}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              Styles.flexSpaceBetween,
              { paddingHorizontal: 15, marginVertical: 10 },
            ]}>
            {!singlPage.data?.follow_status_sender?.length ? <Button onPress={() => {
              dispatch(AddDeleteFollowAction({ user_id: singlPage.data.id }, staticdata.token))
              dispatch(AddDeletFollow(singlPage.data?.id))
            }} paddingV={10} title={t(mainData.lang).subscribe} width="48%" /> :
              <Button bg onPress={() => {
                dispatch(AddDeleteFollowAction({ user_id: singlPage.data.id }, staticdata.token))
                dispatch(AddDeletFollow(singlPage.data?.id))
              }} paddingV={10} title={t(mainData.lang).Unsubscribe} width="48%" />
            }
            <Button onPress={() => sendMsg()} bg paddingV={10} title={'Сообщение'} width="48%" />
          </View>
          {/* <Albom user data={getPosts.data} /> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text onPress={() => handelChangeFirst()} style={[
              Styles.balihaiMedium14,
              styles.textWrapper,
              activeCard == 0 && { borderColor: '#000', color: '#000' }
            ]}>{t(mainData.lang).Album}</Text>
            <Text onPress={() => handelChange()} style={[Styles.balihaiMedium14,
            styles.textWrapper,
            activeCard == 1 && { borderColor: '#000', color: '#000' }
            ]}>{t(mainData.lang).Information}</Text>
          </View>
          <SwiperFlatList
            index={0}
            ref={swiperRef}
            onChangeIndex={(index) => { setActiveCard(index.index) }}
          >
            {data.map((elm, i) => {
              return <View key={i} style={{ width: width - 30.1 }}>
                {elm === 'albom' ?
                  <Albom loading={getPosts.loading && page == 1} data={getPosts.data} /> :
                  <InfoBlock user={singlPage.data} />
                }
              </View>
            })}
          </SwiperFlatList>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  textWrapper: {
    width: '50%',
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#E7EEF5',

  }
});

