import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {} from 'react-native-svg';
import {Input} from '../../ui/Input';

const itemWidth = Dimensions.get('window').width / 3.3;

export const SearchScreen = ({navigation}) => {
  const [data, setData] = useState('');
  const [img, setImg] = useState([{}, {}, {}, {}, {}, {}, {}, {},{},{},{},{},{},{},{},{},{}]);
  return (
    <SafeAreaView >
      <View style={styles.header}>
        <Input
          data={data}
          onChange={e => setData(e)}
          search
          placeholder={'Поиск'}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator = {false}>
        <View style={styles.imgWrapper}>
          {img.map((elm, i) => (
            <TouchableOpacity key={i} onPress={()=>navigation.navigate('InterestingScreen')}>
              <Image
                resizeMode={'cover'}
                style={styles.img}
                source={require('../../assets/img/2.png')}></Image>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 15,
    elevation: 1,
  },
  img: {
    height: itemWidth,
    width: itemWidth,
    borderRadius: 5,
  },
  imgWrapper: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: Dimensions.get('window').width - itemWidth * 3-27.4,
    columnGap: Dimensions.get('window').width - itemWidth * 3-27.4,
    marginBottom:90
  },
});
