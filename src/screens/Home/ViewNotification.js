/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, ScrollView, Text} from 'react-native';
import styles from './styles/dashboard_styles';
import {Basestyle} from '../../helpers/BaseThemes';
import ItemBox from '../../components/ItemBox';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
const ViewNotification = ({navigation}) => {
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Notifications"
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <Text style={[styles.opaq3]}>Today</Text>
          <View style={{marginTop: 15}}>
            {/* <ItemBox
              type="notification"
              status="neworder"
              destination="Lagos Island"
              onPress={() =>
                navigation.navigate('NotificationDetail', {
                  type: 'new request',
                  order_no: '2344555',
                })
              }
            /> */}
            <ItemBox
              type="notification"
              status="newmessage"
              destination="Lagos Island"
              onPress={() =>
                navigation.navigate('NotificationDetail', {
                  type: 'new message',
                  message: 'You have a new notification',
                })
              }
            />
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={[styles.opaq3]}>Yesterday</Text>
          <View style={{marginTop: 15}}>
            {/* <ItemBox
              type="notification"
              status="oldorder"
              destination="Lagos Island"
              onPress={() =>
                navigation.navigate('NotificationDetail', {
                  type: 'request',
                  order_no: '2344555',
                })
              }
            /> */}
            <ItemBox
              type="notification"
              status="oldmessage"
              destination="Lagos Island"
              onPress={() =>
                navigation.navigate('NotificationDetail', {
                  type: 'message',
                  message: 'You have a new notification',
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewNotification;
