import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Text,
} from 'react-native';
import { AppColors } from '../../../styles/AppColors';
import { VidioComponent } from '../../../components/post/VidioComponent';
import { Styles } from '../../../styles/Styles';

const windowWidth = Dimensions.get('window').width;

export const Slider = ({ photo, music_name, big = false, description }) => {
  const [active, setActive] = useState(0);
  const [scroleEneble, setScrollEnabled] = useState(true)
  const [D, setD] = useState(description)

  const handleMomentumScrollEnd = (event) => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
      Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setActive(index);
  };

  useEffect(() => {
    let desc = description
    if (description && description[0] == '[') {
      desc = JSON.parse(description)
    }
    setD(desc)
  }, [description])

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEnabled={scroleEneble}
        data={photo}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item, index }) => {
          let height = (windowWidth * item.height) / item.width
          return (
            <View style={styles.img}>

              {!item.video ?
                <View>
                  <Image
                    style={[{ width: '100%', height: height }]}
                    source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }}
                    resizeMode="cover"
                  />
                  {description && <View style={styles.hover}>
                    {console.log(Array.isArray(D))}
                    <Text style={[Styles.whiteSemiBold12]}>
                      {Array.isArray(D) ? D[index] : D}
                    </Text>
                  </View>}
                </View>
                : (
                  <View>
                    {description && <View style={styles.hover}>
                      <Text style={[Styles.whiteSemiBold12]}>
                        {Array.isArray(D) ? D[index] : D}
                      </Text>
                    </View>}
                    <VidioComponent big={big} setResizeVidio={() => {
                      setSelectedVidio(item)
                      setResizeVidio(true)
                    }}
                      setScrollEnabled={(e) => setScrollEnabled(false)}
                      music={music_name}
                      item={item}
                    />
                  </View>

                )}
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 5,
        }}>
        {photo?.length > 1 &&
          photo?.map((elm, i) => (
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
    width: windowWidth,
    flexShrink: 0,
    justifyContent: 'center',
    position: 'relative',
  },
  pagination: {
    width: 6,
    height: 6,
    backgroundColor: '#CCD6DF',
    marginHorizontal: 5,
    borderRadius: 50,
  },
  hover: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 'auto',
    position: 'absolute',
    top: 3,
    left: 3,
  }
});
