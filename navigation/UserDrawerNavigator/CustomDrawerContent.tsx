import * as React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View} from 'react-native';
import useAuth from '../../src/hooks/swr/auth.swr';
import Button, {WhiteButtonPreset} from '../../components/Button';
import viewStyles from '../../src/styles/viewStyles';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={[viewStyles.px1, viewStyles.mt1]}>
        <LogoutButton />
      </View>
    </DrawerContentScrollView>
  );
}

function LogoutButton() {
  const {logout} = useAuth();

  return <Button {...WhiteButtonPreset} text="Logout" onPress={logout} />;
}
