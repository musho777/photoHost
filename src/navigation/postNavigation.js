import { createStackNavigator } from '@react-navigation/stack';
import { AddPost } from '../screens/AddPost/AddPost';
import { AddImg } from '../screens/AddImg/AddImg';

export const PostNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'AddPost'}>
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddImg"
        component={AddImg}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};