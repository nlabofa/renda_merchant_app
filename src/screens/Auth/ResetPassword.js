/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text, StatusBar} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import ButtonMain from '../../components/Button/ButtonMain';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {forgotPassword, resetPassword} from '../../actions/auth.action';
import {connect} from 'react-redux';
import {emailRegex} from '../../helpers/libs';
const ResetPassword = ({navigation, resetPassword, forgotPassword}) => {
  const [showmodal, setshowmodal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stepvalue, setStepValue] = useState(1);
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const handleStep1 = async () => {
    if (!emailRegex.test(value)) {
      alert('Enter a valid email');
    } else {
      try {
        setIsLoading(true);
        const response = await forgotPassword({email: value});
        setIsLoading(false);
        console.log(response);
        if (response.data.status === 200) {
          setStepValue(2);
        } else {
          alert(response.data.error.message);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        alert(error.message);
      }
    }
  };
  const handleStep2 = async () => {
    if (!otp || !password) {
      alert('Enter all fields');
    } else {
      try {
        setIsLoading(true);
        const response = await resetPassword({
          email: value,
          otp: otp,
          password: password,
        });
        setIsLoading(false);
        console.log(response);
        if (response.data.status === 200) {
          setshowmodal(true);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        alert(error.message);
      }
    }
    // setshowmodal(true)
  };
  return (
    <SafeAreaView
      forceInset={{bottom: 'always'}}
      style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Recover Password"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <Modal
        isVisible={showmodal}
        animationType={'fade'}
        transparent={true}
        style={{margin: 0}}
        onModalHide={() => setshowmodal(false)}
        onBackdropPress={() => setshowmodal(false)}
        onBackButtonPress={() => setshowmodal(false)}>
        <View style={styles.modal_content}>
          <Image
            source={require('../../assets/images/message_fly.png')}
            resizeMode="contain"
            style={styles.message_icon}
          />
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={styles.message_text}>Password reset successful!</Text>
            <Text style={[styles.message_text, {paddingTop: 20}]}>
              You can login with your new password
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setshowmodal(false)}
            style={styles.message_bottom}>
            <Text style={styles.continue_btn}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(9)}}>
        {stepvalue === 1 ? (
          <View>
            <FloatingTextInput
              label="Your Email Address "
              placeholder="Ericagarner@gmail.com"
              keyboardType="email-address"
              handleInputChange={(text) => setValue(text)}
              cutomwrapperInputStyle={{marginBottom: 30}}
            />
          </View>
        ) : (
          <View>
            <FloatingTextInput
              label="Enter OTP sent to your phone"
              placeholder=""
              keyboardType="number-pad"
              handleInputChange={(text) => setOtp(text)}
              cutomwrapperInputStyle={{marginBottom: 30}}
            />
            <FloatingTextInput
              label="New Pasword"
              placeholder=""
              secureTextEntry={true}
              handleInputChange={(text) => setPassword(text)}
              cutomwrapperInputStyle={{marginBottom: 30}}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
      <ButtonMain
        onPress={() => (stepvalue === 1 ? handleStep1() : handleStep2())}
        isLoading={isLoading}
        text={stepvalue === 1 ? 'Send me an OTP' : 'Continue'}
        btnContainerStyle={{marginTop: 60, marginBottom: 20}}
      />
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
  forgotPassword,
  resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
