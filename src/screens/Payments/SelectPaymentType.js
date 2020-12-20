/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemBox from '../../components/ItemBox';
import Modal from 'react-native-modal';
import ReuseHeader from '../../components/Header';
import {connect} from 'react-redux';
import {
  saveDeliveryData,
  submitDeliveryRequest,
  clearDeliveryData,
} from '../../actions/delivery.action';
import styles from './payment-styles';
import PaystackWebView from '../../components/PaystackWebView/PaystackWebView';
import {PAYSTACK_TEST, PAYSTACK_TEST_SECRET} from '../../../key';
import {formatMoney} from '../../helpers/libs';
const SelectDeliveryType = ({
  navigation,
  deliverydata,
  deliveryimage,
  user_info,
  clearDeliveryData,
  submitDeliveryRequest,
}) => {
  const childRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [successmodal, setsuccessmodal] = useState(false);

  const wallet_balance = user_info?.wallet?.balance;
  const LIST_DELIVERY = [
    {
      index: 0,
      label: 'Pay Via USSD',
      imgsrc: require('../../assets/images/pay-ussd.png'),
      route: 'ProcessUSSD',
    },
    {
      index: 1,
      label: 'Pay Via Card',
      imgsrc: require('../../assets/images/pay-card.png'),
      route: 'PayCard',
    },
    {
      index: 2,
      label: wallet_balance ? 'Pay Via Wallet' : 'Top Up Wallet',
      imgsrc: require('../../assets/images/pay-merchant.png'),
      route: 'SelectTopUpType',
    },
  ];
  const checkpayment = (e) => {
    // console.log(e.data);
    if (e.data && e.data.status === 'success') {
      performAction(e.data.trxref);
    } else {
      setTimeout(() => {
        alert('Cancelled Transaction');
      }, 500);
    }
  };
  const performAction = async (trxf) => {
    const data = {
      ...deliverydata,
      package: {
        details: {
          ...deliverydata.package.details,
          image: (deliveryimage && deliveryimage.url) || '',
        },
      },
      // extras
      user: user_info._id,
      paymentMode: 'Card',
      paymentRef: trxf,
      paymentAmount: deliverydata.paymentAmount
        ? deliverydata.paymentAmount
        : 1000,
      //extras
    };
    console.log(data);
    saveDeliveryData(data);
    try {
      setIsLoading(true);
      const response = await submitDeliveryRequest(data);
      setIsLoading(false);
      //console.log(response);
      if (response.status === 201) {
        setTimeout(() => {
          setsuccessmodal(true);
        }, 500);
      } else {
        console.log('error occured');
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        alert(error.message);
      }, 500);
      //console.log(error.message);
      //alert(error.message);
    }
  };
  const payViaWallet = async () => {
    const data = {
      ...deliverydata,
      package: {
        details: {
          ...deliverydata.package.details,
          image: (deliveryimage && deliveryimage.url) || '',
        },
      },
      // extras
      user: user_info._id,
      paymentMode: 'Wallet',
      paymentRef: '',
      paymentAmount: deliverydata.paymentAmount
        ? deliverydata.paymentAmount
        : 1000,
      //extras
    };
    console.log(data);
    try {
      setIsLoading(true);
      const response = await submitDeliveryRequest(data);
      setIsLoading(false);
      //console.log(response);
      if (response.status === 201) {
        setTimeout(() => {
          setsuccessmodal(true);
        }, 500);
      } else {
        console.log('error occured');
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        alert(error.message);
      }, 500);
      //console.log(error.message);
      //alert(error.message);
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
              Your delivery has been Successfully sent
            </Text>
            <Text style={[styles.message_text, {paddingTop: 20}]}>
              You will be contacted by the Renda Team shortly
              {/* You will recieve updates on the status of your delivery shortly */}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => goHome()}
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
        title="Payment"
        leftheader
        //showlefticon
        containerstyle={{marginTop: 10}}
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          {/* <Text style={[styles.opaq3, {paddingBottom: 25}]}>Today</Text> */}
          {LIST_DELIVERY.map(({label, index, route, imgsrc}) => (
            <ItemBox
              key={index}
              customicon={
                <Image
                  source={imgsrc}
                  resizeMode="contain"
                  style={{width: 55, height: 55}}
                />
              }
              customtext={label}
              subtitle={
                index === 2 && wallet_balance
                  ? `Wallet Balance: ${formatMoney(wallet_balance)}`
                  : ' '
              }
              cusomsubtitlestyle={{width: '100%', fontSize: 15}}
              onPress={() =>
                route === 'PayCard'
                  ? childRef.current.StartTransaction()
                  : index === 2 && wallet_balance
                  ? payViaWallet()
                  : navigation.navigate(route, {
                      paytype: 'delivery',
                      amount: deliverydata.paymentAmount || 1000,
                    })
              }
            />
          ))}
        </View>
      </ScrollView>
      <View>
        <PaystackWebView
          buttonText="Pay Now"
          showPayButton={false}
          paystackKey={PAYSTACK_TEST}
          paystackSecretKey={PAYSTACK_TEST_SECRET}
          amount={(deliverydata && deliverydata.paymentAmount) || 1000}
          billingEmail={user_info && user_info.email}
          billingMobile={user_info && user_info.phoneNumber}
          //unreg_ref_id={unreg_ref} //cusom meta_data passed
          billingName={
            user_info && user_info.firstName + ' ' + user_info.lastName
          }
          //ActivityIndicatorColor={colors.PRIMARY_INDIGO}
          channels={JSON.stringify(['card'])}
          SafeAreaViewContainer={{marginTop: 5}}
          SafeAreaViewContainerModal={{marginTop: 5}}
          onCancel={(e) => checkpayment(e)}
          onSuccess={(e) => checkpayment(e)}
          autoStart={false}
          ref={childRef}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    delivery: {deliverydata, deliveryimage},
    auth: {user_info},
  } = state;
  return {
    deliverydata,
    deliveryimage,
    user_info,
  };
};
const mapDispatchToProps = {
  saveDeliveryData,
  clearDeliveryData,
  submitDeliveryRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectDeliveryType);
