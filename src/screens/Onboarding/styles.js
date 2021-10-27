import {StyleSheet, Dimensions} from 'react-native';
import {processFontSize} from '../../helpers/fonts';
import {colors, spaces, Fontnames, Basestyle} from '../../helpers/BaseThemes';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
  intro_slider: {flex: 1, backgroundColor: '#fff'},
  tap_logo: {
    //backgroundColor: 'green',
    position: 'absolute',
    width: processFontSize(119),
    height: processFontSize(74),
    marginLeft: 30,
  },
  dashed_line: {
    width: wp(40),
    height: hp(15),
    //backgroundColor: 'red',
    position: 'absolute',
    left: wp(-10),
  },
  paginationDots: {
    height: 7,
    width: 15,
    borderRadius: 15 / 2,
    backgroundColor: '#4e7b9f',
    marginLeft: 10,
  },
  activepagination: {
    width: 30,
    height: 7,
    borderRadius: 15 / 2,
    backgroundColor: '#B2C7DB',
    marginLeft: 10,
  },
  top_row: {
    ...Basestyle.row_space_between,
    marginTop: getStatusBarHeight() + 10,
  },
  paginationrow: {
    flexDirection: 'row',
    position: 'absolute',
    // bottom: isIphoneX() ? hp(24) : hp(22),
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.PRIMARY_BLUE,
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  sliderview: {
    width,
    height: '90%',
    marginTop: '20%',
  },
  sliderview_img: {width: '80%', height: '80%', alignSelf: 'center'},
  sliderview_bottom: {
    height: '20%',
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  viewbottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    //backgroundColor: 'red',
    marginHorizontal: spaces.appSpacing,
  },
  headtext: {
    fontSize: processFontSize(19),
    color: colors.PRIMARY_BLUE,
    fontFamily: Fontnames.nunito_bold,
    width: '90%',
    textAlign: 'center',
  },
});
