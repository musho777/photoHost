import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, SafeAreaView } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInputSvg } from '../../assets/svg/Svgs';
import { SearchAction } from '../../store/action/action';
import { clearSearchData } from '../../store/action/clearAction';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';
import { SearchItem } from './component/searchItem';
import { useNavigation } from '@react-navigation/native';

export const SearchBlock = () => {
  const [data, setData] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const search = useSelector(st => st.search);
  const staticdata = useSelector(st => st.static);
  const [serchData, setSearchData] = useState([])
  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()

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
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [data])
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <SearchItem
          key={item.id}
          data={item}
        />
      </View>
    );
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setData('')
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView >
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

        <FlatList
          refreshControl={
            <RefreshControl refreshing={search.loading} />
          }
          keyExtractor={item => item.id.toString()}
          data={serchData}
          enableEmptySections={true}
          ListEmptyComponent={() => {
            if (data != '' && !search.loading) {
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
    </SafeAreaView>
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
