/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {GoogleSignin} from '@react-native-community/google-signin';

import {processFontSize} from '../../helpers/fonts';
import {handleLogin, googleLogin} from '../../actions/auth.action';
import {connect} from 'react-redux';
import {emailRegex} from '../../helpers/libs';

const addressFields = [
  {
    index: 2,
    label: 'Your Email Address',
    placeholder: 'Eric@gmail.com',
    name: 'email',
    keyboardType: 'email-address',
  },
  {
    index: 10,
    label: 'Password',
    placeholder: '****',
    name: 'password',
  },
];

const initialErrorState = {
  password: '',
  email: '',
};
const requiredFields = ['email', 'password'];

const Login = ({navigation, googleLogin, handleLogin, route}) => {
  const preemail = route.params && route.params.email;
  const initialInputState = {
    email: preemail || '',
    password: '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, sethidePassword] = useState(false);
  const [inputValues, setInput] = useState(initialInputState);
  const [{errors}, setState] = useState({
    errors: initialErrorState,
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
        !emailRegex.test(inputValues[requiredField])
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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '91081549853-30ro22ipmi94oeep4sq2ufia9bg8c3rk.apps.googleusercontent.com',
      forceConsentPrompt: true, // if you want to show the authorization prompt at each login
    });
  }, []);

  const handleOAUTHLogin = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await googleLogin(data);
      setIsLoading(false);
      console.log(response);
      if (response.status === 200 && response?.data?.data?.accessToken) {
        handleInputChange('email', '');
        handleInputChange('password', '');

        navigation.navigate('MainApp');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      alert(error.message);
    }
  };
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
  const handleNext = async () => {
    setState((state) => ({
      ...state,
      errors: initialErrorState,
    }));
    const isValid = validateFields(requiredFields);
    if (isValid) {
      const data = {
        email: inputValues.email,
        password: inputValues.password,
        strategy: 'local',
      };
      console.log(data);
      try {
        setIsLoading(true);
        const response = await handleLogin(data);
        setIsLoading(false);
        console.log(response);
        if (response.status === 201) {
          handleInputChange('email', '');
          handleInputChange('password', '');
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
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
    // <ScrollView>
    <View style={[Basestyle.container_with_space, styles.container]}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <Image
        source={Images.arc}
        resizeMode="center"
        resizeMethod="resize"
        style={styles.arc}
      />
      <Image
        source={Images.login_bg2}
        resizeMode="contain"
        style={styles.bottom_img}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(3), overflow: 'visible'}}>
        <Image
          source={Images.white_logo}
          resizeMode="contain"
          style={styles.logo_icon}
        />
        <View style={{marginTop: hp(17)}}>
          <FloatingTextInput
            label="Email Address"
            placeholder="name@email.com"
            keyboardType="email-address"
            value={inputValues.email}
            handleInputChange={(text) => handleInputChange('email', text)}
            errorMessage={errors.email || ''}
          />
          <View style={{marginTop: 30}}>
            <FloatingTextInput
              label="Password"
              placeholder="* * * * "
              value={inputValues.password}
              handleInputChange={(text) => handleInputChange('password', text)}
              errorMessage={errors.password || ''}
              secureTextEntry={!hidePassword ? true : false}
              rightElement={
                <TouchableOpacity
                  onPress={() => managePasswordVisibility()}
                  style={{right: '80%'}}>
                  <Entypo
                    name={hidePassword ? 'eye' : 'eye-with-line'}
                    size={25}
                    color={colors.PRIMARY_GREY_02}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <Text
            onPress={() => navigation.navigate('ResetPassword')}
            style={styles.forgot_pass}>
            Forgot Password?
          </Text>
          <ButtonMain
            onPress={() => handleNext()}
            text="Sign in"
            isLoading={isLoading}
            btnContainerStyle={{marginTop: processFontSize(40)}}
          />
          <ButtonMain
            btnwhite
            onPress={() => googleSignInHandler()}
            disabled={isLoading}
            text="Sign in with your Google account"
            showicon={
              <Image
                source={require('../../assets/images/google_icon.png')}
                resizeMode="contain"
                style={{width: 25, height: 25, marginRight: 15}}
              />
            }
            btnTextStyles={{color: colors.PRIMARY_BLUE}}
            btnContainerStyle={{
              height: processFontSize(50),
              marginTop: processFontSize(20),
            }}
          />
          <ButtonMain
            btnwhite
            onPress={() => navigation.navigate('SignUpLanding')}
            text="Sign Up"
            // showicon={
            //   <Image
            //     source={Images.stopwatch}
            //     resizeMode="contain"
            //     style={{width: 25, height: 25, marginRight: 10}}
            //   />
            // }
            btnTextStyles={{color: colors.PRIMARY_BLUE}}
            btnContainerStyle={{marginVertical: processFontSize(20)}}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
    // </ScrollView>
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
  handleLogin,
  googleLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
