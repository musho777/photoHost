import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CheckMarkSvg, CloseSvg1 } from "../../../assets/svg/Svgs"
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
  uri,
  error,
  setFirst,
  Close
}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], [],);
  const mainData = useSelector(st => st.mainData);
  const createPost = useSelector(st => st.createPost);
  const [errorCatalog, setErrorCatalog] = useState(false)

  const dispatch = useDispatch()
  const staticData = useSelector(st => st.static);
  const navigation = useNavigation()
  const [selectedCatalogName, setSelectedCatalogName] = useState('')
  const getCatalog = useSelector((st) => st.getCatalog)




  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetRef.current?.close();
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



  const creatPost = () => {
    if (error) {
      setShowError(true)
    }
    setErrorCatalog(false)
    let form = new FormData();
    uri.length &&
      uri.forEach((el, i) => {
        if (!el.mime.includes('video')) {
          form.append('photos[]', {
            uri: el.uri,
            type: el.mime,
            name: 'photo',
          });
        }
        else {
          form.append(`video[][video]`, {
            uri: el.uri,
            type: 'video/mp4',
            name: 'video.mp4',
          })
        }
      });

    description && form.append('description', JSON.stringify(description));
    form.append('category_id', selectedCatalog)
    if (selectedCatalog != '' && error == '') {
      dispatch(CreatePostLocal(uri[0]))
      navigation.navigate('TabNavigation', {
        screen: 'Home',
        params: { param: 'add_image' },
      });
      setFirst(false)
      dispatch(CreatPostAction(form, staticData.token));
    }
    else if (selectedCatalog == '') {
      setErrorCatalog(true)
    }
  };



  useFocusEffect(
    useCallback(() => {
      setSelectedCatalogName('')
      setErrorCatalog(false)
      Camera()
    }, [])
  );


  return <View>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8, marginTop: 10 }}>
      <TouchableOpacity onPress={() => {
        Close()
        navigation.goBack()
      }}>
        <CloseSvg1 />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePresentModalPress()} style={[styles.category, { borderColor: errorCatalog ? 'red' : 'white' }]}>
        <Text style={[Styles.whiteMedium12, { color: errorCatalog ? 'red' : 'white' }]}>
          {selectedCatalog ?
            selectedCatalogName :
            t(mainData.lang).Choosecatalog
          }
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => creatPost()} disabled={createPost.loading || uri.length === 0} >
        <CheckMarkSvg />
      </TouchableOpacity>
    </View>
    <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 30 }}>

          {getCatalog.data.map((elm, i) => {
            return <TouchableOpacity onPress={() => {
              setSelectedCatalog(elm.id)
              setSelectedCatalogName(elm.name)
              handlePresentModalClose()
              setErrorCatalog('')
            }} key={i}>
              <Text style={[{ padding: 10, paddingHorizontal: 15 }, Styles.darkMedium13]}>{elm.name}</Text>
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
    paddingHorizontal: 12,
    borderRadius: 7,
    width: 220,
    marginLeft: 5,
  }
});