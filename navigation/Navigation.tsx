import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import AuthChecker from '../components/AuthChecker';

import AuthScreen from '../screens/AuthScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import useColorScheme from '../src/hooks/useColorScheme';
import LinkingOptions from './LinkingOptions';
import {RootStackParamList} from './navigation.types';
import UserDrawerNavigator from './UserDrawerNavigator';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      linking={LinkingOptions}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isLoggedIn, setIsLogged] = React.useState(
    () => undefined as undefined | boolean
  );

  return (
    <>
      <AuthChecker
        onIsLoggedIn={(value) => {
          if (isLoggedIn !== value) {
            setIsLogged(value);
          }
        }}
      />
      {isLoggedIn !== undefined ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isLoggedIn ? (
            <Stack.Screen
              name="UserDrawer"
              options={{title: 'User'}}
              component={UserDrawerNavigator}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              options={{title: 'Login'}}
              component={AuthScreen}
            />
          )}
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{title: 'Oops!'}}
          />
        </Stack.Navigator>
      ) : null}
    </>
  );
};
