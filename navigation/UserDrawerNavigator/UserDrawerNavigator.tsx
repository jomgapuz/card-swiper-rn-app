import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import CampaignOrdersScreen from '../../screens/campaign-orders/CampaignOrdersScreen';
import {UserDrawerParamList} from '../navigation.types';
import CustomDrawerContent from './CustomDrawerContent';

const {Navigator, Screen} = createDrawerNavigator<UserDrawerParamList>();

export default function UserDrawerNavigator() {
  return (
    <Navigator
      drawerContent={(drawerContentProps) => {
        return <CustomDrawerContent {...drawerContentProps} />;
      }}
      drawerPosition="right"
    >
      <Screen
        name="CampaignOrders"
        options={{title: 'Home'}}
        component={CampaignOrdersScreen}
      />
    </Navigator>
  );
}
