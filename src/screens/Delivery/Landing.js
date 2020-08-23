/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, Image, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from './styles/delivery_styles';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import GradientHeader from '../../components/GradientHeader';
import ItemBox from '../../components/ItemBox';
const Landing = ({navigation}) => {
  return (
    <View style={Basestyle.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <GradientHeader
        gradient_colors={['#1B5480', '#3990BB']}
        showrighticon
        navigation={navigation}
        lefticon={
          <SimpleLineIcons
            name="arrow-left"
            size={20}
            color="#fff"
            style={{marginRight: 15}}
            onPress={() => navigation.pop()}
          />
        }
        title="Delivery">
        <View style={styles.middle_content}>
          <Text style={[Basestyle.bold_17, {fontSize: 20}]}>Welcome Eric</Text>
        </View>
      </GradientHeader>
      <View style={styles.scrollview}>
        <View style={{marginTop: -25, overflow: 'hidden'}}>
          <ItemBox
            customicon={
              <Image
                source={Images.package_icon}
                resizeMode="contain"
                style={{width: 55, height: 55}}
              />
            }
            customtext="Request Delivery"
            onPress={() => navigation.navigate('NewDelivery')}
          />
          <ItemBox
            customicon={
              <Image
                source={Images.track_icon}
                resizeMode="contain"
                style={{width: 55, height: 55}}
              />
            }
            customtext="Track Delivery"
            onPress={() => navigation.navigate('TrackDelivery')}
          />
          <ItemBox
            customicon={
              <Image
                source={Images.deliverhistory_icon}
                resizeMode="contain"
                style={{width: 55, height: 55}}
              />
            }
            customtext="Delivery History"
            onPress={() => navigation.navigate('DeliveryHistory')}
          />
        </View>
      </View>
    </View>
  );
};

export default Landing;
