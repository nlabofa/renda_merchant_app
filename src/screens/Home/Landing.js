/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles/dashboard_styles';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import GradientHeader from '../../components/GradientHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {processFontSize} from '../../helpers/fonts';
import {clearDeliveryData} from '../../actions/delivery.action';

import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {
  saveUserInfo,
  updateUserInfo,
  getCategories,
} from '../../actions/auth.action';
import Geolocation from 'react-native-geolocation-service';
import ItemBox from '../../components/ItemBox';

const Landing = ({
  navigation,
  saveUserInfo,
  categories,
  getCategories,
  incomingdelivery,
  device_id,
  updateUserInfo,
  clearDeliveryData,
  user_info,
}) => {
  useEffect(() => {
    const checkUser = async () => {
      const userData = await AsyncStorage.getItem('user_stats');
      const data = JSON.parse(userData);
      saveUserInfo(data);
    };
    const IOSPrompt = () => {
      OneSignal.getPermissionSubscriptionState((status) => {
        console.log(status);
        if (status?.hasPrompted === false) {
          console.log('not prompted');
          const permissions = {
            alert: true,
            badge: true,
            sound: true,
          };
          OneSignal.requestPermissions(permissions);
        }
      });
    };
    IOSPrompt();
    !user_info && checkUser();
    !categories && getCategories();
    device_id && updateUserInfo({oneSignalPlayerId: device_id});
    getLocation();
  }, []);

  useEffect(() => {
    incomingdelivery !== null &&
      navigation.navigate('DispatchDetailHistory', {
        completed: false,
        item: incomingdelivery,
      });
  }, [incomingdelivery]);

  const getLocation = async () => {
    const hasLocationPermission = await checkLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        //console.log(position);
        const data = {
          gpsLocation: [
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ],
        };
        updateLocation(data);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };
  const updateLocation = async (data) => {
    try {
      await updateUserInfo(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const checkLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
  const hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow RendaMerchant to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };
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
        //showrighticon
        lefticon={
          <Feather
            name="menu"
            color="#fff"
            size={processFontSize(32)}
            style={{marginRight: 15}}
            onPress={() => navigation.toggleDrawer()}
          />
        }
        title="HOME">
        <View style={styles.middle_content}>
          <Text style={[Basestyle.bold_17, {fontSize: 20}]}>
            Welcome {user_info && user_info.firstName}
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
      {/* <View style={styles.scrollview}>
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
      </View> */}
    </View>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: {user_info, device_id, categories},
    delivery: {incomingdelivery},
  } = state;
  return {
    user_info,
    device_id,
    incomingdelivery,
    categories,
  };
};

const mapDispatchToProps = {
  saveUserInfo,
  getCategories,
  updateUserInfo,
  clearDeliveryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
