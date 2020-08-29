/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, Switch, StatusBar} from 'react-native';
import {Basestyle, colors, Fontnames} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import styles from './styles/delivery_styles';
import InputContainer from '../../components/InputContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
    index: 7,
    label: 'Category',
    placeholder: 'Shoes',
    type: 'dropdown',
  },
  {
    index: 0,
    label: 'Quanity',
    placeholder: '0 pcs',
    keyboardType: 'number-pad',
  },
  {
    index: 8,
    label: 'Package Description',
    placeholder: '',
    keyboardType: '',
    type: 'textarea',
  },
];
const PackageDetails = ({navigation}) => {
  const [imageupload, toggleimageupload] = useState(false);
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
        title="New Request"
        navigation={navigation}
        leftheader
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <Text style={[styles.row_top_text, {color: colors.PRIMARY_BLUE}]}>
            Package Details
          </Text>
          <ProgressBar
            width={null}
            height={5}
            progress={1.0}
            color={colors.PRIMARY_ORANGE}
            unfilledColor={'#D8D8D8'}
            borderWidth={0}
            //strokeCap="square"
            style={{marginBottom: 50, borderRadius: 6}}
          />
          <View style={{marginTop: 0}}>
            <InputContainer
              label="Set Delivery Date & Time"
              //handlePress={() => navigation.navigate('SenderInfo')}
              placeholder="14 Feb. 2018 | 12:30pm"
              textinputcustomstyle={{paddingLeft: 40}}
              //value={selectedOption}
              leftElement={
                <TouchableOpacity style={{position: 'absolute', left: 0}}>
                  <Ionicons
                    name="calendar"
                    size={27}
                    color={colors.PRIMARY_GREY_05}
                  />
                </TouchableOpacity>
              }
              noRightElement
              cutomwrapperInputStyle={{marginBottom: 20}}
            />
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
          <Text
            style={[styles.delivery_extra, {paddingBottom: 15, marginTop: -5}]}>
            Products should not weigh more than{' '}
            <Text style={{fontFamily: Fontnames.nunito_bold}}>10 kg</Text> in
            total.
          </Text>
          <FloatingTextInput
            express
            label="Estimated worth of items"
            placeholder="0 pcs"
            keyboardType="number-pad"
            //cutomwrapperInputStyle={{marginTop: 15}}
          />
          <View style={[Basestyle.row_center, {paddingTop: 20}]}>
            <Text
              style={[
                styles.delivery_extra,
                {fontFamily: Fontnames.nunito_bold, paddingRight: 10},
              ]}>
              Would you like to prioritize this delivery?
            </Text>
            <Switch
              trackColor={{
                false: '#E6EDF2',
                true: '#0FB8BC',
              }}
              //style={{marginTop: 16}}
              thumbColor="#fff"
              ios_backgroundColor={'#E6EDF2'}
              onValueChange={(value) => handleInputChange('options', value)}
              value={inputValues.options}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleimageupload(!imageupload)}
          style={[
            styles.uploadoption,
            imageupload ? styles.activeupload : null,
          ]}>
          {!imageupload ? (
            <View style={Basestyle.row_center}>
              <Ionicons name="add" size={20} color={colors.PRIMARY_INDIGO} />
              <Text style={[styles.delivery_extra2]}>
                Upload an Image of the package
              </Text>
            </View>
          ) : (
            <View style={Basestyle.row_center}>
              <Image
                source={require('../../assets/images/change-icon.png')}
                resizeMode="contain"
                style={{width: 18}}
              />
              <Text
                style={[
                  styles.delivery_extra2,
                  {color: colors.PRIMARY_ORANGE},
                ]}>
                Change Image
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={[Basestyle.row_space_between, {marginVertical: 30}]}>
          <ButtonMain
            greybtn
            onPress={() => navigation.goBack()}
            text="Cancel"
            btnContainerStyle={[Basestyle.btn_small]}
          />
          <ButtonMain
            onPress={() => navigation.navigate('PackageDetailsFull')}
            text="Next"
            btnContainerStyle={Basestyle.btn_small}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PackageDetails;
