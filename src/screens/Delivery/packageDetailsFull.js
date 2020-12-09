/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, StatusBar, Image, ScrollView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/delivery_detail';
import deliverystyles from './styles/delivery_styles';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
import moment from 'moment';
import ImageSlider from '../../components/ImageSlider';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {getPreciseDistance} from 'geolib';
import {connect} from 'react-redux';
import {
  saveDeliveryData,
  submitDeliveryRequest,
} from '../../actions/delivery.action';
import ButtonMain from '../../components/Button/ButtonMain';
import {formatMoney} from '../../helpers/libs';

const contents = [
  {
    index: 0,
    imgsrc: Images.show_download,
  },
  {
    index: 1,
    imgsrc: Images.show_download,
  },
];
const kms_per_min = 0.5;

const PackageDetailsFull = ({
  navigation,
  deliverydata,
  saveDeliveryData,
  categories,
  route,
}) => {
  const scrollViewRef = useRef(null);
  const productimage = route.params && route.params.avatar;
  console.log(route.params);
  // const {completed} = route.params;

  const handleNext = () => {
    const data = {
      ...deliverydata,
      distance: _getPreciseDistance(), //in KM,
      estimatedTime: _getBareEstimate(),
      //extras
    };
    console.log(data);
    saveDeliveryData(data);
    navigation.navigate('SelectPaymentType');
  };
  const _getPreciseDistance = () => {
    var pdis = getPreciseDistance(
      deliverydata.pickUpLocation[0],
      deliverydata.deliveryLocation[0],
    );
    //  alert(`Precise Distance\n${pdis} Meter\nor\n${pdis / 1000} KM`);
    return pdis / 1000;
  };
  const getTimeTaken = () => {
    const mins_taken = _getPreciseDistance() / kms_per_min;

    const totalMinutes = parseInt(mins_taken);
    if (totalMinutes < 60) {
      console.log(totalMinutes + ' mins');
      return totalMinutes + ' mins';
    } else {
      let minutes = (totalMinutes % 60).toString();
      minutes = minutes.length === 1 ? '0' + minutes : minutes;
      console.log(totalMinutes / 60 + ' hour ' + minutes + 'mins');
      return totalMinutes / 60 + ' hour ' + minutes + 'mins';
    }
  };
  const _getBareEstimate = () => {
    const mins_taken = _getPreciseDistance() / kms_per_min;

    return parseInt(mins_taken);
  };
  const getCatId = (id) => {
    if (categories.some((el) => el._id === id)) {
      const updatedInfo = categories.filter((el) => el._id === id);
      //console.log(updatedInfo);
      return updatedInfo[0].name;
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
        title="Order Summary"
        navigation={navigation}
        leftheader
        // showlefticon
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={[
              Basestyle.round_box,
              deliverystyles.selection_box2,
              {height: 100},
            ]}>
            <Text style={[styles.row_top_text, {opacity: 0.6, fontSize: 18}]}>
              Estimated Fee:
            </Text>
            <Text style={[styles.row_top_text, {fontSize: 25, paddingTop: 5}]}>
              {formatMoney(deliverydata && deliverydata.paymentAmount)}
            </Text>
          </View>
          <Text
            style={[styles.row_top_text, {paddingTop: 25, paddingBottom: 15}]}>
            Delivery Details
          </Text>
          <View
            style={[
              Basestyle.round_box,
              contents.length !== 0
                ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}
                : null,
            ]}>
            <Image
              source={Images.dashed_line}
              resizeMode="contain"
              style={[styles.dashed_line2, {height: '32%'}]}
            />
            <View style={styles.content}>
              <View style={styles.row_top}>
                <Text style={styles.row_top_text}>Pick Up Location</Text>
                <View style={styles.hr} />
              </View>
              <View style={{marginTop: 15}}>
                <View style={styles.address_row}>
                  <Ionicons
                    name="location-sharp"
                    size={25}
                    color="#FFAF2A"
                    style={styles.location_icon}
                  />
                  <Text numberOfLines={2} style={styles.address}>
                    {deliverydata && deliverydata.pickUpAddress}
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.profile_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={1} style={styles.small_icon_text}>
                      {deliverydata?.sender?.details?.name}
                    </Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.cell_phone_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>
                      {deliverydata?.sender?.details?.phone}
                    </Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.chat_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={2} style={styles.small_icon_text}>
                      {deliverydata?.package?.details?.description}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.row_top}>
                <Text style={styles.row_top_text}>Drop Off Location</Text>
                <View style={styles.hr} />
              </View>
              <View style={{marginTop: 15}}>
                <View style={styles.address_row}>
                  <Ionicons
                    name="location-sharp"
                    size={25}
                    color={colors.PRIMARY_PURPLE}
                    style={styles.location_icon}
                  />
                  <Text numberOfLines={2} style={styles.address}>
                    {deliverydata && deliverydata.deliveryAddress}
                  </Text>
                </View>

                <View style={{marginTop: 20}}>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.profile_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>
                      {deliverydata?.receiver?.details?.name}
                    </Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.cell_phone_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>
                      {deliverydata?.receiver?.details?.phone}
                    </Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.chat_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={2} style={styles.small_icon_text}>
                      {deliverydata && deliverydata.deliveryInstructions}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.delivery_bottom}>
                <View style={[Basestyle.row_space_between, {marginBottom: 10}]}>
                  <View>
                    <Text style={[styles.small_icon_text2]}>
                      Estimated Worth :
                    </Text>
                    <Text style={[styles.small_icon_text3]}>
                      NGN{' '}
                      {deliverydata &&
                        deliverydata.package.details.estimatedWorth}
                    </Text>
                  </View>
                  <View style={{width: '36%'}}>
                    <Text style={[styles.small_icon_text2]}>Date :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      {moment(deliverydata && deliverydata.deliveryDate).format(
                        'Do MMM YYYY',
                      )}
                    </Text>
                  </View>
                </View>
                <View style={[Basestyle.row_space_between, {marginBottom: 10}]}>
                  <View>
                    <Text style={[styles.small_icon_text2]}>Quantity :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      {deliverydata?.package?.details?.quantity} pcs
                    </Text>
                  </View>
                  <View style={{width: '36%'}}>
                    <Text style={[styles.small_icon_text2]}>Category :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      {getCatId(deliverydata && deliverydata.category)}
                    </Text>
                  </View>
                </View>
                <View style={[Basestyle.row_space_between, {marginBottom: 10}]}>
                  <View>
                    <Text style={[styles.small_icon_text2]}>Distance :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      {_getPreciseDistance() + ' KM'}
                    </Text>
                  </View>
                  <View style={{width: '36%'}}>
                    <Text style={[styles.small_icon_text2]}>Carrier :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      {deliverydata && deliverydata.deliveryMethod}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.small_icon_text2]}>Arrives In:</Text>
                  <Text style={[styles.small_icon_text3]}>
                    {getTimeTaken()}
                  </Text>
                </View>
                <Text style={[styles.small_icon_text4]}>Product Image</Text>
              </View>
            </View>
          </View>
          {productimage ? (
            <Image
              source={productimage}
              resizeMode="cover"
              style={styles.sliderview}
            />
          ) : null}

          {/* {contents && contents.length !== 0 && (
            <ImageSlider
              customwrapperstyle={{
                height: heightPercentageToDP(26),
                marginBottom: 50,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              customdotstyle={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 30,
              }}
              contents={contents}
              //delivered={completed ? true : false}
            />
          )} */}
          <ButtonMain
            onPress={() => handleNext()}
            //isLoading={delievery_loading}
            text="Continue to Payment"
            btnContainerStyle={[Basestyle.btn_full, {marginTop: 20}]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    delivery: {deliverydata, deliveryinfo},
    auth: {user_info, categories},
  } = state;
  return {
    deliverydata,
    deliveryinfo,
    categories,
    user_info,
  };
};
const mapDispatchToProps = {
  saveDeliveryData,
  submitDeliveryRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetailsFull);
