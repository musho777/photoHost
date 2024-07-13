import { Text, TouchableOpacity, View } from "react-native"
import { BootomModal } from "../../../../components/BootomSheet"
import { Styles } from "../../../../styles/Styles"
import { useRef } from "react";

export const Gender = () => {
  const bottomSheetRef = useRef(null);

  return <View style={{ position: 'absolute' }}>
    <BootomModal ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => {
          hadnelChange(2, 'Мужской')
          bottomSheetRef.current?.close()
        }} style={{ marginBottom: 20, marginTop: 20 }} >
          <Text style={Styles.darkRegular14}>{t(mainData.lang).Male}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          hadnelChange(2, 'Женский')
          bottomSheetRef.current?.close()

        }} style={{ marginBottom: 20 }}>
          <Text style={Styles.darkRegular14}>{t(mainData.lang).Female}</Text>
        </TouchableOpacity>
      </View>
    </BootomModal>
  </View>
}