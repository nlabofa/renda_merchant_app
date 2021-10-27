import {StyleSheet} from 'react-native';

import {colors, Basestyle, Fontnames} from '../../helpers/BaseThemes';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {processFontSize} from '../../helpers/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.BG_Color,
    overflow: 'visible',
    height: '100%',
    flex: 1,
  },
  checkbox_div: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox_text: {
    ...Basestyle.rubik_medium_15,
    color: colors.PRIMARY_BLUE_02,
    width: '90%',
  },
  checkbox_und: {
    color: colors.PRIMARY_BLUE,
    textDecorationLine: 'underline',
  },
  otptoptext: {
    ...Basestyle.nunito_regular_16,
    textAlign: 'center',
    color: colors.PRIMARY_BLUE,
  },
  logo_icon: {width: 119, height: 67},
  arc: {
    position: 'absolute',
    width: '120%',
    height: '100%',
    top: -110,
    //zIndex: -100,
    //zIndex: -10000000000,
    overflow: 'visible',
  },
  bottom_img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: heightPercentageToDP(-35),
    overflow: 'visible',
  },
  forgot_pass: {
    ...Basestyle.nunito_bold_13,
    alignSelf: 'flex-end',
    paddingTop: 20,
    color: colors.PRIMARY_RED,
  },
  modal_content: {
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 10,
    width: '80%',
    //alignItems: 'center',
    paddingVertical: 30,
    alignSelf: 'center',
    minHeight: heightPercentageToDP(30),
  },
  dropdown_inputext: {
    fontSize: 17,
    fontFamily: Fontnames.semibold,
    // marginHorizontal: -15,
  },
  dropdown_container: {
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  message_icon: {width: 78, height: 78, alignSelf: 'center'},
  message_text: {
    ...Basestyle.nunito_regular_16,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  message_bottom: {
    borderTopColor: colors.PRIMARY_GREY_03,
    borderTopWidth: 1,
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  signup_text_sm: {
    ...Basestyle.nunito_regular_16,
    fontSize: processFontSize(15),
    color: colors.PRIMARY_BLUE,
    textAlign: 'center',
  },
  hr_sm: {
    backgroundColor: 'rgba(27, 84, 128, 0.3)',
    height: 1,
    width: '17%',
  },
  line_row: {
    marginTop: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  continue_btn: {
    ...Basestyle.nunito_bold_16,
    color: colors.PRIMARY_ORANGE,
    paddingTop: 20,
    textAlign: 'center',
  },
});
