/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import ProgressBar from 'react-native-progress/Bar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import styles from './styles/delivery_styles';
const CYCLES = [
  {
    title: 'Information Technology',
    type: 'Information Technology',
  },
  {
    title: 'Agriculture',
    type: 'Agriculture',
  },
  {
    title: 'Finance',
    type: 'Finance',
  },
];
const addressFields = [
  {
    index: 0,
    label: 'Full Name',
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
    label: 'Your Email Address',
    placeholder: 'Eric@gmail.com',
    keyboardType: 'email-address',
  },
  // {
  //   index: 7,
  //   label: 'Business Type',
  //   placeholder: 'Textiles',
  //   type: 'dropdown',
  // },
  {
    index: 3,
    label: 'Delivery Address',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    keyboardType: '',
  },
  {
    index: 33,
    label: 'Closest Landmark',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    keyboardType: '',
  },
  {
    index: 8,
    label: 'Additional Notes ',
    placeholder: 'Add note',
    keyboardType: '',
    type: 'textarea',
  },
];
const ReceiverInfo = ({navigation}) => {
  const [inputValues, setInput] = useState({
    on_days: '',
    week_days: 'friday',
    end_days: '12',
    cycle_days: '',
    options: '',
  });
  const handleInputChange = (name, value) => {
    setInput((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <SafeAreaView
      //forceInset={{bottom: 'never'}}
      style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="New Request"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <Text style={[styles.row_top_text, {color: colors.PRIMARY_BLUE}]}>
            Receiver’s Details
          </Text>
          <ProgressBar
            width={null}
            height={5}
            progress={0.7}
            color={colors.PRIMARY_ORANGE}
            unfilledColor={'#D8D8D8'}
            borderWidth={0}
            //strokeCap="square"
            style={{marginBottom: 50, borderRadius: 6}}
          />
          <View style={{marginTop: 0}}>
            {addressFields.map(
              ({index, label, placeholder, type, keyboardType}) => {
                if (type === 'textarea') {
                  return (
                    <FloatingTextInput
                      key={index}
                      express
                      label={label}
                      multiline={true}
                      numberOfLines={4}
                      placeholder={placeholder}
                      keyboardType={keyboardType || 'default'}
                      cutomwrapperInputStyle={[
                        Basestyle.textarea,
                        {marginBottom: 20},
                      ]}
                    />
                  );
                } else if (type === 'dropdown') {
                  return (
                    <CustomDropdown
                      key={index}
                      containerStyle={{marginBottom: 20}}
                      defaultLabel={label}
                      // inputTextStyle={styles.dropdown_inputext}
                      selectedOption={inputValues.on_days}
                      options={[
                        {
                          name: 'Choose category..',
                          value: null,
                        },
                        ...CYCLES,
                      ]}
                      handleDropdownChange={(value) => {
                        if (value !== null) {
                          handleInputChange('on_days', value);
                        }
                      }}
                      labelKey="title"
                      valueKey="type"
                      placeholder={placeholder}
                    />
                  );
                } else {
                  return (
                    <FloatingTextInput
                      key={index}
                      express
                      label={label}
                      placeholder={placeholder}
                      keyboardType={keyboardType || 'default'}
                      cutomwrapperInputStyle={{marginBottom: 20}}
                    />
                  );
                }
              },
            )}
          </View>
        </View>
        <View style={[Basestyle.row_space_between, {marginVertical: 0}]}>
          <ButtonMain
            greybtn
            onPress={() => navigation.goBack()}
            text="Cancel"
            btnContainerStyle={[Basestyle.btn_small]}
          />
          <ButtonMain
            onPress={() => navigation.navigate('PackageDetails')}
            text="Next"
            btnContainerStyle={Basestyle.btn_small}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ReceiverInfo;
