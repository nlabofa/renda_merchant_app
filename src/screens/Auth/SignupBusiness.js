/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import statesList from '../../helpers/statelist';
import {connect} from 'react-redux';
import {getRoles} from '../../actions/auth.action';
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
    name: 'fullName',
    placeholder: 'Eric Jones',
    keyboardType: '',
  },
  {
    index: 11,
    label: 'Business Name',
    name: 'businessName',
    placeholder: 'Garner corp',
    keyboardType: '',
  },
  {
    index: 1,
    label: 'Phone Number',
    placeholder: '08189798881',
    name: 'phoneNumber',
    keyboardType: 'number-pad',
  },
  {
    index: 2,
    label: 'Your Email Address',
    placeholder: 'Eric@gmail.com',
    name: 'email',
    keyboardType: 'email-address',
  },
  {
    index: 7,
    label: 'Business Type',
    placeholder: 'Textiles',
    name: 'businessType',
    type: 'dropdown',
  },
  {
    index: 3,
    label: 'Address',
    placeholder: '12 Wole Ariyo Street Lekki Phase 1',
    name: 'address',
    keyboardType: '',
  },
];
const initialErrorState = {
  fullName: '',
  businessName: '',
  address: '',
  phoneNumber: '',
  email: '',
};
const requiredFields = [
  'fullName',
  'businessName',
  'phoneNumber',
  'email',
  'address',
];
const initialInputState = {
  fullName: '',
  businessName: '',
  phoneNumber: '',
  email: '',
  businessType: '',
  address: '',
  lga: '',
  stateoforigin: '',
};
const SignUpBusiness = ({navigation, getRoles}) => {
  useEffect(() => {
    const fetchRoles = async () => {
      const response = await getRoles();
      console.log(response);
    };
    fetchRoles();
  }, [getRoles]);
  const [{errors}, setState] = useState({
    errors: initialErrorState,
  });
  const [inputValues, setInput] = useState(initialInputState);

  const handleInputChange = (name, value) => {
    setInput((state) => ({
      ...state,
      [name]: value,
    }));
    setState((state) => ({
      ...state,
      errors: {
        ...state.errors,
        [name]: '',
      },
    }));
  };
  const validateFields = (requiredFields) => {
    let isValid = true;
    for (let iterator = 0; iterator < requiredFields.length; iterator++) {
      const requiredField = requiredFields[iterator];
      const inputValue =
        requiredField !== 'biz_category_id'
          ? inputValues[requiredField].trim()
          : inputValues[requiredField];

      if (!inputValue) {
        isValid = false;
        const formField = addressFields.find(
          (field) => field.name === requiredField,
        );

        const message = `Please ${
          formField.type === 'dropdown' ? 'select' : 'enter'
        } ${formField.label.toLowerCase()}`;
        console.log(message);
        setState((state) => ({
          ...state,
          errors: {
            [requiredField]: message,
          },
        }));
        break;
      } else {
        continue;
      }
    }

    return isValid;
  };
  const handleNext = () => {
    //navigation.navigate('SignUpOTP')
    setState((state) => ({
      ...state,
      errors: initialErrorState,
    }));
    const isValid = validateFields(requiredFields);
    // console.log(requiredFields);
    console.log(isValid);
    if (isValid) {
      const data = {
        fullName: inputValues.fullName,
        businessName: inputValues.businessName,
        phoneNumber: inputValues.phoneNumber,
        email: inputValues.email,
        businessType: inputValues.businessType,
        address: inputValues.address,
        lga: inputValues.lga,
        stateoforigin: inputValues.stateoforigin,
      };
      console.log(data);
    }
  };
  return (
    <SafeAreaView
      forceInset={{bottom: 'never'}}
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
              ({index, label, placeholder, type, name, keyboardType}) => {
                if (type === 'textarea') {
                  return (
                    <FloatingTextInput
                      key={index}
                      express
                      label={label}
                      multiline={true}
                      numberOfLines={4}
                      placeholder={placeholder}
                      value={inputValues[name]}
                      handleInputChange={(text) =>
                        handleInputChange(name, text)
                      }
                      keyboardType={keyboardType || 'default'}
                      cutomwrapperInputStyle={[
                        Basestyle.textarea,
                        {marginBottom: 20},
                      ]}
                      errorMessage={errors[name] || ''}
                    />
                  );
                } else if (type === 'dropdown') {
                  return (
                    <CustomDropdown
                      key={index}
                      containerStyle={{marginBottom: 20}}
                      defaultLabel={label}
                      // inputTextStyle={styles.dropdown_inputext}
                      selectedOption={inputValues[name]}
                      options={[
                        {
                          name: 'Choose category..',
                          value: null,
                        },
                        ...CYCLES,
                      ]}
                      handleDropdownChange={(value) => {
                        if (value !== null) {
                          handleInputChange(name, value);
                        }
                      }}
                      labelKey="title"
                      valueKey="type"
                      placeholder={placeholder}
                      errorMessage={errors[name] || ''}
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
                      value={inputValues[name]}
                      handleInputChange={(text) =>
                        handleInputChange(name, text)
                      }
                      errorMessage={errors[name] || ''}
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
                  value={inputValues.lga}
                  handleInputChange={(text) => handleInputChange('lga', text)}
                  //cutomwrapperInputStyle={{width: '48%'}}
                />
              </View>

              <View style={{width: '48%'}}>
                <CustomDropdown
                  // containerStyle={{backgroundColor: 'red'}}
                  defaultLabel="State"
                  // inputTextStyle={styles.dropdown_inputext}
                  selectedOption={inputValues.stateoforigin}
                  options={[
                    {
                      name: 'Choose state...',
                      value: null,
                    },
                    ...statesList,
                  ]}
                  handleDropdownChange={(value) => {
                    if (value !== null) {
                      handleInputChange('stateoforigin', value);
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
          onPress={() => handleNext()}
          text="Continue"
          btnContainerStyle={Basestyle.btn_full}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

// const mapStateToProps = state => {
//   const {
//     account: { subaccountrules, sub_account_wallet_id },
//   } = state;

//   return {
//     subaccountrules,
//     sub_account_wallet_id,
//   };
// };

const mapDispatchToProps = {
  getRoles,
};

export default connect(null, mapDispatchToProps)(SignUpBusiness);
