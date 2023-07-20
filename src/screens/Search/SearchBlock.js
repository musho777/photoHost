import {useEffect, useRef, useState} from 'react';
import {View, Modal, StyleSheet, TextInput} from 'react-native';
import {SearchInputSvg} from '../../assets/svg/Svgs';
import {AppColors} from '../../styles/AppColors';

export const SearchBlock = ({modalVisible}) => {
  const [data, setData] = useState('');
  const [focuse, setFocuse] = useState(false);
  const ref = useRef();
  useEffect(() => {}, []);
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.header}>
          <View style = {{marginBottom:10}}>
            <TextInput autoFocus style={styles.Input}  placeholder = 'Поиск'/>
            <View style = {styles.eye}>
              <SearchInputSvg />
            </View>
          </View>
        </View>
        <View style={styles.centeredView}></View>
      </Modal>
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
  centeredView: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 15,
    elevation: 1,
  },
  eye: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    height: '100%',
  },
});
