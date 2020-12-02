/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import Modal from 'react-native-modal';
import styles from '../Payments/payment-styles';
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

const ProcessUssd = ({navigation}) => {
  const [showmodal, setshowmodal] = useState(false);

  const _renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setshowmodal(true)}
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
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Select your bank"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <View style={{flex: 1}}>
        <View style={{marginTop: 30}}>
          <View>
            <FlatList
              numColumns={3}
              showsVerticalScrollIndicator={false}
              data={banklist}
              renderItem={_renderItem}
              keyExtractor={(item, index) => `list-item-${index}`}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProcessUssd;
