import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../styles/Styles"
import { useSelector } from "react-redux";
import { Button } from "../../ui/Button";
import { t } from '../../components/lang';
import { SelectedSvg, SelectSvg } from "../../assets/svg/Svgs";
import { useState } from "react";

export const RegisterType = () => {
  const [selected, setSelected] = useState(0)
  const mainData = useSelector(st => st.mainData);
  return <View style={styles.authScreen}>
    <Text style={[Styles.darkSemiBold16, { marginBottom: 30, textAlign: 'center' }]}>Вы регистрируетесь как:</Text>
    <View style={{ gap: 30 }}>
      <TouchableOpacity onPress={() => { setSelected(1) }} style={[styles.shadowProp, styles.CatalogItem]}>
        <Text style={Styles.darkMedium16}>Физическое лицо</Text>
        <View style={styles.select}>
          {selected == 1 &&
            <SelectedSvg />
          }
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { setSelected(2) }} style={[styles.shadowProp, styles.CatalogItem]}>
        <View style={styles.select}>
          {selected == 2 &&
            <SelectedSvg />
          }
        </View>
        <Text style={Styles.darkMedium16}>Юридическое лицо (Бизнес)</Text>
      </TouchableOpacity>
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
      <Button
        disabled={selected == 0}
        // onPress={() => loginUser()}
        title={t(mainData.lang).Next}
      // loading={loginData.loading}
      />
    </View>
  </View>
}

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 40,
  },
  CatalogItem: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingLeft: 30,
    paddingVertical: 30,
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  select: {
    position: 'absolute',
    left: 10,
  }
})