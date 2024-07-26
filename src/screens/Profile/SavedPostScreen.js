import { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Albom } from '../../components/Albom';
import { GetMyBooksAction, } from '../../store/action/action';

const windowWidth = Dimensions.get('window').width;

export const SavedPostScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const books = useSelector(st => st.books);
  const [page, setPage] = useState(1);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(GetMyBooksAction(staticdata.token, 1));
    });
    return unsubscribe;
  }, [navigation]);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View style={{ marginTop: 10, alignItems: 'center' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            if (books.nextPage) {
              let pages = page + 1;
              dispatch(GetMyBooksAction(staticdata.token, pages));
              setPage(pages);
            }
          }
        }}>
        <View style={{ width: windowWidth - 32, flexDirection: "column", }}>
          <Albom seved data={books.data} />
        </View>
      </ScrollView>
    </View>
  );
};
