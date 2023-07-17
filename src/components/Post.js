import {useCallback, useMemo, useRef} from 'react';
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
import {Slider} from './Slider';

const windowWidth = Dimensions.get('window').width;
export const Post = ({userImg}) => {
  const data = [{}, {}, {}];
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  return (
    <Shadow
      style={{width: '100%', marginBottom: 20, borderRadius: 10}}
      startColor={'#00000010'}>
      <View style={styles.block}>
        <View style={[Styles.flexSpaceBetween, {padding: 15}]}>
          <View style={Styles.flexAlignItems}>
            <Image style={styles.userImg} source={userImg} />
            <View>
              <Text style={Styles.darkMedium14}>alexander</Text>
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
            Некий заголовок под фото и еще пара слов
          </Text>
        </View>
        <Slider />
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
              <Text style={[Styles.darkMedium14, {marginLeft: 5}]}>262</Text>
            </View>
            <View style={[Styles.flexAlignItems, {marginRight: 15}]}>
              <TouchableOpacity>
                <Comment />
              </TouchableOpacity>
              <Text style={[Styles.darkMedium14, {marginLeft: 5}]}>24</Text>
            </View>
            <View style={[Styles.flexAlignItems, {marginRight: 15}]}>
              <TouchableOpacity>
                <Share />
              </TouchableOpacity>
              <Text style={[Styles.darkMedium14, {marginLeft: 5}]}>12</Text>
            </View>
          </View>
          <View>
            <View style={Styles.flexAlignItems}>
              <ViewSvg />
              <Text style={[Styles.balihaiRegular14, {marginLeft: 5}]}>
                564
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
  },
  img: {
    height: 300,
    width: windowWidth,
  },
  pagination: {},
});
