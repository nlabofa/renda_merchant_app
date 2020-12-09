/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {saveDeliveryData} from '../../actions/delivery.action';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './payment-styles';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import PaystackWebView from '../../components/PaystackWebView/PaystackWebView';
import {PAYSTACK_TEST, PAYSTACK_TEST_SECRET} from '../../../key';

const PayMerchant = ({navigation, route, user_info}) => {
  const childRef = useRef();
  const {type} = route.params;

  const [showmodal, setshowmodal] = useState(false);
  const [successmodal, setsuccessmodal] = useState(false);
  const [amount, setamount] = useState('');
  const handleNext = () => {
    if (amount) {
      if (type === 'topup_via_ussd') {
        navigation.navigate('ProcessUSSD', {paytype: 'wallet', amount});
      } else {
        childRef.current.StartTransaction();
      }
    }
  };
  const checkPayment = (e) => {
    console.log(e.data);
    if (e.data && e.data.status === 'success') {
      setsuccessmodal(true);
    } else {
      setTimeout(() => {
        alert('Cancelled Transaction');
      }, 500);
    }
  };

  const goHome = () => {
    setsuccessmodal(false);
    //clearDeliveryData();
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeDrawer'}],
    });
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
      <Modal
        isVisible={showmodal}
        animationType={'fade'}
        transparent={true}
        style={{margin: 0}}
        onModalHide={() => setshowmodal(false)}
        //onBackdropPress={() => setshowmodal(false)}
        // onBackButtonPress={() => setshowmodal(false)}
      >
        <View
          style={[
            styles.modal_content,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <ActivityIndicator size="large" color={colors.PRIMARY_INDIGO} />
          <Text style={[styles.message_text, {paddingTop: 20}]}>
            Processing Transaction
          </Text>
        </View>
      </Modal>
      <Modal
        isVisible={successmodal}
        animationType={'fade'}
        transparent={true}
        style={{margin: 0}}
        onModalHide={() => setsuccessmodal(false)}
        onBackdropPress={() => setsuccessmodal(false)}
        onBackButtonPress={() => setsuccessmodal(false)}>
        <View style={styles.modal_content}>
          <Image
            source={require('../../assets/images/like_round.png')}
            resizeMode="contain"
            style={styles.message_icon}
          />
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={styles.message_text}>
              Your wallet has been topped up Successfully
            </Text>
            {/* <Text style={[styles.message_text, {paddingTop: 20}]}>
              You will recieve updates on the state of your delivery shortly
            </Text> */}
          </View>
          <TouchableOpacity
            onPress={() => goHome()}
            style={styles.message_bottom}>
            <Text style={styles.continue_btn}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ReuseHeader
        title="Top up Wallet"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <View style={{marginTop: 0}}>
            <FloatingTextInput
              express
              label="Enter Amount"
              placeholder="1000"
              keyboardType="number-pad"
              value={amount}
              handleInputChange={(text) => setamount(text)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ButtonMain
        onPress={() => handleNext()}
        text="Top Up"
        disabled={!amount}
        btnContainerStyle={[Basestyle.btn_full, {marginBottom: 10}]}
      />
      <View>
        <PaystackWebView
          buttonText="Pay Now"
          showPayButton={false}
          paystackKey={PAYSTACK_TEST}
          paystackSecretKey={PAYSTACK_TEST_SECRET}
          amount={amount}
          billingEmail={user_info && user_info.email}
          billingMobile={user_info && user_info.phoneNumber}
          userId={user_info && user_info._id}
          paymentFor="wallet"
          billingName={
            user_info && user_info.firstName + ' ' + user_info.lastName
          }
          //ActivityIndicatorColor={colors.PRIMARY_INDIGO}
          channels={JSON.stringify(['card'])}
          SafeAreaViewContainer={{marginTop: 5}}
          SafeAreaViewContainerModal={{marginTop: 5}}
          onCancel={(e) => checkPayment(e)}
          onSuccess={(e) => checkPayment(e)}
          autoStart={false}
          ref={childRef}
        />
      </View>
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
  saveDeliveryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayMerchant);
