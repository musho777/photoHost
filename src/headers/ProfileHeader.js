import {useState} from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { MenuSvg2 } from '../assets/svg/Svgs';
import { Styles } from '../styles/Styles';
export const ProflHeader = () =>{
    return <SafeAreaView  style={{paddingHorizontal: 15}}>
        <TouchableOpacity style={{marginVertical: 25}}>
          <MenuSvg2 />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={styles.img}
            source={require('../assets/img/user.png')}
          />
          <View style={{marginVertical: 15, alignItems: 'center'}}>
            <Text style={Styles.darkMedium16}>Иван Смит</Text>
            <Text style={Styles.balihaiRegular12}>@ivan_smith</Text>
          </View>
          <Text style={Styles.darkRegular14}>Student from Guinea 🇬🇳</Text>
        </View>
        <View style={[{marginVertical: 20}, Styles.flexSpaceBetween]}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Text style={Styles.darkSemiBold16}>24</Text>
            <Text style={Styles.balihaiRegular12}>Публикаций</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Text style={Styles.darkSemiBold16}>230</Text>
            <Text style={Styles.balihaiRegular12}>Подписчиков</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Text style={Styles.darkSemiBold16}>348</Text>
            <Text style={Styles.balihaiRegular12}>Подписок</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    img: {
      width: 80,
      height: 80,
      borderRadius: 50,
    },
  });
  