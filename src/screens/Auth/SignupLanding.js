/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, Image} from 'react-native';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import ItemBox from '../../components/ItemBox';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
const SignUpLanding = ({navigation}) => {
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Sign Up to Renda"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <View style={{marginTop: 30}}>
        {/* <Text style={[styles.opaq3]}>Today</Text> */}
        <View style={{marginTop: 15}}>
          <ItemBox
            customicon={
              <Image
                source={Images.profileicon}
                resizeMode="contain"
                style={{width: 55, height: 55}}
              />
            }
            customtext="Sign Up as an Individual"
            onPress={() => navigation.navigate('SignUpIndividual')}
          />
          <ItemBox
            customicon={
              <Image
                source={Images.businessicon}
                resizeMode="contain"
                style={{width: 55, height: 55}}
              />
            }
            customtext="Sign Up as a Business"
            onPress={() => navigation.navigate('SignUpBusiness')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpLanding;
