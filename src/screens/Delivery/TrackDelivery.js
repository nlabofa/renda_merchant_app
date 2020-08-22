/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import ItemBox from '../../components/ItemBox';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';

const TrackDelivery = ({navigation, route}) => {
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Track Delivery"
        leftheader
        showlefticon
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <View style={{width: '100%'}}>
            <FloatingTextInput
              type="round"
              placeholder="Search by request id"
              leftElement={
                <TouchableOpacity style={{left: '25%'}}>
                  <Image
                    source={Images.search_icon}
                    resizeMode="contain"
                    style={{width: 20}}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={{marginTop: 40}}>
            <ItemBox
              idnumber="RA0492859"
              status="accepted"
              destination="Lagos Island"
              duedate="22, July 2020"
              onPress={() =>
                navigation.navigate('DispatchDetailHistory', {completed: false})
              }
            />
            <ItemBox
              idnumber="RA0492859"
              status="accepted"
              destination="Lagos Island"
              duedate="22, July 2020"
              onPress={() =>
                navigation.navigate('DispatchDetailHistory', {completed: true})
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackDelivery;
