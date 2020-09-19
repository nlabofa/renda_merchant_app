/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StatusBar, Text, Platform} from 'react-native';
import {Basestyle, colors, Fontnames} from '../../helpers/BaseThemes';
import styles from './styles';
import Modal from 'react-native-modal';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {verifyOTP} from '../../actions/auth.action';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native';
const SignUpOTP = ({navigation, verifyOTP, route}) => {
  const {email, password} = route.params;
  //console.log(email);
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = async (otp) => {
    const data = {
      email: email,
      otp: otp,
      password: password,
    };
    console.log(data);
    try {
      setIsLoading(true);
      await verifyOTP(data);
      setIsLoading(false);
    } catch (error) {
      // navigation.navigate('Auth');
      setIsLoading(false);
      console.log(error.message);
      //alert(error.message);
    }
  };

  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <Modal
        isVisible={isLoading}
        animationType={'fade'}
        transparent={true}
        style={{margin: 0}}
        onModalHide={() => setIsLoading(false)}
        //onBackdropPress={() => setIsLoading(false)}
        // onBackButtonPress={() => setIsLoading(false)}
      >
        <View
          style={[
            styles.modal_content,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <ActivityIndicator size="large" color={colors.PRIMARY_INDIGO} />
          <Text style={[styles.message_text, {paddingTop: 20}]}>
            Processing...
          </Text>
        </View>
      </Modal>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Sign Up to Renda"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView
        style={{
          marginTop: '20%',
          overflow: Platform.OS === 'ios' ? 'visible' : 'scroll',
        }}>
        <Text style={styles.otptoptext}>
          Please enter the{' '}
          <Text style={{fontFamily: Fontnames.nunito_bold}}>6-digit</Text>{' '}
          verificaton code we sent to your Phone number and Email Address
        </Text>
        <View style={{width: '100%', marginTop: '10%', height: 80}}>
          <OTPInputView
            codeInputFieldStyle={[Basestyle.otp_input]}
            pinCount={6}
            onCodeFilled={(code) => {
              // setshowmodal(true);
              handleNext(code);
            }}
          />
        </View>
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
  verifyOTP,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpOTP);
