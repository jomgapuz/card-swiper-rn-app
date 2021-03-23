import {Foundation, Ionicons} from '@expo/vector-icons';
import * as React from 'react';
import {Image, View} from 'react-native';
import {
  Text,
  ThemeView,
  useLocalTheme,
  ViewProps,
} from '../../components/Themed';
import textStyles, {normalSize, smallSize} from '../../src/styles/textStyles';
import viewStyles from '../../src/styles/viewStyles';

export type CardData = {
  key: string;
  type: 'ad' | 'post';
  title: string;
  message: string;
  promoText: string;
  supplierName: string;
  budget: string;
  imageUri: Image['props']['source'];
  duration: string;
};

export type CardProps = {
  data: CardData;
  style?: ViewProps['style'];
  width?: number;
  height?: number;
};

export const maxCardSize = 400;

export const cardMargin = normalSize;

const Card = ({
  data: {
    duration,
    title,
    message,
    promoText,
    type,
    supplierName,
    budget,
    imageUri,
  },
  height,
  width,
}: CardProps) => {
  const {borderColor, text: textColor} = useLocalTheme({
    light: {borderColor: 'transparent'},
    dark: {borderColor: '#8888'},
  });

  const borderRadius = cardMargin / 2;

  return (
    <ThemeView
      darkColor="#333"
      style={[
        viewStyles.shadow1,
        {
          // margin: cardMargin,
          borderRadius,
          borderWidth: 1,
          borderColor,
        },
        height
          ? {
              height,
            }
          : null,
        width
          ? {
              width,
            }
          : null,
      ]}
    >
      <View
        style={[
          viewStyles.flex,
          {
            flex: 1,
            margin: -1,
            borderRadius,
            overflow: 'hidden',
          },
        ]}
      >
        <View
          style={[
            viewStyles.row,
            viewStyles.centerItems,
            viewStyles.px1,
            {height: smallSize * 3},
          ]}
        >
          {type === 'ad' ? (
            <>
              <View
                style={[
                  {
                    height: smallSize * 3,
                    width: 26,
                    // backgroundColor: '#0002',
                  },
                  viewStyles.centerItems,
                  viewStyles.mr05,
                ]}
              >
                <Foundation name="megaphone" size={32} color={textColor} />
              </View>

              <Text style={[textStyles.small]}>{'Ad'}</Text>
            </>
          ) : null}

          {type === 'post' ? (
            <>
              <View
                style={[
                  {
                    height: smallSize * 3,
                    width: 26,
                    // backgroundColor: '#0002',
                  },
                  viewStyles.centerItems,
                  viewStyles.mr05,
                ]}
              >
                <Ionicons name="ios-newspaper" size={26} color={textColor} />
              </View>

              <Text style={[textStyles.small]}>{'Post'}</Text>
            </>
          ) : null}

          <View style={[viewStyles.flex]} />

          <Text style={[textStyles.small]}>{duration}</Text>
        </View>

        <Text
          style={[
            viewStyles.px1,
            viewStyles.mb05,
            textStyles.bigger,
            textStyles.bold,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[viewStyles.px1, viewStyles.mb05, textStyles.normal]}
          numberOfLines={2}
        >
          {message}
        </Text>

        <View style={{borderTopWidth: 1, borderTopColor: '#8884'}} />

        <View style={[viewStyles.m1, viewStyles.flex]}>
          <Image
            source={imageUri}
            style={[
              viewStyles.flex,
              {width: '100%', borderRadius: normalSize / 2},
            ]}
            resizeMode="cover"
          />
        </View>

        <Text
          style={[viewStyles.px1, viewStyles.mb05, textStyles.normal]}
          numberOfLines={2}
        >
          {promoText}
        </Text>

        <View
          style={[
            viewStyles.row,
            viewStyles.mx1,
            viewStyles.mb1,
            viewStyles.mt05,
          ]}
        >
          <View>
            <Text
              style={[textStyles.bold, textStyles.normal, viewStyles.mb025]}
              numberOfLines={1}
            >
              {'Supplier'}
            </Text>
            <Text style={[textStyles.normal]} numberOfLines={1}>
              {supplierName}
            </Text>
          </View>

          <View style={[viewStyles.flex]} />

          <View style={[{alignItems: 'flex-end'}]}>
            <Text
              style={[textStyles.bold, textStyles.normal, viewStyles.mb025]}
              numberOfLines={1}
            >
              {'Budget'}
            </Text>
            <Text style={[textStyles.normal]} numberOfLines={1}>
              {budget}
            </Text>
          </View>
        </View>
      </View>
    </ThemeView>
  );
};

export default Card;
