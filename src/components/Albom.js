import { useNavigation } from "@react-navigation/native"

import { View, Dimensions, Image, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/Styles';

const windowWidth = Dimensions.get('window').width;

export const Albom = ({ data, user, loading, seved }) => {
  const navigation = useNavigation()
  if (loading) {
    return <View style={Styles.loading}>
      <ActivityIndicator size="large" color="#FFC24B" />
    </View>
  }
  return (
    <View style={{ marginTop: 20, width: '98%' }}>
      <View
        style={[
          {
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
          },
        ]}>
        {data?.map((elm, i) => {
          if (seved) {
            return (
              <TouchableOpacity key={i} onPress={() => navigation.navigate('SinglPageScreen', { id: elm.post?.photo[0]?.post_id })}>
                <Image
                  style={[styles.img, {
                    width: windowWidth / 2 - 25,
                    height: windowWidth / 2 - 25,
                    margin: 5
                  }]}
                  source={{
                    uri: `https://chamba.justcode.am/uploads/${elm.post.photo[0].photo}`,
                  }}
                />
              </TouchableOpacity>
            );
          }
          else {
            return (
              <TouchableOpacity key={i} onPress={() => navigation.navigate('SinglPageScreen', { id: elm.id })}>
                <Image
                  style={styles.img}
                  source={{
                    uri: `https://chamba.justcode.am/uploads/${elm.photo[0].photo}`,
                  }}
                />
              </TouchableOpacity>
            );
          }
        })}
        {data.length === 0 &&
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {user ?
              <Text style={Styles.darkMedium16}>нет публикаций</Text> :
              <Text style={[Styles.darkMedium16, { textAlign: 'center' }]}>{seved ? 'Список закладок пуст' : 'нет публикаций'}</Text>
            }
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: windowWidth / 2 - 25,
    height: windowWidth / 2 - 25,
    marginBottom: 4,
    borderRadius: 15,
  },
});
