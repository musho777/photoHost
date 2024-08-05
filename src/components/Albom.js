import { useNavigation } from "@react-navigation/native"
import { View, Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/Styles';
import { t } from './lang';
import { useSelector } from "react-redux";
import { StartSvg } from "../assets/svg/Svgs";

const windowWidth = Dimensions.get('window').width;

export const Albom = ({ data, seved }) => {
  const navigation = useNavigation()
  const mainData = useSelector(st => st.mainData);
  const user = useSelector((st) => st.userData)
  return (
    <TouchableOpacity activeOpacity={1} style={{ marginTop: 20, width: '100%' }}>
      <View
        style={styles.albom}>
        {data.map((elm, i) => {
          if (seved) {
            return (
              <TouchableOpacity activeOpacity={1} key={i} onPress={() => navigation.navigate('SinglPageScreen', {
                data: elm.post
              })}>
                {!elm.photo[0].video ?
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
                    <View style={styles.playerIcone}>
                      <StartSvg />
                    </View>
                    <Image
                      style={styles.img}
                      source={{
                        uri: `https://chambaonline.pro/uploads/${elm?.photo[0]?.photo}`,
                      }}
                    />
                  </View>
                }
              </TouchableOpacity>
            );
          }
          else {
            return (
              !elm.photo[0].video ?
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
                  <View style={styles.playerIcone}>
                    <StartSvg />
                  </View>
                  <Image
                    style={styles.img}
                    source={{
                      uri: `https://chambaonline.pro/uploads/${elm?.photo[0]?.photo}`,
                    }}
                  />
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
  playerIcone: {
    position: 'absolute',
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  albom: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 14,
  }
});
