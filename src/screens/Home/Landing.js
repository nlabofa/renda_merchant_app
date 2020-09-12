/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, StatusBar, TouchableOpacity, Image, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles/dashboard_styles';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import GradientHeader from '../../components/GradientHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {processFontSize} from '../../helpers/fonts';
import {connect} from 'react-redux';
import {saveUserInfo, getCategories} from '../../actions/auth.action';
const Landing = ({
  navigation,
  saveUserInfo,
  categories,
  getCategories,
  user_info,
}) => {
  useEffect(() => {
    const checkUser = async () => {
      const userData = await AsyncStorage.getItem('user_stats');
      const data = JSON.parse(userData);
      saveUserInfo(data);
    };
    !user_info && checkUser();
    !categories && getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUserInfo, user_info]);
  return (
    <View style={Basestyle.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <GradientHeader
        gradient_colors={['#1B5480', '#3990BB']}
        navigation={navigation}
        showrighticon
        lefticon={
          <Feather
            name="menu"
            color="#fff"
            size={processFontSize(32)}
            style={{marginRight: 15}}
            onPress={() => navigation.toggleDrawer()}
          />
        }
        title="DASHBOARD">
        <View style={styles.middle_content}>
          <Text style={[Basestyle.bold_17, {fontSize: 20}]}>
            Welcome {user_info && user_info.firstName}
          </Text>
        </View>
      </GradientHeader>
      <View style={styles.scrollview}>
        <View style={{marginTop: -25}}>
          <View style={[Basestyle.round_box, styles.selection_box]}>
            <View style={styles.left_column}>
              <TouchableOpacity activeOpacity={0.7} style={styles.column_top}>
                <Image
                  source={Images.procurement_icon}
                  resizeMode="contain"
                  style={styles.img_icon}
                />
                <Text style={[styles.opaq3]}>Procurement</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.column_bottom}>
                <Image
                  source={Images.manageinvent_icon}
                  resizeMode="contain"
                  style={styles.img_icon}
                />
                <Text style={[styles.opaq3]}>Manage Inventory</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.right_column}>
              <TouchableOpacity activeOpacity={0.7} style={styles.column_top}>
                <Image
                  source={Images.warehouse_icon}
                  resizeMode="contain"
                  style={styles.img_icon}
                />
                <Text style={[styles.opaq3]}>Warehousing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DeliveryLanding')}
                activeOpacity={0.7}
                style={styles.column_bottom}>
                <Image
                  source={Images.delivery_icon}
                  resizeMode="contain"
                  style={styles.img_icon}
                />
                <Text style={[styles.opaq3]}>Delivery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: {user_info, categories},
  } = state;
  return {
    user_info,
    categories,
  };
};

const mapDispatchToProps = {
  saveUserInfo,
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
