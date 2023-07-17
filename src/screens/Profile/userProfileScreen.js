import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Post} from '../../components/Post';
import {Styles} from '../../styles/Styles';
export const UserProfileScreen = () => {
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
    <ScrollView showsVerticalScrollIndicator={false} style={Styles.bg}>
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
