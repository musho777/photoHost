import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../styles/Styles"
import { CatalogItem } from "../../components/catalogItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChangeCatalog, ClearChangeCatalog, GetCatalogAction } from "../../store/action/action"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export const Catalog = ({ route }) => {
  const dispatch = useDispatch()
  const getCatalog = useSelector((st) => st.getCatalog)
  const userData = useSelector((st) => st.userData)
  const [selected, setSelected] = useState([])
  const [token, setToken] = useState()
  const navigation = useNavigation()

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

  const GetTokecn = async () => {
    let token = await AsyncStorage.getItem('token')
    setToken(token)
    dispatch(GetCatalogAction(token))
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
      let token = await AsyncStorage.getItem('token')
      if (token) {
        dispatch(ClearChangeCatalog())
        GetTokecn(token, { category_ids: selected })
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (changeCatalog.status) {
      navigation.navigate('Home')
      dispatch(ClearChangeCatalog())
    }
  }, [changeCatalog.status])



  const SendData = () => {
    dispatch(ChangeCatalog(token, {
      category_ids: selected
    }))
    dispatch(ClearChangeCatalog())
  }

  return <View style={style.page}>
    <Text style={[Styles.darkRegular16, { textAlign: 'center' }]}>Выберите интересы</Text>
    <ScrollView style={{ height: '81%' }} showsVerticalScrollIndicator={false}>
      {!getCatalog.loading ? <View style={style.CatalogWrapper}>
        {
          getCatalog.data.map((elm, i) => {
            return <CatalogItem selected={selected.findIndex(item => item == elm.id) > -1} onSelect={(e) => SelectCatalog(e)} data={elm} key={i} />
          })
        }
      </View> :
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFC24B" />
        </View>
      }
    </ScrollView>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() =>
        route.params?.id ?
          navigation.goBack() :
          navigation.navigate('TabNavigation')
      } style={style.button}>
        <Text style={Styles.darkMedium13}>Пропустить</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => SendData()} disabled={(selected.length == 0 || changeCatalog.loading)} style={[style.button, { backgroundColor: '#FFD953' }]}>
        {changeCatalog.loading ?
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
    paddingHorizontal: 45,
    paddingTop: 30,
    gap: 30,
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