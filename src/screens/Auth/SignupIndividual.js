/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StatusBar, Text, Image} from 'react-native';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {processFontSize} from '../../helpers/fonts';
import styles from './styles';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import statesList from '../../helpers/statelist';
const addressFields = [
  {
    index: 0,
    label: 'First Name',
    placeholder: 'Eric',
    keyboardType: '',
  },
  {
    index: 12,
    label: 'Last Name',
    placeholder: 'Jones',
    keyboardType: '',
  },
  {
    index: 2,
    label: 'Your Email Address',
    placeholder: 'Eric@gmail.com',
    keyboardType: 'email-address',
  },
  {
    index: 1,
    label: 'Phone Number',
    placeholder: '08189798881',
    keyboardType: 'number-pad',
  },
  {
    index: 3,
    label: 'Address',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    keyboardType: '',
  },
  // {
  //   index: 7,
  //   label: 'Category',
  //   placeholder: 'Clothes',
  //   keyboardType: '',
  //   type: 'dropdown',
  // },
  // {
  //   index: 8,
  //   label: 'Package Description',
  //   placeholder: 'Eric Jones',
  //   keyboardType: '',
  //   type: 'textarea',
  // },
];
const SignUpIndividual = ({navigation}) => {
  const [inputValues, setInput] = useState({
    on_days: 'third',
    week_days: 'friday',
    end_days: '12',
    cycle_days: '',
  });
  const handleInputChange = (name, value) => {
    setInput((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Sign Up as an  Individual"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <View style={{marginTop: 15}}>
            <ButtonMain
              btnwhite
              onPress={() => navigation.navigate('SignUpLanding')}
              text="Sign up with your Google account"
              showicon={
                <Image
                  source={require('../../assets/images/google_icon.png')}
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginRight: 15}}
                />
              }
              btnTextStyles={{color: colors.PRIMARY_BLUE}}
              btnContainerStyle={{height: processFontSize(55)}}
            />
          </View>
          <View style={styles.line_row}>
            <View style={styles.hr_sm} />
            <Text style={styles.signup_text_sm}>
              Or enter your details manually{' '}
            </Text>
            <View style={styles.hr_sm} />
          </View>
          <View style={{marginTop: 30}}>
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
            <View style={[Basestyle.row_space_between, {marginBottom: 30}]}>
              <View style={{width: '48%'}}>
                <FloatingTextInput
                  label="L.G.A"
                  placeholder="Eti Osa"
                  //cutomwrapperInputStyle={{width: '48%'}}
                />
              </View>

              <View style={{width: '48%'}}>
                <CustomDropdown
                  // containerStyle={{backgroundColor: 'red'}}
                  defaultLabel="State"
                  // inputTextStyle={styles.dropdown_inputext}
                  selectedOption={inputValues.cycle_days}
                  options={[
                    {
                      name: 'Choose state...',
                      value: null,
                    },
                    ...statesList,
                  ]}
                  handleDropdownChange={(value) => {
                    if (value !== null) {
                      handleInputChange('cycle_days', value);
                    }
                  }}
                  labelKey="name"
                  valueKey="name"
                  placeholder="Choose state..."
                />
              </View>
            </View>
          </View>
        </View>
        <ButtonMain
          onPress={() => navigation.navigate('SignUpOTP')}
          text="Continue"
          btnContainerStyle={Basestyle.btn_full}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpIndividual;
