import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';

import styles from './styles';
import {colors} from '../../helpers/BaseThemes';

const ButtonMain = ({
  text,
  onPress = () => {},
  isLoading,
  btnwhite,
  errorbtn,
  greybtn,
  showicon,
  disabled,
  btnContainerStyle = {},
  btnTextStyles = {},
}) => {
  let textStyles = {};
  if (disabled) {
    textStyles = {
      opacity: 0.6,
    };
  }
  if (errorbtn) {
    textStyles = {
      color: colors.PRIMARY_RED,
    };
  }
  if (greybtn) {
    textStyles = {
      color: '#67666C',
    };
  }
  let extrabtnstyle = {};
  if (errorbtn) {
    extrabtnstyle = {
      backgroundColor: '#fff',
      borderColor: colors.PRIMARY_RED,
      borderWidth: 1.4,
    };
  }
  if (greybtn) {
    extrabtnstyle = {
      backgroundColor: '#D5d9d6',
    };
  }
  if (btnwhite) {
    extrabtnstyle = {
      backgroundColor: '#fff',
      // IOS
      shadowColor: '#e8e8e8',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 1,
      shadowRadius: 1.5,

      // ANDROID
      elevation: 1,
      borderWidth: 1,
      borderColor: '#e8e8e8',
    };
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[styles.container, extrabtnstyle, btnContainerStyle]}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.centerbtn}>
          {showicon ? showicon : null}
          <Text style={[styles.text, textStyles, btnTextStyles]}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonMain;
