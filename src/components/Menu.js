import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Modal,
  SafeAreaView,
} from 'react-native';
import { BackArrow } from '../assets/svg/Svgs';
import { Styles } from '../styles/Styles';

export const Menu = ({visible,close}) => {
  return (
    <SafeAreaView>
      <Modal 
            animationType="slide" 
            visible={visible}
            transparent={true}
        >
        <TouchableOpacity  activeOpacity={1} onPress = {()=>close()} style = {{backgroundColor:"rgba(0,0,0,0.5)"}}>
            <View style = {styles.menu}>
                <TouchableOpacity  onPress = {()=>close()}  style = {{marginBottom:10,marginTop:20}}>
                    <BackArrow />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {[Styles.darkRegular16,{marginTop:30}]}>Редактировать профиль</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {[Styles.darkRegular16,{marginTop:30}]}>Параметры аккаунта</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {[Styles.darkRegular16,{marginTop:30}]}>Черный список</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {[Styles.darkRegular16,{marginTop:30}]}>Выйти</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    menu:{
        height:'100%',
        width:'73%',
        borderTopEndRadius:30,
        borderBottomEndRadius:30,
        backgroundColor:'#FFF',
        padding:20
    },
    goPremium:{
        position:'absolute',
        bottom:110,
        justifyContent:'center',
        alignItems:'center',
        left: 0,
        right: 0,
    }
})