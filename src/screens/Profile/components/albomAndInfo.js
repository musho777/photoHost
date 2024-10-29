import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Styles } from "../../../styles/Styles";
import { AppColors } from "../../../styles/AppColors";
import { t } from "../../../components/lang";

export const AlbomAndInfo = ({ seletedScreen, setSelectedScreen }) => {
  const mainData = useSelector(st => st.mainData);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tab, seletedScreen && styles.activeTab]}
          onPress={() => setSelectedScreen(true)}
        >
          <Text style={Styles.balihaiRegular15}>{t(mainData.lang).Album}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tab, !seletedScreen && styles.activeTab]}
          onPress={() => setSelectedScreen(false)}
        >
          <Text style={[Styles.balihaiRegular15, !seletedScreen && { marginBottom: -4, }]}>{t(mainData.lang).Information}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: AppColors.Solitude_Color,
    backgroundColor: '#FFF',
    elevation: 0,
    // marginHorizontal: 15,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: AppColors.Charcoal_Color,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.Charcoal_Color,
  },
  scrollView: {
    flex: 1,
  },
});
