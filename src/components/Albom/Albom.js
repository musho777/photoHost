import { View, StyleSheet } from 'react-native';
import { Empty } from "./component/empty";
import { ImageComponent } from "../Image/image";
import { useNavigation } from '@react-navigation/native';


export const Albom = ({ id, data, seved, my = false, elm, lastItem, index }) => {
  const navigation = useNavigation()
  return (
    <View activeOpacity={1} style={[styles.block, lastItem && { marginBottom: 55 },
    index % 2 != 0 && { marginLeft: 5 }
    ]}>
      <ImageComponent
        onPress={() => {
          my ?
            navigation.navigate('SinglPageScreen', { id: id }) :
            navigation.push('SearchProfil', { screen: "SinglPageScreen", params: { id: id } })
        }}
        background={elm?.background}
        color={elm.color}
        text={elm.description && JSON.parse(elm.description)}
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




