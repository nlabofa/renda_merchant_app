/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-community/clipboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUssdCode} from '../../actions/delivery.action';
import styles from '../Payments/payment-styles';
import ButtonMain from '../../components/Button/ButtonMain';
const banklist = [
  {
    name: 'UBA',
    short: 'uba',
    code: '919',
    image_url: require('../../assets/images/bankicons/uba.png'),
  },
  {
    name: 'Wema Bank',
    short: 'wema',
    code: '945',
    image_url: require('../../assets/images/bankicons/wema.png'),
  },
  {
    name: 'Access Bank',
    short: 'access',
    code: '901',
    image_url: require('../../assets/images/bankicons/access.png'),
  },
  {
    name: 'Polaris Bank',
    short: 'polaris',
    code: '833',
    image_url: require('../../assets/images/bankicons/polaris.png'),
  },
  {
    name: 'GT Bank',
    short: 'gt_bank',
    code: '737',
    image_url: require('../../assets/images/bankicons/gtbank.png'),
  },
  {
    name: 'Zenith Bank',
    short: 'zenith',
    code: '966',
    image_url: require('../../assets/images/bankicons/zenith.png'),
  },
  {
    name: 'Sterling Bank',
    short: 'sterling',
    code: '822',
    image_url: require('../../assets/images/bankicons/sterling.png'),
  },
  {
    name: 'Stanbic IBTC Bank',
    short: 'stanbic',
    code: '909',
    image_url: require('../../assets/images/bankicons/stanbic.png'),
  },
  {
    name: 'EcoBank',
    short: 'eco',
    code: '326',
    image_url: require('../../assets/images/bankicons/ecobank.png'),
  },
  {
    name: 'FCMB',
    short: 'fcmb',
    code: '329',
    image_url: require('../../assets/images/bankicons/fcmb.png'),
  },
  {
    name: 'Fidelity Bank',
    short: 'fidelity',
    code: '770',
    image_url: require('../../assets/images/bankicons/fidelity.png'),
  },
  {
    name: 'First Bank',
    short: 'first_bank',
    code: '894',
    image_url: require('../../assets/images/bankicons/firstbank.png'),
  },
  {
    name: 'Heritage Bank',
    short: 'heritage',
    code: '745',
    image_url: require('../../assets/images/bankicons/hb.png'),
  },
  {
    name: 'Keystone',
    short: 'keystone',
    code: '7111',
    image_url: require('../../assets/images/bankicons/keystone.png'),
  },
  {
    name: 'Diamond Bank',
    short: 'diamond',
    code: '426',
    image_url: require('../../assets/images/bankicons/diamond.png'),
  },
  {
    name: 'Unity Bank',
    short: 'unity',
    code: '7799',
    image_url: require('../../assets/images/bankicons/unity.png'),
  },
];

const ProcessUssd = ({
  navigation,
  route,
  getUssdCode,
  deliveryimage,
  deliverydata,
  user_info,
}) => {
  const [showmodal, setshowmodal] = useState(false);
  const [respdialcode, setrespdialcode] = useState('');
  const [tempbank, setempbank] = useState('');
  const [dialcodesuccess, setdialcodesuccess] = useState(false);
  const {paytype, amount} = route.params;

  const premcode = '*' + tempbank + '*000*380' + respdialcode + '#';
  const performAction = async (activecode) => {
    let data = {
      userId: user_info._id,
      bankCode: activecode,
      amount: amount || deliverydata.paymentAmount,
      paymentFor: paytype,
    };
    if (paytype === 'delivery') {
      data = {
        ...data,
        request: {
          ...deliverydata,
          package: {
            details: {
              ...deliverydata.package.details,
              image: (deliveryimage && deliveryimage.url) || '',
            },
          },
          // extras
          user: user_info._id,
          paymentRef: '',
          paymentAmount: deliverydata.paymentAmount
            ? deliverydata.paymentAmount
            : 1000,
          //extras
          paymentMode: 'Ussd',
        },
      };
    }
    console.log(data);
    try {
      setshowmodal(true);
      const response = await getUssdCode(data);
      setshowmodal(false);
      if (response.status === 200) {
        setrespdialcode(response.data.invoice_id);
        setempbank(activecode);
        setdialcodesuccess(true);
      } else {
        console.log('error occured');
      }
    } catch (error) {
      setshowmodal(false);
      setTimeout(() => {
        alert(error.message);
      }, 500);
      //console.log(error.message);
      //alert(error.message);
    }
  };
  const copyToClipboard = (value) => {
    Clipboard.setString(value);
    Toast.show(
      'Ussd code copied. Paste in keypad dialer and dial to complete payment.',
      Toast.LONG,
    );
  };
  const handleNext = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeDrawer'}],
    });
  };
  // const dialCall = () => {
  //   let phoneNumber = '';

  //   if (Platform.OS === 'android') {
  //     phoneNumber = 'tel:${+1234567890}';
  //   } else {
  //     phoneNumber = 'telprompt:${+1234567890}';
  //   }

  //   Linking.openURL(phoneNumber);
  // };

  const _renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => performAction(item.code)}
      key={index}
      style={{
        backgroundColor: 'transparent',
        marginBottom: 20,
        flex: 1,
      }}>
      <Image
        source={item.image_url}
        //source={require('../../assets/images/message_fly.png')}
        resizeMode="cover"
        style={{width: 50, height: 50, alignSelf: 'center'}}
      />
      <Text
        style={[
          styles.opaq3,
          {textAlign: 'center', color: '#307BA8', paddingVertical: 10},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView
      //forceInset={{bottom: 'never'}}
      style={Basestyle.container_with_space}>
      <Modal
        isVisible={showmodal}
        animationType={'fade'}
        transparent={true}
        style={{margin: 0}}
        onModalHide={() => setshowmodal(false)}
        // onBackdropPress={() => setshowmodal(false)}
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
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title={dialcodesuccess ? 'Pay via USSD' : 'Select your bank'}
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <View style={{flex: 1}}>
        <View style={{marginTop: 30}}>
          {dialcodesuccess ? (
            <View
              style={[
                Basestyle.round_box,
                styles.selection_box2,
                {height: '67%'},
              ]}>
              <View style={{marginTop: 20, alignItems: 'center'}}>
                <Text style={styles.opaq3}>Code to Dial</Text>
                <Text
                  style={[
                    styles.opaq3,
                    {paddingVertical: 30, fontSize: 18, color: '#307BA8'},
                  ]}>
                  {premcode}
                </Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(premcode)}
                  style={Basestyle.row_center}>
                  <Text
                    style={[
                      styles.opaq3,
                      {color: colors.PRIMARY_ORANGE, paddingRight: 5},
                    ]}>
                    Tap to Copy
                  </Text>
                  <MaterialCommunityIcons
                    name="content-copy"
                    color={colors.PRIMARY_ORANGE}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <ButtonMain
                onPress={() => handleNext()}
                text="I have made this transaction"
                btnContainerStyle={{
                  marginBottom: 10,
                  marginTop: 40,
                  width: '80%',
                  alignSelf: 'center',
                }}
              />
            </View>
          ) : (
            <View>
              <FlatList
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={banklist}
                renderItem={_renderItem}
                keyExtractor={(item, index) => `list-item-${index}`}
              />
            </View>
          )}
        </View>
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
  getUssdCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessUssd);
