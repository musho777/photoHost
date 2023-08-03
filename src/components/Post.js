import {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import { useDispatch, useSelector } from 'react-redux';
import { CheckMarkUserSvg, NotLineSvg } from '../assets/svg/Svgs';
import {Comment, Heart, MenuSvg, Share, ViewSvg} from '../assets/svg/TabBarSvg';
import { AddBlackListAction, AddInBookAction, LikePostAction } from '../store/action/action';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';
import {BootomModal} from './BootomSheet';
import { Comments } from './Comment';
import {Slider} from './Slider';

const windowWidth = Dimensions.get('window').width;



export const Post = ({userImg,userName,description,like,commentCount,view,photo,liked,id,star,userId,addToblack,isBook}) => {
  const [likedCount,setLikedCount] = useState(+like)
  const [isLiked,setIsLiked] = useState(liked)

  const staticdata = useSelector(st => st.static);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const handlePresentModalPress = useCallback(() => {bottomSheetRef.current?.present();}, []);
  const [comment,setComment] = useState(false)
  const [book,setBook] = useState(isBook)
  const dispatch = useDispatch()
  const LikePost = () =>{
    if(isLiked){
      setLikedCount(likedCount-1)
    }
    else {
      setLikedCount(likedCount+1)
    }
    setIsLiked(!isLiked)
    dispatch(LikePostAction({
      'post_id':id
    },
    staticdata.token
    ))
  }


  const addToBlackList = () =>{
    addToblack(userId)
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({'user_id':userId},staticdata.token))
  }


  const addToBook = () =>{
    // let item =  [...book]
    // item.push()
    bottomSheetRef.current?.close();
    dispatch(AddInBookAction({'post_id':id},staticdata.token))
    setBook(!book)
  }

  return (
    <Shadow
      style={{width: '100%', marginBottom: 20, borderRadius: 10}}
      startColor={'#00000010'}>
      <View style={styles.block}>
        <View style={[Styles.flexSpaceBetween, {padding: 15}]}>
          <View style={Styles.flexAlignItems}>
            <Image style={styles.userImg}
            source={{uri: `https://chamba.justcode.am/uploads/${userImg}`}}/>
            <View>
              <View style = {Styles.flexAlignItems}>
                <Text Text style={[Styles.darkSemiBold14,{marginRight:5}]}>{userName}</Text>
                {star>0 && <CheckMarkUserSvg />}
              </View>
              <Text style={Styles.balihaiMedium9}>3 часа назад</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handlePresentModalPress()}
            style={{marginTop: -5,paddingLeft:15}}>
            <MenuSvg />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text style={Styles.eslipesMedium13}>
            {description}
          </Text>
        </View>
        <Slider photo = {photo} />
        <View
          style={[
            {paddingHorizontal: 15, marginBottom: 15},
            Styles.flexSpaceBetween,
          ]}>
          <View style={Styles.flexAlignItems}>
            <View style={[Styles.flexAlignItems, {marginRight: 15}]}>
              <TouchableOpacity onPress={()=>{LikePost()}}>
                {isLiked ?<Heart />:<NotLineSvg />}
              </TouchableOpacity>
              <Text style={[Styles.darkMedium14, {marginLeft: 5}]}>{likedCount}</Text>
            </View>
            <View style={[Styles.flexAlignItems, {marginRight: 15}]}>
              <TouchableOpacity onPress={()=>setComment(true)}>
                <Comment />
              </TouchableOpacity>
              <Text style={[Styles.darkMedium14, {marginLeft: 5}]}>{commentCount}</Text>
            </View>
          </View>
          <View>
            <View style={Styles.flexAlignItems}>
              <ViewSvg />
              <Text style={[Styles.balihaiRegular14, {marginLeft: 5}]}>
                {view}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{position: 'absolute'}}>
        <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
          <View style={{paddingHorizontal: 20}}>
            <TouchableOpacity style = {{marginBottom:20,marginTop:20}} onPress = {()=>addToBook()}>
              <Text style = {Styles.darkRegular14}>{book ?'Удалить из закладок':'В закладки'}</Text>
            </TouchableOpacity>
            <TouchableOpacity  style = {{marginBottom:20}}>
              <Text style = {Styles.darkRegular14}>Подписаться</Text>
            </TouchableOpacity>
            <TouchableOpacity  style = {{marginBottom:20}} onPress = {()=>addToBlackList()}>
              <Text style = {Styles.darkRegular14}>В чёрный список</Text>
            </TouchableOpacity>
          </View>
        </BootomModal>
      </View>
      <Comments visible={comment} close = {()=>setComment(false)}/>
    </Shadow>
  );
};
// AddInBook
const styles = StyleSheet.create({
  block: {
    shadowColor: '#7E9DB5',
    borderColor: AppColors.White_Color,
    borderRadius: 10,
  },
  userImg: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius:50,
  },
  img: {
    height: 300,
    width: windowWidth,
  },
  pagination: {},
});
