import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors, Basestyle, Fontnames} from '../../helpers/BaseThemes/';
import {processFontSize} from '../../helpers/fonts';

const FloatingTextInput = ({
  handleInputChange,
  value,
  type,
  label,
  dropdown,
  express,
  placeholder = '',
  cutomwrapperInputStyle = {},
  keyboardType,
  customtextinputstyle = {},
  rightElement = null,
  leftElement = null,
  errorMessage,
  editable = true,
  ...props
}) => {
  const roundinputviewstyle = {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 40,
    backgroundColor: '#fff',
    height: processFontSize(47),
    borderColor: 'rgba(0, 0, 0, 0.05)',

    // IOS
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 4,

    // ANDROID
    elevation: 1,
    borderWidth: 0.3,
    borderTopWidth: 0.4,
  };
  const roundtextinputstyle = {
    ...Basestyle.regular_16,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    color: '#000',
  };
  const textinputviewstyle = {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#fff',
    height: processFontSize(55),
    borderColor: express ? '#A8C0D1' : colors.PRIMARY_GREY_02,
  };
  const textinputstyle = {
    ...Basestyle.regular_16,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    color: '#000',
  };
  const labelstyle = {
    ...Basestyle.nunito_bold_13,
    color: express ? '#203659' : colors.PRIMARY_BLUE,
    paddingBottom: 8,
  };

  return type === 'round' ? (
    <View style={[roundinputviewstyle, cutomwrapperInputStyle]}>
      {leftElement ? leftElement : null}
      <TextInput
        keyboardType={keyboardType}
        style={[roundtextinputstyle]}
        onChangeText={handleInputChange}
        value={value}
        editable={editable}
        placeholder={placeholder}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        {...props}
        placeholderTextColor={colors.PRIMARY_GREY_03}
      />
    </View>
  ) : (
    <View>
      <Text style={labelstyle}>{label}</Text>
      <View
        style={[
          textinputviewstyle,
          cutomwrapperInputStyle,
          errorMessage ? {borderColor: colors.PRIMARY_RED} : null,
        ]}>
        <TextInput
          keyboardType={keyboardType}
          style={[textinputstyle, customtextinputstyle]}
          onChangeText={handleInputChange}
          value={value}
          editable={editable}
          placeholder={placeholder}
          autoCapitalize={
            keyboardType === 'email-address' ? 'none' : 'sentences'
          }
          {...props}
          placeholderTextColor={colors.PRIMARY_GREY_03}
        />
        {rightElement ? rightElement : null}
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  errorMessageStyle: {
    marginTop: -13,
    paddingBottom: 10,
    fontSize: 13,
    fontFamily: Fontnames.medium,
    color: colors.PRIMARY_RED,
  },
});

export default FloatingTextInput;
