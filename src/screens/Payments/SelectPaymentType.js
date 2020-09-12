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
} from '../../actions/delivery.action';
import styles from './payment-styles';
import PaystackWebView from '../../components/PaystackWebView/PaystackWebView';
import {PAYSTACK_TEST, PAYSTACK_TEST_SECRET} from '../../../key';
const LIST_DELIVERY = [
  {
    index: 0,
    label: 'Pay Via USSD',
    imgsrc: require('../../assets/images/pay-ussd.png'),
    route: 'PayUssd',
  },
  {
    index: 1,
    label: 'Pay Via Card',
    imgsrc: require('../../assets/images/pay-card.png'),
    route: 'PayCard',
  },
  {
    index: 2,
    label: 'Pay Via Wallet',
    imgsrc: require('../../assets/images/pay-merchant.png'),
    route: 'PayMerchant',
  },
];
const SelectDeliveryType = ({
  navigation,
  deliverydata,
  deliveryimage,
  user_info,
  submitDeliveryRequest,
}) => {
  const childRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [successmodal, setsuccessmodal] = useState(false);
  const checkpayment = (e) => {
    // console.log(e);
    if (e.data && e.data.status === 'success') {
      performAction();
    } else {
      setTimeout(() => {
        alert('Cancelled Transaction');
      }, 1000);
    }
  };
  const performAction = async () => {
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
      distance: 20,
      estimatedTime: 120,
      paymentMode: 'Card',
      paymentAmount: 1000,
      //extras end
    };
    console.log(data);
    saveDeliveryData(data);
    try {
      setIsLoading(true);
      const response = await submitDeliveryRequest(data);
      setIsLoading(false);
      console.log(response);
      if (response.status === 201) {
        setTimeout(() => {
          setsuccessmodal(true);
        }, 1000);
      } else {
        console.log('error occured');
      }
    } catch (error) {
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
              Your delivery has been Successfully logged
            </Text>
            <Text style={[styles.message_text, {paddingTop: 20}]}>
              You will recieve updates on the state of your delivery shortly
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setsuccessmodal(false);
              setTimeout(() => {
                navigation.navigate('HomeDrawer');
              }, 1000);
            }}
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
          <Text style={[styles.opaq3, {paddingBottom: 25}]}>Today</Text>
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
              onPress={() =>
                route === 'PayCard'
                  ? performAction()
                  : navigation.navigate(route)
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
          amount={19500}
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
  submitDeliveryRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectDeliveryType);
