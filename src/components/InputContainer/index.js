/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {colors, Basestyle} from '../../helpers/BaseThemes/';
import {processFontSize} from '../../helpers/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const InputContainer = ({
  handleInputChange,
  value,
  type,
  label,
  dropdown,
  express,
  placeholder = 'Placeholder',
  handlePress = () => {},
  cutomwrapperInputStyle = {},
  keyboardType,
  rightElement = null,
  leftElement = null,
  editable = true,
  ...props
}) => {
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

  return (
    <TouchableOpacity activeOpacity={0.7} style={{}} onPress={handlePress}>
      <Text style={[labelstyle]}>{label}</Text>
      <View style={[textinputviewstyle, cutomwrapperInputStyle]}>
        <View style={[textinputstyle]}>
          <Text style={{}} />

          <Text
            style={[
              {
                ...textinputstyle,
                top: 5,
                color: !value ? colors.PRIMARY_GREY_03 : '#000',
              },
            ]}>
            {value || placeholder}
          </Text>
        </View>
        <View style={{right: '80%'}}>
          <MaterialIcons
            name="arrow-drop-down"
            size={33}
            color={colors.PRIMARY_GREY_05}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InputContainer;
