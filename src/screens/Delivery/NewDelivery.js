/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, Image, ScrollView, Text} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemBox from '../../components/ItemBox';
import ReuseHeader from '../../components/Header';
import styles from './styles/delivery_styles';
const NewDelivery = ({navigation}) => {
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="New Delivery"
        leftheader
        showlefticon
        navigation={navigation}
        containerstyle={{marginTop: 10}}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 50}}>
          <Text style={[styles.opaq3, {color: '#557993', paddingBottom: 15}]}>
            Please select a delivery method
          </Text>
          <ItemBox
            subtitle="Same day deliveries must be booked before 2 pm"
            customicon={
              <Image
                source={require('../../assets/images/stopwatch_gra.png')}
                resizeMode="contain"
                style={{width: 55, height: 55}}
              />
            }
            customtext="Same Day Delivery"
            onPress={() =>
              navigation.navigate('SelectDeliveryType', {type: 'sameday'})
            }
          />
          <ItemBox
            subtitle="Deliveries are dispatched on selected days"
            customicon={
              <Image
                source={require('../../assets/images/calendar_icon.png')}
                resizeMode="contain"
                style={{width: 55, height: 55}}
              />
            }
            customtext="Schedule Delivery"
            onPress={() =>
              navigation.navigate('SelectDeliveryType', {type: 'scheduled'})
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewDelivery;
