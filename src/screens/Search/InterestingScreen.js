import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Post } from '../../components/post/Post';
import { Styles } from '../../styles/Styles';

export const InterestingScreen = () => {
  const [post, setPost] = useState([
    {
      userImg: require('../../assets/img/MaskGroup.png'),
    },
    {
      userImg: require('../../assets/img/MaskGroup.png'),
    },
    {
      userImg: require('../../assets/img/MaskGroup.png'),
    },
  ]);
  return (
    <ScrollView style={Styles.bg}>
      <View
        style={{
          backfaceVisibility: 'visible',
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
          marginVertical: 10,
        }}>
        {post.map((elm, i) => (
          <Post userImg={elm.userImg} key={i} />
        ))}
      </View>
    </ScrollView>
  );
};
