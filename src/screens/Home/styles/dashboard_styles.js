import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
//import FontNames from '../../../helpers/BaseThemes/fontnames';
import {processFontSize} from '../../../helpers/fonts';
import {spaces, colors, Basestyle} from '../../../helpers/BaseThemes';

export default StyleSheet.create({
  button_active: {
    borderRadius: 20,
    height: processFontSize(40),
    width: '45%',
  },
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

  /**Updated styles */
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
});
