/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
const SetLocationFull = ({navigation}) => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
                  // keyboardType="number-pad"
                  rightElement={
                    <TouchableOpacity style={{right: '80%'}}>
                      <Ionicons
                        name="location-sharp"
                        size={30}
                        color="#ADC1D1"
                        //style={styles.location_icon}
                      />
                    </TouchableOpacity>
                  }
                  cutomwrapperInputStyle={[styles.boxicon, {marginBottom: 10}]}
                />
                <Text
                  onPress={() => navigation.navigate('SetLocationFull')}
                  style={[styles.small_icon_text2]}>
                  Pick location from maps
                </Text>
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
                  // keyboardType="number-pad"
                  rightElement={
                    <TouchableOpacity style={{right: '80%'}}>
                      <Ionicons
                        name="location-sharp"
                        size={30}
                        color="#ADC1D1"
                        //style={styles.location_icon}
                      />
                    </TouchableOpacity>
                  }
                  cutomwrapperInputStyle={[styles.boxicon, {marginBottom: 10}]}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetLocationFull;
