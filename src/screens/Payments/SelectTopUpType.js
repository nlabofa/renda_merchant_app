/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, Image, ScrollView} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemBox from '../../components/ItemBox';
import ReuseHeader from '../../components/Header';
import {connect} from 'react-redux';
import {saveDeliveryData} from '../../actions/delivery.action';
const SelectTopUpType = ({navigation}) => {
  const LIST_DELIVERY = [
    {
      index: 0,
      label: 'Top Up Via USSD',
      imgsrc: require('../../assets/images/pay-ussd.png'),
      type: 'topup_via_ussd',
    },
    {
      index: 1,
      label: 'Top Up Via Card',
      imgsrc: require('../../assets/images/pay-card.png'),
      type: 'topup_via_card',
    },
  ];
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Top Up Wallet"
        leftheader
        //showlefticon
        containerstyle={{marginTop: 10}}
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          {/* <Text style={[styles.opaq3, {paddingBottom: 25}]}>Today</Text> */}
          {LIST_DELIVERY.map(({label, index, type, imgsrc}) => (
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
              cusomsubtitlestyle={{width: '100%', fontSize: 15}}
              onPress={() => navigation.navigate('PayMerchant', {type})}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: {user_info},
  } = state;
  return {
    user_info,
  };
};
const mapDispatchToProps = {
  saveDeliveryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTopUpType);
