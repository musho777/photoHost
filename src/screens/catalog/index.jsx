import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../styles/Styles"
import { CatalogItem } from "../../components/catalogItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChangeCatalog, ClearChangeCatalog, GetCatalogAction, ShowPopUpLocal } from "../../store/action/action"
import { useNavigation } from "@react-navigation/native"
import { Skeleton } from "../../components/Skeleton"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const Catalog = () => {
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets();
  const getCatalog = useSelector((st) => st.getCatalog)
  const userData = useSelector((st) => st.userData)
  const [selected, setSelected] = useState([])
  const navigation = useNavigation()
  const staticdata = useSelector(st => st.static);
  const [loading, setLiading] = useState(false)
  const [page, setPage] = useState(1)
  const [dataLoading, setDataLoading] = useState(['', '', '', '', '', '', '', '', ''])
  const changeCatalog = useSelector((st) => st.changeCatalog)

  const SelectCatalog = (data) => {
    let index = selected.findIndex(item => item == data.id)
    let item = [...selected]
    if (index == -1) {
      item.push(data.id)
    }
    else {
      item.splice(index, 1)
    }
    setSelected(item)
  }

  useEffect(() => {
    let item = [...selected]
    userData.allData?.data?.categories?.map((elm, i) => {
      if (item.findIndex((temp) => temp == elm.id) == -1)
        item.push(elm.id)
    })
    setSelected(item)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(ClearChangeCatalog())
      setLiading(false)
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (changeCatalog.status) {
      setLiading(false)
      dispatch(ClearChangeCatalog())
    }
    else {
      setLiading(false)
    }
  }, [changeCatalog.status])



  const SendData = () => {
    setLiading(true)
    dispatch(ShowPopUpLocal())
    dispatch(ChangeCatalog(staticdata.token, {
      category_ids: selected,
      settings: 1,
    }))
    dispatch(ClearChangeCatalog())
    navigation.navigate('TabNavigation', { screen: 'Home' })
  }

  useEffect(() => {
    if (staticdata.token) {
      dispatch(GetCatalogAction(staticdata.token, 14, page))
    }
  }, [staticdata.token, page])


  const renderItem = ({ item, index }) => {
    const isEven = index % 2 === 0;
    const nextItem = getCatalog.data[index + 1];
    if (isEven)
      return <View style={style.row}>
        <View style={[{ justifyContent: 'center', alignItems: 'center', width: '48%' }]}>
          <CatalogItem selected={selected.findIndex(temp => temp == item.id) > -1} onSelect={(e) => SelectCatalog(e)} data={item} key={index} />
        </View >
        {nextItem && (
          <View style={[{ justifyContent: 'center', alignItems: 'center', width: '48%' }]}>
            <CatalogItem selected={selected.findIndex(temp => temp == nextItem.id) > -1} onSelect={(e) => SelectCatalog(e)} data={nextItem} key={index} />
          </View >
        )}
      </View>
  }
  const handleLoadMore = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + layoutHeight >= contentHeight - 200) {
      if (getCatalog.nextPage)
        setPage(page + 1);
    }
  };

  return <SafeAreaView >
    <View style={[style.page, { marginTop: insets.top ? insets.top : 50 }]}>
      <Text style={[Styles.darkRegular16, { textAlign: 'center' }]}>Выберите интересующие Вас рубрики</Text>
      {(getCatalog.loading && page == 1) ?
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', }}>
          {dataLoading.map((elm, i) => {
            return <Skeleton
              key={i}
              width={'48%'}
              height={130}
              style={{ borderRadius: 10, marginBottom: 20 }}
            />
          })}
        </View> :
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ height: '84%' }}
          data={getCatalog.data}
          renderItem={renderItem}
          onScroll={handleLoadMore}
          ListFooterComponent={
            <View style={style.buttonWrapper}>
              <TouchableOpacity
                onPress={() => SendData()} disabled={(selected.length == 0 || changeCatalog.loading)} style={[style.button, selected.length ? { backgroundColor: '#FFD953' } : { backgroundColor: '#8f8f8f' }]}>
                {loading ?
                  <View style={{ height: 8 }}>
                    <ActivityIndicator color={'white'} size='small' />
                  </View> :
                  <Text style={Styles.darkMedium13}>Далее ({selected.length})</Text>
                }
              </TouchableOpacity>
            </View>
          }
        />

      }
    </View>
  </SafeAreaView>

}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  page: {
    paddingHorizontal: 35,
    gap: 20,
    height: '100%',
    position: 'relative'
  },
  button: {
    backgroundColor: 'rgb(240, 240, 240)',
    width: '48%',
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 60
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: 90,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})