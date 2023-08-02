import {View, Dimensions, Image, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const Albom = ({data}) => {
  return (
    <View style={{marginTop: 20, flex: 1}}>
      <View
        style={[
          {
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        {data?.map((elm, i) => {
          return (
            <Image
              style={styles.img}
              source={{
                uri: `https://chamba.justcode.am/uploads/${elm.photo[0].photo}`,
              }}
              key={i}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: windowWidth / 2 - 17,
    height: windowWidth / 2 - 17,
    marginBottom: 4,
    borderRadius: 15,
  },
});
