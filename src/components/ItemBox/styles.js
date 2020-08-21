import {StyleSheet, Platform} from 'react-native';
import {processFontSize} from '../../helpers/fonts';
import {colors, Basestyle} from '../../helpers/BaseThemes';
import FontNames from '../../helpers/BaseThemes/fontnames';

export default StyleSheet.create({
  box: {
    height: processFontSize(100),
    borderRadius: 6,
    borderWidth: Platform.OS === 'ios' ? 1.5 : 1,
    borderColor: '#dce5ed',
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    // IOS
    shadowColor: '#E6E6E6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 4,

    // ANDROID
    elevation: 2,
    // borderWidth: 0.3,
    borderTopWidth: 0.4,
    //borderColor: 'transparent',
  },
  div_view: {
    width: '85%',
    marginHorizontal: 15,
    height: '100%',
    // marginVertical: 15,
    //backgroundColor: 'green',
  },
  bottom_row: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status_text: {
    fontFamily: FontNames.nunito_bold,
    fontSize: processFontSize(13),
    color: colors.SECONDARY_GREEN,
    textTransform: 'capitalize',
    paddingHorizontal: 15,
  },
  bottom_halve: {
    flexDirection: 'row',
    width: '47%',
    // backgroundColor: 'green',
    marginTop: 15,
  },
  status_div: {
    backgroundColor: colors.PRIMARY_GREEN,
    marginLeft: 15,
    borderRadius: 6,
    justifyContent: 'center',
    height: 25,
  },
  row: {flexDirection: 'row'},
  not_text: {
    ...Basestyle.nunito_regular_13,
    color: colors.PRIMARY_BLUE,
    paddingTop: 10,
  },
  row_center: {flexDirection: 'row', alignItems: 'center'},
});
