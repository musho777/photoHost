import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/Styles';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

export const NotificationBlock = ({ description, avatar, name, photo, id }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() =>
      navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: id } })
    } style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
