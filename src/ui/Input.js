import { useState, forwardRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Eye,
  SearchInputSvg,
  SendMsgSvg,
  SendSvg,
} from '../assets/svg/Svgs';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';

export const Input = forwardRef(
  ({
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
    send,
    disable,
    onFocus,
    onBlur,
    autoFocus,
    sendMsg,
    value,
    sendCom,
    pdR
  }, ref) => {
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
          ref={ref}
          autoFocus={autoFocus}
          editable={disable}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            styles.Input,
            { paddingRight: pass ? 45 : 7 },
            { paddingRight: msg ? 80 : 7 },
            { paddingRight: send ? 50 : 7 },
            { paddingRight: pdR },
          ]}
          placeholder={placeholder}
          placeholderTextColor={AppColors.BaliHai_Color}
          secureTextEntry={pass && securyty}
          onChangeText={e => onChange(e)}
          value={value ? value : data}
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
          <View style={[Styles.flexAlignItems, styles.eye, { height: '100%' }]}>

            {data.length > 0 &&
              <TouchableOpacity onPress={sendMsg} style={{ marginLeft: 10 }}>
                <SendMsgSvg />
              </TouchableOpacity>
            }
          </View>
        )}
        {send && (
          <View style={[Styles.flexAlignItems, styles.eye, { height: '100%' }]}>
            <TouchableOpacity onPress={sendCom}>
              <SendSvg />
            </TouchableOpacity>
          </View>
        )}
        {!msg && !send && (
          <Text style={[[Styles.tomatoMedium10, { marginBottom: 5 }]]}>
            {error}
          </Text>
        )}
      </View>
    );
  });

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
