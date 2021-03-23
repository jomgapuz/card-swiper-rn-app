/* eslint-disable no-underscore-dangle */
import {Ionicons} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button, {
  BigWhiteButtonPreset,
  defaultButtonHeight,
  WhiteButtonPreset,
} from '../../components/Button';
import DeckSwiper, {DeckSwiperRefObject} from '../../components/DeckSwiper';
import CompanyIconSVG from '../../components/svgs/CompanyIconSVG';
import {ThemeView, useLocalTheme} from '../../components/Themed';
import {UserDrawerScreenProps} from '../../navigation/navigation.types';
import viewStyles from '../../src/styles/viewStyles';
import Card, {CardData, cardMargin} from './Card';

import postImage from '../../assets/images/static/campaign-order/post-image.png';

export type CampaignOrdersScreenProps = UserDrawerScreenProps<'CampaignOrders'>;

const CampaignOrdersScreen = observer(
  ({navigation}: CampaignOrdersScreenProps) => {
    const {text: textColor, bg1} = useLocalTheme({
      light: {bg1: '#00000008'},
      dark: {bg1: '#0004'},
    });

    return (
      <ThemeView style={[viewStyles.flex]}>
        <SafeAreaView style={[viewStyles.flex, {backgroundColor: bg1}]}>
          <View style={[viewStyles.row, viewStyles.mt1]}>
            <CompanyIconSVG style={[viewStyles.mx1]} fill={textColor} />

            <View style={[viewStyles.flex]} />

            <View>
              <Button
                noFlex
                {...WhiteButtonPreset}
                light={{
                  ...WhiteButtonPreset.light,
                  backgroundColor: 'transparent',
                  style: [
                    {
                      shadowColor: undefined,
                      shadowOffset: undefined,
                      shadowOpacity: undefined,
                      shadowRadius: undefined,
                      elevation: undefined,
                      width: defaultButtonHeight,
                    },
                    viewStyles.mx05,
                  ],
                  animatedViewStyle: {
                    borderColor: 'transparent',
                  },
                }}
                dark={{
                  ...WhiteButtonPreset.dark,
                  backgroundColor: 'transparent',
                }}
                onPress={() => {
                  navigation.openDrawer();
                }}
                node={() => {
                  const iconSize = 44;

                  return (
                    <Ionicons
                      name="menu-outline"
                      size={iconSize}
                      color={textColor}
                      style={{
                        marginTop: -iconSize * 0.25,
                        marginBottom: -iconSize * 0.25,
                        marginLeft: -iconSize * 0.1,
                        marginRight: -iconSize * 0.2,
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>

          <View style={[viewStyles.flex, viewStyles.mb1]}>
            <CampaignOrdersSwiper />
          </View>
        </SafeAreaView>
      </ThemeView>
    );
  }
);

export default CampaignOrdersScreen;

const CampaignOrdersSwiper = () => {
  // const dimensions = useDimensions();

  // const {
  //   window: {height: windowHeight, width: windowWidth},
  // } = dimensions;

  // const [, cardSize] = React.useMemo(() => {
  //   const finalDeckSize = Math.min(windowHeight, windowWidth, maxCardSize);

  //   const finalCardSize = finalDeckSize - cardMargin * 2;

  //   return [finalDeckSize, finalCardSize] as [
  //     deckSize: number,
  //     cardSize: number
  //   ];
  // }, [windowHeight, windowWidth]);

  const swiperRef = React.useRef<DeckSwiperRefObject<CardData>>(null);

  const isSwipingRef = React.useRef(false);

  const isSwipingTimeoutRef = React.useRef<ReturnType<typeof setInterval>>();

  const delayNextSwipe = () => {
    if (isSwipingTimeoutRef.current) {
      clearTimeout(isSwipingTimeoutRef.current);
    }

    isSwipingRef.current = true;

    isSwipingTimeoutRef.current = setTimeout(() => {
      isSwipingRef.current = false;
    }, 1000 / 3);
  };

  const getIsSwiping = () => {
    if (isSwipingRef.current) {
      return true;
    }

    delayNextSwipe();

    return false;
  };

  return (
    <>
      <DeckSwiper
        swiperRef={swiperRef}
        cards={deckData}
        showSecondCard
        infinite
        style={[viewStyles.flex]}
        backgroundColor="transparent"
        cardVerticalMargin={0}
        cardHorizontalMargin={cardMargin}
        stackSize={Math.min(3, Math.max(deckData.length, 1))}
        verticalSwipe={false}
        onSwiping={() => {
          isSwipingRef.current = true;
        }}
        onSwipedAborted={() => {
          isSwipingRef.current = false;
        }}
        onSwiped={() => {
          delayNextSwipe();
        }}
        onUnmount={() => {
          delayNextSwipe();
        }}
        renderCard={(data, i, layout) => {
          return (
            <Card
              data={data}
              height={layout.height - cardMargin}
              width={layout.width - cardMargin * 2}
            />
          );
        }}
      />

      <View style={[viewStyles.row, viewStyles.mt2, viewStyles.px1]}>
        <Button
          noFlex
          {...BigWhiteButtonPreset}
          node={() => <Ionicons name="close" size={44} color="#EE8366" />}
          onPress={() => {
            if (getIsSwiping()) {
              return;
            }

            swiperRef.current?.swipeLeft();
          }}
        />

        <View style={[viewStyles.flex]} />

        <Button
          noFlex
          {...BigWhiteButtonPreset}
          node={() => {
            const size = 36;

            return (
              <Ionicons
                name="heart"
                size={size}
                color="#67DAA6"
                style={{
                  marginBottom: -size * 0.1,
                }}
              />
            );
          }}
          onPress={() => {
            if (getIsSwiping()) {
              return;
            }

            swiperRef.current?.swipeRight();
          }}
        />
      </View>
    </>
  );
};

const deckData: CardData[] = [
  {
    key: '0',
    type: 'ad',
    title: 'Coca-cola',
    message:
      'We would like to promote our new coca cola cherry vanilla taste through your pages.',
    promoText:
      "Come and enjoy Coca-Cola Cherry Vanilla Zero Sugar's crisp, delicious taste at our store.",
    supplierName: 'JFT Inc.',
    budget: '$4/day',
    imageUri: postImage,
    duration: 'Mar 3, 2021 - Apr. 4, 2021',
  },
  {
    key: '1',
    type: 'ad',
    title: 'Pepsi',
    message:
      'We would like to promote our new coca cola cherry vanilla taste through your pages.',
    promoText:
      "Come and enjoy Coca-Cola Cherry Vanilla Zero Sugar's crisp, delicious taste at our store.",
    supplierName: 'PQR Inc.',
    budget: '$10/mo.',
    imageUri: postImage,
    duration: 'May 5, 2021 - June 5, 2021',
  },
  {
    key: '2',
    type: 'post',
    title: 'Nike',
    message:
      'We would like to promote our new coca cola cherry vanilla taste through your pages.',
    promoText:
      "Come and enjoy Coca-Cola Cherry Vanilla Zero Sugar's crisp, delicious taste at our store.",
    supplierName: 'Foot Inc.',
    budget: '$999/yr.',
    imageUri: postImage,
    duration: 'Feb 2, 2021 - Feb 2, 2026',
  },
  {
    key: '3',
    type: 'post',
    title: 'Apple MacBook Air (M1)',
    message:
      'We would like to promote our new coca cola cherry vanilla taste through your pages.',
    promoText:
      "Come and enjoy Coca-Cola Cherry Vanilla Zero Sugar's crisp, delicious taste at our store.",
    supplierName: 'Power Mac Center',
    budget: '$99/mo.',
    imageUri: postImage,
    duration: 'Mar 3, 2021 - Dec. 4, 2021',
  },
];
