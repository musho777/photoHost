import {useState} from 'react';
import {View} from 'react-native';
import {Input} from '../ui/Input';
import {FollowingsBlock} from './FollowingsBlock';

export const Followings = () => {
  const [data, setData] = useState();
  const [followers, setFollowers] = useState([
    {
      name: 'Настя',
      img: require('../assets/img/user.png'),
      username: '@nastya',
    },
    {
      name: 'Настя',
      img: require('../assets/img/user.png'),
      username: '@nastya',
    },
    {
      name: 'Настя',
      img: require('../assets/img/user.png'),
      username: '@nastya',
    },
    {
      name: 'Настя',
      img: require('../assets/img/user.png'),
      username: '@nastya',
    },
    {
      name: 'Настя',
      img: require('../assets/img/user.png'),
      username: '@nastya',
    },
    {
      name: 'Настя',
      img: require('../assets/img/user.png'),
      username: '@nastya',
    },
  ]);
  return (
    <View style={{paddingHorizontal: 15}}>
      <Input
        data={data}
        onChange={e => setData(e)}
        placeholder={'Поиск'}
        search
        marginTop={20}
      />
      {followers?.map((elm, i) => (
        <FollowingsBlock
          name={elm.name}
          username={elm.username}
          img={elm.img}
          key={i}
          type={'Удалить'}
        />
      ))}
    </View>
  );
};
