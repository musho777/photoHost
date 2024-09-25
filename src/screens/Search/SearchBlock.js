import { useCallback, useState } from 'react';
import { View, StyleSheet, TextInput, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInputSvg } from '../../assets/svg/Svgs';
import { SearchAction } from '../../store/action/action';
import { clearSearchData } from '../../store/action/clearAction';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';
import { SearchItem } from './component/searchItem';
import _ from 'lodash';

export const SearchBlock = () => {
  const [data, setData] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const search = useSelector(st => st.search);
  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);

  const debouncedSearchData = useCallback(
    _.debounce((e) => {
      dispatch(clearSearchData())
      if (e != '') {
        dispatch(SearchAction({ search: e }, 1, staticdata.token));
      }
    }, 500),
    []
  );
  const handleSearchInput = (e) => {
    setData(e);
    debouncedSearchData(e);
  };


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


  return (
    <SafeAreaView >
      <View style={styles.centeredView}>
        <View style={[styles.header, { marginBottom: 20 }]}>
          <View style={{ marginBottom: 10, width: '100%' }}>
            <TextInput
              onChangeText={handleSearchInput}
              value={data}
              autoFocus
              style={styles.Input}
              placeholder={t(mainData.lang).search}
              placeholderTextColor={'black'}
            />
            <View style={styles.eye}>
              <SearchInputSvg />
            </View>
          </View>
        </View>


        <FlatList
          refreshControl={<RefreshControl refreshing={search.loading} />}
          keyExtractor={item => item.id.toString()}
          data={search.data}
          enableEmptySections={true}
          style={{ width: '100%' }}
          ListEmptyComponent={() => {
            if (search.loading) {
              return <ActivityIndicator color="#FFC24B" />
            }
            else if (data != '' && !search.loading) {
              return <Text style={[Styles.darkMedium14, { textAlign: 'center' }]}>{t(mainData.lang).Notfound}</Text>;
            }
          }}
          renderItem={renderItem}
          onEndReached={() => {
            if (search.nextPage) {
              let p = page + 1
              setPage(p);
              dispatch(SearchAction({ search: data }, p, staticdata.token));
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
