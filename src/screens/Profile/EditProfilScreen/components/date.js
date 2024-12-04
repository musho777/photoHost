import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { DownArrow1 } from "../../../../assets/svg/Svgs"
import { t } from '../../../../components/lang';
import { AppColors } from "../../../../styles/AppColors";
import { useSelector } from "react-redux";
import { MountWrapper } from "../../../../components/MountWrapper";
import { useState } from "react";
import { Styles } from "../../../../styles/Styles";


export const DateComponent = ({ setDay, day, mount, setMount, year, setYera, error }) => {
  const mainData = useSelector(st => st.mainData);
  const [openMount, setOpenMout] = useState(false)
  return <View>
    <View style={styles.calnedarView}>
      <View style={{ width: '28%' }}>
        <Text style={styles.clandatLable}>{t(mainData.lang).Day}</Text>
        <TextInput
          value={day}
          onChangeText={((e) => {
            if (e <= 31) {
              setDay(e)
            }
          })} keyboardType='numeric' style={styles.calendarInput} />
      </View>
      <View style={{ width: '28%', height: 45 }}>
        <Text style={styles.clandatLable}>{t(mainData.lang).Month}</Text>
        <View style={styles.clandarTochable}>
          <TouchableOpacity onPress={() => setOpenMout(true)} style={styles.calendarInput} >
            <Text style={styles.calsendarText}>{mount?.name}</Text>
          </TouchableOpacity>
          <View style={styles.calsendarVector}>
            <DownArrow1 />
          </View>
        </View>
      </View>
      <View style={{ width: '28%' }}>
        <Text style={styles.clandatLable}>{t(mainData.lang).Year}</Text>
        <TextInput
          keyboardType='numeric'
          value={year}
          onChangeText={(e) => {
            if (e <= 2024) { setYera(e) }
          }}
          style={styles.calendarInput} />
      </View>
    </View>
    {error && <View>
      <Text style={{ color: 'red', fontSize: 12, textAlign: 'center', marginTop: 5 }}>{error}</Text>
    </View>}

    <TouchableOpacity onPress={() => {
      setMount("")
      setYera("")
      setDay("")
    }} style={{ alignItems: 'flex-end', paddingHorizontal: 15, marginVertical: 5 }}>
      <Text style={Styles.balihaiMedium10}>Удалить дату</Text>
    </TouchableOpacity>
    <View style={{ position: 'absolute' }}>
      {openMount && <MountWrapper onPress={(e) =>
        setMount(e)} close={() => setOpenMout(false)}
        visible={openMount} />}
    </View>
  </View>
}

const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
  },
  calnedarView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 20,
    position: 'relative'
  },
  calendarInput: {
    borderWidth: 1,
    width: '100%',
    borderColor: AppColors.Solitude_Color,
    height: 47,
    textAlign: 'center',
    color: AppColors.BaliHai_Color,
  },
  clandatLable: {
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    zIndex: 22,
    left: 10,
    textAlign: 'center',
    color: AppColors.BaliHai_Color,
  },
  clandarTochable: {
    justifyContent: 'center',
    width: "100%",
    height: '100%',
  },
  calsendarVector: {
    position: 'absolute',
    right: 10,
  },
  calsendarText: {
    position: 'absolute',
    height: '100%',
    top: 10,
    left: 10,
    color: AppColors.BaliHai_Color,
  },
});

