import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfoAction, LogoutAction } from "./src/store/action/action"

export const CheckBlack = ({token}) =>{
    const navigation = useNavigation()
    const dispatch = useDispatch()
  const user = useSelector(st => st.userData);

      useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getUserInfoAction(token))
      if(Object.keys(user.data).length === 0||user.data.black_list_status == 1){
        dispatch(LogoutAction(token))
        navigation.navigate('LoginScreen')
      }
    }, 120000);

    return () => clearInterval(interval);
  }, []);
    return <View></View>
}