/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, TouchableOpacity, Text} from 'react-native';
import styles from './styles/dashboard_styles';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import SafeAreaView from 'react-native-safe-area-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import FontNames from '../../helpers/BaseThemes/fontnames';

const addressFields = [
  {
    index: 0,
    label: 'Category',
    placeholder: 'Clothes',
    keyboardType: '',
    type: 'dropdown',
  },
  {
    index: 1,
    label: 'Package Description',
    placeholder: 'Eric Jones',
    keyboardType: '',
    type: 'textarea',
  },
  {
    index: 2,
    label: 'Vehicle Type',
    placeholder: 'Motorcycles',
    keyboardType: '',
    type: 'dropdown',
  },
];
const ExpressStep2 = ({navigation}) => {
  return (
    <SafeAreaView
      forceInset={{bottom: 'never'}}
      style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ReuseHeader
          title="Express Order"
          expresstitle="Package Details"
          progresscount=" ( Step 2 / 3 )"
          progressvalue={0.7}
          navigation={navigation}
          textStyle={{letterSpacing: 0.9}}
        />
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
                    rightElement={
                      type === 'dropdown' ? (
                        <TouchableOpacity style={{right: '80%'}}>
                          <MaterialIcons
                            name="arrow-drop-down"
                            size={33}
                            color={colors.PRIMARY_GREY_05}
                          />
                        </TouchableOpacity>
                      ) : null
                    }
                  />
                );
              }
            },
          )}
          <Text
            style={[Basestyle.nunito_bold_16, {color: colors.PRIMARY_BLUE_02}]}>
            Please Note :{' '}
            <Text style={{fontFamily: FontNames.nunito_regular}}>
              Packages should not be more than{' '}
              <Text style={{fontFamily: FontNames.nunito_bold}}>5KG </Text> for
              Bike dispatch
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <View style={Basestyle.row_space_between}>
        <ButtonMain
          greybtn
          onPress={() => navigation.goBack()}
          text="Cancel"
          btnContainerStyle={[Basestyle.btn_small]}
        />
        <ButtonMain
          onPress={() => navigation.navigate('ExpStep3')}
          text="Next"
          btnContainerStyle={Basestyle.btn_small}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExpressStep2;
