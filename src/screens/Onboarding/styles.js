import {StyleSheet, Dimensions} from 'react-native';
import {processFontSize} from '../../helpers/fonts';
import {colors, spaces, Fontnames, Basestyle} from '../../helpers/BaseThemes';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
  intro_slider: {flex: 1, backgroundColor: colors.PRIMARY_BLUE},
  tap_logo: {
    width: processFontSize(96),
    height: processFontSize(41),
    marginRight: 30,
  },
  dashed_line: {
    width: '50%',
    //backgroundColor: 'red',
    height: 7,
  },
  paginationDots: {
    height: 7,
    width: 15,
    borderRadius: 15 / 2,
    backgroundColor: '#fff',
    opacity: 0.2,
    marginLeft: 10,
  },
  activepagination: {opacity: 1, width: 30},
  top_row: {
    ...Basestyle.row_space_between,
    marginTop: 10,
  },
  paginationrow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: isIphoneX() ? hp(27) : hp(22),
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.BG_Color,
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  sliderview: {
    width,
    height: '90%',
    marginTop: '2%',
  },
  sliderview_img: {width: '90%', height: '80%', alignSelf: 'center'},
  sliderview_bottom: {
    height: '20%',
    width: '100%',
    marginTop: 40,
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
    color: '#fff',
    fontFamily: Fontnames.nunito_bold,
    width: '90%',
    textAlign: 'center',
  },
});
