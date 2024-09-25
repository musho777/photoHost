import { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Albom } from '../../components/Albom/Albom';
import { GetMyBooksAction, } from '../../store/action/action';
import { useIsFocused } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

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

  const isFocused = useIsFocused();
  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        navigation.goBack(); // Perform back action only if this is the active screen
        navigation.openDrawer()
        return true;
      }
      return false; // Let the default behavior happen if this screen isn't focused
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Cleanup the listener when the screen is not active
  }, [isFocused]);

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
          {books.data.map((elm, i) => {
            return <Albom key={i} data={books.data} seved elm={elm} />
          })}
        </View>
      </ScrollView>
    </View>
  );
};
