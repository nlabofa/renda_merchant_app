/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, Image, ScrollView, Text} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemBox from '../../components/ItemBox';
import ReuseHeader from '../../components/Header';
import styles from './payment-styles';
const LIST_DELIVERY = [
  {
    index: 0,
    label: 'Pay Via USSD',
    imgsrc: require('../../assets/images/pay-ussd.png'),
    route: 'PayUssd',
  },
  {
    index: 1,
    label: 'Pay Via Card',
    imgsrc: require('../../assets/images/pay-card.png'),
    route: 'PayCard',
  },
  {
    index: 2,
    label: 'Pay Via Wallet',
    imgsrc: require('../../assets/images/pay-merchant.png'),
    route: 'PayMerchant',
  },
];
const SelectDeliveryType = ({navigation}) => {
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Payment"
        leftheader
        //showlefticon
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <Text style={[styles.opaq3, {paddingBottom: 25}]}>Today</Text>
          {LIST_DELIVERY.map(({label, index, route, imgsrc}) => (
            <ItemBox
              key={index}
              customicon={
                <Image
                  source={imgsrc}
                  resizeMode="contain"
                  style={{width: 55, height: 55}}
                />
              }
              customtext={label}
              onPress={() => navigation.navigate(route)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectDeliveryType;
