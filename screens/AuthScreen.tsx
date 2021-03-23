import {useDimensions} from '@react-native-community/hooks';
import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import KeyboardHeightView from '../components/KeyboardHeightView';
import CompanyLogoSVG from '../components/svgs/CompanyLogoSVG';
import TextInput from '../components/TextInput';
import {Text, ThemeView, useTheme} from '../components/Themed';
import useAuth from '../src/hooks/swr/auth.swr';
import textStyles from '../src/styles/textStyles';
import viewStyles from '../src/styles/viewStyles';

const AuthScreen = () => {
  const {
    window: {height: windowHeight},
  } = useDimensions();

  const emailRef = React.useRef('');
  const passwordRef = React.useRef('');

  const {text: textColor} = useTheme();

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <ThemeView
        style={{
          minHeight: windowHeight,
        }}
      >
        <SafeAreaView style={viewStyles.flex}>
          <View
            style={[viewStyles.p3, viewStyles.centerItems, viewStyles.flex]}
          >
            <CompanyLogoSVG fill={textColor} height={64} width={2.91 * 64} />
          </View>

          <View
            style={[
              viewStyles.px2,
              viewStyles.py3,
              viewStyles.centerItems,
              viewStyles.flex,
            ]}
          >
            <Text style={[viewStyles.mb1, textStyles.small]}>
              <Text style={[textStyles.bold]}>{'Preview:'}</Text>
              {' Type any email/username and password'}
            </Text>

            <View
              style={{
                minWidth: 250,
              }}
            >
              <TextInput
                defaultValue={emailRef.current}
                keyboardType="email-address"
                placeholder="Type email/username"
                onChangeText={(text) => {
                  emailRef.current = text;
                }}
              />

              <TextInput
                defaultValue={passwordRef.current}
                placeholder="Type password"
                secureTextEntry
                onChangeText={(text) => {
                  passwordRef.current = text;
                }}
              />

              <View style={[viewStyles.row]}>
                <LoginButton
                  onLogin={() => [emailRef.current, passwordRef.current]}
                />
              </View>
            </View>
          </View>

          <KeyboardHeightView />
        </SafeAreaView>
      </ThemeView>
    </ScrollView>
  );
};

export default AuthScreen;

function LoginButton({
  onLogin = () => [],
}: {
  onLogin?: () => [email?: string, password?: string];
}) {
  const auth = useAuth();

  const handleLogin = (email?: string, password?: string) => {
    if (!(email && password)) {
      auth.showLoginErrorToast();

      return;
    }

    auth
      .login({
        email,
        password,
      })
      .then((res) => {
        if (res && res.token) {
          return;
        }

        auth.showLoginErrorToast();
      });
  };

  return (
    <Button
      text="Login"
      onPress={() => {
        if (onLogin) {
          handleLogin(...onLogin());
        }
      }}
    />
  );
}
