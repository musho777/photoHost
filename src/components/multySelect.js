import { View, Text } from "react-native"
import { Box, CheckIcon, Select, NativeBaseProvider, } from "native-base";
import { useState } from "react";
import { Styles } from "../styles/Styles";
import { AppColors } from "../styles/AppColors";

export const MultySelect = ({ data, selectedValue, name }) => {
  const [service, setService] = useState("");
  return <View>
    <NativeBaseProvider>
      <Box maxW="300" maxH='1.5'>
        <Select
          selectedValue={service}
          minHeight='50'
          width="265"
          accessibilityLabel="Choose Service"
          placeholder={name}
          fontSize={10}
          fontFamily='Montserrat-Medium'
          placeholderTextColor={AppColors.BaliHai_Color}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => {
            selectedValue(itemValue)
            setService(itemValue)
          }}>
          {data.map((elm, i) => {
            return <Select.Item key={i} label={elm.name} value={elm.id} />
          })}
        </Select>

      </Box>
    </NativeBaseProvider>

  </View>
}