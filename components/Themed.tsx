import * as React from 'react';
import {Text as DefaultText, View as DefaultView} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../src/hooks/useColorScheme';
import textStyles from '../src/styles/textStyles';

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}

export function useLocalTheme<T extends object>(themes: {light: T; dark: T}) {
  const theme = useColorScheme();

  return {
    ...Colors[theme],
    ...themes[theme],
  };
}

export function useTheme() {
  const theme = useColorScheme();

  return Colors[theme];
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];

export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return (
    <DefaultText style={[{color}, textStyles.normal, style]} {...otherProps} />
  );
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;

  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background'
  );

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export const ThemeView = View;
