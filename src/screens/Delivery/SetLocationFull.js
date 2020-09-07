/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReuseHeader from '../../components/Header';
import styles from './styles/delivery_styles';
//import RNGooglePlaces from 'react-native-google-places';

import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import ButtonMain from '../../components/Button/ButtonMain';
const GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/place/';
import {API_KEY} from '../../../key';

const SetLocationFull = ({navigation, route}) => {
  const pickupPrev = route && route.params && route.params.pickupPrev;
  const dropoffPrev = route && route.params && route.params.dropoffPrev;
  //console.log(dropoffPrev);
  const [predictions, setPredictions] = useState([]);
  const [pickupData, setpickUpData] = useState(pickupPrev);
  const [pickupAddress, setpickupAddress] = useState(pickupPrev.address);
  const [dropoffAddress, setdropoffAddress] = useState(
    dropoffPrev && dropoffPrev.address,
  );
  const [dropoffData, setdropOffData] = useState(dropoffPrev);
  const [activeinput, setactiveinput] = useState('');
  //const [loading, setLoading] = useState(false);

  const fetchRequest = async (url) => {
    try {
      const response = await fetch(url);
      const apiResponse = await response.json();

      if (apiResponse && apiResponse.status && apiResponse.status === 'OK') {
        //console.log(apiResponse);
        return apiResponse;
      } else {
        throw new Error('Failed to fetch request. Please try again.');
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleInputChange = async (name, text) => {
    try {
      name === 'pickupAddress'
        ? (setpickupAddress(text), setpickUpData(null))
        : (setdropoffAddress(text), setdropOffData(null));

      const response = await fetchRequest(`${GOOGLE_MAP_URL}autocomplete/json?input=${text}&location=6.5243793,3.3792057&radius=5000&key=${API_KEY}
      `);
      let formatpredictions = response.predictions;
      formatpredictions.forEach((task) => {
        task.placeID = task.place_id;
      });
      setPredictions(formatpredictions);

      //setLoading(true);
      // RNGooglePlaces.getAutocompletePredictions(text, {
      //   type: 'address',
      //   country: 'NG',
      // })
      //   .then((place) => {
      //     // console.log(place);
      //     setPredictions(place);
      //   })
      //   .catch((error) => console.log(error.message));
      // // console.log(response)
    } catch (error) {
      setPredictions([]);
    } finally {
      //setLoading(false);
    }
  };
  const onSelect = (label, data) => {
    setPredictions([]);
    //console.log(data);
    if (label === 'pickupAddress') {
      setpickupAddress(data.description);
      setpickUpData(data);
    } else {
      setdropoffAddress(data.description);
      setdropOffData(data);
    }
  };
  const handleNext = () => {
    // console.log(pickupData);
    // console.log(dropoffData);
    navigation.navigate('SetLocation', {
      pickupData: pickupData,
      dropoffData: dropoffData,
    });
  };
  const isdisabled =
    !dropoffAddress || !pickupAddress || !dropoffData || !pickupData
      ? true
      : false;

  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Set Location"
        leftheader
        showlefticon
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 50}}>
          <View style={styles.content}>
            <Image
              source={Images.dashed_line}
              resizeMode="center"
              style={[styles.dashed_line2, {height: '60%'}]}
            />
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name="location-sharp"
                size={23}
                color="#FFAF2A"
                style={styles.location_icon}
              />
              <View style={{width: '100%'}}>
                <Text style={[styles.row_top_text, {paddingBottom: 0}]}>
                  Pick up location
                </Text>
                <FloatingTextInput
                  label=""
                  placeholder="12 Wole Ariyo Street Lekki Phase 1"
                  onChangeText={(text) =>
                    handleInputChange('pickupAddress', text)
                  }
                  value={pickupAddress}
                  onFocus={() => setactiveinput('pickupAddress')}
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
                  cutomwrapperInputStyle={[styles.boxicon, {marginBottom: 10}]}
                />
                {/* <Text
                  onPress={() => navigation.navigate('SetLocationFull')}
                  style={[styles.small_icon_text2]}>
                  Pick location from maps
                </Text> */}
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
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
                <FloatingTextInput
                  label=""
                  placeholder="12 Wole Ariyo Street Lekki Phase 1"
                  onChangeText={(text) =>
                    handleInputChange('dropoffAddress', text)
                  }
                  value={dropoffAddress}
                  onFocus={() => setactiveinput('dropoffAddress')}
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
                  cutomwrapperInputStyle={[styles.boxicon, {marginBottom: 10}]}
                />
              </View>
            </View>
            <View
              style={{
                marginLeft: 30,
                width: '90%',
                alignContent: 'center',
              }}>
              {predictions.map((option) => {
                return (
                  <TouchableOpacity
                    key={option.place_id}
                    onPress={() => onSelect(activeinput, option)}
                    style={styles.optionContainer}>
                    <Text style={styles.optionTextStyle}>
                      {option.description}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      <ButtonMain
        onPress={() => handleNext()}
        disabled={isdisabled}
        greybtn={isdisabled ? true : false}
        text="Continue"
        btnContainerStyle={[Basestyle.btn_full, {marginBottom: 10}]}
      />
    </SafeAreaView>
  );
};

export default SetLocationFull;
