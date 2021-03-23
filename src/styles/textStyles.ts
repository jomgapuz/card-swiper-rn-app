import {StyleSheet} from 'react-native';

export const smallSize = 14;

export const normalSize = 16;

export const bigSize = 18;

export const biggerSize = 22;

export const bigger2Size = 30;

const textStyles = StyleSheet.create({
  small: {
    fontSize: smallSize,
  },
  normal: {
    fontSize: normalSize,
  },
  big: {
    fontSize: bigSize,
  },
  bigger: {
    fontSize: biggerSize,
  },
  bigger2: {
    fontSize: bigger2Size,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default textStyles;
