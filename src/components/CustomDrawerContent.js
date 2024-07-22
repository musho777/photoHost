import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

export const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => alert('Link to Help')}
      />
    </DrawerContentScrollView>
  );
}