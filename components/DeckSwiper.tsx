import {useLayout} from '@react-native-community/hooks';
import * as React from 'react';
import {LayoutRectangle, View} from 'react-native';
import Swiper, {SwiperProps} from 'react-native-deck-swiper';
import useState from '../src/hooks/useState';
import {isDefined} from '../src/tools/checkers';
import EnsureRender from './EnsureRender';

export type DeckSwiperRefObject<T> = Swiper<T> | null;

export type DeckSwiperProps<T> = Omit<SwiperProps<T>, 'renderCard'> & {
  swiperRef: React.MutableRefObject<DeckSwiperRefObject<T>>;
  onLayout?: View['props']['onLayout'];
  style?: View['props']['style'];
  renderCard?: (
    // eslint-disable-next-line no-unused-vars
    data: T,
    // eslint-disable-next-line no-unused-vars
    cardIndex: number,
    // eslint-disable-next-line no-unused-vars
    layout: LayoutRectangle
  ) => React.ReactElement;
  onUnmount?: () => void;
};

export default function DeckSwiper<T>({
  swiperRef,
  onLayout: onLayoutProp = () => {},
  style,
  renderCard = () => <></>,
  onSwiped = () => {},
  cards,
  cardIndex,
  onUnmount = () => {},
  ...props
}: DeckSwiperProps<T>) {
  const [, rerender] = useState(() => 0);
  const {onLayout, ...layout} = useLayout();

  const indexRef = React.useRef(0);

  const intervalRef = React.useRef<ReturnType<typeof setTimeout>>();

  const resetTimeout = () => {
    const interval = intervalRef.current;

    if (interval) {
      clearTimeout(interval);
    }

    const newInterval = setTimeout(() => {
      rerender((v) => v + 1);
    }, 7500);

    intervalRef.current = newInterval;

    return newInterval;
  };

  React.useEffect(() => {
    const newInterval = resetTimeout();

    return () => {
      onUnmount();
      clearTimeout(newInterval);
    };
  }, [onUnmount]);

  return (
    <View
      onLayout={(ev) => {
        onLayout(ev);
        onLayoutProp(ev);
      }}
      style={style}
    >
      <EnsureRender>
        {() => (
          <Swiper<T>
            ref={swiperRef}
            renderCard={(data, index) => renderCard(data, index, layout)}
            cardIndex={isDefined(cardIndex) ? cardIndex : indexRef.current}
            onSwiped={(index) => {
              indexRef.current = (index + 1) % cards.length;

              resetTimeout();

              onSwiped(index);
            }}
            cards={cards}
            {...props}
          />
        )}
      </EnsureRender>
    </View>
  );
}
