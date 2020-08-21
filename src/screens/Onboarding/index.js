import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes/';
import ButtonMain from '../../components/Button/ButtonMain';

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
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const {width} = Dimensions.get('window');

  const setSliderPage = (event) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen =
      Platform.OS === 'android' ? Math.ceil(x / width) : Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const {currentPage: pageIndex} = sliderState;

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

        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScroll={(event) => {
            setSliderPage(event);
          }}>
          {IntroScreens.map(({imagesrc, headtext, index}) => (
            <View key={index} style={styles.sliderview}>
              <Image
                source={imagesrc}
                resizeMode="contain"
                style={styles.sliderview_img}
              />
              <View style={styles.sliderview_bottom}>
                <Text numberOfLines={2} style={styles.headtext}>
                  {headtext}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.paginationrow}>
          {Array.from(Array(4).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                pageIndex === index ? styles.activepagination : null,
              ]}
              key={index}
            />
          ))}
        </View>
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
