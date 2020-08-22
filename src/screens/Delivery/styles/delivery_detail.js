import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
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
  delivery_bottom: {
    borderTopWidth: 1.5,
    marginHorizontal: -30,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopColor: '#D8D8D8',
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
  not_detail_head2: {
    textTransform: 'capitalize',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    ...Basestyle.bold_16,
    color: colors.PRIMARY_BLUE,
  },
  row_button: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'space-between',
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
  pre_warn: {
    backgroundColor: 'rgba(27, 84, 128, 0.07)',
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    //justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    height: 60,
  },
  address: {...Basestyle.nunito_bold_16, left: 3, color: colors.PRIMARY_BLACK},
  small_icon_text: {
    ...Basestyle.nunito_regular_16,
    color: colors.PRIMARY_BLACK,
  },
  small_icon_text2: {
    ...Basestyle.nunito_regular_16,
    color: colors.PRIMARY_GREY_04,
    paddingBottom: 5,
  },
  small_icon_text3: {
    ...Basestyle.nunito_semibold_16,
    color: colors.PRIMARY_BLUE_02,
    paddingBottom: 5,
  },
  small_icon_text4: {
    ...Basestyle.nunito_regular_16,
    color: colors.PRIMARY_GREY_04,
    paddingVertical: 10,
    paddingBottom: 0,
  },
  small_icon_text5: {
    ...Basestyle.nunito_regular_16,
    color: colors.PRIMARY_BLUE,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingBottom: 0,
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
  dashed_line2: {
    position: 'absolute',
    top: hp(10),
    left: 20,
    width: 4,
    height: '37%',
  },
  address_row: {flexDirection: 'row', alignItems: 'center'},
  location_icon: {position: 'absolute', top: -3, left: -25},
  small_icon: {width: 18, height: 18, marginRight: 10},
});
