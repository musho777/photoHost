import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Empty } from "./component/empty";
import { Skeleton } from "../Skeleton";
import { ImageComponent } from "../Image/image";
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const Albom = ({ data, seved, my = false, loading, elm }) => {
  const navigation = useNavigation()
  const Loadingdata = ['', '', '', '']
  if (loading) {
    return <View activeOpacity={1} style={styles.block}>
      <View style={styles.albom}>
        {Loadingdata.map((elm, i) => {
          return <Skeleton
            key={i}
            width={windowWidth / 2 - 25}
            height={windowWidth / 2 - 25}
            style={{ borderRadius: 15 }}
          />
        })}
      </View >
    </View>
  }
  return (
    <TouchableOpacity activeOpacity={1} style={styles.block}>
      <ImageComponent
        onPress={() => {
          my ?
            navigation.navigate('SinglPageScreen', { data: seved ? elm.post : elm, my: my, seved: seved }) :
            navigation.push('SearchProfil', { screen: "SinglPageScreen", params: { data: seved ? elm.post : elm, my: my, seved: seved } })
        }}
        video={elm?.photo ? elm.photo[0].video : elm.post.photo[0].video}
        photo={elm?.photo ? elm?.photo[0]?.photo : elm?.post.photo[0]?.photo}
      />
      {data.length === 0 && !loading && <Empty seved={seved} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    margin: 5,
  },
});




