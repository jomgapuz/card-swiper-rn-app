import {LinkingOptions} from '@react-navigation/native';
import * as Linking from 'expo-linking';

const linkingOptions: LinkingOptions = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      Auth: 'login',
      CampaignOrders: 'campaign-orders',
      NotFound: '*',
    },
  },
};

export default linkingOptions;
