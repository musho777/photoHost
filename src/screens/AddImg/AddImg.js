import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

export const AddImg = ({navigation}) => {
  const [uri, setUri] = React.useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          navigation.navigate('Home')
          setUri(image.path);
        });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
});
