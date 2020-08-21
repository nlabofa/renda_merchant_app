/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Basestyle, Fontnames} from '../../helpers/BaseThemes';
import styles from './styles';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const SignUpOTP = ({navigation}) => {
  const [showmodal, setshowmodal] = useState(false);

  return (
    <SafeAreaView style={Basestyle.container_with_space}>
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
            source={require('../../assets/images/like_round.png')}
            resizeMode="contain"
            style={styles.message_icon}
          />
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={[styles.message_text, {paddingTop: 20}]}>
              Successfull Sign Up !
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setshowmodal(false)}
            style={styles.message_bottom}>
            <Text style={styles.continue_btn}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Sign Up to Renda"
        showlefticon
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
              setshowmodal(true);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpOTP;
