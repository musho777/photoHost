import { Text, useWindowDimensions, View } from "react-native"
import { t } from '../../../components/lang';
import { useSelector } from "react-redux";
import { Styles } from "../../../styles/Styles";
import { useState } from "react";
import { Albom } from "../../../components/Albom";
import { InfoBlock } from "../InfoBlock";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { AppColors } from "../../../styles/AppColors";



export const AlbomAndInfo = () => {
  const mainData = useSelector(st => st.mainData);
  const getPosts = useSelector(st => st.getPosts);
  const user = useSelector(st => st.userData);

  const renderScene = SceneMap({
    first: () => <Albom data={getPosts.data} />,
    second: () => <InfoBlock user={user.data} />,
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: t(mainData.lang).Album },
    { key: 'second', title: t(mainData.lang).Information },
  ]);
  const layout = useWindowDimensions();
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: AppColors.Charcoal_Color,
          height: 2,
          borderRadius: 10,
        }}
        style={{
          backgroundColor: '#FFF',
          elevation: 0,
          borderBottomWidth: 1,
          borderColor: AppColors.Solitude_Color,
          borderRadius: 10,
          marginHorizontal: 15
        }}
        renderLabel={a => (
          <Text
            style={[
              a.focused ? Styles.darkRegular14 : Styles.heatherRegular14,
            ]}>
            {a.route.title}
          </Text>
        )}
        labelStyle={Styles.blueSemiBold14}
        pressOpacity={0}
        pressColor="white"
      />
    );
  };
  return <View style={{ flex: 1 }}>
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  </View>;
}