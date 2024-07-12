import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { BootomModal } from '../../../components/BootomSheet';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Styles } from "../../../styles/Styles";
import { t } from '../../../components/lang';
import { BackArrow } from "../../../assets/svg/Svgs";
import { MenuSvg } from "../../../assets/svg/TabBarSvg";
import { useNavigation } from "@react-navigation/native";
import { AddBlackListAction, AddInBookAction, DelatePostAction, GetPostsAction } from "../../../store/action/action";
import { Shadow } from "react-native-shadow-2";
import { ClearDelatePhost } from "../../../store/action/clearAction";


export const BootomModalComponent = ({ id, route, user }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const mainData = useSelector(st => st.mainData);
  const [book, setBook] = useState(route.params?.isBook);
  const singlData = useSelector(st => st.getSinglPage);
  const staticdata = useSelector(st => st.static);
  const [follow, setFollow] = useState()
  const [showSave, setShowSave] = useState(false)
  const delatePhoto = useSelector((st) => st.delatePhoto)

  const [saveType, setSaveType] = useState('Запись сохранена в закладках')

  const bottomSheetRef = useRef(null);

  useEffect(() => {
    setFollow(singlData.data?.user?.follow_status_sender?.length)
  }, [singlData.data?.user])


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSave(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [showSave]);



  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);


  const snapPoints = useMemo(
    () => [user?.data?.id != singlData?.data?.user?.id ? '25%' : '25%'], [],
  );

  const addToBlackList = () => {
    addToblack(user.data.id);
    bottomSheetRef.current?.close();
    dispatch(AddBlackListAction({ user_id: user.data.id }, staticdata.token));
    navigation.navigate('TabNavigation')
  };
  const addToBook = () => {
    bottomSheetRef.current?.close();
    setShowSave(true)
    dispatch(AddInBookAction({ post_id: id }, staticdata.token));
    setBook(!book);
  };

  const DelatePhoto = () => {
    handleCloseModalPress()
    setTimeout(() => {
      dispatch(DelatePostAction({ post_id: singlData.data.id }, staticdata.token))
    }, 10)
  }

  useEffect(() => {
    if (delatePhoto.status) {
      dispatch(ClearDelatePhost())
      navigation.replace('TabNavigation', { screen: "ProfileNavigation" })
    }
  }, [delatePhoto.status])


  return <View >
    {showSave &&
      <View style={styles.block}>
        <Shadow
          style={{ width: '100%', borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: "center", height: 50 }}
          startColor={'#00000010'}
        >
          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', gap: 10, paddingHorizontal: 2 }}>
              <Image source={require('../../../assets/img/icons8-save-30.png')} />
              <Text style={styles.heading}>{saveType}</Text>
            </View>
          </View>
        </Shadow>
      </View>
    }
    <View
      style={[
        Styles.flexSpaceBetween,
        { paddingHorizontal: 20, marginTop: 20, marginBottom: 10, },
      ]}>
      <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}
      >
        <BackArrow />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePresentModalPress()}
        style={{ marginTop: -5, paddingLeft: 15 }}>
        <MenuSvg />
      </TouchableOpacity>

    </View>
    <View style={{ position: 'absolute' }}>

      <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{ paddingHorizontal: 20 }}>
          {user?.data?.id != singlData?.data?.user?.id && <TouchableOpacity
            style={{ marginBottom: 20, marginTop: 20 }}
            onPress={() => {
              addToBook()
              setSaveType(book ? "Запись удалена из закладок" : 'Запись сохранена в закладках')
            }}>
            <Text style={Styles.darkRegular14}>
              {book ? 'Удалить из закладок' : 'В закладки'}
            </Text>
          </TouchableOpacity>}
          {user?.data?.id != singlData?.data?.user?.id && (
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => {
                setFollow(!follow)
                dispatch(AddDeleteFollowAction({ user_id: singlData?.data?.user?.id }, staticdata.token))
                bottomSheetRef?.current?.close();
              }}>

              <Text style={Styles.darkRegular14}>{!follow ? t(mainData.lang).subscribe : t(mainData.lang).Unsubscribe}</Text>
            </TouchableOpacity>
          )}
          {user?.data?.id != singlData?.data?.user?.id && (
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => addToBlackList()}>
              <Text style={Styles.darkRegular14}>В чёрный список</Text>
            </TouchableOpacity>
          )}
          {user?.data?.id == singlData?.data?.user?.id && (
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => {
                bottomSheetRef.current?.close();
                navigation.navigate('EditPostScreen', {
                  description: singlData.data.description,
                  id: singlData.data.id,
                });
              }}>
              <Text style={Styles.darkRegular14}>
                {t(mainData.lang).Editprofile}

              </Text>
            </TouchableOpacity>
          )}
          {user?.data?.id == singlData?.data?.user?.id && (
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => {
                DelatePhoto()
              }}>
              <Text style={Styles.darkRegular14}>Удалить пост</Text>
            </TouchableOpacity>
          )}
        </View>
      </BootomModal>
    </View>
  </View>
}

export const styles = StyleSheet.create({
  block: {
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})
