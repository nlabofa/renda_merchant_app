/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, Image, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from './styles/delivery_styles';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import {connect} from 'react-redux';
import GradientHeader from '../../components/GradientHeader';
import ItemBox from '../../components/ItemBox';
import {clearDeliveryData} from '../../actions/delivery.action';
const Landing = ({navigation, user_info, clearDeliveryData}) => {
  const {firstName} = user_info;
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
          <Text style={[Basestyle.bold_17, {fontSize: 20}]}>
            Welcome {firstName}
          </Text>
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
            onPress={() => {
              clearDeliveryData();
              navigation.navigate('NewDelivery');
            }}
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
            customtext="Pending Delivery"
            onPress={() => navigation.navigate('DeliveryHistory')}
          />
        </View>
      </View>
    </View>
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
  clearDeliveryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
