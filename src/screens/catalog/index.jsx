import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../styles/Styles"
import { CatalogItem } from "../../components/catalogItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChangeCatalog, ClearChangeCatalog, GetCatalogAction, getUserInfoAction } from "../../store/action/action"
import { useNavigation } from "@react-navigation/native"

export const Catalog = () => {
  const dispatch = useDispatch()
  const getCatalog = useSelector((st) => st.getCatalog)
  const userData = useSelector((st) => st.userData)
  const [selected, setSelected] = useState([])
  const navigation = useNavigation()
  const staticdata = useSelector(st => st.static);
  const [loading, setLiading] = useState(false)


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
  }, [userData])

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
      navigation.navigate('TabNavigation', { screen: 'Home' })
      dispatch(ClearChangeCatalog())
    }
    else {
      setLiading(false)
    }
  }, [changeCatalog.status])

  const SendData = () => {
    setLiading(true)
    dispatch(ChangeCatalog(staticdata.token, {
      category_ids: selected,
      settings: 1,
    }))
    dispatch(getUserInfoAction(staticdata.token))
    dispatch(ClearChangeCatalog())
  }

  useEffect(() => {
    if (staticdata.token) {
      dispatch(GetCatalogAction(staticdata.token))
    }
  }, [staticdata.token])

  return <View style={style.page}>
    <Text style={[Styles.darkRegular16, { textAlign: 'center' }]}>Выберите интересующие Вас рубрики</Text>
    <ScrollView style={{ height: '81.5%' }} showsVerticalScrollIndicator={false}>
      <View style={style.CatalogWrapper}>
        {
          getCatalog.data.map((elm, i) => {
            return <CatalogItem selected={selected.findIndex(item => item == elm.id) > -1} onSelect={(e) => SelectCatalog(e)} data={elm} key={i} />
          })
        }
      </View>
    </ScrollView>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={() => SendData()} disabled={(selected.length == 0 || changeCatalog.loading)} style={[style.button, selected.length ? { backgroundColor: '#FFD953' } :
          { backgroundColor: '#8f8f8f' }
        ]}>
        {loading ?
          <View style={{ height: 8 }}>
            <ActivityIndicator color={'white'} size='small' />
          </View> :
          <Text style={Styles.darkMedium13}>Далее ({selected.length})</Text>
        }
      </TouchableOpacity>
    </View>
  </View>
}

const style = StyleSheet.create({
  page: {
    paddingHorizontal: 35,
    paddingTop: 30,
    gap: 20,
  },
  CatalogWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  button: {
    backgroundColor: 'rgb(240, 240, 240)',
    width: '48%',
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
  }
})