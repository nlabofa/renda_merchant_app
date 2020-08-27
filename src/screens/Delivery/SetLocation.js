/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, Image, TouchableOpacity, Text} from 'react-native';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReuseHeader from '../../components/Header';
import styles from './styles/delivery_styles';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';

const SetLocation = ({navigation}) => {
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={Basestyle.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={{paddingHorizontal: 20}}>
        <ReuseHeader
          title="Set Location"
          leftheader
          showlefticon
          navigation={navigation}
          textStyle={{letterSpacing: 0.9}}
        />
      </View>

      <View style={{marginTop: 20, flex: 1}}>
        <View>
          {/* <Text style={[styles.opaq3, {color: '#557993', paddingBottom: 15}]}>
            Please select a delivery method
          </Text> */}
          <View style={{width: '100%', height: '65%'}}>
            <Image
              source={require('../../assets/images/map.png')}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={[Basestyle.round_box, styles.selection_box2]}>
            <View style={styles.content}>
              <Image
                source={Images.dashed_line}
                resizeMode="center"
                style={styles.dashed_line2}
              />
              <View style={styles.address_row}>
                <Ionicons
                  name="location-sharp"
                  size={23}
                  color="#FFAF2A"
                  style={styles.location_icon}
                />
                <View style={{width: '90%'}}>
                  <Text style={styles.row_top_text}>Pick up location</Text>
                  <Text numberOfLines={2} style={styles.small_icon_text}>
                    12 Wole Ariyo Lekki Phase 1, Lagos State
                  </Text>
                  <Text style={[styles.small_icon_text2]}>Change Location</Text>
                </View>
              </View>
              <View style={styles.address_row}>
                <Ionicons
                  name="location-sharp"
                  size={23}
                  color="#4964D8"
                  style={styles.location_icon}
                />
                <View>
                  <Text style={[styles.row_top_text, {paddingBottom: 0}]}>
                    Drop off location
                  </Text>
                  <FloatingTextInput
                    label=""
                    placeholder="12 Wole Ariyo Street Lekki Phase 1"
                    keyboardType="number-pad"
                    rightElement={
                      <TouchableOpacity style={{right: '80%'}}>
                        <Ionicons
                          name="location-sharp"
                          size={30}
                          color="#ADC1D1"
                          //style={styles.location_icon}
                        />
                      </TouchableOpacity>
                    }
                    cutomwrapperInputStyle={styles.boxicon}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SetLocation;
