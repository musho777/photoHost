import { useNavigation } from "@react-navigation/native"

import { View, Dimensions, Image, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/Styles';
import { t } from './lang';
import { useSelector } from "react-redux";
import Video from 'react-native-video';
import { useState } from "react";
const windowWidth = Dimensions.get('window').width;

export const Albom = ({ data, seved }) => {
  const navigation = useNavigation()
  const mainData = useSelector(st => st.mainData);
  const [isloading, setLoading] = useState(true)
  const user = useSelector((st) => st.userData)
  return (
    <TouchableOpacity activeOpacity={1} style={{ marginTop: 20, width: '100%' }}>
      <View
        style={[
          {
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 14,
          },
        ]}>
        {data.map((elm, i) => {
          if (seved) {
            return (
              <TouchableOpacity activeOpacity={1} key={i} onPress={() => navigation.navigate('SinglPageScreen', {
                data: elm.post
              })}>
                {!elm.post?.photo[0]?.photo.includes('.mov') ?

                  <Image
                    style={[styles.img, {
                      width: windowWidth / 2 - 25,
                      height: windowWidth / 2 - 25,
                    }]}
                    source={{
                      uri: `https://chambaonline.pro/uploads/${elm.post?.photo[0]?.photo}`,
                    }}
                  /> :
                  <View>
                    {
                      isloading && <ActivityIndicator size="large" color="#FFC24B" />
                    }
                    <Video
                      paused={true}
                      onLoad={(data) => setLoading(false)}
                      style={styles.img}
                      source={{ uri: `https://chambaonline.pro/uploads/${elm.post?.photo[0]?.photo}` }}
                      resizeMode={'cover'}
                    />
                  </View>
                }
              </TouchableOpacity>
            );
          }
          else {
            return (
              !elm.photo[0]?.photo?.includes('.mp4') ?
                <TouchableOpacity activeOpacity={1} key={i} onPress={() => navigation.navigate('SinglPageScreen', {
                  data: elm,
                  my: true
                })}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: `https://chambaonline.pro/uploads/${elm?.photo[0]?.photo}`,
                    }}
                  />
                </TouchableOpacity> :
                <TouchableOpacity activeOpacity={1} key={i} onPress={() => navigation.navigate('SinglPageScreen', {
                  data: elm,
                  my: true
                })}>
                  {
                    <Image
                      style={[styles.img]}
                      // style={[{ width: '100%', aspectRatio: aspectRatio ? aspectRatio : 1, position: 'absolute' }]}
                      resizeMode="cover"
                      source={require('../assets/img/default-video-image.webp')} />
                  }
                  {/* <Video
                    // controls={true}
                    // repeat={true}
                    paused={true}
                    onLoad={(data) => {
                      setLoading(false);
                    }}
                    style={styles.img}
                    source={{ uri: `https://chambaonline.pro/uploads/${elm.photo[0]?.photo}` }}
                    resizeMode={'cover'}
                  /> */}
                </TouchableOpacity>
            );
          }
        })}
        {data.length === 0 &&
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {user ?
              <Text style={Styles.darkMedium16}>{t(mainData.lang).noPublications}</Text> :
              <Text style={[Styles.darkMedium16, { textAlign: 'center' }]}>{seved ? t(mainData.lang).Bookmarklistisempty : t(mainData.lang).noPublications}</Text>
            }
          </View>
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: (windowWidth / 2 - 25),
    height: (windowWidth / 2 - 25),
    borderRadius: 15,
  },
});
