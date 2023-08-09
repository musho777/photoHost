import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Text
} from 'react-native';
import { SearchInputSvg } from '../../assets/svg/Svgs';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { SearchBlock } from './SearchBlock';

const itemWidth = Dimensions.get('window').width / 3.3;

export const SearchScreen = ({navigation}) => {
  const [img, setImg] = useState([{}, {}, {}, {}, {}, {}, {}, {},{},{},{},{},{},{},{},{},{}]);
  const [focuse,setFocuse] = useState(false)
  return (
    <SafeAreaView >
      <SearchBlock />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Input: {
    backgroundColor: AppColors.AliceBlue_Color,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical:10,
    color: AppColors.Blcak_Color,
    position: 'relative',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center'
  },
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
    paddingHorizontal: 12.6,
    marginVertical: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: Dimensions.get('window').width - itemWidth * 3-29,
    columnGap: Dimensions.get('window').width - itemWidth * 3-29,
    marginBottom:90
  },
});
