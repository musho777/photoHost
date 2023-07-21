import {useEffect, useRef, useState} from 'react';
import {View, Modal, StyleSheet, TextInput, Text} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {SearchInputSvg} from '../../assets/svg/Svgs';
import {FollowingsBlock} from '../../components/FollowingsBlock';
import {SearchAction} from '../../store/action/action';
import {clearSearchData} from '../../store/action/clearAction';
import {AppColors} from '../../styles/AppColors';

export const SearchBlock = ({modalVisible}) => {
  const [data, setData] = useState('');
  const [noData, setNodata] = useState(false);
  const [focuse, setFocuse] = useState(false);
  const [page, setPage] = useState(1);
  const ref = useRef();
  const dispatch = useDispatch();
  const search = useSelector(st => st.search);
  const staticdata = useSelector(st => st.static);

  useEffect(() => {
    if (data) {
      dispatch(clearSearchData());
      dispatch(SearchAction({search: data}, (url = 1), staticdata.token));
    } else {
      dispatch(clearSearchData());
      setNodata(false);
    }
  }, [data]);
  useEffect(() => {
    if (search.nextPage !== null) {
      setPage(page + 1);
    }
    if (!search.data) {
      setNodata(true);
    }
  }, [search]);
  const renderItem = ({item}) => {
    return (
      <View style={{marginHorizontal: 15}}>
        <FollowingsBlock
          key={item.id}
          name={item.name}
          username={item.nickname}
          img={item.avatar}
          type={item.follow_status_sender.length}
        />
      </View>
    );
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={[styles.header, {marginBottom: 20}]}>
          <View style={{marginBottom: 10}}>
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
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={search.loading}
              onRefresh={() => {
                dispatch(clearSearchData());
                dispatch(
                  SearchAction({search: data}, (url = page), staticdata.token),
                );
              }}
            />
          }
          data={search.data}
          enableEmptySections={true}
          ListEmptyComponent={() => {
            if (noData) {
              return <Text>no data</Text>;
            }
          }}
          renderItem={renderItem}
          onEndReached={() => {
            if (search.nextPage) {
              dispatch(SearchAction({search: data}, page, staticdata.token));
            }
          }}
        />
        {/* <View style={styles.centeredView}></View> */}
      </Modal>
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
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  },
  eye: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    height: '100%',
  },
});
