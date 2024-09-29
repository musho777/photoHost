import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "../../../styles/Styles";
import { GetPostViewAction } from "../../../store/action/action";
import { useState } from "react";
import { useSelector } from "react-redux";

export const UserItem = ({ data }) => {
  const user = useSelector((st) => st.userData)


  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };


  const [page, setPage] = useState(1);
  const navigation = useNavigation()
  return <ScrollView
    onScroll={({ nativeEvent }) => {
      if (isCloseToBottom(nativeEvent)) {
        if (getPosts.nextPage) {
          let pages = page + 1;
          dispatch(GetPostViewAction({ post_id: id }, token, page));
          setPage(pages);
        }
      }
    }}
  >
    {data.map((elm, i) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (user.data.id == elm.user.id) {
              navigation.navigate('ProfileNavigation');
            }
            else {
              navigation.push('SearchProfil', { screen: 'SearchProfils', params: { id: elm.user.id } });
            }
          }}
          key={i}
          style={styles.block}>
          <View style={Styles.flexAlignItems}>
            <Image
              style={styles.img}
              source={{
                uri: `https://chambaonline.pro/uploads/${elm.user.avatar}`,
              }}
            />
            <Text style={[Styles.darkMedium13, { marginHorizontal: 10 }]}>
              {elm.user.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
    marginVertical: 20,
  },
  line: {
    borderBottomWidth: 0.5,
    borderStyle: 'dotted',
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
});