import { StyleSheet, TextInput, View } from "react-native"
import { SearchInputSvg } from "../../../assets/svg/Svgs"
import { useSelector } from "react-redux";
import { AppColors } from "../../../styles/AppColors";
import { t } from '../../../components/lang';

export const SearchInput = ({ data, handleSearchInput }) => {
  const mainData = useSelector(st => st.mainData);
  return <View style={styles.header}>
    <TextInput
      onChangeText={handleSearchInput}
      value={data}
      style={styles.Input}
      placeholder={t(mainData.lang).search}
      placeholderTextColor={'black'}
    />
    <View style={styles.eye}>
      <SearchInputSvg />
    </View>
  </View>
}
const styles = StyleSheet.create({
  Input: {
    backgroundColor: AppColors.AliceBlue_Color,
    borderRadius: 50,
    padding: 6,
    paddingHorizontal: 20,
    color: AppColors.Blcak_Color,
    position: 'relative',
    width: '100%',
    paddingRight: 35,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 15,
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%'
  },
  eye: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 25,
    height: '100%',
    top: 15,
  },
});