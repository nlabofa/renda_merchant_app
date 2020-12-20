/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {View, StatusBar, Alert} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import SafeAreaView from 'react-native-safe-area-view';
import {updateUserInfo} from '../../actions/auth.action';
import {connect} from 'react-redux';
import {emailRegex} from '../../helpers/libs';
const initialErrorState = {
  oldpassword: '',
  newpassword: '',
  confirmpassword: '',
};
const requiredFields = ['oldpassword', 'newpassword', 'confirmpassword'];
const addressFields = [
  {
    index: 8,
    label: 'Old Password',
    placeholder: '****',
    name: 'oldpassword',
    keyboardType: '',
  },
  {
    index: 9,
    label: 'New Password',
    placeholder: '****',
    name: 'newpassword',
    keyboardType: '',
  },
  {
    index: 10,
    label: 'Confirm Password',
    placeholder: '****',
    name: 'confirmpassword',
    keyboardType: '',
  },
];
const EditPassword = ({navigation, updateUserInfo, user_info}) => {
  const scrollViewRef = useRef(null);
  const initialInputState = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  };

  const [{errors}, setState] = useState({
    errors: initialErrorState,
  });
  const [inputValues, setInput] = useState(initialInputState);
  const [isLoading, setIsLoading] = useState(false);
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
    const {newpassword, confirmpassword} = inputValues;
    if (newpassword === confirmpassword) {
      if (isValid) {
        let data = {
          password: inputValues.newpassword,
        };
        console.log(data);
        try {
          setIsLoading(true);
          const response = await updateUserInfo(data);
          setIsLoading(false);
          console.log(response);
          if (response.status === 200) {
            Alert.alert('Your Password has been updated!');
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error.message);
          alert(error.message);
        }
      }
    } else {
      Alert.alert('Password does not match');
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
        title="Change Password"
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
                        secureTextEntry={true}
                        keyboardType={keyboardType || 'default'}
                        value={inputValues[name]}
                        handleInputChange={(text) =>
                          handleInputChange(name, text)
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
          text="Update Password"
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
