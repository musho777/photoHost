import {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {AppColors} from '../styles/AppColors';

const windowWidth = Dimensions.get('window').width;
export const Slider = () => {
  const data = [{}, {}, {}];
  const [active, setActive] = useState(0);
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        data={data}
        onMomentumScrollEnd={event => {
          const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width),
          );
          setActive(index);
        }}
        renderItem={({item, index}) => {
          return (
            <View style={styles.img}>
              <Image
                style={[
                  {marginVertical: 10, width: '100%', height: '100%'},
                ]}
                source={require('../assets/img/1.png')}
                resizeMode={'cover'}
              />
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical:10,
        }}>
        {data.map((elm, i) => (
          <View
            key={i}
            style={[
              styles.pagination,
              i === active && {
                backgroundColor: AppColors.GoldenTainoi_Color,
                borderRadius: 50,
              },
            ]}></View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: windowWidth - 20,
    flexShrink: 0,
  },
  pagination: {
    width: 6,
    height: 6,
    backgroundColor: '#CCD6DF',
    marginHorizontal: 5,
    borderRadius: 50,
  },
});
