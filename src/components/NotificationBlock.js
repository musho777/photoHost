import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { Styles } from '../styles/Styles';


const { width, height } = Dimensions.get('window');

export const NotificationBlock = ({ description, id, itemId, avatar, name, photo }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
      <Image
        style={styles.userImg}
        source={{
          uri: `https://chambaonline.pro/uploads/${avatar}`,
        }}
      />
      <View style={{ width: (width - 120), flexDirection: 'row', borderWidth: 0, alignItems: 'center' }}>
        <Text style={Styles.eslipesMedium13}>
          <Text style={Styles.darkMedium13}>{name}:</Text>
          {description}
        </Text>
      </View>
      <Image
        style={styles.userImg}
        source={{
          uri: `https://chambaonline.pro/uploads/${photo}`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
