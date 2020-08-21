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
const ResetPassword = ({navigation}) => {
  const [showmodal, setshowmodal] = useState(false);
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
            <Text style={styles.message_text}>
              An email has been sent to{' '}
              <Text style={{color: '#8AA9BF'}}>ericgarner@gmail.com</Text>
            </Text>
            <Text style={[styles.message_text, {paddingTop: 20}]}>
              Please follow the link to reset you password
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
        <View>
          <FloatingTextInput
            label="Your Email Address "
            placeholder="Ericagarner@gmail.com"
            keyboardType="email-address"
            cutomwrapperInputStyle={{marginBottom: 30}}
          />
        </View>
      </KeyboardAwareScrollView>
      <ButtonMain
        onPress={() => setshowmodal(true)}
        text="Email me a recovery link"
        btnContainerStyle={{marginTop: 60, marginBottom: 20}}
      />
    </SafeAreaView>
  );
};

export default ResetPassword;
