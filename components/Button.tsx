import * as React from 'react';
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import useColorScheme from '../src/hooks/useColorScheme';
import textStyles, {normalSize} from '../src/styles/textStyles';
import viewStyles from '../src/styles/viewStyles';
import {AnimatedViewProps} from '../src/types/types';

export const defaultButtonHeight = normalSize * 3;

export const defaultButtonRadius = defaultButtonHeight / 2;

export const defaultBigButtonHeight = normalSize * 4;

export const defaultBigButtonRadius = defaultBigButtonHeight / 2;

export type ButtonThemeProp = {
  inactiveBackgroundColor?: string;
  activeBackgroundColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  style?: View['props']['style'];
  textStyle?: Text['props']['style'];
  animatedViewStyle?: AnimatedViewProps['style'];
};

export type ButtonProps = {
  light?: ButtonThemeProp;
  dark?: ButtonThemeProp;
  noFlex?: boolean;
  borderRadius?: number;
  onPress?: (
    // eslint-disable-next-line no-unused-vars
    ev: GestureResponderEvent
  ) => void;
  text?: string;
  node?: (
    // eslint-disable-next-line no-unused-vars
    props: Omit<Omit<ButtonProps, 'dark'>, 'light'> & {theme?: ButtonThemeProp}
  ) => React.ReactNode;
};

export default function Button(props: ButtonProps) {
  const {
    text = 'Submit',
    node,
    onPress,
    noFlex = false,
    borderRadius = defaultButtonRadius,
    dark = {},
    light = {},
  } = props;

  const scheme = useColorScheme();

  const animatedValueRef = React.useRef(new Animated.Value(0));

  const theme =
    scheme === 'dark'
      ? {
          ...light,
          ...dark,
        }
      : light;

  const {
    style,
    textStyle,
    animatedViewStyle,
    inactiveBackgroundColor = '#fff0',
    activeBackgroundColor = '#fff4',
    backgroundColor = '#4839eb',
    borderColor = '#8882',
  } = theme;

  const animatedBackgroundColor = animatedValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveBackgroundColor, activeBackgroundColor],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        animatedValueRef.current.setValue(1);
      }}
      onPressOut={() => {
        Animated.timing(animatedValueRef.current, {
          useNativeDriver: false,
          toValue: 0,
          duration: 1000 / 12,
        }).start();
      }}
      style={[
        viewStyles.mb1,
        noFlex ? null : viewStyles.flex,
        viewStyles.shadow2,
        {
          borderRadius,
          backgroundColor,
          height: defaultButtonHeight,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          viewStyles.centerItems,
          viewStyles.flex,
          {
            borderRadius,
            overflow: 'hidden',
            backgroundColor: animatedBackgroundColor,
            borderColor,
            borderWidth: 1,
          },
          animatedViewStyle,
        ]}
      >
        {node ? (
          node({...props, theme})
        ) : (
          <Text
            style={[
              {
                color: '#fff',
              },
              textStyles.normal,
              textStyle,
            ]}
          >
            {text}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

export const WhiteButtonPreset = {
  light: {
    inactiveBackgroundColor: '#0000',
    activeBackgroundColor: '#0002',
    backgroundColor: '#fff',
    textStyle: {
      color: '#000',
    },
  },
  dark: {
    inactiveBackgroundColor: '#fff0',
    activeBackgroundColor: '#fff2',
    backgroundColor: '#333',
    textStyle: {
      color: '#fff',
    },
  },
};

export const BigButtonPreset = {
  borderRadius: defaultBigButtonRadius,
  light: {
    style: [
      viewStyles.shadow3,
      {
        height: defaultBigButtonHeight,
        minWidth: defaultBigButtonHeight,
      },
    ],
    borderColor: '#8884',
  },
  dark: {
    borderColor: '#8888',
  },
};

export const BigWhiteButtonPreset = {
  ...WhiteButtonPreset,
  ...BigButtonPreset,
  light: {
    ...WhiteButtonPreset.light,
    ...BigButtonPreset.light,
  },
  dark: {
    ...WhiteButtonPreset.dark,
    ...BigButtonPreset.dark,
  },
};
