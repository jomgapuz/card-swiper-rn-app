import * as React from 'react';
import {Animated} from 'react-native';

export type WithChildren = {
  children?: React.ReactNode;
};

export type AnimatedViewProps = React.ComponentProps<typeof Animated.View>;

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  CampaignOrders: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
