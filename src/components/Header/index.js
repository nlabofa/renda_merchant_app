/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Platform} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, Basestyle} from '../../helpers/BaseThemes';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const ReuseHeader = ({
  title,
  onPress = () => {},
  showlefticon,
  leftheader,
  navigation,
  containerstyle = {},
  textStyle = {},
}) => {
  const header2 = {
    ...styles.header2,
    marginTop: Platform.OS === 'android' ? getStatusBarHeight() + 10 : 10,
  };
  return leftheader ? (
    <View style={[header2, containerstyle]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={Basestyle.hitSlop}
        style={{marginRight: 20}}>
        <SimpleLineIcons
          name="arrow-left"
          size={20}
          color={colors.PRIMARY_BLUE}
        />
      </TouchableOpacity>

      <Text style={[styles.titlestyle2, textStyle]}>{title}</Text>
      {showlefticon && (
        <Ionicons
          color={colors.PRIMARY_BLUE}
          name="ios-notifications-outline"
          style={{position: 'absolute', right: 0}}
          size={27}
        />
      )}
    </View>
  ) : (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={Basestyle.hitSlop}
        style={{position: 'absolute', left: 0}}>
        <SimpleLineIcons
          name="arrow-left"
          size={20}
          color={colors.PRIMARY_BLUE}
        />
      </TouchableOpacity>

      <Text style={[styles.titlestyle, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header2: {
    marginTop: 10,
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titlestyle: {
    ...Basestyle.bold_16,
    color: colors.PRIMARY_BLUE,
    textAlign: 'center',
  },
  titlestyle2: {
    ...Basestyle.bold_16,
    color: colors.PRIMARY_BLUE,
  },
});

export default ReuseHeader;
