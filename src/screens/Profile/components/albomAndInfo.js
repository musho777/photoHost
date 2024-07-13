import { Dimensions, StyleSheet, Text, View } from "react-native"
import { t } from '../../../components/lang';
import { useSelector } from "react-redux";
import SwiperFlatList from "react-native-swiper-flatlist";
import { Styles } from "../../../styles/Styles";
import { useRef } from "react";
import { Albom } from "../../../components/Albom";
import { InfoBlock } from "../InfoBlock";

const { width } = Dimensions.get('window');

export const AlbomAndInfo = ({ activeCard, setActiveCard }) => {
  const swiperRef = useRef(null);
  const mainData = useSelector(st => st.mainData);
  const getPosts = useSelector(st => st.getPosts);
  const user = useSelector(st => st.userData);

  const handelChange = () => {
    setActiveCard(1);
    swiperRef.current.goToLastIndex();
  };
  const handelChangeFirst = () => {
    setActiveCard(0);
    swiperRef.current.goToFirstIndex();
  };

  const data = ['albom', '']

  return <View>
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
        return <View key={i} style={{ width: width - 32 }}>
          {elm === 'albom' ?
            <View>
              <Albom loading={getPosts.loading} data1={getPosts.data1} data={getPosts.data} />
            </View> :
            <InfoBlock user={user.data} />
          }
        </View>
      })}
    </SwiperFlatList>
  </View>
}

const styles1 = {
  pillButton: {
    backgroundColor: 'white',
  },
  pillActive: {
    backgroundColor: 'yellow',
  },
  pillLabel: {
    color: 'gray',
  },
  activeLabel: {
    color: 'white',
  },
};

const styles = StyleSheet.create({
  textWrapper: {
    width: '50%',
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#E7EEF5',
  },
});
