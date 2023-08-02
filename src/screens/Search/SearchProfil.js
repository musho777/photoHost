import {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {Styles} from '../../styles/Styles';
import {Albom} from '../../components/Albom';
import {BackArrow} from '../../assets/svg/Svgs';
import {Button} from '../../ui/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AddDeleteFollowAction, AddDeletFollow, GetPostsAction, GetSinglePageChatAction, GetSinglPageAction} from '../../store/action/action';

export const SearchProfil = ({navigation, route}) => {
  const singlPage = useSelector(st => st.singlPage);
  const staticdata = useSelector(st => st.static);
  const getPosts = useSelector(st => st.getPosts);
  const [page,setPage] = useState(1)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetSinglPageAction(
        {
          user_id: route.params.id,
        },
        staticdata.token,
      ),
    );
    dispatch(GetPostsAction({user_id: route.params.id}, staticdata.token, 1));

  }, []);

  const sendMsg = () =>{
    navigation.navigate('ChatScreen',{id:singlPage.data.id})
    // dispatch(GetSinglePageChatAction())
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


  if(singlPage.loading){
    return <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large" color={'#FFC24B'} />
    </View>
  }
  else {
      return (
        <View style={{flex: 1, marginTop: 10, paddingHorizontal: 15}}>
          <ScrollView 
            contentContainerStyle={{flexGrow: 1}} 
            showsVerticalScrollIndicator = {false}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                if(getPosts.nextPage){
                  let pages = page
                  pages=page+1 
                  dispatch(GetPostsAction({user_id: user.data.id}, staticdata.token, page));
                  setPage(page)
                }
                // enableSomeButton();
              }
            }}
            >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginVertical: 25}}>
              <BackArrow />
            </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={styles.img}
                source={{uri: `https://chamba.justcode.am/uploads/${singlPage.data.avatar}`}}
              />
              <View style={{marginTop: 7, marginBottom: 15, alignItems: 'center'}}>
                <Text style={Styles.darkMedium16}>{singlPage.data.name}</Text>
                <Text style={Styles.balihaiRegular12}>@{singlPage.data.nickname}</Text>
              </View>
              {singlPage.data.description && (
                <Text style={Styles.darkRegular14}>{singlPage.data.description}</Text>
              )}
            </View>
            <View
              style={[
                {marginVertical: 20, paddingHorizontal: 15},
                Styles.flexSpaceBetween,
              ]}>
              <View style={{alignItems: 'center'}}>
                <Text style={Styles.darkSemiBold16}>24</Text>
                <Text style={Styles.balihaiRegular12}>Публикаций</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('FollowersScreen', {index: 0,id:singlPage.data.id})}
                style={{alignItems: 'center'}}>
                <Text style={Styles.darkSemiBold16}>230</Text>
                <Text style={Styles.balihaiRegular12}>Подписчиков</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('FollowersScreen', {index: 1})}
                style={{alignItems: 'center'}}>
                <Text style={Styles.darkSemiBold16}>348</Text>
                <Text style={Styles.balihaiRegular12}>Подписок</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                Styles.flexSpaceBetween,
                {paddingHorizontal: 15, marginVertical: 10},
              ]}>
               {!singlPage.data?.follow_status_sender?.length ? <Button onPress={()=>{
                dispatch(AddDeleteFollowAction({user_id:singlPage.data.id},staticdata.token))
                dispatch(AddDeletFollow(singlPage.data?.id))
               }} paddingV={10} title={'Подписаться'} width="48%" />:
               <Button bg onPress={()=>{
                dispatch(AddDeleteFollowAction({user_id:singlPage.data.id},staticdata.token))
                dispatch(AddDeletFollow(singlPage.data?.id))
               }} paddingV={10} title={'Отписаться'} width="48%" />
               }
              <Button onPress={()=>sendMsg()} bg paddingV={10} title={'Сообщение'} width="48%" />
            </View>
            <Albom user  data = {getPosts.data}/>
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
});
