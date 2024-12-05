import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native"
import { useSelector } from "react-redux"
import { t } from '../../components/lang';
import { FieldWithArrow } from "../../components/fieldWithArrow";
import { useNavigation } from "@react-navigation/native";
import { Api } from "../../store/action/action";
import { DelateModal } from "../../components/DelateModel";
import { useState } from "react";

export const Settings = () => {
  const mainData = useSelector((st) => st.mainData)
  const navigation = useNavigation()
  const staticdata = useSelector((st) => st.static)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const DelateAccaunt = async () => {
    setShow(false)
    setLoading(true)
    let api = `${Api}/delete_account`
    var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${staticdata.token}`);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    await fetch(api, requestOptions)
      .then(response => response.json())
      .then(r => {
        setLoading(false)
        if (r.status) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen1', params: { screen: 'LoginScreen' } }],
          });
        }
      })
      .catch(error => {
        console.log(error, '200000000------')
        setLoading(false)
      });
  }


  return <View style={styles.settings}>
    <DelateModal
      Confirm={() => {
        DelateAccaunt()
      }}
      confirmText={t(mainData.lang).Delete}
      title={"Удалить аккаунт ?"}
      show={show}
      setModalVisible={(e) => setShow(e)}
    />
    <FieldWithArrow onPress={() => navigation.navigate("Soundsandnotifications")} text={t(mainData.lang).Soundsandnotifications} />
    <View style={styles.delate}>
      <TouchableOpacity disabled={loading} onPress={() => setShow(true)} style={styles.button}>
        <Text style={styles.delateText}>Удалить аккаунт</Text>
      </TouchableOpacity>
    </View>
  </View>
}

const styles = StyleSheet.create({
  delate: {
    position: 'absolute',
    bottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    backgroundColor: 'rgba(244, 67, 54, 1)',
    paddingVertical: 10,
    borderRadius: 10,
  },
  settings: {
    height: '100%',
  },
  delateText: {
    color: 'white'
  },
})