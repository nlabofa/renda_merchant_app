/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, TouchableOpacity} from 'react-native';
import styles from './styles/dashboard_styles';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import SafeAreaView from 'react-native-safe-area-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';

const addressFields = [
  {
    index: 0,
    label: 'Name',
    placeholder: 'Eric Jones',
    keyboardType: '',
  },
  {
    index: 1,
    label: 'Phone Number',
    placeholder: '08189798881',
    keyboardType: 'number-pad',
  },
  {
    index: 2,
    label: 'Email',
    placeholder: 'Eric@gmail.com',
    keyboardType: 'email-address',
  },
  {
    index: 3,
    label: 'Pick Up Address',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    keyboardType: '',
  },
  {
    index: 4,
    label: 'Closest Landmark',
    placeholder: 'Describe a Landmark',
    keyboardType: '',
  },
  {
    index: 5,
    label: 'LGA',
    placeholder: 'Eti Osa',
    keyboardType: '',
  },
  {
    index: 6,
    label: 'State',
    placeholder: 'Lagos',
    keyboardType: '',
  },
];
const ExpressStep1 = ({navigation}) => {
  return (
    <SafeAreaView
      forceInset={{bottom: 'always'}}
      style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ReuseHeader
          title="Express Order"
          expresstitle="Personal Details"
          progresscount=" ( Step 1 / 3 )"
          progressvalue={0.3}
          navigation={navigation}
          textStyle={{letterSpacing: 0.9}}
        />
        <View style={{marginTop: 30}}>
          {addressFields.map(({index, label, placeholder, keyboardType}) => (
            <FloatingTextInput
              key={index}
              express
              label={label}
              placeholder={placeholder}
              keyboardType={keyboardType || 'default'}
              cutomwrapperInputStyle={{marginBottom: 20}}
              rightElement={
                index === 3 && (
                  <TouchableOpacity style={{right: '80%'}}>
                    <Ionicons
                      name="location-sharp"
                      size={33}
                      color={colors.PRIMARY_GREY_04}
                    />
                  </TouchableOpacity>
                )
              }
            />
          ))}
        </View>
        <View style={Basestyle.row_space_between}>
          <ButtonMain
            greybtn
            onPress={() => navigation.goBack()}
            text="Cancel"
            btnContainerStyle={[Basestyle.btn_small]}
          />
          <ButtonMain
            onPress={() => navigation.navigate('ExpStep2')}
            text="Next"
            btnContainerStyle={Basestyle.btn_small}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ExpressStep1;
