/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StatusBar} from 'react-native';
import {Basestyle} from '../../helpers/BaseThemes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import ButtonMain from '../../components/Button/ButtonMain';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {updateUserInfo} from '../../actions/auth.action';
import {connect} from 'react-redux';
import {formatPhoneNumber} from '../../helpers/libs';
import Countries from '../../helpers/countries.json';
import CustomDropdown from '../../components/CustomDropdown';
const UpdatePhone = ({navigation, updateUserInfo}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [countrycode, setCountryCode] = useState('+234');
  const handleStep1 = async () => {
    try {
      setIsLoading(true);
      const data = {phoneNumber: formatPhoneNumber(countrycode, value)};
      console.log(data);
      const response = await updateUserInfo(data);
      setIsLoading(false);
      console.log(response);
      if (response.status === 200) {
        //setStepValue(2);
        navigation.reset({
          index: 0,
          routes: [{name: 'MainApp'}],
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      alert(error.message);
    }
  };
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
        title="Update Profile Info"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(9)}}>
        <View style={Basestyle.row_space_between}>
          <View style={{width: '30%'}}>
            <CustomDropdown
              defaultLabel="Country Code"
              selectedOption={countrycode}
              options={Countries}
              handleDropdownChange={(value) => setCountryCode(value)}
              labelKey="name"
              valueKey="dial_code"
              // containerStyle={{width: '45%'}}
            />
          </View>
          <View style={{width: '65%'}}>
            <FloatingTextInput
              express
              label="Phone Number"
              placeholder="08189798881"
              keyboardType="number-pad"
              handleInputChange={(text) => setValue(text)}
              // cutomwrapperInputStyle={{marginBottom: 30}}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ButtonMain
        onPress={() => handleStep1()}
        isLoading={isLoading}
        disabled={!value}
        text="Continue"
        btnContainerStyle={{marginTop: 60, marginBottom: 20}}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: {user_roles},
  } = state;

  return {
    user_roles,
  };
};

const mapDispatchToProps = {
  updateUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePhone);
