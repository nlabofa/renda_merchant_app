import React from 'react';
import {View, StatusBar} from 'react-native';
import styles from './styles';
const StatusBarColor = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default StatusBarColor;

//usage ::
// <GeneralStatusBarColor backgroundColor="#772ea2"
//       barStyle="light-content"/>
