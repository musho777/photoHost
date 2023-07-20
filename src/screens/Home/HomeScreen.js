import {useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {Post} from '../../components/Post';
import {Styles} from '../../styles/Styles';

export const HomeScreen = () => {
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
  const user = useSelector(st => st.userData);
  if (user.loading) {
    return (
      <View style={Styles.loading}>
        <ActivityIndicator size="large" color="#FFC24B" />
      </View>
    );
  }
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
