/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import styles from './styles/dispatch_detail';
import paymentstyles from '../Payments/payment-styles';
import {Basestyle, colors, Images} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import FontNames from '../../helpers/BaseThemes/fontnames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {rateDispatch} from '../../actions/auth.action';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import {AirbnbRating} from 'react-native-ratings';
const RateRider = ({navigation, route, rateDispatch}) => {
  const orderid = route?.params?.orderId;

  const [note, setnote] = useState('');
  const [ratingval, setrating] = useState(0);
  const [successmodal, setsuccessmodal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ratingCompleted = (rating) => {
    console.log('rating is:' + rating);
    setrating(rating);
  };
  const goHome = () => {
    setsuccessmodal(false);
    //clearDeliveryData();
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeDrawer'}],
    });
  };
  const handleNext = async () => {
    try {
      setIsLoading(true);
      let data = {
        orderId: orderid,
        rating: ratingval,
        type: 'dispatch',
        anyissue: false,
      };
      if (note) {
        data = {
          ...data,
          review: note,
        };
      }
      console.log(data);
      const response = await rateDispatch(data);
      setIsLoading(false);
      console.log(response);
      if (response.status === 200) {
        setsuccessmodal(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <Modal
        isVisible={successmodal}
        animationType={'fade'}
        transparent={true}
        style={{margin: 0}}
        onModalHide={() => setsuccessmodal(false)}
        onBackdropPress={() => setsuccessmodal(false)}
        onBackButtonPress={() => setsuccessmodal(false)}>
        <View style={paymentstyles.modal_content}>
          <Image
            source={require('../../assets/images/like_round.png')}
            resizeMode="contain"
            style={paymentstyles.message_icon}
          />
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={paymentstyles.message_text}>
              Your rating has been logged successfully
            </Text>
            {/* <Text style={[styles.message_text, {paddingTop: 20}]}>
              You will recieve updates on the status of your delivery shortly
            </Text> */}
          </View>
          <TouchableOpacity
            onPress={() => goHome()}
            style={paymentstyles.message_bottom}>
            <Text style={paymentstyles.continue_btn}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Rate Rider"
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView style={{marginTop: 30}} showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={[
              Basestyle.round_box,
              styles.extra_box,
              {paddingHorizontal: 20},
            ]}>
            <Text style={styles.not_detail_head}>Request Dispatched</Text>
            <Text style={styles.not_detail_text}>
              Your request has been successfully delivered
            </Text>
            <Image
              source={Images.delivered_image}
              resizeMode="contain"
              style={styles.delivered}
            />
            <View>
              <AirbnbRating
                selectedColor="#FFBD38"
                defaultRating={0}
                reviewColor={colors.PRIMARY_ORANGE}
                onFinishRating={ratingCompleted}
              />
            </View>
            <FloatingTextInput
              express
              label="Comments"
              multiline={true}
              numberOfLines={4}
              placeholder="Add Note"
              value={note}
              handleInputChange={(text) => setnote(text)}
              cutomwrapperInputStyle={[Basestyle.textarea]}
            />
            <ButtonMain
              onPress={() => handleNext()}
              text="Submit"
              disabled={ratingval === 0}
              isLoading={isLoading}
              btnContainerStyle={{
                marginVertical: 20,
                width: '85%',
                alignSelf: 'center',
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={styles.delivery_text}>
              <Text
                style={{
                  fontFamily: FontNames.medium,
                  color: colors.PRIMARY_BLUE,
                  fontSize: 15,
                }}>
                See delivery details
              </Text>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color={colors.PRIMARY_ORANGE}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// const mapStateToProps = (state) => {
//   const {
//     auth: {user_roles},
//   } = state;

//   return {
//     user_roles,
//   };
// };

const mapDispatchToProps = {
  rateDispatch,
};

export default connect(null, mapDispatchToProps)(RateRider);
