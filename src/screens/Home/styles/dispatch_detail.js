import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {colors, Basestyle} from '../../../helpers/BaseThemes';
import {processFontSize} from '../../../helpers/fonts';

export default StyleSheet.create({
  row_top: {flexDirection: 'row', alignItems: 'baseline'},
  row_top_text: {...Basestyle.nunito_bold_16, color: colors.PRIMARY_BLUE},
  hr: {
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(27, 84, 128, 0.2)',
    marginLeft: 5,
    flex: 1,
  },
  delivered: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  delivery_text: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginBottom: 20,
  },
  reset_signature: {
    ...Basestyle.nunito_bold_16,
    color: colors.PRIMARY_RED,
    fontSize: processFontSize(18),
    paddingTop: 10,
    textAlign: 'center',
  },
  not_detail_head: {
    textTransform: 'capitalize',
    textAlign: 'center',
    paddingTop: 20,
    ...Basestyle.bold_16,
    color: colors.PRIMARY_BLUE,
  },
  extra_box: {paddingTop: 10, minHeight: hp(50)},
  not_detail_text: {
    textAlign: 'center',
    ...Basestyle.light_16,
    lineHeight: 26,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#000',
  },
  small_icon_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  address: {...Basestyle.nunito_bold_16, left: 3, color: colors.PRIMARY_BLACK},
  small_icon_text: {
    ...Basestyle.nunito_regular_16,
    color: colors.PRIMARY_BLACK,
  },
  progress_text: {
    ...Basestyle.rubik_medium_15,
    position: 'absolute',
    left: 0,
    top: 42,
    zIndex: 10000000,
    textAlign: 'center',
    alignContent: 'center',
    right: 0,
  },
  progressbar_line: {
    width: '100%',
    top: 30,
    zIndex: 10000000,
    position: 'absolute',
    height: 40,
  },
  start_btn: {marginBottom: 20, marginTop: 30},
  dashed_line: {
    position: 'absolute',
    top: hp(10),
    left: 20,
    width: 4,
    height: '49%',
  },
  address_row: {flexDirection: 'row', alignItems: 'center'},
  location_icon: {position: 'absolute', top: -3, left: -25},
  small_icon: {width: 18, height: 18, marginRight: 10},
});
