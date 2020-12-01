/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/delivery_detail';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import SafeAreaView from 'react-native-safe-area-view';
import ReuseHeader from '../../components/Header/index';
//import ImageSlider from '../../components/ImageSlider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {connect} from 'react-redux';
//import {heightPercentageToDP} from 'react-native-responsive-screen';
import FontNames from '../../helpers/BaseThemes/fontnames';

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

const DispatchDetailHistory = ({navigation, categories, route}) => {
  const scrollViewRef = useRef(null);
  const {completed, item} = route.params;
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
        title="Delivery History"
        navigation={navigation}
        leftheader
        //showlefticon
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              //backgroundColor: 'red',
            }}>
            <Text
              style={[styles.row_top_text, {paddingTop: 5, paddingBottom: 15}]}>
              Delivery Details
            </Text>
            {item.status.status === 'Completed' && item.user.rating === 0 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewRateRider', {
                    orderid: item?._id,
                  })
                }
                style={[styles.delivery_text, {paddingTop: 15}]}>
                <Text
                  style={{
                    fontFamily: FontNames.medium,
                    color: colors.PRIMARY_BLUE,
                    fontSize: 15,
                  }}>
                  Rate Dispatch Rider
                </Text>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={30}
                  color={colors.PRIMARY_ORANGE}
                />
              </TouchableOpacity>
            )}
          </View>

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
              style={styles.dashed_line2}
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
                    {item && item.pickUpAddress}
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
                      {item && item.sender.details.name}
                    </Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.cell_phone_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>
                      {item && item.sender.details.phone}
                    </Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.chat_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={2} style={styles.small_icon_text}>
                      {item && item.package.details.description}
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
                    {item && item.deliveryAddress}
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
                      {item && item.receiver.details.name}
                    </Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.cell_phone_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>
                      {item && item.receiver.details.phone}
                    </Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.chat_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={2} style={styles.small_icon_text}>
                      {item && item.deliveryInstructions}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.delivery_bottom}>
                <View style={[Basestyle.row_space_between, {marginBottom: 10}]}>
                  <View>
                    <Text style={[styles.small_icon_text2]}>Status :</Text>
                    <Text
                      style={[
                        styles.small_icon_text3,
                        {color: colors.PRIMARY_ORANGE},
                      ]}>
                      {item.status.status}
                    </Text>
                  </View>
                  <View style={{width: '36%'}}>
                    <Text style={[styles.small_icon_text2]}>Date :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      {moment(item.deliveryDate).format('Do, MMM YYYY')}
                    </Text>
                  </View>
                </View>
                <View style={[Basestyle.row_space_between, {marginBottom: 10}]}>
                  <View>
                    <Text style={[styles.small_icon_text2]}>Quantity :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      {item && item.package.details.quantity} pcs
                    </Text>
                  </View>
                  <View style={{width: '36%'}}>
                    <Text style={[styles.small_icon_text2]}>Category :</Text>
                    <Text style={[styles.small_icon_text3]}>
                      {getCatId(item && item.category)}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.small_icon_text4]}>Product Image</Text>
              </View>
            </View>
          </View>
          <Image
            source={{uri: item && item.package.details.image}}
            resizeMode="cover"
            style={styles.sliderview}
          />
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
              delivered={completed ? true : false}
            />
          )} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    //delivery: {deliverydata, deliveryinfo},
    auth: {user_info, categories},
  } = state;
  return {
    // deliverydata,
    // deliveryinfo,
    categories,
    user_info,
  };
};
// const mapDispatchToProps = {
//   saveDeliveryData,
//   submitDeliveryRequest,
// };

export default connect(mapStateToProps, null)(DispatchDetailHistory);
