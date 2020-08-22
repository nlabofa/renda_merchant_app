import {StyleSheet, Platform} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';
import FontNames from '../../../helpers/BaseThemes/fontnames';
import {processFontSize} from '../../../helpers/fonts';
import {spaces, colors, Basestyle} from '../../../helpers/BaseThemes';

export default StyleSheet.create({
  button_active: {
    borderRadius: 20,
    height: processFontSize(40),
    width: '45%',
  },
  dashboard_container: {
    height: isIphoneX() || Platform.OS === 'android' ? hp(30) : hp(35),
    width: '100%',
    paddingTop: isIphoneX() ? 50 : 25,
    paddingHorizontal: 20,
    // paddingTop: getStatusBarHeight() + 14,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    //   ...ifIphoneX({
    //     paddingTop: 50
    // }, {
    //     paddingTop: 20
    // })
  },
  bell_icon: {position: 'absolute', right: 0},
  middle_content: {
    marginTop: 40,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  head_bottom: {
    borderTopColor: '#86b9d3',
    marginTop: 15,
    borderTopWidth: 0.4,
  },
  head_bottom_row: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  button_row: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  head_row_text: {
    textAlign: 'center',
    fontFamily: FontNames.bold,
    letterSpacing: 0.085,
    fontSize: processFontSize(17),
    color: '#fff',
  },
  opaq1: {...Basestyle.bold_15, opacity: 0.5},
  opaq2: {...Basestyle.bold_16, color: colors.PRIMARY_BLUE, opacity: 0.5},
  opaq3: {...Basestyle.bold_16, color: colors.PRIMARY_BLUE},
  opaq4: {...Basestyle.bold_13, color: colors.PRIMARY_ORANGE},
  opaq5: {
    ...Basestyle.nunito_bold_16,
    fontSize: 18,
    color: colors.PRIMARY_BLUE,
  },
  opaq6: {
    ...Basestyle.nunito_regular_16,
    fontSize: 17,
    color: colors.PRIMARY_BLACK,
  },
  complaint_row: {flexDirection: 'row', alignItems: 'center', marginBottom: 35},
  dot_single: {position: 'absolute', top: -13, right: 0},
  empty_text: {
    ...Basestyle.bold_15,
    opacity: 0.5,
    textAlign: 'center',
    width: '80%',
    paddingTop: 20,
    lineHeight: 25,
    fontSize: processFontSize(18),
    color: colors.PRIMARY_BLUE,
  },
  empty_view: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  scrollview: {marginHorizontal: spaces.appSpacing, marginBottom: 20},
  head_row: {flexDirection: 'row', justifyContent: 'center'},
});
