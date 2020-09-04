/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, Image, ScrollView, Text} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemBox from '../../components/ItemBox';
import ReuseHeader from '../../components/Header';
import styles from './styles/delivery_styles';
const LIST_DELIVERY = [
  {
    index: 0,
    label: 'Motor Bike',
    imgsrc: require('../../assets/images/motorbike.png'),
  },
  {
    index: 1,
    label: 'Car',
    imgsrc: require('../../assets/images/motorcar.png'),
  },
  {
    index: 2,
    label: 'Mini van',
    imgsrc: require('../../assets/images/minivan.png'),
  },
  {
    index: 3,
    label: 'Truck',
    imgsrc: require('../../assets/images/minitruck.png'),
  },
];
const SelectDeliveryType = ({navigation}) => {
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Delivery"
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
          {LIST_DELIVERY.map(({label, index, imgsrc}) => (
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
              onPress={() => navigation.navigate('SetLocation', {type: label})}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectDeliveryType;
