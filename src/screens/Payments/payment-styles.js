import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {processFontSize} from '../../helpers/fonts';
import {colors, Basestyle} from '../../helpers/BaseThemes';

export default StyleSheet.create({
  opaq3: {...Basestyle.bold_16, color: colors.PRIMARY_BLUE},
  modal_content: {
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 10,
    width: '80%',
    //alignItems: 'center',
    paddingVertical: 30,
    alignSelf: 'center',
    minHeight: hp(30),
  },
  selection_box2: {
    height: '60%',
    paddingTop: processFontSize(20),
    //backgroundColor: 'red',
    //flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
  },
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
  message_icon: {width: 78, height: 78, alignSelf: 'center'},
  continue_btn: {
    ...Basestyle.nunito_bold_16,
    color: colors.PRIMARY_ORANGE,
    paddingTop: 20,
    textAlign: 'center',
  },
});
