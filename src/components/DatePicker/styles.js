import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {processFontSize} from '../../helpers/fonts';
import {Fontnames} from '../../helpers/BaseThemes';

const DatePickerStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontSize: processFontSize(15),
    fontFamily: Fontnames.bold,
    color: '#270450',
    height: 15,
    lineHeight: 15,
  },
  text2: {
    fontSize: 16,
    fontFamily: Fontnames.medium,
    lineHeight: 16,
    color: '#270450',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  content: {
    backgroundColor: '#fff',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: '#eef0f1',
    borderBottomWidth: 1,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default DatePickerStyle;
