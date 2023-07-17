import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
  } from 'react-native';
import { EditAvaterSvg } from '../../assets/svg/Svgs';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
export const EditProfilScreen = () =>{
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
          <Text style = {Styles.darkMedium14}>@big_fish</Text>
        </View>
        <View style = {styles.textWrapper}>
          <Text style = {Styles.darkMedium14}>Иван Смит</Text>
        </View>
        <View style = {styles.textWrapper}>
          <Text style = {Styles.balihaiMedium14}>Описание</Text>
        </View>
        <View style = {styles.textWrapper}>
          <Text style = {Styles.balihaiMedium14}>Контакты</Text>
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
    paddingVertical:20,
    borderBottomColor:AppColors.Solitude_Color,
    borderBottomWidth:1
  }
})