import {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Eye, SearchInputSvg, SendImgSvg, VoiceSvg} from '../assets/svg/Svgs';
import {AppColors} from '../styles/AppColors';
import {Styles} from '../styles/Styles';

export const Input = ({
  marginBottom,
  marginTop,
  marginV,
  marginH,
  width = '100%',
  placeholder,
  error,
  data,
  pass = false,
  onChange,
  search,
  msg,
}) => {
  const [currentData, setCurrentData] = useState(data);
  const [securyty, setSecuryty] = useState(pass);
  return (
    <View
      style={{
        width: width,
        marginBottom: marginBottom,
        marginTop: marginTop,
        marginVertical: marginV,
        marginHorizontal: marginH,
      }}>
      <TextInput
        style={[styles.Input, {paddingRight: pass? 45 : 0},{paddingRight: msg? 80 : 0}]}
        placeholder={placeholder}
        placeholderTextColor={AppColors.BaliHai_Color}
        secureTextEntry={pass && securyty}
        onChangeText={e => onChange(e)}
      />
      {pass && (
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setSecuryty(!securyty)}>
          <Eye />
        </TouchableOpacity>
      )}
      {search && (
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setSecuryty(!securyty)}>
          <SearchInputSvg />
        </TouchableOpacity>
      )}
      {msg && (
        <View style = {[Styles.flexAlignItems,styles.eye,{height:'100%'}]}>
          <TouchableOpacity >
            <VoiceSvg />
          </TouchableOpacity>
          <TouchableOpacity style = {{marginLeft:10}}>
            <SendImgSvg />
          </TouchableOpacity>
        </View>
      )}
      {!msg  &&<Text style={[[Styles.tomatoMedium10, {marginBottom: 5}]]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  Input: {
    backgroundColor: AppColors.AliceBlue_Color,
    borderRadius: 50,
    padding: 7,
    paddingHorizontal: 20,
    color: AppColors.Blcak_Color,
    position: 'relative',
  },
  eye: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    height: '70%',
  },
});
