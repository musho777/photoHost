import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { BootomModal } from "../../../../components/BootomSheet"
import { t } from '../../../../components/lang';
import { useSelector } from "react-redux";
import { DownArrow, GenderSvg } from "../../../../assets/svg/Svgs";
import { useCallback, useMemo, useRef } from "react";
import { AppColors } from "../../../../styles/AppColors";
import { Styles } from "../../../../styles/Styles";


export const ChnageGender = ({ value, setValue }) => {
  const mainData = useSelector(st => st.mainData);
  const handlePresentModalPress = useCallback(() => { bottomSheetRef.current?.present(); }, []);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['16%'], []);

  return <View>
    <TouchableOpacity onPress={() => handlePresentModalPress()} style={[styles.textWrapper2, { paddingVertical: 25, justifyContent: "space-between" }]}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <GenderSvg />
        <Text style={[Styles.balihaiRegular14, { marginHorizontal: 10 }]}>{value ? value : t(mainData.lang).gender}</Text>
      </View>
      <DownArrow />
    </TouchableOpacity>
    <View style={{ position: 'absolute' }}>
      <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => {
            setValue('Мужской')
            bottomSheetRef.current?.close()
          }} style={{ marginBottom: 20, marginTop: 20 }} >
            <Text style={Styles.darkRegular14}>{t(mainData.lang).Male}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setValue('Женский')
            bottomSheetRef.current?.close()

          }} style={{ marginBottom: 20 }}>
            <Text style={Styles.darkRegular14}>{t(mainData.lang).Female}</Text>
          </TouchableOpacity>
        </View>
      </BootomModal>
    </View>
  </View>
}
const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  edit: {
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
  textWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
  },
  textWrapper2: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: AppColors.Solitude_Color,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
