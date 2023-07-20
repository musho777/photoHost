import {
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { ArrowSvg } from '../../assets/svg/Svgs';
import { ClearEmailChange } from '../../store/action/clearAction';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
export const ParametrScreen = ({navigation}) =>{
  const user = useSelector(st => st.userData);
  const dispatch = useDispatch()
    return <View >
      <TouchableOpacity onPress={()=>navigation.navigate('ChangePasswordScreen')} style = { [Styles.flexSpaceBetween,{paddingVertical:20,borderBottomWidth:1,borderBottomColor:AppColors.Solitude_Color,paddingRight:15}]}>
        <Text style = {[Styles.darkSemiBold14,{paddingHorizontal:15}]}>Изменить пароль</Text>
        <ArrowSvg />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        dispatch(ClearEmailChange())
        navigation.navigate('ChangeMailFirtScreen')
        }} style = { [Styles.flexSpaceBetween,{paddingVertical:20,borderBottomWidth:1,borderBottomColor:AppColors.Solitude_Color,paddingRight:15}]}>
        <View style = {Styles.flexAlignItems}>
          <Text style = {[Styles.darkSemiBold14,{paddingHorizontal:15}]}>Изменить почту</Text>
          <Text style = {[Styles.balihaiMedium13,]}>{user.email}</Text>
        </View>
        <ArrowSvg />
      </TouchableOpacity>
    </View>
}