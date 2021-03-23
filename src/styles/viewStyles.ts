import {StyleSheet} from 'react-native';
import {normalSize} from './textStyles';

const spaceStyles = StyleSheet.create({
  mb025: {
    marginBottom: normalSize * 0.25,
  },

  mb05: {
    marginBottom: normalSize * 0.5,
  },

  mx05: {
    marginLeft: normalSize * 0.5,
    marginRight: normalSize * 0.5,
  },

  mr05: {
    marginRight: normalSize * 0.5,
  },

  mt05: {
    marginTop: normalSize * 0.5,
  },

  mt1: {
    marginTop: normalSize,
  },

  mt2: {
    marginTop: normalSize * 2,
  },

  mb1: {
    marginBottom: normalSize,
  },

  mb2: {
    marginBottom: normalSize * 2,
  },

  mx1: {
    marginLeft: normalSize,
    marginRight: normalSize,
  },

  my1: {
    marginTop: normalSize,
    marginBottom: normalSize,
  },

  px05: {
    paddingLeft: normalSize * 0.5,
    paddingRight: normalSize * 0.5,
  },

  py1: {
    paddingTop: normalSize,
    paddingBottom: normalSize,
  },

  px1: {
    paddingLeft: normalSize,
    paddingRight: normalSize,
  },

  py2: {
    paddingTop: normalSize * 2,
    paddingBottom: normalSize * 2,
  },

  px2: {
    paddingLeft: normalSize * 2,
    paddingRight: normalSize * 2,
  },

  py3: {
    paddingTop: normalSize * 3,
    paddingBottom: normalSize * 3,
  },

  px3: {
    paddingLeft: normalSize * 3,
    paddingRight: normalSize * 3,
  },
});

const viewStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  centerItems: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  ...spaceStyles,

  m1: {
    ...spaceStyles.mx1,
    ...spaceStyles.my1,
  },

  p1: {
    ...spaceStyles.py1,
    ...spaceStyles.px1,
  },

  p2: {
    ...spaceStyles.py2,
    ...spaceStyles.px2,
  },

  p3: {
    ...spaceStyles.py3,
    ...spaceStyles.px3,
  },

  shadow1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  shadow2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  shadow3: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});

export default viewStyles;
