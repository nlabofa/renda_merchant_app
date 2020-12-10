/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {View, StatusBar, TouchableOpacity} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import SafeAreaView from 'react-native-safe-area-view';
import Entypo from 'react-native-vector-icons/Entypo';
import {updateUserInfo} from '../../actions/auth.action';
import {connect} from 'react-redux';
import {emailRegex} from '../../helpers/libs';
const initialErrorState = {
  firstName: '',
  lastName: '',
  password: '',
  phoneNumber: '',
  email: '',
};
const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
  'password',
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
    index: 12,
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Jones',
    keyboardType: '',
  },
  {
    index: 2,
    label: 'Your Email Address',
    placeholder: 'Eric@gmail.com',
    name: 'email',
    keyboardType: 'email-address',
  },
  {
    index: 1,
    label: 'Phone Number',
    name: 'phoneNumber',
    placeholder: '08189798881',
    keyboardType: 'number-pad',
  },
  {
    index: 10,
    label: 'Password',
    placeholder: '****',
    name: 'password',
    keyboardType: '',
  },
];
const EditProfile = ({navigation, updateUserInfo, user_info}) => {
  const scrollViewRef = useRef(null);
  const initialInputState = {
    firstName: user_info?.firstName,
    lastName: user_info?.lastName,
    email: user_info?.email,
    phoneNumber: user_info?.phoneNumber,
    password: '****',
  };

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
    if (isValid) {
      let data = {
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        phoneNumber: inputValues.phoneNumber,
        email: inputValues.email,
      };
      if (inputValues.password !== '****') {
        data = {
          ...data,
          password: inputValues.password,
        };
      }
      console.log(data);
      try {
        setIsLoading(true);
        const response = await updateUserInfo(data);
        setIsLoading(false);
        console.log(response);
        if (response.status === 200) {
          //setStepValue(2);
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeDrawer'}],
          });
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
        menuitem
        title="Edit Profile"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View>
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
                      value={inputValues[name]}
                      handleInputChange={(text) =>
                        handleInputChange(name, text)
                      }
                      errorMessage={errors[name] || ''}
                      keyboardType={keyboardType || 'default'}
                      cutomwrapperInputStyle={[
                        Basestyle.textarea,
                        {marginBottom: 20},
                      ]}
                    />
                  );
                } else if (name === 'phoneNumber') {
                  return (
                    <View
                      key={index}
                      style={[Basestyle.row_space_between, {marginTop: 20}]}>
                      <View style={{width: '100%'}}>
                        <FloatingTextInput
                          express
                          label={label}
                          placeholder={placeholder}
                          keyboardType={keyboardType || 'default'}
                          value={inputValues.phoneNumber}
                          handleInputChange={(text) =>
                            handleInputChange(name, text)
                          }
                          errorMessage={errors[name] || ''}
                        />
                      </View>
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
                      />
                    </View>
                  );
                }
              },
            )}
          </View>
        </View>
        <ButtonMain
          onPress={() => handleNext()}
          text="Update Info"
          isLoading={isLoading}
          isLoadingtext="Updating..Please wait"
          btnContainerStyle={[Basestyle.btn_full, {marginTop: 40}]}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: {user_info},
  } = state;

  return {
    user_info,
  };
};

const mapDispatchToProps = {
  updateUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
