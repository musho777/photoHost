import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Empty } from "./component/empty";
import { Skeleton } from "../Skeleton";
import { ImageComponent } from "../Image/image";

const windowWidth = Dimensions.get('window').width;

export const Albom = ({ data, seved, my = false, loading }) => {
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
      <View style={styles.albom}>
        {data.map((elm, i) => {
          return (
            <ImageComponent
              video={elm.photo ? elm.photo[0].video : elm.post.photo[0].video}
              photo={elm.photo ? elm?.photo[0]?.photo : elm?.post.photo[0]?.photo}
              data={seved ? elm.post : elm}
              my={my}
              key={i}
            />
          );
        })}
        {data.length === 0 && !loading && <Empty seved={seved} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    marginTop: 20,
    width: '100%',
    marginBottom: 10
  },
  albom: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 14,
  }
});




