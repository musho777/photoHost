import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInputSvg } from '../../assets/svg/Svgs';
import { FollowingsBlock } from '../../components/FollowingsBlock';
import { SearchAction } from '../../store/action/action';
import { clearSearchData } from '../../store/action/clearAction';
import { AppColors } from '../../styles/AppColors';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';

export const SearchBlock = () => {
  const [data, setData] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const search = useSelector(st => st.search);
  const staticdata = useSelector(st => st.static);
  const navigation = useNavigation();
  const [serchData, setSearchData] = useState([])
  const mainData = useSelector(st => st.mainData);

  useEffect(() => {
    setSearchData(search.data)
  }, [search.data])

  const sendData = () => {
    if (data) {
      dispatch(clearSearchData());
      dispatch(SearchAction({ search: data }, (url = 1), staticdata.token));
    } else {
      dispatch(clearSearchData());
    }
  }

  useEffect(() => {
    if (search.nextPage !== null) {
      setPage(page + 1);
    }
  }, [search]);
  useEffect(() => {
    setSearchData([])

    const delayDebounceFn = setTimeout(() => {
      sendData()
      // setData(data)
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [data])
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <FollowingsBlock
          onPress={() => {
            navigation.navigate('SearchProfil', { id: item.id })
            // setData('')
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
        <View style={{ marginBottom: 10, width: '100%' }}>
          <TextInput
            onChangeText={e => setData(e)}
            value={data}
            autoFocus
            style={styles.Input}
            placeholder={t(mainData.lang).search}

          />
          <View style={styles.eye}>
            <SearchInputSvg />
          </View>
        </View>

      </View>
      {/* {!data && serchData.length == 0 && <Text style={Styles.darkMedium16}>Найдите друзей</Text>} */}

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
            return <Text style={[Styles.darkMedium14, { textAlign: 'center' }]}>{t(mainData.lang).Notfound}</Text>;
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
