import { useState, useEffect } from 'react';
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Albom } from '../../components/Albom';

import { BlackListBlock } from '../../components/blackListBlock';
import { Post } from '../../components/post/Post';
import {
  AddBlackListAction,
  GetBlackListAction,
  GetMyBooksAction,
} from '../../store/action/action';
import { Styles } from '../../styles/Styles';

const windowWidth = Dimensions.get('window').width;

export const SavedPostScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const staticdata = useSelector(st => st.static);
  const books = useSelector(st => st.books);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [blackList, setBlackList] = useState([]);

  useEffect(() => {
    setData(books.data);
  }, [books.data]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(GetMyBooksAction(staticdata.token, 1));
    });
    return unsubscribe;
  }, [navigation]);

  // const renderItem = ({ item, index }) => {
  //   return (
  //     <TouchableOpacity>
  //       <Image
  //         style={styles.img}
  //         source={{
  //           uri: `https://chambaonline.pro/uploads/${item.post.photo[0].photo}`,
  //         }}
  //         key={index}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

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

const styles = StyleSheet.create({
  // img: {
  //   width: windowWidth / 2 - 37,
  //   height: windowWidth / 2 - 37,
  //   marginBottom: 4,
  //   borderRadius: 15,
  // },
});
