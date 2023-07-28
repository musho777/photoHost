import React, {useEffect,useState} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import { HeaderWhiteTitle } from '../../headers/HeaderWhiteTitle.';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';

export const AddImg = ({navigation}) => {
  const [uri, setUri] = useState([]);
  const [description,setDescription] = useState('')
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple: true,
      }).then(image => {
        console.log(image);
        // navigation.navigate('Home')
        setUri(image);
      });
    });
    return unsubscribe;
  }, [navigation]);

  const creatPost = () =>{

  }
  return (
    <View>
      <HeaderWhiteTitle
        // loading={changeProfil.loading||changeAvatar.loading}
        onCheck={() => creatPost()}
        check
        onPress={() => navigation.goBack()}
        title={'Редактировать профиль'}
      />
      <View style = {styles.wrapper}>
        {uri.map((elm, i) => {
          return (
            <Image
              key={i}
              style={styles.img}
              source={{
                uri: elm.path,
              }}
            />
          );
        })}
      </View>
      <View style={styles.textWrapper}>
        <TextInput
          value={description}
          onChangeText={e => setDescription(e)}
          style={Styles.darkMedium14}
          placeholder = 'Добавить описание'
          placeholderTextColor={'#8C9CAB'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 85,
    width: '22%',
    borderRadius: 10,
    margin:5
  },
  wrapper:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom:20,
    marginHorizontal:8,
  },
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderTopColor:AppColors.Solitude_Color,
    borderBottomWidth: 1,
    borderTopWidth:1,
  },
});
