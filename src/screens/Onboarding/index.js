/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import styles from './styles';
import {Basestyle, Images} from '../../helpers/BaseThemes/';
import ButtonMain from '../../components/Button/ButtonMain';
import AppIntroSlider from 'react-native-app-intro-slider';

const IntroScreens = [
  {
    index: 0,
    headtext: 'Reliable and always available.',
    imagesrc: Images.slider1,
  },
  {
    index: 1,
    headtext: 'Great value added services.',
    imagesrc: Images.slider2,
  },
  {
    index: 2,
    headtext: 'Deliver what you want in a Beep.',
    imagesrc: Images.slider3,
  },
];

const IntroSlider = ({navigation}) => {
  const _keyExtractor = (item) => item.index.toString();

  const _renderItem = ({item}) => {
    return (
      <View style={styles.sliderview}>
        <Image
          source={item.imagesrc}
          resizeMode="contain"
          style={styles.sliderview_img}
        />
        <View style={styles.sliderview_bottom}>
          <Text numberOfLines={2} style={styles.headtext}>
            {item.headtext}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.intro_slider}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={styles.top_row}>
          <View style={styles.dashed_line}>
            <Image
              source={Images.sliderline}
              resizeMode="contain"
              style={Basestyle.box_full}
            />
          </View>
          <View style={styles.tap_logo}>
            <Image
              source={Images.white_logo}
              resizeMode="contain"
              style={Basestyle.box_full}
            />
          </View>
        </View>

        <AppIntroSlider
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          data={IntroScreens}
          showNextButton={false}
          showDoneButton={false}
          dotStyle={styles.paginationDots}
          activeDotStyle={styles.activepagination}
        />

        <ButtonMain
          btnContainerStyle={styles.button}
          btnTextStyles={{
            color: '#fff',
          }}
          onPress={() => navigation.navigate('Auth')}
          text="Login / Register"
        />
      </View>
    </>
  );
};

export default IntroSlider;
