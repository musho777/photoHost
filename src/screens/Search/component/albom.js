import { useNavigation } from "@react-navigation/native"

import { View, Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { t } from '../../../components/lang';
import { useSelector } from "react-redux";
import { Styles } from "../../../styles/Styles";
const windowWidth = Dimensions.get('window').width;

export const Albom = ({ data, user }) => {
  const navigation = useNavigation()
  const mainData = useSelector(st => st.mainData);
  return (
    <View style={{ marginTop: 20, width: '99%' }}>
      <View
        style={[
          {
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 14,
          },
        ]}>
        {data.map((elm, i) => {
          return (
            !elm.photo[0]?.photo?.includes('.mp4') ?
              <TouchableOpacity key={i} onPress={() => navigation.navigate('SinglPageScreen', { id: elm.id, isBook: elm.auth_user_book?.length > 0, photo: elm?.photo[0]?.photo })}>
                <Image
                  style={styles.img}
                  source={{
                    uri: `https://chambaonline.pro/uploads/${elm?.photo[0]?.photo}`,
                  }}
                />
              </TouchableOpacity>
              :
              <TouchableOpacity key={i} onPress={() => navigation.navigate('SinglPageScreen', { id: elm.id, isBook: elm.auth_user_book?.length > 0, photo: elm?.photo[0]?.photo })}>
                {
                  <Image
                    style={[styles.img]}
                    resizeMode="cover"
                    source={require('../../../assets/img/default-video-image.webp')} />
                }
              </TouchableOpacity>
          );
        })}
        {data.length === 0 &&
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {user ?
              <Text style={Styles.darkMedium16}>{t(mainData.lang).noPublications}</Text> :
              <Text style={[Styles.darkMedium16, { textAlign: 'center' }]}>{t(mainData.lang).noPublications}</Text>
            }
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: (windowWidth / 2 - 25),
    height: (windowWidth / 2 - 25),
    borderRadius: 15,
  },
});
