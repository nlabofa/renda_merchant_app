/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */

console.disableYellowBox = true;

import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {Basestyle, colors, Images} from '../../helpers/BaseThemes';
import ItemBox from '../../components/ItemBox';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import styles from '../Home/styles/dashboard_styles';

import ReuseHeader from '../../components/Header/index';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import {connect} from 'react-redux';
import {fetchTrackDelivery} from '../../actions/delivery.action';

const TrackDelivery = ({navigation, trackdelivery, fetchTrackDelivery}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      await fetchTrackDelivery();
      setIsLoading(false);
      //console.log(response);
    };
    fetchHistory();
  }, []);
  const _renderItem = ({item, index}) => (
    <ItemBox
      idnumber={item._id}
      status={item.status.status}
      destination={item.dropOffLandmark}
      duedate={moment(item.deliveryDate).format('Do, MMM YYYY')}
      onPress={() =>
        navigation.navigate('DispatchDetailHistory', {
          completed: false,
          item,
        })
      }
    />
  );
  const EmptyView = () => (
    <View style={styles.empty_view}>
      <Image
        source={Images.empty_bag}
        style={{width: 109, height: 141}}
        resizeMode="contain"
      />
      <Text style={[styles.empty_text]}>
        You have made no request to track{'\n'}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Track Delivery"
        leftheader
        showlefticon
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <View style={{width: '100%'}}>
            <FloatingTextInput
              type="round"
              placeholder="Search by request id"
              leftElement={
                <TouchableOpacity style={{left: '25%'}}>
                  <Image
                    source={Images.search_icon}
                    resizeMode="contain"
                    style={{width: 20}}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={{marginTop: 40}}>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={colors.PRIMARY_PURPLE}
                style={{marginTop: 30}}
              />
            ) : (
              <View>
                <FlatList
                  ListEmptyComponent={EmptyView()}
                  showsVerticalScrollIndicator={false}
                  data={trackdelivery}
                  renderItem={_renderItem}
                  keyExtractor={(item, index) => `list-item-${index}`}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    delivery: {trackdelivery, deliveryhistory},
  } = state;
  return {
    deliveryhistory,
    trackdelivery,
  };
};
const mapDispatchToProps = {
  fetchTrackDelivery,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackDelivery);
