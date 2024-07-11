import { useEffect, useState } from "react"
import { StyleSheet, View, Modal, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { ChangeCatalog, ClearChangeCatalog, GetRelationCategory, NoShowPopup } from "../../store/action/action"
import { CatalogItem } from "../../components/catalogItem"
import { Styles } from "../../styles/Styles"
import { BackArrow } from "../../assets/svg/Svgs"

export const ModalComponent = ({ showModal, token, close }) => {
  const dispatch = useDispatch()
  const getRelationCategory = useSelector((st) => st.getRelationCategory)
  const [selected, setSelected] = useState([])
  const changeCatalog = useSelector((st) => st.changeCatalog)
  const userData = useSelector((st) => st.userData)
  const [catalog, setCatalog] = useState([])
  const [ShowText, setShowText] = useState(false)
  const [showCatalog, setSHowCatalog] = useState(false)

  useEffect(() => {
    if (userData.data.categories) {
      setCatalog(userData.data.categories)
    }
  }, [userData.data])


  useEffect(() => {
    // console.log(token)
    if (token) {
      dispatch(GetRelationCategory(token))
    }
  }, [token, showModal])





  const SelectCatalog = (data) => {
    // let index = selected.findIndex(item => item == data.id)
    let item = [...selected]

    // if (index == -1) {
    //   item.push(data.id)
    // }
    // else {
    //   item.splice(index, 1)
    // }
    setSelected(item)
  }


  const SendData = () => {
    let item = [...selected]
    userData.data?.categories.map((elm, i) => {
      item.push(elm.id)
    })
    getRelationCategory?.data?.map((elm, i) => {
      item.push(elm.id)
    })
    console.log(getRelationCategory.data, '0000')
    dispatch(ChangeCatalog(token, {
      category_ids: item,
      settings: 0,
    }))
    dispatch(ClearChangeCatalog())
    close()
  }

  if (!ShowText && !showCatalog) {
    return <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
    >
      <View style={styles.popup}>
        <View style={[styles.card, styles.shadowProp]}>
          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 6 }}>
            <Text style={Styles.darkMedium16}>Предложить Вам попутный контент?</Text>
            <Text onPress={() => setShowText(true)} style={[Styles.balihaiMedium10, { borderBottomWidth: 0.5, paddingBottom: 2, borderColor: '#8C9CAB' }]}>(что такое попутный контент?)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              onPress={() => SendData()}
              style={{ padding: 8, width: 100, backgroundColor: '#FFD953', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                close()
                dispatch(NoShowPopup(token))
              }}
              style={{ padding: 8, width: 100, backgroundColor: 'rgb(200, 200, 200)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Нет</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  }
  else if (ShowText) {
    return <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
    >
      <View style={styles.popup}>
        <View style={[styles.card1, styles.shadowProp]}>
          <TouchableOpacity
            onPress={() => setShowText(false)}
            style={{ position: 'absolute', top: 10, left: 20 }}>
            <BackArrow />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ gap: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <Text style={Styles.darkMedium13}>Попутный контент – это контент, который косвенно имеет отношение к выбранным Вами рубрикам и будет предлагаться в ленте событий.
                </Text>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={[{ textDecorationLine: 'underline' }, Styles.balihaiSemiBold16]}>Пример:</Text>
                <View style={{ gap: 6 }}>
                  <Text style={Styles.balihaiMedium13}>Вы выбрали категорию Транспорт, к ней будут предлагаться:</Text>
                  <Text style={Styles.balihaiMedium13}>-Путешествия и туризм (путешествия на личном и другом транспорте)</Text>
                  <Text style={Styles.balihaiMedium13}>-Города и страны (города и страны, которые можно и нужно посетить)</Text>
                  <Text style={Styles.balihaiMedium13}>-Одежда и обувь (какую удобную одежду и обувь взять с собой)</Text>
                  <Text style={Styles.balihaiMedium13}>-Активный отдых (информация о всех видах отдыха)</Text>
                  <Text style={Styles.balihaiMedium13}>-Квадрокоптер (разные фото и видео с высоты птичьего полета)</Text>
                  <Text style={Styles.balihaiMedium13}>-Природа (самые лучшие уголки планеты)</Text>
                  <Text style={Styles.balihaiMedium13}>-Релакс ( самые лучшие расслабления которые можно получить на отдыхе)</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  }

  // else if (!ShowText && showCatalog) {
  //   return <Modal
  //     animationType="slide"
  //     transparent={true}
  //     visible={showModal}
  //   >
  //     <View style={styles.popup}>
  //       <View style={[styles.card, styles.shadowProp]}>
  //         <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, flexDirection: 'row' }}>
  //           <Text style={Styles.darkMedium16}>Какие рубрики Вам интересны?</Text>
  //         </View>
  //         <View>
  //           <ScrollView style={{ height: '80%' }}>
  //             <View style={styles.catalogWrapper}>
  //               {getRelationCategory.data.map((elm, i) => {
  //                 return <CatalogItem selected={selected.findIndex(item => item == elm.id) > -1} onSelect={(e) => SelectCatalog(e)} data={elm} key={i} />
  //               })}
  //             </View>
  //           </ScrollView>
  //         </View>
  //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
  //           <TouchableOpacity
  //             onPress={() => {
  //               close()
  //               dispatch(NoShowPopup(token))
  //             }}
  //             style={styles.button}>
  //             <Text style={Styles.darkMedium13}>Пропустить</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity onPress={() => SendData()} disabled={(selected.length == 0 || changeCatalog.loading)} style={[styles.button, { backgroundColor: '#FFD953' }]}>
  //             {changeCatalog.loading ?
  //               <View style={{ height: 8 }}>
  //                 <ActivityIndicator color={'white'} size='small' />
  //               </View> :
  //               <Text style={Styles.darkMedium13}>Далее ({selected.length})</Text>
  //             }
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   </Modal >
  // }

}
const styles = StyleSheet.create({
  popup: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
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
    position: 'absolute',
    backgroundColor: 'white',
    width: '96%',
    paddingVertical: 30,
    gap: 20,
    paddingTop: 30,
    marginTop: 30,
  },
  card1: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 25,
    position: 'absolute',
    backgroundColor: 'white',
    width: '96%',
    paddingVertical: 30,
    gap: 20,
    paddingTop: 30,
    marginTop: 30,
    height: '63.5%',
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