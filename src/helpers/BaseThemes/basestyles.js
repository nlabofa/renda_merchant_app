import {StyleSheet} from 'react-native';
import {processFontSize} from '../fonts';

import colors from './colors';
import FontNames from './fontnames';
import spaces from './spaces';

export default StyleSheet.create({
  container: {backgroundColor: colors.BG_Color, flex: 1},
  hitSlop: {top: 10, bottom: 10, left: 10, right: 10},
  container_with_space: {
    backgroundColor: colors.BG_Color,
    flex: 1,
    paddingHorizontal: spaces.appSpacing,
  },
  textarea: {height: 90, paddingVertical: 10},
  extra_box2: {
    paddingTop: 10,
    // minHeight: heightPercentageToDP(50)
  },
  box_full: {
    width: '100%',
    height: '100%',
  },
  btn_small: {marginBottom: 40, marginTop: 10, width: '46%'},
  btn_full: {marginBottom: 40, marginTop: 10, width: '100%'},
  row_space_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row_center: {flexDirection: 'row', alignItems: 'center'},
  button_active: {
    borderRadius: 20,
    height: 40,
    width: '40%',
  },
  round_box: {
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 35,
    borderRadius: 20,
    backgroundColor: '#fff',
    //borderColor: 'rgba(0, 0, 0, 0.05)',
    // IOS
    shadowColor: '#E6E6E6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,

    // ANDROID
    elevation: 1,
    borderWidth: 0.4,
    borderTopWidth: 0.5,
    borderColor: '#E6E6E6',
  },
  otp_input: {
    borderRadius: 5,
    backgroundColor: '#fff',
    color: colors.PRIMARY_BLUE,
    fontFamily: FontNames.bold,
    //borderColor: 'rgba(0, 0, 0, 0.05)',
    // IOS
    shadowColor: '#E6E6E6',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,

    // ANDROID
    elevation: 1,
    borderWidth: 0.4,
    borderTopWidth: 0.5,
    borderColor: '#E6E6E6',
  },

  //font sizing
  nunito_regular_13: {
    fontFamily: FontNames.nunito_regular,
    fontSize: processFontSize(13),
    color: '#fff',
  },
  nunito_bold_13: {
    fontFamily: FontNames.nunito_bold,
    fontSize: processFontSize(13),
    color: '#fff',
  },
  nunito_bold_16: {
    fontFamily: FontNames.nunito_bold,
    fontSize: processFontSize(16),
    color: '#fff',
  },
  nunito_regular_16: {
    fontFamily: FontNames.nunito_regular,
    fontSize: processFontSize(16),
    color: '#fff',
  },
  rubik_regular_16: {
    fontFamily: FontNames.rubik_regular,
    fontSize: processFontSize(16),
    color: '#fff',
  },
  rubik_medium_15: {
    fontFamily: FontNames.rubik_medium,
    fontSize: processFontSize(15),
    color: '#fff',
  },

  //sf-pro
  light_16: {
    fontFamily: FontNames.light,
    fontSize: processFontSize(16),
    color: '#fff',
  },
  regular_13: {
    fontFamily: FontNames.regular,
    fontSize: processFontSize(13),
    color: '#fff',
  },

  regular_16: {
    fontFamily: FontNames.regular,
    fontSize: processFontSize(16),
    color: '#fff',
  },
  bold_13: {
    fontFamily: FontNames.bold,
    fontSize: processFontSize(13),
    color: '#fff',
  },
  bold_14: {
    fontFamily: FontNames.bold,
    fontSize: processFontSize(14),
    color: '#fff',
  },
  bold_15: {
    fontFamily: FontNames.bold,
    fontSize: processFontSize(15),
    color: '#fff',
  },
  bold_16: {
    fontFamily: FontNames.bold,
    fontSize: processFontSize(16),
    color: '#fff',
  },
  bold_17: {
    fontFamily: FontNames.bold,
    fontSize: processFontSize(17),
    color: '#fff',
  },
  bold_35: {
    fontFamily: FontNames.bold,
    fontSize: processFontSize(35),
    color: '#fff',
  },
  bold_40: {
    fontFamily: FontNames.bold,
    fontSize: processFontSize(40),
    color: '#fff',
  },
});
