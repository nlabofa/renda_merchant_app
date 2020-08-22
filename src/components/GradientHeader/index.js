import React from 'react';
import {TouchableOpacity, Text, Platform, View, StyleSheet} from 'react-native';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {processFontSize} from '../../helpers/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {Fontnames} from '../../helpers/BaseThemes';

const GradientHeader = ({
  title,
  iconPress = () => {},
  lefticon,
  gradient_colors,
  containerstyle,
  gradient_locations,
  showrighticon,
  navigation,
  textStyle = {},
  ...props
}) => {
  return (
    <LinearGradient
      colors={gradient_colors}
      style={[styles.dashboard_container, containerstyle]}
      locations={gradient_locations || [0, 1]}>
      <View style={styles.head_row}>
        {lefticon}
        <Text style={styles.head_row_text}>{title}</Text>
        {showrighticon && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewNotification')}
            style={styles.bell_icon}>
            <Ionicons color="#fff" name="ios-notifications-outline" size={27} />
            {/* <Entypo
          name="dot-single"
          size={40}
          color={colors.PRIMARY_RED}
          style={styles.dot_single}
        /> */}
          </TouchableOpacity>
        )}
      </View>

      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  dashboard_container: {
    height: isIphoneX() || Platform.OS === 'android' ? hp(25) : hp(30),
    width: '100%',
    paddingTop: isIphoneX() ? 50 : 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  head_row: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  head_row_text: {
    textAlign: 'center',
    fontFamily: Fontnames.bold,
    letterSpacing: 0.085,
    fontSize: processFontSize(14),
    color: '#fff',
  },
  bell_icon: {position: 'absolute', right: 0},
});

export default GradientHeader;
