/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */

import React, {useState} from 'react';
import {View, Text, Switch, StatusBar} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import ProgressBar from 'react-native-progress/Bar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import {connect} from 'react-redux';
import {emailRegex} from '../../helpers/libs';

import {saveDeliveryData} from '../../actions/delivery.action';
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
    name: 'fullname',
    keyboardType: '',
  },
  {
    index: 1,
    label: 'Phone Number',
    placeholder: '08189798881',
    name: 'phone',
    keyboardType: 'phone-pad',
  },
  {
    index: 2,
    label: 'Your Email Address',
    placeholder: 'Eric@gmail.com',
    name: 'email',
    keyboardType: 'email-address',
  },
  {
    index: 3,
    label: 'Pick Up Address',
    placeholder: '',
    keyboardType: '',
    name: 'pickUpAddress',
  },
  {
    index: 33,
    label: 'Closest Landmark',
    placeholder: '',
    keyboardType: '',
    name: 'pickUpLandmark',
  },
];
const initialErrorState = {
  fullname: '',
  phone: '',
  email: '',
  pickUpAddress: '',
};
const requiredFields = ['fullname', 'phone', 'email', 'pickUpAddress'];

const SenderInfo = ({
  navigation,
  deliverydata,
  user_info,
  deliveryinfo,
  saveDeliveryData,
}) => {
  const activeLocation = deliveryinfo && deliveryinfo.activeLocation;
  const [{errors}, setState] = useState({
    errors: initialErrorState,
  });
  const [inputValues, setInput] = useState({
    fullname: user_info.firstName + ' ' + user_info.lastName || '',
    phone: user_info.phoneNumber,
    email: user_info.email,
    pickUpAddress: activeLocation && activeLocation.address,
    pickUpLandmark: activeLocation && activeLocation.name,
  });
  const handleInputChange = (name, value) => {
    setInput((state) => ({
      ...state,
      [name]: value,
    }));
    setState((state) => ({
      ...state,
      errors: {
        ...state.errors,
        [name]: '',
      },
    }));
  };
  const validateFields = (requiredFields) => {
    let isValid = true;
    for (let iterator = 0; iterator < requiredFields.length; iterator++) {
      const requiredField = requiredFields[iterator];
      const inputValue =
        requiredField !== 'biz_category_id'
          ? inputValues[requiredField].trim()
          : inputValues[requiredField];

      if (!inputValue) {
        isValid = false;
        const formField = addressFields.find(
          (field) => field.name === requiredField,
        );

        const message = `Please ${
          formField.type === 'dropdown' ? 'select' : 'enter'
        } ${formField.label.toLowerCase()}`;
        console.log(message);
        setState((state) => ({
          ...state,
          errors: {
            [requiredField]: message,
          },
        }));
        break;
      } else if (
        requiredField === 'email' &&
        !emailRegex.test(inputValues.email)
      ) {
        const message = 'Please enter a valid email';
        console.log(message);
        setState((state) => ({
          ...state,
          errors: {
            [requiredField]: message,
          },
        }));
        return false;
      }
      //  else if (
      //   requiredField === 'phone' &&
      //   !phoneNumberRegex.test(inputValues.phone)
      // ) {
      //   const message = 'Please enter a valid phone number';
      //   console.log(message);
      //   setState((state) => ({
      //     ...state,
      //     errors: {
      //       [requiredField]: message,
      //     },
      //   }));
      //   return false;
      // }
      else {
        continue;
      }
    }

    return isValid;
  };
  const handleNext = () => {
    setState((state) => ({
      ...state,
      errors: initialErrorState,
    }));
    const isValid = validateFields(requiredFields);
    if (isValid) {
      saveDeliveryData({
        ...deliverydata,
        sender: {
          details: {
            name: inputValues.fullname,
            phone: inputValues.phone,
            email: inputValues.email,
          },
        },
        pickUpAddress: inputValues.pickUpAddress,
        pickUpLandmark: inputValues.pickUpLandmark,
      });
      navigation.navigate('ReceiverInfo');
    }
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
      <KeyboardAwareScrollView
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[styles.row_top_text, {color: colors.PRIMARY_BLUE}]}>
            Sender's Information
          </Text>
          <ProgressBar
            width={null}
            height={5}
            progress={0.3}
            color={colors.PRIMARY_ORANGE}
            unfilledColor={'#D8D8D8'}
            borderWidth={0}
            //strokeCap="square"
            style={{marginBottom: 20, borderRadius: 6}}
          />
          <View style={{marginTop: 0}}>
            {addressFields.map(
              ({index, label, name, placeholder, type, keyboardType}) => {
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
                    <View key={index} style={{marginTop: 20}}>
                      <FloatingTextInput
                        express
                        label={label}
                        placeholder={placeholder}
                        value={inputValues[name]}
                        handleInputChange={(text) =>
                          handleInputChange(name, text)
                        }
                        errorMessage={errors[name] || ''}
                        keyboardType={keyboardType || 'default'}
                        //cutomwrapperInputStyle={{marginBottom: 20}}
                      />
                    </View>
                  );
                }
              },
            )}
          </View>
          <View style={[Basestyle.row_center, {marginTop: 20}]}>
            <Text style={[styles.row_top_text, styles.rowleft]}>
              Save as pickup address
            </Text>
            <Switch
              trackColor={{
                false: colors.SECONDARY_ORANGE,
                true: colors.PRIMARY_ORANGE,
              }}
              thumbColor="#fff"
              ios_backgroundColor={colors.SECONDARY_ORANGE}
              onValueChange={(value) => handleInputChange('options', value)}
              value={inputValues.options}
            />
          </View>
        </View>
        <View style={[Basestyle.row_space_between, {marginVertical: 30}]}>
          <ButtonMain
            greybtn
            onPress={() => navigation.goBack()}
            text="Back"
            btnContainerStyle={[Basestyle.btn_small]}
          />
          <ButtonMain
            onPress={() => handleNext()}
            text="Next"
            btnContainerStyle={Basestyle.btn_small}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    delivery: {deliverydata, deliveryinfo},
    auth: {user_info},
  } = state;
  return {
    deliverydata,
    deliveryinfo,
    user_info,
  };
};
const mapDispatchToProps = {
  saveDeliveryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SenderInfo);
