import { Image, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ChecboxUNchekedSvg, CheckedChexbox, CheckMarkSvg, CloseSvg1 } from "../../../assets/svg/Svgs"
import { BootomModal } from "../../../components/BootomSheet"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useMemo, useRef, useState } from "react"
import { t } from '../../../components/lang';
import { Styles } from "../../../styles/Styles"
import { CreatePostLocal, CreatPostAction } from "../../../store/action/action"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';



export const Header = ({
  setSelectedCatalog,
  selectedCatalog,
  description,
  error,
  Close,
  color,
  font,
  font_size,
  font_family,
  background,
}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], [],);
  const mainData = useSelector(st => st.mainData);
  const createPost = useSelector(st => st.createPost);
  const [errorCatalog, setErrorCatalog] = useState(false)

  const dispatch = useDispatch()
  const staticData = useSelector(st => st.static);
  const navigation = useNavigation()
  const [selectedCatalogName, setSelectedCatalogName] = useState([])
  const getCatalog = useSelector((st) => st.getCatalog)
  const userData = useSelector(st => st.userData);





  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetRef.current?.present();
  }, []);


  const Camera = async () => {
    const cameraPermission = Platform.OS === 'android' && PERMISSIONS.ANDROID.CAMERA
    const photoLibraryPermission = Platform.OS === 'android' && PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    const cameraPermissionStatus = await check(cameraPermission);
    const photoLibraryPermissionStatus = await check(photoLibraryPermission);
    if (cameraPermissionStatus !== RESULTS.GRANTED && photoLibraryPermissionStatus !== RESULTS.GRANTED) {
      request(cameraPermission);
      request(photoLibraryPermission);
    }
  }

  const Select = (elm) => {
    let item = [...selectedCatalog]
    let photo = [...selectedCatalogName]
    let index = item.findIndex(el => el == elm.id)
    let index1 = photo.findIndex((el) => el == elm.photo)
    if (index >= 0) {
      item.splice(index, 1)
    }
    else {
      if (item.length < 4) {
        item.push(elm.id)
      }
      else {
        Alert.alert("Вы можете выбрать максимум 4 рубрики")
      }
    }

    if (index1 >= 0) {
      photo.splice(index1, 1)
    }
    else {
      if (photo.length < 4) {
        photo.push(elm.photo)
      }
    }
    setSelectedCatalog(item)
    setSelectedCatalogName(photo)
    // handlePresentModalClose()
    setErrorCatalog('')

    // else {
    //   Alert.alert("Вы можете выбрать максимум 4 рубрики")
    // }
  }

  const creatPost = () => {
    if (error) {
      setShowError(true)
    }
    setErrorCatalog(false)
    let form = new FormData();
    description && form.append('description', JSON.stringify(description));

    color && form.append('color', color);
    font && form.append("form", form)
    font_size && form.append("font_size", font_size)
    font_family && form.append("font_family", font_family)
    background && form.append("background", background)

    selectedCatalog.forEach(id => form.append('category_ids[]', id));
    if (selectedCatalog != '' && error == '') {
      navigation.navigate('TabNavigation', {
        screen: 'Home',
        params: { param: 'add_image' },
      });
      dispatch(CreatPostAction(form, staticData.token, userData.data?.id));
    }
    else if (selectedCatalog == '') {
      setErrorCatalog(true)
    }
  };



  useFocusEffect(
    useCallback(() => {
      setSelectedCatalogName([])
      setErrorCatalog(false)
      Camera()
    }, [])
  );


  return <View>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8, marginTop: 10 }}>
      <TouchableOpacity
        style={{ width: 35, height: 26 }}

        onPress={() => {
          Close()
          navigation.goBack()
        }}>
        {/* <CloseSvg1 /> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePresentModalPress()} style={[styles.category, { borderColor: errorCatalog ? 'red' : 'white' }]}>
        {selectedCatalogName.length == 0 &&
          <Text style={[Styles.whiteMedium12, { color: errorCatalog ? 'red' : 'white', textAlign: 'center' }]}>
            {
              t(mainData.lang).Choosecatalog
            }
          </Text>
        }
        {selectedCatalogName.map((elm, i) => {
          return <Image key={i} style={styles.image}
            source={{ uri: `https://chambaonline.pro/uploads/${elm}` }} />
        })}
        {/* <Text style={[Styles.whiteMedium12, { color: errorCatalog ? 'red' : 'white', textAlign: 'center' }]}>
          {selectedCatalog ?
            selectedCatalogName :
            t(mainData.lang).Choosecatalog
          }
        </Text> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => creatPost()} disabled={createPost.loading} >
        <CheckMarkSvg />
      </TouchableOpacity>
    </View>
    <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 30 }}>

          {getCatalog.data.map((elm, i) => {
            return <TouchableOpacity activeOpacity={1} onPress={() => Select(elm)} style={styles.CheckMark} key={i}>
              <Text style={[{ padding: 10, paddingHorizontal: 15, }, Styles.darkMedium13]}>{elm.name}</Text>
              {selectedCatalog?.findIndex((e) => elm.id == e) >= 0 ?
                <CheckedChexbox /> :
                <ChecboxUNchekedSvg />
              }
            </TouchableOpacity>
          })}
        </View>
      </ScrollView>
    </BootomModal>
  </View>
}

const styles = StyleSheet.create({
  category: {
    borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 7,
    // width: 220,
    marginLeft: 5,
    flexDirection: 'row',
    gap: 3
  },
  CheckMark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  image: {
    width: 20,
    height: 10,
    objectFit: 'contain'
    // height: 50,

  }
});