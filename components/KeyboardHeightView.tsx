import * as React from 'react';
import {Animated, Keyboard} from 'react-native';

export default function KeyboardHeightView() {
  const heightRef = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    const didShowSubs = Keyboard.addListener('keyboardDidShow', (ev) => {
      Animated.timing(heightRef.current, {
        useNativeDriver: false,
        toValue: ev.endCoordinates.height,
      }).start();
    });

    const didHideSubs = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(heightRef.current, {
        useNativeDriver: false,
        toValue: 0,
      }).start();
    });

    return () => {
      didShowSubs.remove();
      didHideSubs.remove();
    };
  }, []);

  return <Animated.View style={[{height: heightRef.current}]} />;
}
