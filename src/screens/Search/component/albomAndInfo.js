import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { t } from '../../../components/lang';
import { useSelector } from "react-redux";
import { Styles } from "../../../styles/Styles";
import { AppColors } from "../../../styles/AppColors";
import { InfoBlock } from '../../Profile/InfoBlock';
import { useState } from "react";
import { Albom } from "../../../components/Albom/Albom";


export const AlbomAndInfo = () => {
  const mainData = useSelector(st => st.mainData);
  const getPosts = useSelector(st => st.getOtherPosts);
  const singlPage = useSelector(st => st.singlPage);
  const [selectedTab, setSelectedTab] = useState('first');

  // const renderContent = () => {
  //   if (selectedTab === 'first') {
  //     return <Albom loading={getPosts.loading} my={false} data={getPosts.data} />;
  //   }
  //   if (selectedTab === 'second') {
  //     return <InfoBlock user={singlPage.data} />;
  //   }
  // };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tab, selectedTab === 'first' && styles.activeTab]}
          onPress={() => setSelectedTab('first')}
        >
          <Text style={[Styles.balihaiRegular15]}>{t(mainData.lang).Album}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tab, selectedTab === 'second' && styles.activeTab]}
          onPress={() => setSelectedTab('second')}
        >
          <Text style={[Styles.balihaiRegular15, selectedTab === 'second' && { marginBottom: -4, }]}>{t(mainData.lang).Information}</Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
        {renderContent()}
      </ScrollView> */}
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
    marginHorizontal: 15,
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
