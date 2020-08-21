/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, StatusBar, Image, ScrollView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/dispatch_detail';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import ProgressBar from 'react-native-progress/Bar';
import ButtonMain from '../../components/Button/ButtonMain';

const DispatchDetail = ({navigation, route}) => {
  const scrollViewRef = useRef(null);
  const [progressvalue, setprogressvalue] = useState(0);
  const [tripstarted, setripstarted] = useState(false);

  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Express Order"
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={[Basestyle.round_box, Basestyle.extra_box2]}>
          <Text
            style={[
              Basestyle.nunito_bold_16,
              {color: colors.PRIMARY_BLUE, paddingBottom: 15, paddingLeft: 7},
            ]}>
            Delivery Details
          </Text>
        </View>
        <View>
          <Text
            style={[
              Basestyle.nunito_bold_16,
              {color: colors.PRIMARY_BLUE, paddingBottom: 15, paddingLeft: 7},
            ]}>
            Delivery Details
          </Text>
          <View style={Basestyle.round_box}>
            <Image
              source={Images.dashed_line}
              resizeMode="contain"
              style={styles.dashed_line}
            />
            <View style={styles.content}>
              <View style={styles.row_top}>
                <Text style={styles.row_top_text}>Pick Up Location</Text>
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
            </View>
          </View>
          <ButtonMain
            onPress={() => navigation.navigate('Home')}
            text="Login"
            btnContainerStyle={{marginVertical: 40}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DispatchDetail;
