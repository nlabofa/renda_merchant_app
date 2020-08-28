/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import styles from './payment-styles';
const CYCLES = [
  {
    title: 'Information Technology',
    type: 'Information Technology',
  },
  {
    title: 'Agriculture',
    type: 'Agriculture',
  },
  {
    title: 'Finance',
    type: 'Finance',
  },
];
const addressFields = [
  {
    index: 0,
    label: 'How much ?',
    placeholder: '0.00',
    keyboardType: 'number-pad',
  },
  {
    index: 1,
    label: 'Card Number',
    placeholder: '0000 0000 0000 0000 ',
    keyboardType: 'number-pad',
  },
  {
    index: 11,
    label: 'Card Expiry Date',
    placeholder: '08/22',
    keyboardType: 'number-pad',
  },
  {
    index: 12,
    label: 'CSV',
    placeholder: '083',
    keyboardType: 'number-pad',
  },
  {
    index: 13,
    label: 'Enter your 4 digit Pin',
    placeholder: '0832',
    keyboardType: 'number-pad',
  },
  // {
  //   index: 7,
  //   label: 'Business Type',
  //   placeholder: 'Textiles',
  //   type: 'dropdown',
  // },
  // {
  //   index: 8,
  //   label: 'Additional Notes ',
  //   placeholder: 'Add note',
  //   keyboardType: '',
  //   type: 'textarea',
  // },
];
const PayCard = ({navigation}) => {
  const [showmodal, setshowmodal] = useState(false);
  const [successmodal, setsuccessmodal] = useState(false);
  const [inputValues, setInput] = useState({
    on_days: '',
    week_days: 'friday',
    end_days: '12',
    cycle_days: '',
    options: '',
  });
  const handleInputChange = (name, value) => {
    setInput((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleNext = () => {
    setshowmodal(true);
    setTimeout(() => {
      setshowmodal(false);
    }, 3000);
    setTimeout(() => {
      setsuccessmodal(true);
    }, 7000);
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
              Your delivery has been Successfully logged
            </Text>
            <Text style={[styles.message_text, {paddingTop: 20}]}>
              You will recieve updates on the state of your delivery shortly
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setsuccessmodal(false)}
            style={styles.message_bottom}>
            <Text style={styles.continue_btn}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ReuseHeader
        title="Pay via Card"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <View style={{marginTop: 0}}>
            {addressFields.map(
              ({index, label, placeholder, type, keyboardType}) => {
                if (type === 'textarea') {
                  return (
                    <FloatingTextInput
                      key={index}
                      express
                      label={label}
                      multiline={true}
                      numberOfLines={4}
                      placeholder={placeholder}
                      keyboardType={keyboardType || 'default'}
                      cutomwrapperInputStyle={[
                        Basestyle.textarea,
                        {marginBottom: 20},
                      ]}
                    />
                  );
                } else if (type === 'dropdown') {
                  return (
                    <CustomDropdown
                      key={index}
                      containerStyle={{marginBottom: 20}}
                      defaultLabel={label}
                      // inputTextStyle={styles.dropdown_inputext}
                      selectedOption={inputValues.on_days}
                      options={[
                        {
                          name: 'Choose category..',
                          value: null,
                        },
                        ...CYCLES,
                      ]}
                      handleDropdownChange={(value) => {
                        if (value !== null) {
                          handleInputChange('on_days', value);
                        }
                      }}
                      labelKey="title"
                      valueKey="type"
                      placeholder={placeholder}
                    />
                  );
                } else {
                  return (
                    <FloatingTextInput
                      key={index}
                      express
                      label={label}
                      placeholder={placeholder}
                      keyboardType={keyboardType || 'default'}
                      cutomwrapperInputStyle={{marginBottom: 20}}
                    />
                  );
                }
              },
            )}
          </View>
        </View>
        <ButtonMain
          onPress={() => handleNext()}
          text="Submit"
          btnContainerStyle={Basestyle.btn_full}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PayCard;
