import { View, StyleSheet, TouchableOpacity, Dimensions, Text, FlatList } from 'react-native';
import { Empty } from "./component/empty";
import { Skeleton } from "../Skeleton";
import { ImageComponent } from "../Image/image";
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const Albom = ({ data, seved, my = false, loading, elm, lastItem }) => {
  const navigation = useNavigation()
  const Loadingdata = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

  const renderItem = ({ item }) => (
    <Skeleton
      width={windowWidth / 2 - 25}
      height={windowWidth / 2 - 25}
      style={{ borderRadius: 15, margin: 5 }}
    />
  );
  if (loading) {
    return <View activeOpacity={1} style={styles.block}>
      <View style={styles.albom}>
        <FlatList
          data={Loadingdata}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2} // This will make two items per row
        />
      </View >
    </View>
  }
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.block, lastItem && { marginBottom: 55 }]}>
      <ImageComponent
        onPress={() => {
          my ?
            navigation.navigate('SinglPageScreen', { data: seved ? elm.post : elm, my: my, seved: seved }) :
            navigation.push('SearchProfil', { screen: "SinglPageScreen", params: { data: seved ? elm.post : elm, my: false, seved: seved } })
        }}
        video={elm?.photo ? elm.photo[0]?.video : elm.post.photo[0]?.video}
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
  albom: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});




