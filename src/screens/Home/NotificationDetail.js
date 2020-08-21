/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, ScrollView, Text} from 'react-native';
import styles from './styles/dispatch_detail';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import ButtonMain from '../../components/Button/ButtonMain';
import FontNames from '../../helpers/BaseThemes/fontnames';

const NotificationDetail = ({navigation, route}) => {
  const {type, message, order_no} = route.params;
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
      <ScrollView style={{marginTop: 30}} showsVerticalScrollIndicator={false}>
        <View>
          <View style={[Basestyle.round_box, styles.extra_box]}>
            <Text style={styles.not_detail_head}>{type}</Text>
            {message ? (
              <Text style={styles.not_detail_text}>{message}</Text>
            ) : (
              <Text style={styles.not_detail_text}>
                You have been assigned{' '}
                <Text
                  style={{
                    fontFamily: FontNames.medium,
                    color: colors.PRIMARY_BLUE,
                  }}>
                  Order {order_no}{' '}
                </Text>{' '}
                Please reach out to Customer care if you have any questions{' '}
              </Text>
            )}
            {type === 'new request' && (
              <ButtonMain
                onPress={() =>
                  navigation.navigate('DispatchDetail', {
                    title: '# RA0492859',
                  })
                }
                text="View Request"
                btnContainerStyle={{marginBottom: 20, marginTop: 60}}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetail;
