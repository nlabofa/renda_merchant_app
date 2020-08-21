/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StatusBar} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import statesList from '../../helpers/statelist';
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
    label: 'Full Name',
    placeholder: 'Eric Jones',
    keyboardType: '',
  },
  {
    index: 11,
    label: 'Business Name',
    placeholder: 'Garner corp',
    keyboardType: '',
  },
  {
    index: 1,
    label: 'Phone Number',
    placeholder: '08189798881',
    keyboardType: 'number-pad',
  },
  {
    index: 2,
    label: 'Your Email Address',
    placeholder: 'Eric@gmail.com',
    keyboardType: 'email-address',
  },
  {
    index: 7,
    label: 'Business Type',
    placeholder: 'Textiles',
    type: 'dropdown',
  },
  {
    index: 3,
    label: 'Address',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    keyboardType: '',
  },
  // {
  //   index: 8,
  //   label: 'Package Description',
  //   placeholder: 'Eric Jones',
  //   keyboardType: '',
  //   type: 'textarea',
  // },
];
const SignUpBusiness = ({navigation}) => {
  const [inputValues, setInput] = useState({
    on_days: '',
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
    <SafeAreaView
      //forceInset={{bottom: 'never'}}
      style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Sign Up as a Business"
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

export default SignUpBusiness;
