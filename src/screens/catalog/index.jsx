import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../styles/Styles"
import { CatalogItem } from "../../components/catalogItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetCatalogAction } from "../../store/action/action"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Catalog = () => {
  const dispatch = useDispatch()
  const getCatalog = useSelector((st) => st.getCatalog)
  const [selected, setSelected] = useState([])
  const SelectCatalog = (data) => {
    let index = selected.findIndex(item => item.id == data.id)
    let item = [...selected]
    if (index == -1) {
      item.push(data)
    }
    else {
      item.splice(index, 1)
    }
    setSelected(item)
  }

  const GetTokecn = async () => {
    let token = await AsyncStorage.getItem('token')
    dispatch(GetCatalogAction(token))
  }
  useEffect(() => {
    GetTokecn()
  }, [])


  return <View style={style.page}>
    <Text style={[Styles.darkRegular16, { textAlign: 'center' }]}>Выберите интересы</Text>
    <ScrollView style={{ height: '81%' }} showsVerticalScrollIndicator={false}>
      {!getCatalog.loading ? <View style={style.CatalogWrapper}>
        {
          getCatalog.data.map((elm, i) => {
            return <CatalogItem selected={selected.findIndex(item => item.id == elm.id) > -1} onSelect={(e) => SelectCatalog(e)} data={elm} key={i} />
          })
        }
      </View> :
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFC24B" />
        </View>
      }
    </ScrollView>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity style={style.button}>
        <Text style={Styles.darkMedium13}>Пропустить</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[style.button, { backgroundColor: '#FFD953' }]}>
        <Text style={Styles.darkMedium13}>Далее (0)</Text>
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
    paddingVertical: 10,
    borderRadius: 5,
  }
})