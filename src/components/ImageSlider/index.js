/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  View,
  Image,
} from 'react-native';

import {colors, Images} from '../../helpers/BaseThemes';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const ImageSlider = ({
  contents,
  delivered,
  customdotstyle = {},
  customwrapperstyle = {},
}) => {
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const {width} = Dimensions.get('window');
  const setSliderPage = (event) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen =
      Platform.OS === 'android' ? Math.ceil(x / width) : Math.ceil(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
    console.log(indexOfNextScreen);
  };
  const {currentPage: pageIndex} = sliderState;
  return (
    <View>
      {delivered && (
        <Image
          source={Images.delivered_image}
          resizeMode="contain"
          style={styles.delivered}
        />
      )}
      <ScrollView
        horizontal={true}
        style={[
          {
            height: '48%',
          },
          customwrapperstyle,
        ]}
        scrollEventThrottle={16}
        pagingEnabled={true}
        onScroll={(event) => {
          setSliderPage(event);
        }}
        showsHorizontalScrollIndicator={false}>
        {contents &&
          contents.map(({imgsrc, index}) => (
            <Image
              key={index}
              source={imgsrc}
              resizeMode="cover"
              style={styles.sliderview}
            />
          ))}
      </ScrollView>
      {contents.length > 1 && (
        <View style={[styles.dotrow, customdotstyle]}>
          {Array.from(Array(contents.length).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                {opacity: pageIndex === index ? 1 : 0.2},
              ]}
              key={index}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderview: {
    width: widthPercentageToDP(91),
    alignItems: 'center',
    height: 230,
    //overflow: 'hidden',
  },
  delivered: {
    position: 'absolute',
    width: 140,
    height: 130,
    right: 0,
    zIndex: 10000000,
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: colors.PRIMARY_PURPLE,
    marginLeft: 10,
  },
  dotrow: {
    flexDirection: 'row',
    paddingTop: 7,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    justifyContent: 'center',
  },
});

export default ImageSlider;
