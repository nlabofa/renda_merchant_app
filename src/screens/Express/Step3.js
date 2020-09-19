/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar} from 'react-native';
//import styles from './styles/dashboard_styles';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import SafeAreaView from 'react-native-safe-area-view';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';

const addressFields = [
  {
    index: 0,
    label: 'Name',
    placeholder: 'Eric Jones',
    keyboardType: '',
  },
  {
    index: 1,
    label: 'Phone Number',
    placeholder: '08189798881',
    keyboardType: 'number-pad',
  },
  {
    index: 3,
    label: 'Drop Off Address',
    placeholder: '',
    keyboardType: '',
  },
  {
    index: 5,
    label: 'LGA',
    placeholder: 'Eti Osa',
    keyboardType: '',
  },
  {
    index: 6,
    label: 'State',
    placeholder: 'Lagos',
    keyboardType: '',
  },
];
const ExpressStep3 = ({navigation}) => {
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ReuseHeader
          title="Express Order"
          expresstitle="Recipient Details"
          progresscount=" ( Step 3 / 3 )"
          progressvalue={1}
          navigation={navigation}
          textStyle={{letterSpacing: 0.9}}
        />
        <View style={{marginTop: 30}}>
          {addressFields.map(({index, label, placeholder, keyboardType}) => (
            <FloatingTextInput
              key={index}
              express
              label={label}
              placeholder={placeholder}
              keyboardType={keyboardType || 'default'}
              cutomwrapperInputStyle={{marginBottom: 20}}
            />
          ))}
        </View>
        <View style={Basestyle.row_space_between}>
          <ButtonMain
            greybtn
            onPress={() => navigation.goBack()}
            text="Cancel"
            btnContainerStyle={[Basestyle.btn_small]}
          />
          <ButtonMain
            onPress={() => navigation.navigate('ExpStep4')}
            text="Next"
            btnContainerStyle={Basestyle.btn_small}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ExpressStep3;
