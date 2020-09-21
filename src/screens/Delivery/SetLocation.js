/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useEffect, useCallback, useState} from 'react';
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
import {
  saveDeliveryData,
  saveLocationInfo,
} from '../../actions/delivery.action';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import InputContainer from '../../components/InputContainer';
import Geolocation from 'react-native-geolocation-service';
import ButtonMain from '../../components/Button/ButtonMain';
import {processFontSize} from '../../helpers/fonts';

const SetLocation = ({
  navigation,
  deliverydata,
  route,
  saveLocationInfo,
  saveDeliveryData,
}) => {
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
          console.log(results[0]);
          if (!pickupData) {
            setActiveLocation(results[0]); //set users default location when location isn't specified
          }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupData]);
  useEffect(() => {
    const parseFullLocation = async () => {
      if (pickupData || dropoffData) {
        const lookupPickupLocation = await lookUpPlaceById(pickupData.placeID);
        const lookupdropoffLocation = await lookUpPlaceById(
          dropoffData.placeID,
        );
        console.log(lookupPickupLocation);
        console.log(lookupdropoffLocation);
        setActiveLocation(lookupPickupLocation);
        setDropOffLocation(lookupdropoffLocation);
        // console.log(formattedropoff);
      }
    };
    parseFullLocation();
    getMapRegion();
  }, [navigation, pickupData, getMapRegion, dropoffData]);
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
      endUserGpsLocation: [activeLocation.location],
    };
    // console.log(formdata);
    saveDeliveryData(formdata);
    saveLocationInfo({activeLocation, dropoffLocation});
    navigation.navigate('SenderInfo');
  };
  const viewFullLocation = () => {
    if (!activeLocation) {
      return false;
    } else {
      navigation.navigate('SetLocationFull', {
        pickupPrev: activeLocation,
        dropoffPrev: dropoffLocation,
      });
    }
  };
  const defaultregion = {
    latitude: 6.599033,
    longitude: 3.3411348,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const getMapRegion = useCallback(
    () => ({
      latitude: activeLocation ? activeLocation.location.latitude : 6.599033,
      longitude: activeLocation ? activeLocation.location.longitude : 3.3411348,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
      latitudeDelta: 0.0045,
      longitudeDelta: 0.004,
    }),
    [activeLocation],
  );
  // export function getRegionForCoordinates(points) {
  //   // points should be an array of { latitude: X, longitude: Y }
  //   let minX, maxX, minY, maxY;

  //   // init first point
  //   ((point) => {
  //     minX = point.latitude;
  //     maxX = point.latitude;
  //     minY = point.longitude;
  //     maxY = point.longitude;
  //   })(points[0]);

  //   // calculate rect
  //   points.map((point) => {
  //     minX = Math.min(minX, point.latitude);
  //     maxX = Math.max(maxX, point.latitude);
  //     minY = Math.min(minY, point.longitude);
  //     maxY = Math.max(maxY, point.longitude);
  //   });

  //   const midX = (minX + maxX) / 2;
  //   const midY = (minY + maxY) / 2;
  //   const deltaX = (maxX - minX);
  //   const deltaY = (maxY - minY);

  //   return {
  //     latitude: midX,
  //     longitude: midY,
  //     latitudeDelta: deltaX,
  //     longitudeDelta: deltaY
  //   };
  // }
  //console.log(activeLocation);
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
          // showlefticon
          navigation={navigation}
          textStyle={{letterSpacing: 0.9}}
        />
      </View>

      <View style={{marginTop: 20, flex: 1}}>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{width: '100%', height: '55%'}}
            initialRegion={defaultregion}
            // onRegionChangeComplete={(region) => console.log(region)}
            region={getMapRegion()}
            // customMapStyle={{width: '100%', height: '100%'}}
          >
            {activeLocation && (
              <Marker
                key={1}
                coordinate={{
                  latitude: activeLocation.location.latitude,
                  longitude: activeLocation.location.longitude,
                }}
                // pinColor={'#1B2E5A'}
              />
            )}
            {dropoffLocation && (
              <Marker
                key={2}
                coordinate={{
                  latitude: dropoffLocation.location.latitude,
                  longitude: dropoffLocation.location.longitude,
                }}
                pinColor={'#ffb600'}
              />
            )}
          </MapView>
          <View style={[Basestyle.round_box, styles.selection_box2]}>
            <View style={styles.content}>
              <Image
                source={Images.dashed_line}
                resizeMode="center"
                style={[styles.dashed_line2, {height: '38%'}]}
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
                <View style={{marginTop: processFontSize(20)}}>
                  <Text style={[styles.row_top_text, {paddingBottom: 0}]}>
                    Drop off location
                  </Text>
                </View>
              </View>
              <InputContainer
                label=""
                handlePress={() => viewFullLocation()}
                placeholder=""
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
                cutomwrapperInputStyle={[
                  styles.boxicon,
                  {marginBottom: 10, width: '100%'},
                ]}
              />
              <ButtonMain
                onPress={() => {
                  handleNext();
                }}
                disabled={!activeLocation || !dropoffLocation}
                greybtn={!activeLocation || !dropoffLocation}
                text="Proceed"
                btnContainerStyle={[
                  Basestyle.btn_full,
                  {marginBottom: 10, alignSelf: 'flex-end', width: '100%'},
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
  saveLocationInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetLocation);
