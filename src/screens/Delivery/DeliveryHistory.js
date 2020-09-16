/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
console.disableYellowBox = true;

import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Basestyle, colors, Images} from '../../helpers/BaseThemes';
import moment from 'moment';
import ItemBox from '../../components/ItemBox';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import styles from '../Home/styles/dashboard_styles';
import {connect} from 'react-redux';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import {fetchDeliveryHistory} from '../../actions/delivery.action';

const DeliveryHistory = ({
  navigation,
  deliveryhistory,
  trackdelivery,
  fetchDeliveryHistory,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      await fetchDeliveryHistory();
      setIsLoading(false);
      //console.log(response);
    };
    fetchHistory();
  }, []);
  const _renderItem = ({item, index}) => (
    <ItemBox
      idnumber={item._id}
      // status={item.status.status}
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
        You have made no delivery request yet{'\n'}
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
        title="Delivery History"
        showlefticon
        leftheader
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <View style={Basestyle.row_space_between}>
            <View style={{width: '58%'}}>
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
            <View style={{width: '39%'}}>
              <FloatingTextInput
                type="round"
                placeholder="Filter Orders"
                leftElement={
                  <TouchableOpacity style={{left: '25%'}}>
                    <Image
                      source={Images.filter_icon}
                      resizeMode="contain"
                      style={{width: 18}}
                    />
                  </TouchableOpacity>
                }
              />
            </View>
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
                  data={deliveryhistory}
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
    delivery: {deliverydata, trackdelivery, deliveryhistory},
  } = state;
  return {
    deliverydata,
    trackdelivery,
    deliveryhistory,
  };
};
const mapDispatchToProps = {
  fetchDeliveryHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryHistory);
