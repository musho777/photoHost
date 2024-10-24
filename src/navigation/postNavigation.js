import { createStackNavigator } from '@react-navigation/stack';
import { AddPost } from '../screens/AddPost/AddPost';
import { AddImg } from '../screens/AddImg/AddImg';

export const PostNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddPhoto"
        component={AddImg}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddText"
        component={AddPost}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};