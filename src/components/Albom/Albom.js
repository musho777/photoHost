import { View, StyleSheet, TouchableOpacity, Dimensions, Text, FlatList, ActivityIndicator } from 'react-native';
import { Empty } from "./component/empty";
import { Skeleton } from "../Skeleton";
import { ImageComponent } from "../Image/image";
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const Albom = ({ data, seved, my = false, elm, lastItem, index }) => {
  const navigation = useNavigation()
  return (
    <View activeOpacity={1} style={[styles.block, lastItem && { marginBottom: 55 },
    index % 2 != 0 && { marginLeft: 5 }
    ]}>
      <ImageComponent
        onPress={() => {
          my ?
            navigation.navigate('SinglPageScreen', { data: seved ? elm.post : elm, my: my, seved: seved }) :
            navigation.push('SearchProfil', { screen: "SinglPageScreen", params: { data: seved ? elm.post : elm, my: false, seved: seved } })
        }}
        background={elm.background}
        color={elm.color}
        text={JSON.parse(elm.description)}
        fontFamily={elm.font_family}
        video={elm?.photo ? elm.photo[0]?.video : elm.post.photo[0]?.video}
        photo={elm?.photo ? elm?.photo[0]?.photo : elm?.post.photo[0]?.photo}
      />
      {data.length === 0 && !loading && <Empty seved={seved} />}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginBottom: 5,
  },
  albom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});




