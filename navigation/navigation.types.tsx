import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  UserDrawer: undefined;
  NotFound: undefined;
};

export type UserDrawerParamList = {
  CampaignOrders: undefined;
};

export type UserDrawerNavigationProp<
  Screen extends keyof UserDrawerParamList
> = CompositeNavigationProp<
  DrawerNavigationProp<UserDrawerParamList, Screen>,
  StackNavigationProp<RootStackParamList>
>;

export type UserDrawerScreenProps<Screen extends keyof UserDrawerParamList> = {
  navigation: UserDrawerNavigationProp<Screen>;
  route: RouteProp<UserDrawerParamList, Screen>;
};
