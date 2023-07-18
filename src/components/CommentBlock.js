import {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {CommentLikeSvg} from '../assets/svg/Svgs';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';

export const CommentBlock = ({img, text, heshtegs, name, owner, ansswer}) => {
  const [liked, setLiked] = useState(false);
  return (
    <View
      style={[
        Styles.flexAlignItems,
        {alignItems: 'flex-start', marginTop: 20},
        ansswer && {marginLeft: 30},
      ]}>
      <View style={owner && styles.imgBlock}>
        <Image
          style={ansswer ? styles.answerImg : styles.img}
          source={require('../assets/img/user.png')}
        />
      </View>
      <View style={[{marginLeft: 10}, owner ? {width: '80%'} : {width: '75%'}]}>
        <Text style={Styles.eslipesMedium13}>
          <Text style={Styles.darkMedium13}>alexander: </Text>
          {text}
        </Text>
        <View style={Styles.flexAlignItems}>
          {heshtegs?.map((elm, i) => (
            <Text key={i} style={[Styles.neonMedium13, {marginRight: 5}]}>
              {elm}
            </Text>
          ))}
        </View>
        {!owner && (
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{marginRight: 30}}>4 ч.</Text>
            <TouchableOpacity>
              <Text>Ответить</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {!owner && (
        <View style={[styles.like]}>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <CommentLikeSvg liked={liked} />
          </TouchableOpacity>
          <Text
            style={[
              [Styles.eslipesMedium10, {textAlign: 'center', marginTop: -5}],
            ]}>
            10
          </Text>
        </View>
      )}
      {ansswer && <Text>sss</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  imgBlock: {
    borderRadius: 60,
    height: 55,
    width: 55,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppColors.Mustard_Color,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  answerImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  like: {
    position: 'absolute',
    right: 0,
    top: -7,
    alignItems: 'centerd',
    justifyContent: 'center',
  },
});
