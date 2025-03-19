import { createStackNavigator } from '@react-navigation/stack';
import { AboutApplication } from '../screens/AboutUs/AboutApplication';
import { PhotoSlider } from '../screens/AboutUs/PhotoSlider';
import { VideoSlider } from '../screens/AboutUs/VideoSlider';
import { TextSlider } from '../screens/AboutUs/TextSlider';

export const AboutUsNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'ChatUsersScreen'}>
      <Stack.Screen
        name="AboutApplication"
        component={AboutApplication}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PhotoSlider"
        component={PhotoSlider}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoSlider"
        component={VideoSlider}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TextSlider"
        component={TextSlider}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};