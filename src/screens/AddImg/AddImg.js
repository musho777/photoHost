import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { CreatPostAction } from '../../store/action/action';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { Button } from '../../ui/Button';

export const AddImg = ({ navigation }) => {
  const [uri, setUri] = useState([]);
  const [description, setDescription] = useState('');
  const createPost = useSelector(st => st.createPost);
  const staticData = useSelector(st => st.static);

  const dispatch = useDispatch();

  const Camera = async () => {
    const cameraPermission = Platform.OS === 'android' && PERMISSIONS.ANDROID.CAMERA
    const photoLibraryPermission = Platform.OS === 'android' && PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    setUri([])
    setDescription('')
    const cameraPermissionStatus = await check(cameraPermission);
    const photoLibraryPermissionStatus = await check(photoLibraryPermission);
    if (cameraPermissionStatus !== RESULTS.GRANTED && photoLibraryPermissionStatus !== RESULTS.GRANTED) {
      request(cameraPermission);
      request(photoLibraryPermission);
    }
    else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple: true,
      }).then(image => {
        setUri(image);
      }).catch((error) => {
        console.log(error)
      })

    }


  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

      Camera()
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (createPost.status) {
      setUri([])
      setDescription('')
      navigation.navigate('Home');
    }
  }, [createPost.status]);

  const creatPost = () => {
    let form = new FormData();
    uri.length &&
      uri.forEach(el =>
        form.append('photos[]', {
          uri: el.path,
          type: 'image/jpg',
          name: 'photo.jpg',
        }),
      );
    description && form.append('description', description);

    dispatch(CreatPostAction(form, staticData.token));
  };

  const addPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      mediaType: 'photo'
    }).then(image => {
      let item = [...uri]
      item = item.concat(image);
      setUri(item);
    });
  }



  const delateFoto = index => {
    let item = [...uri];
    item.splice(index, 1);
    setUri(item);
  };
  return (
    <View>
      <HeaderWhiteTitle
        loading={createPost.loading}
        onCheck={() => creatPost()}
        check
        onPress={() => {
          navigation.navigate('Home')
        }}
        disabled={uri.length === 0}
        title={'Новая публикация'}
      />
      <View style={styles.wrapper}>
        {uri.map((elm, i) => {
          return (
            <View key={i} style={styles.imgWrapper}>
              <Image
                style={styles.img}
                source={{
                  uri: elm.path,
                }}
              />
              <TouchableOpacity
                onPress={() => delateFoto(i)}
                style={styles.close}>
                <Text style={{ color: 'red', fontSize: 20 }}>x</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.textWrapper}>
        <TextInput
          value={description}
          onChangeText={e => setDescription(e)}
          style={Styles.darkMedium14}
          placeholder="Добавить описание"
          placeholderTextColor={'#8C9CAB'}
        />
      </View>
      <View style={{ margin: 20 }}>
        <Button onPress={() => addPhoto()} title={'добавить фото'} width={120} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {
    height: 85,
    width: '22%',
    margin: 5,
    position: 'relative',
  },
  img: {
    height: 85,
    width: '100%',
    borderRadius: 10,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    marginHorizontal: 8,
  },
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderTopColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  close: {
    position: 'absolute',
    color: 'red',
    top: -15,
    right: 0,
  },
  addImgButton: {
    width: '22%',
    height: 85,
    borderWidth: 1
  }
});
