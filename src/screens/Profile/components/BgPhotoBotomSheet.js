import { forwardRef, useEffect, useMemo, useState } from "react"
import { BootomModal } from "../../../components/BootomSheet"
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Api, GetCatalogAction } from "../../../store/action/action";

export const BgPhotoBotomSheet = forwardRef(({ renderItem }, ref) => {
  const snapPoints1 = useMemo(() => ['70%',], []);
  const staticdata = useSelector(st => st.static);
  const getCatalog = useSelector((st) => st.getCatalog)
  const [photos, setPhotos] = useState([])
  const GetPhoto = () => {
    let api = `${Api}/category`
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(api, requestOptions)
      .then(response => response.json())
      .then(r => {
      })
      .catch(error => {
      });

    let item = []
    if (user) {
      user.data.categories.map((elm, i) => {
        elm.photo_array.map((el) => {
          item.push(el)
        })
      })
    }
    setImageData(item)
  }
  const dispatch = useDispatch()


  useEffect(() => {
    console.log("--")
    if (staticdata.token) {
      dispatch(GetCatalogAction(staticdata.token))
    }
  }, [staticdata.token,])

  useEffect(() => {
    console.log(getCatalog)
  }, [getCatalog])
  const [data, setData] = useState([])
  return <BootomModal ref={ref} snapPoints={snapPoints1}>
    <FlatList
      initialNumToRender={5}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  </BootomModal>
})