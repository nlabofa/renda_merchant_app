/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, StatusBar, Image, ScrollView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/delivery_detail';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ImageSlider from '../../components/ImageSlider';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const contents = [
  {
    index: 0,
    imgsrc: Images.show_download,
  },
  {
    index: 1,
    imgsrc: Images.show_download,
  },
];
const DispatchDetailHistory = ({navigation, route}) => {
  const scrollViewRef = useRef(null);
  const {completed} = route.params;

  return (
    <SafeAreaView
      forceInset={{bottom: 'never'}}
      style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Delivery History"
        navigation={navigation}
        leftheader
        showlefticon
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={[styles.row_top_text, {paddingTop: 5, paddingBottom: 15}]}>
            Delivery Details
          </Text>
          <View
            style={[
              Basestyle.round_box,
              contents.length !== 0
                ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}
                : null,
            ]}>
            <Image
              source={Images.dashed_line}
              resizeMode="contain"
              style={styles.dashed_line2}
            />
            <View style={styles.content}>
              <View style={styles.row_top}>
                <Text style={styles.row_top_text}>Pick Up Location</Text>
                <View style={styles.hr} />
              </View>
              <View style={{marginTop: 15}}>
                <View style={styles.address_row}>
                  <Ionicons
                    name="location-sharp"
                    size={25}
                    color="#FFAF2A"
                    style={styles.location_icon}
                  />
                  <Text numberOfLines={2} style={styles.address}>
                    9 Jinadu Street, Igboefon, Lagos State
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.profile_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>Tobi Afolabi</Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.cell_phone_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>09027371303</Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.chat_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={2} style={styles.small_icon_text}>
                      Call recipient once you are 3 bustops away
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.row_top}>
                <Text style={styles.row_top_text}>Drop Off Location</Text>
                <View style={styles.hr} />
              </View>
              <View style={{marginTop: 15}}>
                <View style={styles.address_row}>
                  <Ionicons
                    name="location-sharp"
                    size={25}
                    color={colors.PRIMARY_PURPLE}
                    style={styles.location_icon}
                  />
                  <Text numberOfLines={2} style={styles.address}>
                    9 Jinadu Street, Igboefon, Lagos State
                  </Text>
                </View>

                <View style={{marginTop: 20}}>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.profile_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>Tobi Afolabi</Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.cell_phone_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>09027371303</Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.chat_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={2} style={styles.small_icon_text}>
                      Call recipient once you are 3 bustops away
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.delivery_bottom}>
                <View style={[Basestyle.row_space_between, {marginBottom: 10}]}>
                  <View>
                    <Text style={[styles.small_icon_text2]}>Status :</Text>
                    <Text
                      style={[
                        styles.small_icon_text3,
                        {color: colors.PRIMARY_ORANGE},
                      ]}>
                      In Progress
                    </Text>
                  </View>
                  <View style={{width: '36%'}}>
                    <Text style={[styles.small_icon_text2]}>Date :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      12th July 2020.
                    </Text>
                  </View>
                </View>
                <View style={[Basestyle.row_space_between, {marginBottom: 10}]}>
                  <View>
                    <Text style={[styles.small_icon_text2]}>Quantity :</Text>
                    <Text style={[styles.small_icon_text3]}>20 pcs</Text>
                  </View>
                  <View style={{width: '36%'}}>
                    <Text style={[styles.small_icon_text2]}>Category :</Text>
                    <Text style={[styles.small_icon_text3]}>Clothing</Text>
                  </View>
                </View>
                <Text style={[styles.small_icon_text4]}>Product Image</Text>
              </View>
            </View>
          </View>
          {contents && contents.length !== 0 && (
            <ImageSlider
              customwrapperstyle={{
                height: heightPercentageToDP(26),
                marginBottom: 50,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              customdotstyle={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 30,
              }}
              contents={contents}
              delivered={completed ? true : false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DispatchDetailHistory;
