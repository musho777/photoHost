import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { EditAvaterSvg } from '../../assets/svg/Svgs';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
export const EditProfilScreen = () =>{
  const [username,setUsername] = useState({value:'@big_fish'})
  const [name,setName] = useState({value:'@Иван Смит'})
  const [discription,setDiscription] = useState({value:''})
  const [contact,setContact] = useState({value:''})

    return <View>
        <View style = {{ alignItems:'center',marginBottom:40}}>
          <View style >
            <Image style = {styles.img} source={require('../../assets/img/user.png')} />
            <TouchableOpacity style = {styles.edit}>
              <EditAvaterSvg />
            </TouchableOpacity>
          </View>
        </View>
        <View style = {styles.textWrapper}>
          <TextInput value={username.value} onChange = {(e)=>setUsername({...username,value:e})} style = {Styles.darkMedium14} />
        </View>
        <View style = {styles.textWrapper}>
          <TextInput value={name.value} onChange = {(e)=>setName({...name,value:e})}  style = {Styles.darkMedium14} />
        </View>
        <View style = {styles.textWrapper}>
          <TextInput placeholder='Описание' placeholderTextColor={'#8C9CAB'} value={discription.value} onChange = {(e)=>setDiscription({...discription,value:e})}  style = {Styles.balihaiMedium14}></TextInput>
        </View>
        <View style = {styles.textWrapper}>
          <TextInput  placeholder='Описание' placeholderTextColor={'#8C9CAB'} value={contact.value} onChange = {(e)=>setContact({...contact,value:e})} style = {Styles.balihaiMedium14}></TextInput>
        </View>
    </View>
}

const styles = StyleSheet.create({
  img:{
    width:80,
    height:80
  },
  imgWrapper:{
    width:80,
    height:80,
    position:'relative'
  },
  edit:{
    position:'absolute',
    bottom:-5,
    right:0,
  },
  textWrapper:{
    paddingHorizontal:15,
    paddingVertical:10,
    borderBottomColor:AppColors.Solitude_Color,
    borderBottomWidth:1
  }
})