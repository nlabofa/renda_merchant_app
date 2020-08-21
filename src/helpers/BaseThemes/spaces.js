import {Dimensions, StatusBar} from 'react-native';

const screen = Dimensions.get('screen');

const spaces = {
  appSpacing: screen.width * (6 / 100),
  statusBarHeight: StatusBar.currentHeight || 40,
  // px10:
};

export default spaces;
