import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
  } from 'react-native';
import { ArrowSvg } from '../../assets/svg/Svgs';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
export const ParametrScreen = ({navigation}) =>{
    return <View >
      <TouchableOpacity onPress={()=>navigation.navigate('ChangePasswordScreen')} style = { [Styles.flexSpaceBetween,{paddingVertical:20,borderBottomWidth:1,borderBottomColor:AppColors.Solitude_Color,paddingRight:15}]}>
        <Text style = {[Styles.darkSemiBold14,{paddingHorizontal:15}]}>Изменить пароль</Text>
        <ArrowSvg />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('ChangeMailScreen')} style = { [Styles.flexSpaceBetween,{paddingVertical:20,borderBottomWidth:1,borderBottomColor:AppColors.Solitude_Color,paddingRight:15}]}>
        <View style = {Styles.flexAlignItems}>
          <Text style = {[Styles.darkSemiBold14,{paddingHorizontal:15}]}>Изменить почту</Text>
          <Text style = {[Styles.balihaiMedium13,]}>big_fish@mail.ru</Text>
        </View>
        <ArrowSvg />
      </TouchableOpacity>
    </View>
}