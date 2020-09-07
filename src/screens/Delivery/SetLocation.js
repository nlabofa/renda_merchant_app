/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Linking,
  Alert,
  Image,
  ToastAndroid,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Text,
} from 'react-native';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import ReuseHeader from '../../components/Header';
import styles from './styles/delivery_styles';
import {connect} from 'react-redux';
import {saveDeliveryData} from '../../actions/delivery.action';

import InputContainer from '../../components/InputContainer';
import Geolocation from 'react-native-geolocation-service';
import ButtonMain from '../../components/Button/ButtonMain';

const SetLocation = ({navigation, deliverydata, route, saveDeliveryData}) => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [dropoffLocation, setDropOffLocation] = useState(null);
  const pickupData = route && route.params && route.params.pickupData;
  const dropoffData = route && route.params && route.params.dropoffData;
  useEffect(() => {
    const getLocation = async () => {
      const hasLocationPermission = await checkLocationPermission();

      if (!hasLocationPermission) {
        return;
      }

      // Geolocation.getCurrentPosition(
      //   (position) => {
      //     console.log(position);
      //   },
      //   (error) => {
      //     console.log(error);
      //   },
      //   {
      //     enableHighAccuracy: true,
      //     timeout: 20000,
      //     maximumAge: 1000,
      //   },
      // );
      RNGooglePlaces.getCurrentPlace(['placeID', 'location', 'name', 'address'])
        .then((results) => {
          //console.log(results);
          !pickupData && setActiveLocation(results[0]); //set users default location when location isn't specified
        })
        .catch((error) => console.log(error.message));
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
    getLocation();
  }, [pickupData]);
  useEffect(() => {
    const parseFullLocation = async () => {
      if (pickupData || dropoffData) {
        const lookupPickupLocation = await lookUpPlaceById(pickupData.placeID);
        const lookupdropoffLocation = await lookUpPlaceById(
          dropoffData.placeID,
        );
        // console.log(lookupPickup);
        //console.log(dropoffPickup);
        setActiveLocation(lookupPickupLocation);
        setDropOffLocation(lookupdropoffLocation);
        // console.log(formattedropoff);
      }
    };
    parseFullLocation();
  }, [navigation, pickupData, dropoffData]);
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
  const lookUpPlaceById = async (placeId) => {
    const lookupData = await RNGooglePlaces.lookUpPlaceByID(placeId, [
      'placeID',
      'location',
      'name',
      'address',
    ]);
    return lookupData;
    //OR
    // RNGooglePlaces.lookUpPlaceByID(placeId)
    //   .then((results) => {
    //     return results;
    //   })
    //   .catch((error) => console.log(error.message));
  };

  const handleNext = () => {
    // console.log(activeLocation);
    // console.log(dropoffLocation);
    const formdata = {
      ...deliverydata,
      pickUpLocation: [activeLocation.location],
      deliveryLocation: [dropoffLocation.location],
    };
    // console.log(formdata);
    saveDeliveryData(formdata);
    navigation.navigate('SenderInfo');
  };
  const viewFullLocation = () => {
    navigation.navigate('SetLocationFull', {
      pickupPrev: activeLocation,
      dropoffPrev: dropoffLocation,
    });
  };
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={Basestyle.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={{paddingHorizontal: 20}}>
        <ReuseHeader
          title="Set Location"
          leftheader
          showlefticon
          navigation={navigation}
          textStyle={{letterSpacing: 0.9}}
        />
      </View>

      <View style={{marginTop: 20, flex: 1}}>
        <View>
          {/* <Text style={[styles.opaq3, {color: '#557993', paddingBottom: 15}]}>
            Please select a delivery method
          </Text> */}
          <View style={{width: '100%', height: '60%'}}>
            <Image
              source={require('../../assets/images/map.png')}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={[Basestyle.round_box, styles.selection_box2]}>
            <View style={styles.content}>
              <Image
                source={Images.dashed_line}
                resizeMode="center"
                style={styles.dashed_line2}
              />
              <View style={styles.address_row}>
                <Ionicons
                  name="location-sharp"
                  size={23}
                  color="#FFAF2A"
                  style={styles.location_icon}
                />
                <View style={{width: '90%'}}>
                  <Text style={styles.row_top_text}>Pick up location</Text>
                  <Text numberOfLines={1} style={styles.small_icon_text}>
                    {activeLocation && activeLocation.address}
                  </Text>
                  <Text
                    onPress={() => viewFullLocation()}
                    style={[styles.small_icon_text2]}>
                    Change Location
                  </Text>
                </View>
              </View>
              <View style={styles.address_row}>
                <Ionicons
                  name="location-sharp"
                  size={23}
                  color="#4964D8"
                  style={styles.location_icon}
                />
                <View>
                  <Text style={[styles.row_top_text, {paddingBottom: 0}]}>
                    Drop off location
                  </Text>
                  <InputContainer
                    label=""
                    handlePress={() => viewFullLocation()}
                    placeholder="12 Wole Ariyo Street Lekki Phase 1"
                    value={dropoffLocation && dropoffLocation.address}
                    rightElement={
                      <TouchableOpacity style={{right: '80%'}}>
                        <Ionicons
                          name="location-sharp"
                          size={30}
                          color="transparent"
                          //style={styles.location_icon}
                        />
                      </TouchableOpacity>
                    }
                    cutomwrapperInputStyle={styles.boxicon}
                  />
                </View>
              </View>
              <ButtonMain
                onPress={() => {
                  handleNext();
                }}
                disabled={!activeLocation || !dropoffLocation}
                greybtn={!activeLocation || !dropoffLocation}
                text="Proceed"
                btnContainerStyle={[
                  Basestyle.btn_full,
                  {marginBottom: 0, alignSelf: 'flex-end', width: '91%'},
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const {
    delivery: {deliverydata},
  } = state;
  return {
    deliverydata,
  };
};
const mapDispatchToProps = {
  saveDeliveryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetLocation);
