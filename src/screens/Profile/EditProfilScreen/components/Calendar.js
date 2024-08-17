import { Modal, StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCitysAction } from "../../../../store/action/action";
import { Calendar } from "react-native-calendars";

export const CalendarComponent = ({ visible, close, onPress }) => {
  const [searchCitys, setSearchCitys] = useState('');
  const [page, setPage] = useState(1);
  const staticdata = useSelector(st => st.static);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCitysAction({ search: searchCitys, page }, staticdata.token));
  }, [searchCitys, page]);


  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Calendar />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
  },
});
