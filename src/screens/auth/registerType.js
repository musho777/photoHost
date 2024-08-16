import { StyleSheet, Text, View } from "react-native"
import { Styles } from "../../styles/Styles"
import { useSelector } from "react-redux";
import { Button } from "../../ui/Button";
import { t } from '../../components/lang';
import { useState } from "react";
import { TypeBlock } from "./component/typeblock";
import { useNavigation } from "@react-navigation/native";

export const RegisterType = () => {
  const [selected, setSelected] = useState(0)
  const mainData = useSelector(st => st.mainData);
  const navigation = useNavigation()
  const GoNextPage = () => {
    navigation.navigate('RegisterScreen', { selected })
  }

  return <View style={styles.authScreen}>
    <Text style={[Styles.darkSemiBold16, { marginBottom: 30, textAlign: 'center' }]}>Вы регистрируетесь как:</Text>
    <View style={{ gap: 30 }}>
      <TypeBlock
        selected={selected}
        setSelected={(e) => setSelected(e)}
        title='Физическое лицо'
        type='Individual'
      />
      <TypeBlock
        selected={selected}
        setSelected={(e) => setSelected(e)}
        title='Юридическое лицо (Бизнес)'
        type='Legal_entity'
      />
    </View>
    <View style={styles.buttonBlock}>
      <Button
        disabled={selected == 0}
        onPress={() => GoNextPage()}
        title={t(mainData.lang).Next}
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
  buttonBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  }
})