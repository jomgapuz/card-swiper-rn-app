import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function CompanyIconSVG(props: SvgProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="#888" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0h40v40H0V0zm24.727 31.585h4.639L29.369 9h-4.653l-9.063 14.856V9H11v22.585h4.653l9.074-14.893v14.893z"
      />
    </Svg>
  );
}

export default CompanyIconSVG;
