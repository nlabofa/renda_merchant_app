/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, StatusBar, TouchableOpacity, Text, Image} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {processFontSize} from '../../helpers/fonts';
import styles from './styles';
import {GoogleSignin} from '@react-native-community/google-signin';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import statesList from '../../helpers/statelist';
import SafeAreaView from 'react-native-safe-area-view';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  getRoles,
  createAccount,
  getBusinessTypes,
} from '../../actions/auth.action';
import {connect} from 'react-redux';
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
    keyboardType: 'number-pad',
  },
  {
    index: 3,
    label: 'Address',
    name: 'address',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    keyboardType: '',
  },
];
const initialErrorState = {
  firstName: '',
  lastName: '',
  password: '',
  address: '',
  phoneNumber: '',
  email: '',
};
const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
  'password',
  'address',
];
const initialInputState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  address: '',
  lga: '',
  stateoforigin: '',
};
const SignUpIndividual = ({
  navigation,
  getRoles,
  createAccount,
  getBusinessTypes,
  user_roles,
}) => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await getRoles();
      await getBusinessTypes();
    };
    user_roles.length > 0 ? null : fetchData();
  }, [getRoles, getBusinessTypes]);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '91081549853-30ro22ipmi94oeep4sq2ufia9bg8c3rk.apps.googleusercontent.com',
      forceConsentPrompt: true, // if you want to show the authorization prompt at each login
    });
  }, []);
  const googleSignInHandler = () => {
    GoogleSignin.hasPlayServices()
      .then((res) => {
        GoogleSignin.signIn()
          .then((res) => {
            console.log(res);
            let userDetails = {
              email: res.user.email.toLowerCase(),
              // access_token: "12345"
            };
            //console.log(userDetails);
            handleOAUTHLogin(userDetails);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
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
      } else {
        continue;
      }
    }

    return isValid;
  };
  const handleOAUTHLogin = (data) => {
    console.log(data);
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({animated: true});
    }, 500);
    setIsLoading(true);
  };
  const handleNext = async () => {
    setState((state) => ({
      ...state,
      errors: initialErrorState,
    }));
    const isValid = validateFields(requiredFields);
    // console.log(requiredFields);
    if (isValid) {
      const data = {
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        phoneNumber: inputValues.phoneNumber,
        email: inputValues.email,
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
        title="Sign Up as an  Individual"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <View style={{marginTop: 15}}>
            <ButtonMain
              btnwhite
              onPress={() => googleSignInHandler()}
              text="Sign up with your Google account"
              showicon={
                <Image
                  source={require('../../assets/images/google_icon.png')}
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginRight: 15}}
                />
              }
              btnTextStyles={{color: colors.PRIMARY_BLUE}}
              btnContainerStyle={{height: processFontSize(55)}}
            />
          </View>
          <View style={styles.line_row}>
            <View style={styles.hr_sm} />
            <Text style={styles.signup_text_sm}>
              Or enter your details manually{' '}
            </Text>
            <View style={styles.hr_sm} />
          </View>
          <View style={{marginTop: 30}}>
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
                      value={inputValues.name}
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
                      cutomwrapperInputStyle={{marginBottom: 20}}
                    />
                  );
                }
              },
            )}
            <View style={[Basestyle.row_space_between, {marginBottom: 30}]}>
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
    auth: {user_roles},
  } = state;

  return {
    user_roles,
  };
};

const mapDispatchToProps = {
  getRoles,
  getBusinessTypes,
  createAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpIndividual);
