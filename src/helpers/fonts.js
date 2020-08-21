import {PixelRatio, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

// iPhone 11 Pro Max - (width: 414)

export const processFontSize = (size) => {
  let num = size * (screenWidth / 400);
  if (screenWidth < 340) {
    num = num + 2;
  }
  const newSize = PixelRatio.roundToNearestPixel(num);
  return newSize;
};
