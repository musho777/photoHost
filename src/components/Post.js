import {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Touchable,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {Comment, Heart, MenuSvg, Share, ViewSvg} from '../assets/svg/TabBarSvg';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';
import {BootomModal} from './BootomSheet';
import { Comments } from './Comment';
import {Slider} from './Slider';

const windowWidth = Dimensions.get('window').width;



export const Post = ({userImg,userName,description,like,commentCount,view,photo}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const [comment,setComment] = useState(false)
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
              <Text style={Styles.darkSemiBold14}>{userName}</Text>
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
              <TouchableOpacity>
                <Heart />
              </TouchableOpacity>
              <Text style={[Styles.darkMedium14, {marginLeft: 5}]}>{like}</Text>
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
            <TouchableOpacity style = {{marginBottom:20,marginTop:20}}>
              <Text style = {Styles.darkRegular14}>В закладки</Text>
            </TouchableOpacity>
            <TouchableOpacity  style = {{marginBottom:20}}>
              <Text style = {Styles.darkRegular14}>Подписаться</Text>
            </TouchableOpacity>
            <TouchableOpacity  style = {{marginBottom:20}}>
              <Text style = {Styles.darkRegular14}>В чёрный список</Text>
            </TouchableOpacity>
          </View>
        </BootomModal>
      </View>
      <Comments visible={comment} close = {()=>setComment(false)}/>
    </Shadow>
  );
};
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
