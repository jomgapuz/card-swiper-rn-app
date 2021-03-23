import * as React from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {normalSize} from '../src/styles/textStyles';
import viewStyles from '../src/styles/viewStyles';
import {useLocalTheme} from './Themed';

export type TextInputProps = RNTextInput['props'];

export default function TextInput({style, ...props}: TextInputProps) {
  const {
    background: backgroundColor,
    text: textColor,
    borderColor,
  } = useLocalTheme({
    light: {borderColor: 'transparent'},
    dark: {borderColor: '#8888'},
  });

  return (
    <RNTextInput
      placeholderTextColor="#888"
      style={[
        {
          borderWidth: 1,
          borderColor,
          height: normalSize * 3,
          borderRadius: normalSize * 1.5,
          color: textColor,
          backgroundColor,
        },
        viewStyles.px1,
        viewStyles.mb1,
        viewStyles.shadow1,
        style,
      ]}
      {...props}
    />
  );
}
