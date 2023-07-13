import {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Post} from '../../components/Post';

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
    <ScrollView>
      <View
        style={{
          backfaceVisibility: 'visible',
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
          marginVertical:10,
        }}>
        {post.map((elm, i) => (
          <Post userImg={elm.userImg} key={i} />
        ))}
      </View>
    </ScrollView>
  );
};
