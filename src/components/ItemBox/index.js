/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';

import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Images, colors, Basestyle} from '../../helpers/BaseThemes';

const ItemBox = ({
  idnumber,
  onPress = () => {},
  navigation,
  btnContainerStyle = {},
  customicon,
  customtext,
  status,
  type = '',
  destination,
  duedate,
}) => {
  let custom_status_div = {};
  custom_status_div = {
    backgroundColor:
      status === 'accepted'
        ? colors.PRIMARY_GREEN
        : status === 'in progress'
        ? colors.SECONDARY_ORANGE
        : status === 'completed'
        ? colors.SECONDARY_GREY
        : colors.SECONDARY_RED,
  };

  let custom_status_text = {};
  custom_status_text = {
    color:
      status === 'accepted'
        ? colors.SECONDARY_GREEN
        : status === 'in progress'
        ? colors.PRIMARY_ORANGE
        : status === 'completed'
        ? colors.PRIMARY_GREY
        : colors.PRIMARY_RED,
  };

  let notify_image =
    status === 'neworder'
      ? Images.new_order
      : status === 'newmessage'
      ? Images.new_message
      : status === 'oldmessage'
      ? Images.old_message
      : Images.old_order;
  let notify_text =
    status === 'neworder'
      ? 'New Request'
      : status === 'newmessage'
      ? 'New Message'
      : status === 'oldmessage'
      ? 'Message'
      : 'Requests';

  return customicon ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.4} style={styles.box}>
      <View style={styles.row}>
        <View style={[styles.div_view, styles.row_center]}>
          {customicon}
          <View style={{marginLeft: 20}}>
            <Text style={[Basestyle.bold_16, {color: colors.PRIMARY_BLUE}]}>
              {customtext}
            </Text>
          </View>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={35}
          color={colors.PRIMARY_ORANGE}
          style={{right: 10, position: 'absolute', alignSelf: 'center'}}
        />
      </View>
    </TouchableOpacity>
  ) : type === 'notification' ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.4} style={styles.box}>
      <View style={styles.row}>
        <View style={[styles.div_view, styles.row_center]}>
          <Image
            source={notify_image}
            resizeMode="contain"
            style={{width: 55, height: 55}}
          />
          <View style={{marginLeft: 20}}>
            <Text style={[Basestyle.bold_16, {color: colors.PRIMARY_BLUE}]}>
              {notify_text}
            </Text>
            <Text numberOfLines={1} style={styles.not_text}>
              Destination:{' '}
              <Text
                style={[
                  Basestyle.nunito_bold_13,
                  {color: colors.PRIMARY_BLUE},
                ]}>
                {destination}
              </Text>
            </Text>
          </View>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={35}
          color={colors.PRIMARY_ORANGE}
          style={{right: 10, position: 'absolute', alignSelf: 'center'}}
        />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} activeOpacity={0.4} style={styles.box}>
      <View style={styles.row}>
        <View style={styles.div_view}>
          <View style={styles.row_center}>
            <Text style={[Basestyle.bold_16, {color: colors.PRIMARY_BLUE}]}>
              # {idnumber}
            </Text>
            <View style={[styles.status_div, custom_status_div]}>
              <Text style={[styles.status_text, custom_status_text]}>
                {status}
              </Text>
            </View>
          </View>
          {/* bottom row */}

          <View style={styles.bottom_row}>
            <View style={styles.bottom_halve}>
              <Text
                numberOfLines={1}
                style={[
                  Basestyle.nunito_regular_13,
                  {color: colors.PRIMARY_BLUE},
                ]}>
                Destination:{' '}
                <Text
                  style={[
                    Basestyle.nunito_bold_13,
                    {color: colors.PRIMARY_BLUE},
                  ]}>
                  {destination}
                </Text>
              </Text>
            </View>
            <View style={{width: '3%', top: 6}}>
              <Image
                source={Images.baricon}
                resizeMode="contain"
                style={{width: 5, height: 20}}
              />
            </View>

            <View style={styles.bottom_halve}>
              <Text
                numberOfLines={1}
                style={[
                  Basestyle.nunito_regular_13,
                  {color: colors.PRIMARY_BLUE},
                ]}>
                Due Date:{' '}
                <Text
                  style={[
                    Basestyle.nunito_bold_13,
                    {color: colors.PRIMARY_BLUE},
                  ]}>
                  {duedate}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={35}
          color={colors.PRIMARY_ORANGE}
          style={{right: 10, position: 'absolute'}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ItemBox;
