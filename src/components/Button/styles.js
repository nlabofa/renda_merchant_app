import {StyleSheet} from 'react-native';
import {colors, Basestyle} from '../../helpers/BaseThemes';
import {processFontSize} from '../../helpers/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_BLUE,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    height: processFontSize(50),
  },
  centerbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Basestyle.nunito_bold_16,
    color: '#fff',
  },
});
