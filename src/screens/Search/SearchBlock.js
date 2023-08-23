import { useEffect, useRef, useState } from 'react';
import { View, Modal, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInputSvg } from '../../assets/svg/Svgs';
import { FollowingsBlock } from '../../components/FollowingsBlock';
import { SearchAction } from '../../store/action/action';
import { clearSearchData } from '../../store/action/clearAction';
import { AppColors } from '../../styles/AppColors';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../../styles/Styles';


export const SearchBlock = ({ modalVisible, close }) => {
  const [data, setData] = useState('');
  const [noData, setNodata] = useState(false);
  const [focuse, setFocuse] = useState(false);
  const [page, setPage] = useState(1);
  const ref = useRef();
  const dispatch = useDispatch();
  const search = useSelector(st => st.search);
  const staticdata = useSelector(st => st.static);
  const navigation = useNavigation();
  const addDeleteFollow = useSelector((st) => st.addDeleteFollow)
  const [serchData, setSearchData] = useState([])

  useEffect(() => {
    setSearchData(search.data)
  }, [search.data])

  const sendData = () => {
    if (data) {
      dispatch(clearSearchData());
      dispatch(SearchAction({ search: data }, (url = 1), staticdata.token));
    } else {
      dispatch(clearSearchData());
      setNodata(false);
    }
  }

  useEffect(() => {
    if (search.nextPage !== null) {
      setPage(page + 1);
    }
    if (!serchData) {
      setNodata(true);
    }
  }, [search]);
  useEffect(() => {
    setSearchData([])
    const delayDebounceFn = setTimeout(() => {
      sendData()
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [data])
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <FollowingsBlock
          onPress={() => {
            navigation.navigate('SearchProfil', { id: item.id })
            setData('')
          }}
          key={item.id}
          name={item.name}
          username={item.nickname}
          img={item.avatar}
          type={item.follow_status_sender.length}
          userId={item.id}
          addClick={() => addDeletData(item.id)}
        />
      </View>
    );
  };

  const addDeletData = (id) => {
    let item = [...serchData]
    item.map((elm, i) => {
      if (elm.id === id) {
        if (elm.follow_status_sender.length) {
          elm.follow_status_sender = []
          return
        }
        else {
          elm.follow_status_sender = [{}]
          return
        }
      }
    })
    setSearchData(item)
  }

  return (
    <View style={styles.centeredView}>
      <View style={[styles.header, { marginBottom: 20 }]}>
        <View style={{ marginBottom: 10, width: '80%' }}>
          <TextInput
            onChangeText={e => setData(e)}
            value={data}
            autoFocus
            style={styles.Input}
            placeholder="Поиск"
          />
          <View style={styles.eye}>
            <SearchInputSvg />
          </View>
        </View>
        <TouchableOpacity onPress={() => {
          dispatch(clearSearchData())
          setData('')
          navigation.goBack()
        }
        } style={{ marginTop: 10, marginLeft: 10 }}>
          <Text style={Styles.darkMedium12} >отменить</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={search.loading}
          // onRefresh={() => {
          //   dispatch(clearSearchData());
          //   dispatch(
          //     SearchAction({search: data}, (url = page), staticdata.token),
          //   );
          // }}
          />
        }
        keyExtractor={item => item.id.toString()}
        data={serchData}
        enableEmptySections={true}
        ListEmptyComponent={() => {
          if (data) {
            return <Text style={[Styles.darkMedium14, { textAlign: 'center' }]}>не найдено</Text>;
          }
        }}
        renderItem={renderItem}
        onEndReached={() => {
          if (search.nextPage) {
            dispatch(SearchAction({ search: data }, page, staticdata.token));
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Input: {
    backgroundColor: AppColors.AliceBlue_Color,
    borderRadius: 50,
    padding: 6,
    paddingHorizontal: 20,
    color: AppColors.Blcak_Color,
    position: 'relative',
  },
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
  },
  eye: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    height: '100%',
  },
});
