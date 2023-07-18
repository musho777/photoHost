import {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderWhiteTitle} from '../headers/HeaderWhiteTitle.';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';
import {CommentBlock} from './CommentBlock';
import {Input} from '../ui/Input';

export const Comments = ({visible,close}) => {
  const [showAnswrs, setShowAnswers] = useState(false);
  const [sendComment, setSendCommet] = useState('');
  return (
    <View>
      <Modal animationType="slide" visible={visible}>
        <HeaderWhiteTitle
          onPress={() => close()}
          title={'Комментарии'}
        />
        <View style={{paddingHorizontal: 15, height: '90%'}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: AppColors.PattenseBlue_Color,
              paddingBottom: 25,
            }}>
            <CommentBlock
              text={
                'Некий заголовок под фото, о чем то, что изображено на фото'
              }
              owner
              heshtegs={['#photo', '#nature', '#bike']}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginVertical: 20}}>
              <CommentBlock text={'Текст комментария☺'} />
              {showAnswrs && <CommentBlock ansswer text={'☺'} />}
              <TouchableOpacity onPress={() => setShowAnswers(!showAnswrs)}>
                <Text
                  style={[
                    Styles.balihaiMedium9,
                    {marginLeft: 70, marginTop: 20},
                  ]}>
                  {showAnswrs ? 'Скрыть ответы' : 'Смотреть ещё 1 ответа'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 40, height: 40, borderRadius: 50}}
                source={require('../assets/img/user.png')}
              />
              <Input
                send
                data={'sendComment'}
                onChange={e => setSendCommet(e)}
                width={'80%'}
                placeholder="Введите текст"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
