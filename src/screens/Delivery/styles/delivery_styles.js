import {StyleSheet, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//import FontNames from '../../../helpers/BaseThemes/fontnames';
import {processFontSize} from '../../../helpers/fonts';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {spaces, colors, Basestyle} from '../../../helpers/BaseThemes';
import FontNames from '../../../helpers/BaseThemes/fontnames';

export default StyleSheet.create({
  button_active: {
    borderRadius: 20,
    height: processFontSize(40),
    width: '43%',
  },
  middle_content: {
    marginTop: 40,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  datepicker: {
    minHeight: 50,
    position: 'absolute',
    zIndex: 100000000,
    width: '100%',
  },
  imageloader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000000,
  },
  sliderview: {
    width: wp(91),
    alignItems: 'center',
    height: 200,
    marginTop: 10,
    //overflow: 'hidden',
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
    //alignItems: 'center',
    paddingLeft: 20,
    justifyContent: 'center',
    height: '100%',
  },
  dashlist: {
    flexDirection: 'row',
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: processFontSize(30),
  },
  extraheight: {
    height: isIphoneX() || Platform.OS === 'android' ? hp(52) : hp(60),
  },
  opaq1: {...Basestyle.bold_15, opacity: 0.5},
  opaq2: {...Basestyle.bold_16, color: colors.PRIMARY_BLUE, opacity: 0.5},
  opaq3: {...Basestyle.bold_16, color: colors.PRIMARY_BLUE},
  opaq4: {...Basestyle.bold_13, color: colors.PRIMARY_ORANGE},
  opaq5: {
    ...Basestyle.nunito_bold_16,
    fontSize: processFontSize(18),
    color: colors.PRIMARY_BLUE,
  },
  opaq6: {
    ...Basestyle.nunito_regular_16,
    fontSize: processFontSize(17),
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

  /**Updated styles */
  profile_pic_view: {
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 0,
    backgroundColor: '#ffffff50',
    overflow: 'hidden',
  },
  itemlist: {
    flexDirection: 'row',
    alignItems: 'center',
    height: processFontSize(50),
    marginBottom: processFontSize(25),
    marginLeft: -15,
    paddingHorizontal: 25,
    // backgroundColor: 'red',
  },
  activeitem: {
    backgroundColor: '#3990BB',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  activeitemtext: {
    color: '#fff',
  },
  itemimage: {
    width: processFontSize(30),
    height: processFontSize(30),
    marginRight: 15,
  },
  profile_pic_icon: {
    width: '100%',
    height: '100%',
    borderRadius: 50 / 2,
  },
  sidebar_top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  sidebar_topright: {
    marginLeft: 20,
    width: '70%',
  },
  sidebar_bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  sidebar_bottomright: {
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  logouticon: {
    width: processFontSize(20),
    height: processFontSize(20),
    marginRight: 10,
  },
  left_column: {
    //backgroundColor: 'red',
    width: '50%',
    borderRightColor: '#d5e0e4',
    borderRightWidth: 1,
    height: '100%',
  },
  right_column: {
    //backgroundColor: 'red',
    width: '50%',
    height: '100%',
  },
  img_icon: {width: '50%', marginBottom: 5, height: '50%'},
  column_top: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#d5e0e4',
    borderBottomWidth: 1,
    //backgroundColor: 'green',
  },
  column_bottom: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green',
  },
  selection_box: {
    height: hp(55),
    paddingTop: 0,
    flexDirection: 'row',
    paddingHorizontal: 0,
    borderRadius: 12,
  },
  selection_box2: {
    height: '45%',
    paddingTop: processFontSize(20),
    //backgroundColor: 'red',
    //flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  content: {
    justifyContent: 'space-around',
  },
  boxicon: {
    // marginBottom: 20,
    marginTop: 0,
    width: '90%',
  },
  address_row: {
    flexDirection: 'row',
    // height: '40%',
    borderBottomColor: 'green',
    //borderBottomWidth: 1,
    // backgroundColor: 'red',
  },
  location_icon: {marginRight: 10},
  small_icon_text: {
    ...Basestyle.regular_16,
    color: colors.PRIMARY_BLUE,
    fontSize: processFontSize(15),
    paddingBottom: processFontSize(10),
    // paddingTop: 10,
  },
  small_icon_text2: {
    ...Basestyle.nunito_bold_16,
    color: colors.PRIMARY_ORANGE,
    fontSize: processFontSize(13),
  },
  dashed_line2: {
    position: 'absolute',
    left: 3,
    width: 15,
    height: '50%',
  },
  rowleft: {
    color: colors.PRIMARY_BLUE,
    paddingBottom: 0,
    paddingRight: 10,
  },
  delivery_extra: {
    ...Basestyle.nunito_regular_16,
    color: '#203659',
    fontSize: processFontSize(15),
  },
  delivery_extra2: {
    fontFamily: FontNames.nunito_bold,
    color: colors.PRIMARY_INDIGO,
    paddingLeft: 5,
  },
  uploadoption: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 30,
    borderColor: colors.PRIMARY_INDIGO,
    borderStyle: 'dashed',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.SECONDARY_INDIGO,
    height: 60,
  },
  activeupload: {
    backgroundColor: colors.SECONDARY_ORANGE,
    borderColor: colors.PRIMARY_ORANGE,
  },
  row_top_text: {...Basestyle.bold_16, color: '#557993', paddingBottom: 10},
  optionContainer: {
    width: '100%',
    paddingVertical: 12,
    //position: 'absolute',
  },
  optionTextStyle: {
    fontSize: 14,
    fontFamily: FontNames.rubik_medium,
    color: colors.PRIMARY_GREY,
    letterSpacing: 0,
  },
});
