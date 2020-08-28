/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './payment-styles';

const PayUssd = ({navigation}) => {
  return (
    <SafeAreaView
      //forceInset={{bottom: 'never'}}
      style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Pay via USSD"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <View style={{flex: 1}}>
        <View style={{marginTop: 30}}>
          <View style={[Basestyle.round_box, styles.selection_box2]}>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Text style={styles.opaq3}>Dial this code</Text>
              <Text
                style={[
                  styles.opaq3,
                  {paddingVertical: 30, fontSize: 18, color: '#307BA8'},
                ]}>
                *737*2*99999999*10000#
              </Text>
              <View style={Basestyle.row_center}>
                <Text
                  style={[
                    styles.opaq3,
                    {color: colors.PRIMARY_ORANGE, paddingRight: 5},
                  ]}>
                  Tap to Copy
                </Text>
                <MaterialCommunityIcons
                  name="content-copy"
                  color={colors.PRIMARY_ORANGE}
                  size={25}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <ButtonMain
        // onPress={() => handleNext()}
        text="Dial Code"
        btnContainerStyle={[Basestyle.btn_full, {marginBottom: 10}]}
      />
    </SafeAreaView>
  );
};

export default PayUssd;
