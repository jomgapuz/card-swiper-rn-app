import * as React from 'react';
import {View} from 'react-native';
import Svg, {SvgProps, Path} from 'react-native-svg';
import viewStyles from '../../src/styles/viewStyles';
import {Text} from '../Themed';

function CompanyLogoSVG({fill = '#000', ...props}: SvgProps) {
  // NOTE obfuscated/added for preview purposes
  return (
    <View
      style={[
        viewStyles.centerItems,
        {backgroundColor: '#8888', height: 64, width: 64 * 2.91},
      ]}
    >
      <Text>{'Company Logo'}</Text>
    </View>
  );
}

export default CompanyLogoSVG;
