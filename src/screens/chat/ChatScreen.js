import {useRef, useCallback, useMemo, useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {BackArrow, FotoSvg} from '../../assets/svg/Svgs';
import {MenuSvg} from '../../assets/svg/TabBarSvg';
import {BootomModal} from '../../components/BootomSheet';
import {MsgBlock} from '../../components/MsgBlock';
import { GetSinglePageChatAction } from '../../store/action/action';
import {Styles} from '../../styles/Styles';
import {Input} from '../../ui/Input';
export const ChatScreen = ({navigation, route}) => {
  const dispatch = useDispatch()
  const bottomSheetRef = useRef(null);
  const staticdata = useSelector(st => st.static);
  const getSinglePageChat = useSelector(st=>st.getSinglePageChat)
  const snapPoints = useMemo(() => ['18%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const [data, setData] = useState([
    {from: true, msg: 'Привет, пойдешь в бар?', date: '12:20'},
    {from: false, msg: 'Привет, после 6 свободен', date: '12:20'},
    {from: true, msg: 'На 8 столик, буду ждать', date: '12:20'},
    {from: false, msg: 'Окей', date: '12:20'},
  ]);
  const [sendMSg, setSendMsg] = useState('');

  useEffect(()=>{
    dispatch(GetSinglePageChatAction({
      receiver_id:route.params.id
    },staticdata.token))
  },[])
  console.log(getSinglePageChat.data,89)
  return (
    <SafeAreaView style={{paddingHorizontal: 15, height: '100%'}}>
      <View style={[Styles.flexSpaceBetween, {marginVertical: 20,marginBottom:30}]}>
        <View style={Styles.flexAlignItems}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <View style={[{marginHorizontal: 20}, Styles.flexAlignItems]}>
            <Image
              style={styles.img}
              source={{uri: `https://chamba.justcode.am/uploads/${getSinglePageChat.data.avatar}`}}
            />
            <View style={{marginHorizontal: 20}}>
              <Text style={Styles.darkMedium14}>{getSinglePageChat.data.name}</Text>
              <Text style={Styles.balihaiMedium13}>@{getSinglePageChat.data.nickname}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => handlePresentModalPress()}>
          <MenuSvg />
        </TouchableOpacity>
      </View>
      <FlatList
      showsVerticalScrollIndicator = {false}
        data={data}
        renderItem={({item}) => {
          return (
            <View>
              <MsgBlock msg={item.msg} from={item.from} date={item.data} />
            </View>
          );
        }}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 10,
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <FotoSvg />
          </TouchableOpacity>
          <View></View>
          <Input
            msg
            placeholder={'Введите текст'}
            data={sendMSg}
            onChange={e => setSendMsg(e)}
            width={'83%'}
          />
        </View>
      </View>
      <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity style={{marginBottom: 20, marginTop: 20}}>
            <Text style={Styles.darkRegular14}>Удалить переписку</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom: 20}}>
            <Text style={Styles.darkRegular14}>В черный список</Text>
          </TouchableOpacity>
        </View>
      </BootomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 36,
    height: 36,
    borderRadius:50
  },
});
