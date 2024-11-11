import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/Styles';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

export const NotificationBlock = ({ description, avatar, name, photo, id }) => {

  function canParseJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return <Text style={[Styles.darkMedium13, { color: JSON.parse(name)?.color?.title, fontFamily: JSON.parse(name)?.font }]}>{JSON.parse(name)?.name}:</Text>

    } catch (error) {
      return <Text style={[Styles.darkMedium13]}> {name}:</Text >
    }
  }

  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        if (photo?.length)
          navigation.navigate('SinglPageScreen', { id: photo[0].post_id })
      }}
      style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
      <TouchableOpacity onPress={(e) => {
        e.preventDefault()
        e.stopPropagation()
        navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: id } })
      }}>
        <Image
          style={styles.userImg}
          source={{
            uri: `https://chambaonline.pro/uploads/${avatar}`,
          }}
        />
      </TouchableOpacity>
      <View style={{ width: (width - 120), alignItems: 'center', flexDirection: "row", borderWidth: 0, }}>
        <Text style={Styles.eslipesMedium13}>
          {canParseJSON(name)}
          {description}
        </Text>
      </View>
      {photo?.length > 0 ?
        <Image
          style={styles.userImg}
          source={{ uri: `https://chambaonline.pro/uploads/${photo[0].photo}` }} />
        :
        <View
          style={styles.userImg}
        ></View>
      }
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
