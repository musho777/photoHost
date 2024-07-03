import { useEffect, useState } from "react"
import { StyleSheet, View, Modal, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { ChangeCatalog, ClearChangeCatalog, GetRelationCategory, NoShowPopup } from "../../store/action/action"
import { CatalogItem } from "../../components/catalogItem"
import { Styles } from "../../styles/Styles"

export const ModalComponent = ({ showModal, token, close }) => {
  const dispatch = useDispatch()
  const getRelationCategory = useSelector((st) => st.getRelationCategory)
  const [selected, setSelected] = useState([])
  const changeCatalog = useSelector((st) => st.changeCatalog)
  const userData = useSelector((st) => st.userData)
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    if (userData.data.categories) {
      setCatalog(userData.data.categories)
    }
  }, [userData.data])


  useEffect(() => {
    if (token) {
      dispatch(GetRelationCategory(token))
    }
  }, [token])





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


  const SendData = () => {
    let item = [...selected]
    userData.data?.categories.map((elm, i) => {
      item.push(elm.id)
    })
    dispatch(ChangeCatalog(token, {
      category_ids: item,
      settings: 0,
    }))
    dispatch(ClearChangeCatalog())
    close()
  }
  return <Modal
    animationType="slide"
    transparent={true}
    visible={showModal}
  >
    <View style={styles.popup}>
      <View style={[styles.card, styles.shadowProp]}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, flexDirection: 'row' }}>
          <Text style={Styles.darkMedium16}>Какие рубрики Вам интересны?</Text>
        </View>
        <View>
          <ScrollView style={{ height: '80%' }}>
            <View style={styles.catalogWrapper}>
              {getRelationCategory.data.map((elm, i) => {
                return <CatalogItem selected={selected.findIndex(item => item == elm.id) > -1} onSelect={(e) => SelectCatalog(e)} data={elm} key={i} />
              })}
            </View>
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
          <TouchableOpacity
            onPress={() => {
              close()
              dispatch(NoShowPopup(token))
            }}
            style={styles.button}>
            <Text style={Styles.darkMedium13}>Пропустить</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => SendData()} disabled={(selected.length == 0 || changeCatalog.loading)} style={[styles.button, { backgroundColor: '#FFD953' }]}>
            {changeCatalog.loading ?
              <View style={{ height: 8 }}>
                <ActivityIndicator color={'white'} size='small' />
              </View> :
              <Text style={Styles.darkMedium13}>Далее ({selected.length})</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal >
}
const styles = StyleSheet.create({
  popup: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  catalogWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap'
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 25,
    marginVertical: 10,
    position: 'absolute',
    backgroundColor: 'white',
    width: '96%',
    height: '85%',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
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