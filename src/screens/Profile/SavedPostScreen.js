import { useState, useEffect, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Albom } from '../../components/Albom/Albom';
import { GetMyBooksAction, } from '../../store/action/action';
import { useFocusEffect } from '@react-navigation/native';


export const SavedPostScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const books = useSelector(st => st.books);
  const [page, setPage] = useState(1);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(GetMyBooksAction(staticdata.token, page));
    });
    return unsubscribe;
  }, [navigation, page]);



  const handleLoadMore = () => {
    if (books.nextPage) {
      const nextPage = page + 1;
      dispatch(GetMyBooksAction(staticdata.token, nextPage));
      setPage(nextPage);
    }
  };
  const renderItem = ({ item }) => {
    return <Albom id={item.post_id} data={books.data} seved elm={item} />
  };

  return (
    <View style={{ marginTop: 10, alignItems: 'center' }}>
      {books.loading ?
        <ActivityIndicator color='#FFC24B' /> :
        <FlatList
          data={books.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Set the number of columns
          contentContainerStyle={{ paddingHorizontal: 16 }} // Adjust horizontal padding as needed
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      }
    </View>
  );
};
