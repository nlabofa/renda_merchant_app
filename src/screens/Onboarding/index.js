import React from 'react';
import {SafeAreaView, View, Text, StatusBar, Image} from 'react-native';
import styles from './styles';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes/';
import ButtonMain from '../../components/Button/ButtonMain';
import AppIntroSlider from 'react-native-app-intro-slider';

const IntroScreens = [
  {
    index: 0,
    headtext: 'Manage the procurement of your goods with ease and simplicity',
    imagesrc: Images.slider1,
  },
  {
    index: 1,
    headtext: 'Store your goods across our vast network of warehouses',
    imagesrc: Images.slider2,
  },
  {
    index: 2,
    headtext: 'Manage Your Inventory With Our Tech-Driven Solution',
    imagesrc: Images.slider3,
  },
  {
    index: 3,
    headtext: 'Let’s own your delivery process',
    imagesrc: Images.slider4,
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
      <SafeAreaView style={styles.intro_slider}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={styles.top_row}>
          <View style={styles.dashed_line}>
            <Image
              source={Images.sliderline}
              resizeMode="cover"
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
            color: colors.PRIMARY_BLUE,
          }}
          onPress={() => navigation.navigate('Auth')}
          text="Login / Register"
        />
      </SafeAreaView>
    </>
  );
};

export default IntroSlider;
