/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  Image,
  Switch,
  Platform,
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
import {
  saveDeliveryData,
  uploadImage,
  checkPrice,
} from '../../actions/delivery.action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from '../../components/DatePicker/DatePicker';
const addressFields = [
  {
    index: 7,
    label: 'Category',
    placeholder: 'Choose Category',
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
const requiredFields = ['category', 'quantity'];
const PackageDetails = ({
  navigation,
  uploadImage,
  user_info,
  deliveryschedule,
  categories,
  deliverydata,
  checkPrice,
  imageloading,
  saveDeliveryData,
}) => {
  useEffect(() => {
    const fetchPrice = async () => {
      const data = {
        pickup: deliverydata.pickUpAddress, //'Ikoyi',
        dropoff: deliverydata.deliveryAddress, // 'Ikota'
      };
      await checkPrice(data);
    };
    fetchPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  const getCatId = (name) => {
    if (categories.some((el) => el.name === name)) {
      const updatedInfo = categories.filter((el) => el.name === name);
      //console.log(updatedInfo);
      return updatedInfo[0]._id;
    }
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
      {
        title: 'Upload image',
        mediaType: 'photo',
        quality: Platform.OS === 'ios' ? 0.4 : 1,
      },
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
            // image: (deliveryimage && deliveryimage.url) || '',
            estimatedWorth: parseInt(inputValues.estimatedWorth || 500),
          },
        },
        deliveryDate: moment(inputValues.deliveryDate).format('YYYY-MM-DD'),
        category: getCatId(inputValues.category), // inputValues.category,
        priority: inputValues.priority,
      };
      // console.log(data);
      saveDeliveryData(data);
      navigation.navigate('PackageDetailsFull', {avatar: avatar});
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
      <KeyboardAwareScrollView
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
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
            style={{marginBottom: 20, borderRadius: 6}}
          />
          <View style={{marginTop: 0}}>
            {deliveryschedule === 'scheduled' && (
              <InputContainer
                label="Set Delivery Date"
                //handlePress={() => navigation.navigate('SenderInfo')}
                placeholder="14 Feb. 2018"
                textinputcustomstyle={{color: 'transparent'}}
                disabled
                value={dateString}
                leftElement={
                  <TouchableOpacity
                    style={[Platform.OS === 'android' ? {top: -5} : null]}>
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
                    <Text style={{paddingLeft: 50, paddingTop: 5}}>
                      {dateString}
                    </Text>
                  }
                />
              </InputContainer>
            )}

            {addressFields.map(
              ({index, label, placeholder, name, type, keyboardType}) => {
                if (type === 'textarea') {
                  return (
                    <View style={{marginTop: 20}} key={index}>
                      <FloatingTextInput
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
                        cutomwrapperInputStyle={[Basestyle.textarea]}
                      />
                    </View>
                  );
                } else if (type === 'dropdown') {
                  return (
                    <View key={index}>
                      <CustomDropdown
                        defaultLabel={label}
                        // inputTextStyle={styles.dropdown_inputext}
                        containerStyle={{marginBottom: 20}}
                        selectedOption={inputValues.category}
                        options={[
                          {
                            name: 'Choose category..',
                            value: null,
                          },
                          ...(categories && categories),
                        ]}
                        handleDropdownChange={(value) => {
                          if (value !== 'Choose category..') {
                            handleInputChange(name, value);
                          }
                        }}
                        errorMessage={errors[name] || ''}
                        labelKey="name"
                        valueKey="name"
                        placeholder={placeholder}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View key={index}>
                      <FloatingTextInput
                        express
                        label={label}
                        placeholder={placeholder}
                        keyboardType={keyboardType || 'default'}
                        value={inputValues.name}
                        handleInputChange={(text) =>
                          handleInputChange(name, text)
                        }
                        errorMessage={errors[name] || ''}
                      />
                    </View>
                  );
                }
              },
            )}
          </View>
          <Text
            style={[styles.delivery_extra, {paddingBottom: 20, marginTop: 10}]}>
            Products should not weigh more than{' '}
            <Text style={{fontFamily: Fontnames.nunito_bold}}>10 kg</Text> in
            total.
          </Text>
          <FloatingTextInput
            express
            label="Estimated worth of items"
            placeholder="N1000"
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
                {
                  fontFamily: Fontnames.nunito_bold,
                  fontSize: 14,
                  paddingRight: 10,
                },
              ]}>
              Would you like to prioritize this delivery?
            </Text>
            <View style={Basestyle.row_center}>
              <Text style={[Basestyle.regular_13, {color: '#000'}]}>N</Text>
              <Switch
                trackColor={{
                  false: '#E6EDF2',
                  true: '#0FB8BC',
                }}
                style={{marginRight: 3}}
                thumbColor="#fff"
                ios_backgroundColor={'#E6EDF2'}
                onValueChange={(value) => handleInputChange('priority', value)}
                value={inputValues.priority}
              />
              <Text style={[Basestyle.regular_13, {color: '#000'}]}>Y</Text>
            </View>
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
              resizeMode="cover"
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
            text="Back"
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
    delivery: {deliverydata, deliveryschedule, imageloading},
    auth: {user_info, categories},
  } = state;
  return {
    deliverydata,
    imageloading,
    categories,
    deliveryschedule,
    user_info,
  };
};
const mapDispatchToProps = {
  saveDeliveryData,
  checkPrice,
  uploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetails);
