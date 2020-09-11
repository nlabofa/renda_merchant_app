/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useState} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  Image,
  Switch,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Basestyle, colors, Fontnames} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import styles from './styles/delivery_styles';
import InputContainer from '../../components/InputContainer';
import {connect} from 'react-redux';
import {saveDeliveryData, uploadImage} from '../../actions/delivery.action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from '../../components/DatePicker/DatePicker';
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
    name: 'category',
    type: 'dropdown',
  },
  {
    index: 0,
    label: 'Quanity',
    placeholder: '0 pcs',
    name: 'quantity',
    keyboardType: 'number-pad',
  },
  {
    index: 8,
    label: 'Package Description',
    placeholder: '',
    name: 'description',
    keyboardType: '',
    type: 'textarea',
  },
];
const initialErrorState = {
  category: '',
  quantity: '',
  estimatedWorth: '',
};
const requiredFields = ['category', 'quantity', 'estimatedWorth'];
const PackageDetails = ({
  navigation,
  uploadImage,
  user_info,
  deliverydata,
  deliveryimage,
  imageloading,
  saveDeliveryData,
}) => {
  const [avatar, setAvatar] = useState('');
  const [{errors}, setState] = useState({
    errors: initialErrorState,
  });
  const [inputValues, setInput] = useState({
    deliveryDate: new Date(),
    initialDateValue: null,
    category: '',
    quantity: '',
    description: '',
    estimatedWorth: '',
    priority: true,
    image: '',
  });
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
  const handleSelect = (date) => {
    setInput((state) => ({
      ...state,
      initialDateValue: date,
      deliveryDate: date,
    }));
    handleInputChange('deliveryDate', moment(date).format('YYYY-MM-DD'));
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
  const chooseImage = () => {
    ImagePicker.showImagePicker(
      {title: 'Upload image', mediaType: 'photo', quality: 0.4},
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.uri};
          setAvatar(source);
          uploadImage(response);

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          // this.setState({
          //   avatarSource: source,
          // });
        }
      },
    );
  };
  console.log(avatar.uri);
  const handleNext = () => {
    setState((state) => ({
      ...state,
      errors: initialErrorState,
    }));
    const isValid = validateFields(requiredFields);
    if (isValid) {
      const data = {
        ...deliverydata,
        package: {
          details: {
            quantity: parseInt(inputValues.quantity),
            description: inputValues.description,
            image: (deliveryimage && deliveryimage.url) || '',
            estimatedWorth: parseInt(inputValues.estimatedWorth),
          },
        },
        deliveryDate: moment(inputValues.deliveryDate).format('YYYY-MM-DD'),
        category: '5f4f6219c57af2edb475b90e', // inputValues.category,
        //extras
        user: user_info._id,
        // distance: 20,
        // estimatedTime: 120,
        // paymentMode: 'Card',
        // paymentAmount: 1000,
        priority: inputValues.priority,
      };
      console.log(data);
      saveDeliveryData(data);
      navigation.navigate('PackageDetailsFull', {avatar: avatar.uri});
    }
  };
  const dateString = moment(inputValues.deliveryDate).format('DD MMMM, YYYY');
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
              label="Set Delivery Date"
              //handlePress={() => navigation.navigate('SenderInfo')}
              placeholder="14 Feb. 2018"
              textinputcustomstyle={{paddingLeft: 40}}
              disabled
              value={dateString}
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
              cutomwrapperInputStyle={{marginBottom: 20}}>
              <DatePicker
                value={inputValues.deliveryDate}
                onSelect={handleSelect}
                minimumDate={new Date()}
                containerStyle={styles.datepicker}
                labelElement={
                  <Text style={{color: 'transparent'}}>{dateString}</Text>
                }
              />
            </InputContainer>
            {addressFields.map(
              ({index, label, placeholder, name, type, keyboardType}) => {
                if (type === 'textarea') {
                  return (
                    <FloatingTextInput
                      key={index}
                      express
                      label={label}
                      multiline={true}
                      numberOfLines={4}
                      placeholder={placeholder}
                      value={inputValues.name}
                      handleInputChange={(text) =>
                        handleInputChange(name, text)
                      }
                      errorMessage={errors[name] || ''}
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
                      selectedOption={inputValues.category}
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
                      errorMessage={errors[name] || ''}
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
                      value={inputValues.name}
                      handleInputChange={(text) =>
                        handleInputChange(name, text)
                      }
                      errorMessage={errors[name] || ''}
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
            value={inputValues.estimatedWorth}
            handleInputChange={(text) =>
              handleInputChange('estimatedWorth', text)
            }
            errorMessage={errors.estimatedWorth || ''}
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
              onValueChange={(value) => handleInputChange('priority', value)}
              value={inputValues.priority}
            />
          </View>
        </View>
        {avatar ? (
          <TouchableOpacity
            disabled={imageloading}
            onPress={() => chooseImage()}>
            {imageloading ? (
              <ActivityIndicator
                size="large"
                color="#fff"
                style={styles.imageloader}
              />
            ) : null}
            <Image
              source={avatar}
              resizeMode="contain"
              style={styles.sliderview}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => chooseImage()}
            style={[styles.uploadoption]}>
            <View style={Basestyle.row_center}>
              <Ionicons name="add" size={20} color={colors.PRIMARY_INDIGO} />
              <Text style={[styles.delivery_extra2]}>
                Upload an Image of the package
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={[Basestyle.row_space_between, {marginVertical: 30}]}>
          <ButtonMain
            greybtn
            onPress={() => navigation.goBack()}
            text="Cancel"
            btnContainerStyle={[Basestyle.btn_small]}
          />
          <ButtonMain
            //disabled={imageloading}
            onPress={() => handleNext()}
            text="Next"
            btnContainerStyle={Basestyle.btn_small}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    delivery: {deliverydata, deliveryimage, imageloading},
    auth: {user_info},
  } = state;
  return {
    deliverydata,
    deliveryimage,
    imageloading,
    user_info,
  };
};
const mapDispatchToProps = {
  saveDeliveryData,
  uploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetails);
