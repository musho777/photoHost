import {useEffect, useRef, useState} from 'react';
import {View, TextInput, StyleSheet, Keyboard} from 'react-native';
import {AppColors} from '../styles/AppColors';

export const ConfirmCode = ({code, clear}) => {
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const [data, setData] = useState({
    value: '',
    value1: '',
    value2: '',
    value3: '',
    value4: '',
  });
  useEffect(() => {
    if ((data.value, data.value1, data.value2, data.value3, data.value4)) {
      Keyboard.dismiss();
      let item =
        data.value + data.value1 + data.value2 + data.value3 + data.value4;
      code(item);
    }
  }, [data]);
  useEffect(() => {
    if (clear) {
      setData({
        value: '',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
      });
    }
  }, [clear]);
  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        style={styles.input}
        autoFocus
        value={data.value}
        ref={ref}
        keyboardType="numeric"
        onChangeText={e => {
          if (e !== '') {
            setData({...data, value: e[e.length - 1]});
            ref1.current.focus();
          }
        }}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            setData({...data, value: ''});
          }
        }}
      />
      <TextInput
        style={styles.input}
        ref={ref1}
        value={data.value1}
        keyboardType="numeric"
        onChangeText={e => {
          if (e !== '') {
            setData({...data, value1: e[e.length - 1]});
            ref2.current.focus();
          }
        }}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            setData({...data, value1: ''});
            if (data.value1 === '') {
              ref.current.focus();
            }
          }
        }}
      />
      <TextInput
        style={styles.input}
        ref={ref2}
        value={data.value2}
        keyboardType="numeric"
        onChangeText={e => {
          if (e !== '') {
            setData({...data, value2: e[e.length - 1]});
            ref3.current.focus();
          }
        }}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            setData({...data, value2: ''});
            if (data.value2 === '') {
              ref1.current.focus();
            }
          }
        }}
      />
      <TextInput
        style={styles.input}
        ref={ref3}
        value={data.value3}
        keyboardType="numeric"
        onChangeText={e => {
          if (e !== '') {
            setData({...data, value3: e[e.length - 1]});
            ref4.current.focus();
          }
        }}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            setData({...data, value3: ''});
            if (data.value3 === '') {
              ref2.current.focus();
            }
          }
        }}
      />
      <TextInput
        style={styles.input}
        ref={ref4}
        value={data.value4}
        keyboardType="numeric"
        onChangeText={e => {
          if (e !== '') {
            setData({...data, value4: e[e.length - 1]});
          }
        }}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            setData({...data, value4: ''});
            if (data.value4 === '') {
              ref3.current.focus();
            }
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 31,
    height: 44,
    borderColor: AppColors.PattenseBlue_Color,
    borderWidth: 2,
    marginVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    textAlign: 'center',
    color: AppColors.Matterhorn_Color,
    fontFamily: 'Montserrat-Medium',
  },
});
