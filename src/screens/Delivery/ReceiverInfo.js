/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
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
import {connect} from 'react-redux';
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
    keyboardType: 'number-pad',
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
    label: 'Delivery Address',
    name: 'deliveryAddress',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    keyboardType: '',
  },
  {
    index: 33,
    label: 'Closest Landmark',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    name: 'dropOffLandmark',
    keyboardType: '',
  },
  {
    index: 8,
    label: 'Additional Notes ',
    placeholder: 'Add note',
    keyboardType: '',
    name: 'description',
    type: 'textarea',
  },
];
const initialErrorState = {
  fullname: '',
  phone: '',
  email: '',
  deliveryAddress: '',
};
const requiredFields = ['fullname', 'phone', 'email', 'deliveryAddress'];
const initialInputState = {
  fullname: '',
  phone: '',
  email: '',
  deliveryAddress: '',
  dropOffLandmark: '',
  description: '',
};
const ReceiverInfo = ({navigation, deliverydata, saveDeliveryData}) => {
  const [{errors}, setState] = useState({
    errors: initialErrorState,
  });
  const [inputValues, setInput] = useState(initialInputState);
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
      } else {
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
        receiver: {
          details: {
            name: inputValues.fullname,
            phone: inputValues.phone,
            email: inputValues.email,
          },
        },
        deliveryAddress: inputValues.deliveryAddress,
        dropOffLandmark: inputValues.dropOffLandmark,
        deliveryInstructions: inputValues.description,
      });
      navigation.navigate('PackageDetails');
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
              ({index, label, placeholder, name, type, keyboardType}) => {
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
                      value={inputValues.name}
                      handleInputChange={(text) =>
                        handleInputChange(name, text)
                      }
                      errorMessage={errors[name] || ''}
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
                      value={inputValues.name}
                      handleInputChange={(text) =>
                        handleInputChange(name, text)
                      }
                      errorMessage={errors[name] || ''}
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
    delivery: {deliverydata},
  } = state;
  return {
    deliverydata,
  };
};
const mapDispatchToProps = {
  saveDeliveryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverInfo);
