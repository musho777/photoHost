import { useCallback, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SearchAction } from '../../store/action/action';
import { clearSearchData } from '../../store/action/clearAction';
import { Styles } from '../../styles/Styles';
import { t } from '../../components/lang';
import { SearchItem } from './component/searchItem';
import _ from 'lodash';
import { SearchInput } from './component/SearchInput';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SearchBlock = () => {
  const [data, setData] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const search = useSelector(st => st.search);
  const staticdata = useSelector(st => st.static);
  const mainData = useSelector(st => st.mainData);

  const insets = useSafeAreaInsets();


  const debouncedSearchData = useCallback(
    _.debounce((e) => {
      dispatch(clearSearchData())
      if (e) {
        dispatch(SearchAction({ search: e }, 1, staticdata.token));
      }
    }, 500),
    []
  );


  const handleSearchInput = (e) => {
    const formattedText = e.replace(/^\s+/, '');
    setData(formattedText);
    debouncedSearchData(formattedText);
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
    <SafeAreaView style={insets.top ? { marginTop: insets.top } : Styles.statusBar}>
      <View style={styles.centeredView}>
        <SearchInput
          data={data}
          handleSearchInput={(e) => handleSearchInput(e)}
        />
        <FlatList
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
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
