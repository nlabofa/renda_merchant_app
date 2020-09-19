/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import statesList from '../../helpers/statelist';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {
  getRoles,
  getBusinessTypes,
  createAccount,
} from '../../actions/auth.action';
import {emailRegex, phoneNumberRegex} from '../../helpers/libs';
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
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Eric',
    keyboardType: '',
  },
  {
    index: 20,
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Jones',
    keyboardType: '',
  },
  {
    index: 11,
    label: 'Business Name',
    name: 'businessName',
    placeholder: 'Garner corp',
    keyboardType: '',
  },
  {
    index: 1,
    label: 'Phone Number',
    placeholder: '08189798881',
    name: 'phoneNumber',
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
    index: 7,
    label: 'Business Type',
    placeholder: 'Textiles',
    name: 'businessType',
    type: 'dropdown',
  },
  {
    index: 90,
    label: 'Password',
    placeholder: '*****',
    name: 'password',
  },
  {
    index: 3,
    label: 'Address',
    placeholder: '',
    name: 'address',
    keyboardType: '',
  },
];
const initialErrorState = {
  firstName: '',
  lastName: '',
  businessName: '',
  password: '',
  address: '',
  phoneNumber: '',
  email: '',
};
const requiredFields = [
  'firstName',
  'lastName',
  'businessName',
  'password',
  'phoneNumber',
  'email',
  'address',
];
const initialInputState = {
  firstName: '',
  lastName: '',
  businessName: '',
  phoneNumber: '',
  email: '',
  businessType: '',
  password: '',
  address: '',
  lga: '',
  stateoforigin: '',
};
const SignUpBusiness = ({
  navigation,
  getRoles,
  getBusinessTypes,
  business_types,
  createAccount,
  user_roles,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      await getRoles();
      await getBusinessTypes();
    };
    user_roles.length > 0 ? null : fetchData();
  }, [getRoles, getBusinessTypes]);
  const [{errors}, setState] = useState({
    errors: initialErrorState,
  });
  const [inputValues, setInput] = useState(initialInputState);
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, sethidePassword] = useState(false);

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
  const getRoleId = () => {
    if (user_roles.some((el) => el.slug === 'user')) {
      const updatedInfo = user_roles.filter((el) => el.slug === 'user');
      //console.log(updatedInfo);
      return updatedInfo[0]._id;
    }
  };
  const managePasswordVisibility = () => {
    sethidePassword(!hidePassword);
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
      } else if (
        requiredField === 'phoneNumber' &&
        !phoneNumberRegex.test(inputValues.phoneNumber)
      ) {
        const message = 'Please enter a valid phone number';
        console.log(message);
        setState((state) => ({
          ...state,
          errors: {
            [requiredField]: message,
          },
        }));
        return false;
      } else {
        continue;
      }
    }

    return isValid;
  };
  const handleNext = async () => {
    setState((state) => ({
      ...state,
      errors: initialErrorState,
    }));
    const isValid = validateFields(requiredFields);
    // console.log(requiredFields);
    console.log(isValid);
    if (isValid) {
      const data = {
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        businessName: inputValues.businessName,
        phoneNumber: inputValues.phoneNumber,
        email: inputValues.email,
        businessType: inputValues.businessType,
        address: inputValues.address,
        lga: inputValues.lga,
        state: inputValues.stateoforigin,
        password: inputValues.password,
        role: getRoleId(),
      };
      console.log(data);
      try {
        setIsLoading(true);
        const response = await createAccount(data);
        setIsLoading(false);
        console.log(response);
        if (response.status === 201) {
          navigation.navigate('SignUpOTP', {email: response.data.email});
        } else {
          alert('error occured');
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        alert(error.message);
      }
    }
  };
  return (
    <SafeAreaView
      forceInset={{bottom: 'never'}}
      style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Sign Up as a Business"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View>
            {addressFields.map(
              ({index, label, placeholder, type, name, keyboardType}) => {
                if (type === 'textarea') {
                  return (
                    <FloatingTextInput
                      key={index}
                      express
                      label={label}
                      multiline={true}
                      numberOfLines={4}
                      placeholder={placeholder}
                      value={inputValues[name]}
                      handleInputChange={(text) =>
                        handleInputChange(name, text)
                      }
                      keyboardType={keyboardType || 'default'}
                      cutomwrapperInputStyle={[
                        Basestyle.textarea,
                        {marginBottom: 20},
                      ]}
                      errorMessage={errors[name] || ''}
                    />
                  );
                } else if (type === 'dropdown') {
                  return (
                    <View style={{marginTop: 20}} key={index}>
                      <CustomDropdown
                        // containerStyle={{marginBottom: 20}}
                        defaultLabel={label}
                        // inputTextStyle={styles.dropdown_inputext}
                        selectedOption={inputValues[name]}
                        options={[
                          {
                            name: 'Choose category..',
                            value: null,
                          },
                          ...CYCLES,
                        ]}
                        handleDropdownChange={(value) => {
                          if (value !== null) {
                            handleInputChange(name, value);
                          }
                        }}
                        labelKey="title"
                        valueKey="type"
                        placeholder={placeholder}
                        errorMessage={errors[name] || ''}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View key={index} style={{marginTop: 20}}>
                      <FloatingTextInput
                        express
                        label={label}
                        placeholder={placeholder}
                        keyboardType={keyboardType || 'default'}
                        value={inputValues[name]}
                        handleInputChange={(text) =>
                          handleInputChange(name, text)
                        }
                        secureTextEntry={
                          name === 'password' && !hidePassword ? true : false
                        }
                        rightElement={
                          name === 'password' && (
                            <TouchableOpacity
                              onPress={() => managePasswordVisibility()}
                              style={{right: '80%'}}>
                              <Entypo
                                name={hidePassword ? 'eye' : 'eye-with-line'}
                                size={25}
                                color={colors.PRIMARY_GREY_02}
                              />
                            </TouchableOpacity>
                          )
                        }
                        errorMessage={errors[name] || ''}
                        //cutomwrapperInputStyle={{marginBottom: 20}}
                      />
                    </View>
                  );
                }
              },
            )}
            <View style={[Basestyle.row_space_between, {marginVertical: 20}]}>
              <View style={{width: '48%'}}>
                <FloatingTextInput
                  label="L.G.A"
                  placeholder="Eti Osa"
                  value={inputValues.lga}
                  handleInputChange={(text) => handleInputChange('lga', text)}
                  //cutomwrapperInputStyle={{width: '48%'}}
                />
              </View>

              <View style={{width: '48%'}}>
                <CustomDropdown
                  // containerStyle={{backgroundColor: 'red'}}
                  defaultLabel="State"
                  // inputTextStyle={styles.dropdown_inputext}
                  selectedOption={inputValues.stateoforigin}
                  options={[
                    {
                      name: 'Choose state...',
                      value: null,
                    },
                    ...statesList,
                  ]}
                  handleDropdownChange={(value) => {
                    if (value !== null) {
                      handleInputChange('stateoforigin', value);
                    }
                  }}
                  labelKey="name"
                  valueKey="name"
                  placeholder="Choose state..."
                />
              </View>
            </View>
          </View>
        </View>
        <ButtonMain
          onPress={() => handleNext()}
          text="Continue"
          isLoading={isLoading}
          btnContainerStyle={Basestyle.btn_full}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: {user_roles, business_types},
  } = state;

  return {
    user_roles,
    business_types,
  };
};

const mapDispatchToProps = {
  getRoles,
  getBusinessTypes,
  createAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpBusiness);
